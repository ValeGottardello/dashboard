import Accordion from 'react-bootstrap/Accordion';
import Form from 'react-bootstrap/Form';
import {Tasks} from './Task';
import { addHours } from '../utils/dependent';
import '../css/Profile.css'
import { useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';
import '../css/Profile.css'

export default function Dependent (user) {
    const [intervalId, setIntervalId] = useState(null)
    const [seconds, setSeconds] = useState(0)
    const [minutes, setMinutes] = useState(0)
    const [hours, setHours] = useState(0)
    const [disabled, setDisabled] = useState(false)
    const [input, setInput] = useState({})
    const [updateHours, setUpdateHours] = useState({})
    const startTimer = () => {
        setDisabled(true)
        const id = setInterval(() => {
            setSeconds(prevSeconds => prevSeconds + 1)
         
        }, 1000);
        setIntervalId(id);
      }
    
    const resetTimer = () => {
        clearInterval(intervalId)
        setIntervalId(null)
        setSeconds(0)
        setMinutes(0)
        setHours(0)
        setDisabled(false)
        if (hours) {
            let result = user.user.hours_available - hours
            addHours({ hours_available : result, email : user.user.email})
                .then(res => setUpdateHours(res))

        } else if (minutes) {
            let toHours = ((user.user.hours_available * 60)  - minutes ) / 60

            let integer = Number(toHours.toString().split("").splice(0,2).join(""))
            console.log(integer)
            let decimal = Math.floor(Number(toHours.toString().split("").splice(2).join("")) * 60)
            console.log(decimal)
            let result = [integer, decimal]

            addHours({ hours_available : result.join("."), email : user.user.email})
                .then(res => setUpdateHours(res))
        } 
    }
    useEffect(() => {
        if (seconds === 60) {

            setSeconds((prevSeconds) => prevSeconds % 60)
            setMinutes(minutes + 1)
     
        }
        if(minutes === 60 ){

            setMinutes((prevSeconds) => prevSeconds % 60)
            setHours(hours + 1)

        }
        if (hours > 24) {
            clearInterval(intervalId)
            setIntervalId(null)
            setSeconds(0)
            setMinutes(0)
            setHours(0)
        }

      }, [seconds, minutes, hours, user, intervalId])
    

    const handleChange = ({ target }) => {
        setInput({...input, [target.name] : target.value})
    }
    const handleSubmit = (evt) => {
        evt.preventDefault()

        addHours({ hours_available : input.hours_available, email : user.user.email}).then(res => {
            setUpdateHours(res)
        })
    }
    return (
        <div className='wrapper-profile'>
            <header>
                <section>
                    <div>
                        <img className="profile-pic" src="https://images.pexels.com/photos/15443094/pexels-photo-15443094.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load" alt="" />
                    </div>
                    <div>
                        <h2>{user.user.name}</h2>
                        <h4>{user.user.email}</h4>
                    </div>
                    <div>
                        <h4 className='position-info'>{user.user.position}</h4>
                        <h4>
                            {updateHours.hours_available ? updateHours.hours_available + "h available" : ( user.user.hours_available === null ? "" : user.user.hours_available + "h available")}</h4>
                    </div>
                    <div>
                        {/* business your are parte of */}
                        {/* <button> Confirm </button> */}
                    </div>
                    <div>
                        {/* <Button variant="secondary" size="sm" active>
                            EDIT PHOTO
                        </Button> */}
                    </div>
                </section>
            </header>
            <section>
                <Accordion defaultActiveKey={['0']}>
                    <Accordion.Item eventKey="0">
                        <Accordion.Header>Clock In</Accordion.Header>
                            <Accordion.Body className="clock-in">
                                <h4>{updateHours.hours_available ? updateHours.hours_available + "h available" : ( user.user.hours_available === null ? "Set your availability" : user.user.hours_available + "h available")}</h4>
                                <h4>Timer: {hours !== 0 ? hours + ":" : null}{minutes !== 0 ? minutes + ":" : null}{seconds}</h4>
                                
                                <Button onClick={startTimer} variant="primary" size="sm" active disabled={disabled}>
                                            Clock In
                                </Button> 
                                <Button onClick={resetTimer} variant="primary" size="sm" active>
                                            Clock Off
                                </Button>  
                            
                                {/* <Link to="/roster">See your roster</Link> */}
                        </Accordion.Body>
                    </Accordion.Item>
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
                    <Tasks user={user}/>
                </Accordion>
            </section>
        </div>
    )
}
