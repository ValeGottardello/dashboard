import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Accordion from 'react-bootstrap/Accordion';
import { useState } from 'react';

export function Tasks ({ user }) {
    const [tasks, setTasks] = useState({})
    return (
        <Accordion.Item eventKey="3">

            <Accordion.Header>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Check me out" />
                </Form.Group>
            </Accordion.Header>
            <Accordion.Body>
                <p>Content of tasks</p>
            </Accordion.Body>
        </Accordion.Item>
    )
}