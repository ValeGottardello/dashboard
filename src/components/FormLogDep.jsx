import { useState } from "react"
import { useNavigate } from "react-router-dom"
import {login as depLoginApi} from '../utils/dependent'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { getUser } from "../utils/users_service";

export default function FormLogDep ({ onLogIn }) {
    const [input, setInput] = useState({})
    const [error, setError] = useState({})
    const navigate = useNavigate()
    const handleChange = ({ target }) => {
        setInput({ ...input, [ target.name ] : target.value})
    }

    const handleSubmit = (evt) => {
        evt.preventDefault()
   
        if (input.email && input.password){
            depLoginApi(input)
                .then(token => {
                    onLogIn(getUser())
                    localStorage.setItem("token", token)
                    navigate('/profile')

                }).catch(err => {
                    setError(err)
                    navigate('/login/dependent')
                })
        } 
    }

    return (
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
            {error?.message && (
                <Form.Text className="text-muted">
                    {error.message}
                </Form.Text>
            )}
            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    )

}