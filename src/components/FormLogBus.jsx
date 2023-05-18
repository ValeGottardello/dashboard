import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { getUser } from "../utils/users_service";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { login as ownerApiLogin } from "../utils/owner"

export default function FormLogBus ({ onLogIn }) {
    const [input, setInput] = useState({})
    const [error, setError] = useState({}) 
    const navigate = useNavigate()
    const handleChange = ({ target }) => {
        setInput({ ...input, [ target.name ] : target.value})
    }

    const handleSubmit = (evt) => {
        evt.preventDefault()
  
        if (input.email && input.password){
            ownerApiLogin(input)
                .then(token => {

                    onLogIn(getUser())
                    localStorage.setItem("token", token)
                    navigate('/profile')  
                    
                }).catch((err) => { 
                    setError(err)
                    navigate('/login/owner')
                })
        }
    }

    return (
        <Form  onChange={handleChange} onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Business email address</Form.Label>
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
                Submit
            </Button>
            {error?.message && (
                <Form.Text className="text-muted error">
                    {error.response.data.message}
                </Form.Text>
            )}
        </Form>
    )
}