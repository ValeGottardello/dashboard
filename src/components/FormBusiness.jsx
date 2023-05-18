import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import {signup as signApiOwner } from '../utils/owner'
import {login as loginApiOwner } from '../utils/owner'
import { getUser } from "../utils/users_service";
import Button from 'react-bootstrap/Button';
import CheckValidPassword from '../utils/CheckValidPassword';

export default function FormBusiness ({ onLogIn }) {
    const [input, setInput] = useState({})
    const navigate = useNavigate()
    const [error, setError] = useState({})
    const [status, setStatus] = useState({})


    const handleChange = ({target}) => {
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
                const newOwner = await signApiOwner(input)
                    .then(dbRes => dbRes)
                
                await loginApiOwner({ email : newOwner.owner_email, password: input.password}).then(token => {
                    onLogIn(getUser())
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
            <Button variant="primary" type="submit">
                Sign Up
            </Button>
            {error?.message  && (
                <Form.Text className="text-muted">
                    {error.message}
                </Form.Text>
            )}
            {status && (
                <Form.Text className="text-muted status">
                    {status.status}
                </Form.Text>
            )}
        </Form>
    )
}