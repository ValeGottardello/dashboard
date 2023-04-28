import { useState } from "react"
import { useNavigate } from "react-router-dom"
import {signup as signApiOwner } from '../utils/owner'
import {login as loginApiOwner } from '../utils/owner'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link } from "react-router-dom";
import '../css/LogInPage.css'
import Carousel from '../components/Carousel'

export default function SignUpBusinessPage () {

    const [input, setInput] = useState({})
    const navigate = useNavigate()
    const handleChange = ({target}) => {
        setInput({...input, [target.name] : target.value })
    }

    const handleSubmit = async (evt) => {
        evt.preventDefault()
        try {
            if (input.email && input.password && input.name){
                const newOwner = await signApiOwner(input)
                    .then(dbRes => dbRes)
                
                await loginApiOwner({ email : newOwner.owner_email, password: input.password}).then(token => {
                    console.log(token)
                    localStorage.setItem("token", token)
              
                })
                navigate('/profile')  
            }
        } catch (err) {
            console.log(err)
        }
    }

    return (
        // <div>
        //     <form onChange={handleChange} onSubmit={handleSubmit}>
        //         <input type="text" name="name" placeholder="Business Name"/>
        //         <input type="text" name="email" placeholder="Business Email"/>
        //         <input type="password" name="password" placeholder="password"/>
        //         <button>Sign up</button>
        //     </form>
        // </div>
        <div className="wrapper-from">
        <div className="left">
            <Form  onChange={handleChange} onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicName">
                    <Form.Label>Business's Name</Form.Label>
                    <Form.Control type="name" placeholder="Enter business's name" name="name" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Business's address</Form.Label>
                    <Form.Control type="email" placeholder="Enter business's email" name="email" />
                    <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" name="password" placeholder="Password" />
                </Form.Group>
                {/* {error && (
                    <Form.Text className="text-muted">
                        {error}
                    </Form.Text>
                )} */}
                <Button variant="primary" type="submit">
                    Sign Up
                </Button>
            </Form>
        </div>
        <div className="right">
            <div className="wrapper-carousel">
                <Carousel/>
            </div>
            <Button variant="primary">
                <Link className="sign-btn" to="/login/owner">Log In your business</Link>
            </Button>
        </div>
  </div>
    )
}