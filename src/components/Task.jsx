
import Form from 'react-bootstrap/Form';
import Accordion from 'react-bootstrap/Accordion';
import { useEffect, useState } from 'react';
import { checkDone, getTasks } from '../utils/dependent';
import '../css/Profile.css'

export function Tasks ({ user }) {

    const [tasks, setTasks] = useState([])
    // const [error, setError] = useState({})
    const [updateTasks, setUpdateTasks] = useState([])

    useEffect(() => {
        getTasks(user.user.id)
            .then(res => {
                if(res.error) {
                    console.log(res)
                    // setError(res)
                } else {
                    setTasks([...res])
                }
            }).catch((err) => { 
                console.log(err)
            })
    }, [updateTasks, user.user.id])

    const handleCheck = ({target}) => {
        checkDone(target.value).then(res => {
            if (res.error) {
                console.log(res)
                // setError(res)
            } 
                const updatedTasks = tasks.filter(task => tasks.length > 1 ? task.id !== target.value : task)
                setUpdateTasks([updatedTasks])
                console.log(tasks)
            
        })
    }
    return (
        <>
        <Accordion.Item eventKey="3">
            <Accordion.Header>
                Assigned tasks
            </Accordion.Header>
            <Accordion.Body> 
                {tasks.length === 0 ? (
                    <Form.Text className="text-muted">
                       No tasks assigned
                    </Form.Text>
                ) : (
                    <>
                       {tasks.map( task => (
                        <Form key={task.id}>
                            <Form.Group className="mb-3" controlId="formBasicCheckbox">
                                <Form.Check type="checkbox" label={task.task_name} onChange={handleCheck} value={task.id}/> 
                                <Form.Text>{task.to_do}</Form.Text>
                            </Form.Group>
                        </Form>
                        ))}
                    </>
                ) }
            </Accordion.Body>
        </Accordion.Item>
        </>
    )
}

