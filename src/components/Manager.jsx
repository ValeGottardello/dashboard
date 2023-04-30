import Form from 'react-bootstrap/Form';
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
import { useEffect, useState } from 'react';
import { getDependents } from '../utils/owner';
import { addNewTask } from '../utils/dependent';
import Alert from 'react-bootstrap/Alert';
import '../css/Profile.css'

export default function Manager (user) {

    const [input, setInput] = useState({})
    const [dependent, setDependents] = useState([])
    const [message, setMessage] = useState(null)
    const [show, setShow] = useState(true);

    useEffect(() => {
        console.log(user)
        getDependents(user.user.user.id_business).then(res => setDependents([...res]))

    }, [user])

    const handleChange = ({ target }) => {
        setInput({...input, [target.name] : target.value})
    }


    const handleSubmit = (evt) => {

        evt.preventDefault()
        
        let dataBody = {
            task_name : input.name,
            to_do : input.to_do,
            id_manager : user.user.user.id,
            id_employee : input.id_employee
        }
        console.log(dataBody)
        addNewTask(dataBody)
            .then(res => {
                setMessage(res[0].task_name)
                setShow(true)
            }).catch(err => console.log(err))
    }


    return (
    <>
        <Accordion.Item eventKey="4">
            <Accordion.Header>
                Add new task
            </Accordion.Header>
            <Accordion.Body> 
                <Form onChange={handleChange} onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Task Name</Form.Label>                                <Form.Control type="name" name="name" placeholder="Enter email" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicName">
                        <Form.Label>Description</Form.Label>
                        <Form.Control type="text" name="to_do" placeholder="Enter task's details" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicName">
                        <Form.Select aria-label="Assign to:" name="id_employee">
                            <option> Assign to: </option>
                            { dependent?.map(employee => (
                                <option value={employee.id} key={employee.id}>{employee.name}</option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </Accordion.Body>
        </Accordion.Item>
         {message !== null && show ? (
        <>
        <Alert show={show} variant="success">
            <Alert.Heading>Task {message.name} added!</Alert.Heading>
            <div className="d-flex justify-content-end">
            <Button onClick={() => setShow(false)} variant="outline-success">
                X
            </Button>
            </div>
        </Alert>
        </>
        ) : null } 
        </>
    )
}