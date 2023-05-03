import { useEffect, useState } from "react"
import { getDependents, updateDependent } from "../utils/owner"
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { addNewDependent, deleteDependent } from "../utils/owner";
import Alert from 'react-bootstrap/Alert';
import Card from 'react-bootstrap/Card';
import DetailsBusiness from "./DetailsBusiness";
import '../css/Profile.css'  
import { AiOutlineUser,AiOutlineHourglass,AiOutlineMail } from "react-icons/ai";
import { getPayload } from "../utils/users_service";
export default function Business ({ user }) {

    const [dependents, setDependents] = useState([])
    const [newDependent, setNewDependent] = useState({})
    const [memberDelete, setMemberDelete] = useState({})
    const [newPosition, setNewPosition] = useState({})
    const [message, setMessage] = useState(null)
    const [show, setShow] = useState(true)

    useEffect(() => {
        getDependents(user.id).then(res => {
            if (res.error) {
                console.log(res.error)
            } else {

                setDependents(res)
            }})
    }, [user])


    const handleChangeAdd = ({ target }) => {
        setNewDependent({...newDependent, [target.name] : target.value})
    }
    const handleSubmitAdd = (evt) => {

        evt.preventDefault()

        addNewDependent({id: user.id, email : newDependent.email, position: newDependent.position}).then(res => {
    
            setDependents([...dependents, res])
            setShow(true)
            setMessage("new team member added")
        })

    }

    const handleChangeDelete = ({ target }) => {
        setMemberDelete({...memberDelete, [target.name] : target.value})
        console.log(memberDelete)
    }

    const handleSubmitDelete = (evt) => {
        evt.preventDefault()
     
        deleteDependent(memberDelete)
            .then(async token => {
            if(token){
                localStorage.setItem("token", token)
                let oldDependent = await getPayload(token)  

                const updDependents = dependents.filter(dependent => dependent.id !== oldDependent.id)
                console.log(updDependents)
                setDependents(updDependents)

            }
        }).catch(err => {
            console.log(err)
        })    
        setShow(true)
        setMessage("team member removed")
    }
    const handleChangeUpdate = ({ target }) => {
        setNewPosition({...newPosition, [target.name] : target.value})
    }

    const handleSubmitUpdate = (evt) => {
        evt.preventDefault()
        
        let dataBody = {
            email: newPosition.email,
            position: newPosition.position,
            id_business : user.id
        }
        updateDependent(dataBody).then(res => {
            const updDependents = dependents.map(dependent => {
                if (dependent.id === res.id) {
                    dependent.position = res.position
                }
                return dependent
            })
            // console.log(updDependents)
            setDependents(updDependents)
            setShow(true)
            setMessage("team member position updated")
        })
        
    }

    return (
        <div className='wrapper-profile'>
            <header>
                <DetailsBusiness user={user}/>
            </header>
            <section>
                <h3>Team members</h3>
                <div className="card-members-wrapper">
                        {dependents?.map(eachDep => (                 
                            <Card style={{ width: '18rem' }} key={eachDep.id}>
                                <Card.Body>
                                    <Card.Title><h3><AiOutlineUser/> {eachDep.name}</h3></Card.Title>
                                    <Card.Subtitle className="mb-2 text-muted">{eachDep.position}</Card.Subtitle>
                                    <ul>
                                            <li><AiOutlineMail/> {eachDep.email}</li>
                                            <li><AiOutlineHourglass/> {eachDep.hours_available !== null ? + eachDep.hours_available + "h available" : "No specified hours"}</li>
                                    </ul>
                                </Card.Body>
                            </Card>
                        ))}
                </div>
            </section>
            <section>
                <Accordion defaultActiveKey={['0']}>
                    <Accordion.Item eventKey="0">
                        <Accordion.Header><h3 className="header-acordion">Add new a team member</h3></Accordion.Header>
                        <Accordion.Body>
                        <Form onChange={handleChangeAdd} onSubmit={handleSubmitAdd}>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Team member's email address</Form.Label>
                                <Form.Control type="email" name="email" placeholder="Enter email" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicName">
                                <Form.Select aria-label="Assign to:" name="position" placeholder="Enter role" >
                                    <option> Assign to: </option>
                                    <option>employee</option>
                                    <option>manager</option>
                                </Form.Select>
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                        </Form>
                        </Accordion.Body>
                        </Accordion.Item>
                </Accordion>
            </section>
            <section>
            <Accordion defaultActiveKey={['0']}>
                    <Accordion.Item eventKey="0">
                        <Accordion.Header><h3 className="header-acordion">Delete a team member</h3></Accordion.Header>
                        <Accordion.Body>
                        <Form onChange={handleChangeDelete} onSubmit={handleSubmitDelete}>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Team member's email address</Form.Label>
                                <Form.Control type="email" name="email" placeholder="Enter email" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicName">
                                <Form.Select aria-label="Assign to:" name="position" placeholder="Enter role" >
                                    <option> Assign to: </option>
                                    <option>employee</option>
                                    <option>manager</option>
                                </Form.Select>
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                        </Form>
                        </Accordion.Body>
                        </Accordion.Item>
            </Accordion>
            </section>
            <section>
                <Accordion defaultActiveKey={['0']}>
                    <Accordion.Item eventKey="0">
                        <Accordion.Header><h3 className="header-acordion">Update a role of a team member</h3></Accordion.Header>
                        <Accordion.Body>
                        <Form onChange={handleChangeUpdate} onSubmit={handleSubmitUpdate}>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Team member's email address</Form.Label>
                                <Form.Control type="email" name="email" placeholder="Enter email" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicName">
                                <Form.Select aria-label="Assign to:" name="position" placeholder="Enter role" >
                                    <option> Assign to: </option>
                                    <option>employee</option>
                                    <option>manager</option>
                                </Form.Select>
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                        </Form>
                        </Accordion.Body>
                        </Accordion.Item>
                </Accordion>
                {message && show ? (
                <>
                <Alert show={show} variant={"dark"}>
                    <Alert.Heading>{message}</Alert.Heading>
                    <div className="d-flex justify-content-end">
                    <Button onClick={() => setShow(false)} variant="outline-success">
                        X
                    </Button>
                    </div>
                </Alert>
                </>
                ) : null } 
            </section>
        </div>
    )
}


   
