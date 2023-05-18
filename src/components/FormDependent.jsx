import { useState } from "react"
import { useNavigate } from "react-router-dom"
import {signup as signApiDep } from '../utils/dependent'
import {login as loginApiDep } from '../utils/dependent'
import { getUser } from "../utils/users_service";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import CheckValidPassword from "../utils/CheckValidPassword";

export default function Forms ({ onLogIn }) {

    const [input, setInput] = useState({})
    const [error, setError] = useState({})
    const [status, setStatus] = useState({})
    const navigate = useNavigate()

    const handleChange = ({ target }) => {
        setStatus("")
        
        if (target.name === "password") {
            
            const status = CheckValidPassword(target.value)

            setStatus(status)
        }
    
        setInput({...input, [target.name] : target.value })
    }

    const handleSubmit = async (evt) => {
        evt.preventDefault()
        try {
            if (input.email && input.password && input.name){
                const newDependent = await signApiDep(input)
                    .then(dbRes => dbRes)
                
                await loginApiDep({ email : newDependent.email, password: input.password}).then(token => {
                    onLogIn(getUser)
                    localStorage.setItem("token", token)
             
                })
                navigate('/profile')  
            }
        } catch (err) {
            setError(err)
        }
    }
    return (
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
            <Button variant="primary" type="submit">
                Sign Up
            </Button>
            {status && (
                <Form.Text className="text-muted status">
                    {status.status}
                </Form.Text>)}
            {error?.message && (
                <Form.Text className="text-muted error">
                    {error.message}
                </Form.Text>
            )}
        </Form>
    )
}