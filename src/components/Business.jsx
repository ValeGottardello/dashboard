import { useEffect, useState } from "react"
import { getDependents } from "../utils/owner"
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { addNewDependent, deleteDependent } from "../utils/owner";
import { useNavigate } from "react-router-dom";

export default function Business ({ user }) {

    const [dependents, setDependents] = useState([])
    const [newDependent, setNewDependent] = useState({})
    const [memberDelete, setMemberDelete] = useState({})
    const navigate = useNavigate()

    useEffect(() => {
        getDependents(user.id).then(dependents => setDependents(dependents))
    }, [])

    // console.log(dependents)

    const handleChangeAdd = ({ target }) => {
        setNewDependent({...newDependent, [target.name] : target.value})
    }
    const handleSubmitAdd = (evt) => {

        evt.preventDefault()

        addNewDependent({id: user.id, email : newDependent.email, position: newDependent.position}).then(res => {
            console.log(res)
    
            setDependents([...dependents, res])
        })

    }

    const handleChangeDelete = ({ target }) => {
        setMemberDelete({...memberDelete, [target.name] : target.value})
        console.log(memberDelete)
    }

    const handleSubmitDelete = (evt) => {
        evt.preventDefault()
     
        deleteDependent(memberDelete).then(res => {
            const updDependents = dependents.filter(dependent => dependent.id !== res.id)
            setDependents(updDependents)
        })
    }

    return (
        <div>
            <section>
                <h1>Team members</h1>
                {dependents?.map(eachDep => (
                    <>
                        <Accordion defaultActiveKey={['0']} key={eachDep.id}>
                            <Accordion.Item eventKey="0">
                                <Accordion.Header><h3>{eachDep.name}</h3></Accordion.Header>
                                <Accordion.Body>
                                    <ul>
                                        <li>{eachDep.email}</li>
                                        <li>{eachDep.position}</li>
                                        {/* eachDep.position.toUpperCase() */}
                                        <li>{eachDep.hours_available !== null ? eachDep.hours_available + "h" : "Not determined yet"}</li>
                                    </ul>
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>
                    </>
                ))}
            </section>
            <section>
                <Accordion defaultActiveKey={['0']}>
                    <Accordion.Item eventKey="0">
                        <Accordion.Header><h3>Add new a team member</h3></Accordion.Header>
                        <Accordion.Body>
                        <Form onChange={handleChangeAdd} onSubmit={handleSubmitAdd}>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Team member's email address</Form.Label>
                                <Form.Control type="email" name="email" placeholder="Enter email" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicName">
                                <Form.Label>Role</Form.Label>
                                <Form.Control type="text" name="position" placeholder="Enter role" />
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
                        <Accordion.Header><h3>Delete a team member</h3></Accordion.Header>
                        <Accordion.Body>
                        <Form onChange={handleChangeDelete} onSubmit={handleSubmitDelete}>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Team member's email address</Form.Label>
                                <Form.Control type="email" name="email" placeholder="Enter email" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicName">
                                <Form.Label>Role</Form.Label>
                                <Form.Control type="text" name="position" placeholder="Enter role" />
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                        </Form>
                        </Accordion.Body>
                        </Accordion.Item>
                </Accordion>
            </section>
        </div>
    )
}


   
