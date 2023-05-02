
import Form from 'react-bootstrap/Form';
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
import '../css/Profile.css'
import { useEffect, useState } from 'react';
import { checkDone, getTasks, getAllTasks } from '../utils/dependent';
import { getDependents } from '../utils/owner';
import { addNewTask, deleteTask } from '../utils/dependent';
import Alert from 'react-bootstrap/Alert';

export function Tasks ({ user }) {

    const [tasks, setTasks] = useState([])
    const [allTasks, setAllTasks] = useState([])
    // const [error, setError] = useState({})
    const [input, setInput] = useState({})
    const [dependent, setDependents] = useState([])
    const [message, setMessage] = useState(null)
    const [show, setShow] = useState(true);

    useEffect(() => {

        if (user.id_business) {
            getDependents(user.id_business).then(res => {
                if(res.length > 0){
                    setDependents([...res])    
                }  
            })

              

            getTasks(user.id)
                .then(res => {
                    if(res.error) {
                        console.log(res)
                        // setError(res)
                    } else {
                        setTasks([...res])
                    }
            }).catch((err) => { 
                console.log(err)
            })}

        if(user.position === "manager"){
            getAllTasks(user.id_business).then(res => setAllTasks(res))
        }

      
    }, [user])

    const handleChange = ({ target }) => {
        setInput({...input, [target.name] : target.value})
    }

    const handleSubmit = (evt) => {

        evt.preventDefault()
        
        let nameEmployee = dependent.filter(member => member.id === Number(input.id_employee))

        let dataBody = {
            task_name : input.name,
            to_do : input.to_do,
            id_manager : user.id,
            id_employee : input.id_employee,
            id_business : user.id_business,
            name_employee: nameEmployee[0].name
        }

        addNewTask(dataBody)
            .then(res => {
                setTasks([...tasks, res[0]])
                setAllTasks([...allTasks, res[0]])
                setMessage(`Task ${res[0].task_name} added`)
                setShow(true)
            }).catch(err => console.log(err))
    }

    const handleCheck = ({target}) => {

        checkDone(target.value).then(res => {
            if (res.error) {
                console.log(res)
                // setError(res)
            } 
            const updatedTasks = tasks.filter(task => task.id !== res.id)
            const updatedAllTasks = allTasks.map(task => {
                if (task.id === res.id) {
                    task.done = true
                }
                return task
            })
            
            setTasks(updatedTasks)
            setAllTasks(updatedAllTasks)

        })
    }

    const handleDeleteTask = ({target}) => {
        // console.log(target.value)
        deleteTask(target.value).then(res => {
            console.log(res)
            console.log(res)
            const updatedTasks = allTasks.filter(task => task.id !== res.id)
            setAllTasks(updatedTasks)
            setMessage("Task deleted")
            setShow(true)
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
                                <Form.Check type="checkbox" label={task.task_name} onChange={handleCheck} value={task.id} className='label-task'/> 
                                <Form.Text>{task.to_do}</Form.Text>
                            </Form.Group>
                        </Form>
                        ))}
                    </>
                ) }
            </Accordion.Body>
        </Accordion.Item>

        { user.position === "manager" ? (
        <>
            <Accordion.Item eventKey="4">
                <Accordion.Header>
                    Add new task
                </Accordion.Header>
                <Accordion.Body> 
                    <Form onChange={handleChange} onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Task Name</Form.Label>                                
                            <Form.Control type="name" name="name" placeholder="Enter email"required />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicName">
                            <Form.Label>Description</Form.Label>
                            <Form.Control type="text" name="to_do" placeholder="Enter task's details" required/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicName">
                            <Form.Select aria-label="Assign to:" name="id_employee" required>
                                <option> Assign to: </option>
                                {dependent?.map(employee => (
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
            <Accordion.Item eventKey="5">
                <Accordion.Header>
                   See the tasks assigned
                </Accordion.Header>
                <Accordion.Body> 
                    { allTasks.length > 0 ? (
                        <>
                        {allTasks.map( task => (
                        <Form key={task.id}>
                            <Form.Group className="mb-3 task-wrapper" controlId="formBasicCheckbox" value={task.id}>
                                <div>
                                    <Form.Label className='label-task'
                                    >{task.task_name}</Form.Label>
                                    <Form.Text className="text-muted">
                                        {!task.done ? `to do - assigned to ${task.name_employee}` : `done by ${task.name_employee}` }
                                    </Form.Text>
                                </div>
                                <Button variant="primary" value={task.id} onClick={handleDeleteTask}>
                                    X
                                </Button>
                            </Form.Group>
                        </Form>
                        ))}
                        </>
                    ) : (
                        <Form.Text className="text-muted">
                            No tasks 
                        </Form.Text>
                    )}
                </Accordion.Body>
            </Accordion.Item>
            {message !== null && show ? (
            <>
            <Alert show={show} variant="success">
                <Alert.Heading>{message}!</Alert.Heading>
                <div className="d-flex justify-content-end">
                <Button onClick={() => setShow(false)} variant="outline-success">
                    X
                </Button>
                </div>
            </Alert>
            </> 
        ) : null }       
        </> 
        ): null }   
        </>
    )
}

