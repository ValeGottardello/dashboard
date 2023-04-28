import { useState } from "react"
import { useNavigate } from "react-router-dom"
import {signup as signApiDep } from '../utils/dependent'
import {login as loginApiDep } from '../utils/dependent'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Carousel from '../components/Carousel'
import { Link } from "react-router-dom";

export default function SignUpDependentPage () {

    const [input, setInput] = useState({})
    const navigate = useNavigate()
    const handleChange = ({target}) => {
        setInput({...input, [target.name] : target.value })
    }

    const handleSubmit = async (evt) => {
        evt.preventDefault()
        try {
            if (input.email && input.password && input.name){
                const newDependent = await signApiDep(input)
                    .then(dbRes => dbRes)
                
                await loginApiDep({ email : newDependent.email, password: input.password}).then(token => {
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
        <div className="wrapper-from">
            <div className="left">
                <Form  onChange={handleChange} onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formBasicName">
                        <Form.Label>Your name</Form.Label>
                        <Form.Control type="name" placeholder="Enter your name" name="name" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Your email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" name="email" />
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
                    <Link className="sign-btn" to="/login/dependent">Log In</Link>
                 </Button>
            </div>
      </div>
    )
}