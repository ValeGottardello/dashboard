import { useState } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { addHours } from '../utils/dependent';
import '../css/Profile.css'

export function Availability ({user}) {
    
    const [input, setInput] = useState({})

    const handleChange = ({ target }) => {

        setInput({...input, [target.name] : target.value})
    }
    const handleSubmit = (evt) => {
        evt.preventDefault()

        addHours({ hours_available : input.hours_available, email : user.user.email}).then(res => console.log(res))
    }

    return (
        <Accordion.Item eventKey="2">
            <Accordion.Header>Set availability</Accordion.Header>
            <Accordion.Body>
                <Form onChange={handleChange} onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formBasicName">
                        <Form.Label>Enter your hours available per week</Form.Label>
                        <Form.Control type="number" name="hours_available" placeholder="Enter hours available" />
                    
                    </Form.Group>
                    <Button variant="primary" type="submit">
                                Submit
                    </Button>
                </Form>
            </Accordion.Body>
        </Accordion.Item>
    )
}