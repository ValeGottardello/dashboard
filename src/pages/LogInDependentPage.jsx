import { useState } from "react"
import { useNavigate } from "react-router-dom"
import {login as depLoginApi} from '../utils/dependent'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link } from "react-router-dom";
import '../css/LogInPage.css'
import Carousel from '../components/Carousel'
export default function LogInDependentPage({ onLogIn }) {

    const [input, setInput] = useState({})
    const [error, setError] = useState("")
    const navigate = useNavigate()
    const handleChange = ({ target }) => {
        setInput({ ...input, [ target.name ] : target.value})
    }

    const handleSubmit = (evt) => {
        evt.preventDefault()
        console.log(input)
        if (input.email && input.password){
            depLoginApi(input)
                .then(token => {
                    console.log(token)
                    localStorage.setItem("token", token)
                    onLogIn(input)
                }).catch(err => console.log(err))
            navigate('/profile')  
        } else {
            setError("You need enter a valid email and password")
        }
    }

    return (
        <div className="wrapper-from">
           
        <div className="left">
            <Form  onChange={handleChange} onSubmit={handleSubmit}>
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
                {error && (
                    <Form.Text className="text-muted">
                        {error}
                    </Form.Text>
                )}
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
        <div className="right">
                <div className="wrapper-carousel">
                    <Carousel/>
                </div>
                <Button variant="primary">
                    <Link className="sign-btn" to="/signup/dependent">Create an account</Link>
                </Button>
        </div>
      </div>
    )
}