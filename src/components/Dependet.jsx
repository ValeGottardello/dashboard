import Accordion from 'react-bootstrap/Accordion';
import Form from 'react-bootstrap/Form';
import {Tasks} from './Task';
import { addHours } from '../utils/dependent';
import '../css/Profile.css'
import { useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';
import '../css/Profile.css'
import { getBusinessName, deleteDependent } from '../utils/owner';
import { getPayload } from '../utils/users_service';
import { AiOutlineUser } from "react-icons/ai";

export default function Dependent ({user, onSetUser}) {

    const [intervalId, setIntervalId] = useState(null)
    const [seconds, setSeconds] = useState(0)
    const [minutes, setMinutes] = useState(0)
    const [hours, setHours] = useState(0)
    const [disabled, setDisabled] = useState(false)
    const [input, setInput] = useState({})
    const [businessName, setBusinessName] = useState({})


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
        
        if (user.id_business) {
            getBusinessName(user.id_business)
            .then(res =>{ 
                // console.log(res)
                setBusinessName(res)
                
            })               
        }
        
          
    }, [seconds, minutes, hours, intervalId, user])
    
    const startTimer = () => {
        setDisabled(true)
        const id = setInterval(() => {
            setSeconds(prevSeconds => prevSeconds + 1)
         
        }, 1000);
        setIntervalId(id);
      }
    
    const resetTimer = async => {
        clearInterval(intervalId)
        try {
            if (hours) {
                let result = user.hours_available - hours
                addHours({ hours_available : result, email : user.email})
                    .then(async token => {
                    if(token){
                        localStorage.setItem("token", token)
                        let user = await getPayload(token)  
                        onSetUser(user)
                    }

                }).catch(err => {
                    console.log(err)
            })    
                
            } else if (minutes) {
                let toHours = ((user.hours_available * 60)  - minutes ) / 60
                
                let integer = Number(toHours.toString().split("").splice(0,2).join(""))
                // console.log(integer)
                let decimal = Math.floor(Number(toHours.toString().split("").splice(2).join("")) * 60)
                // console.log(decimal)
                let result = [integer, decimal]
                
                addHours({ hours_available : result.join("."), email : user.email})
                    .then(async token => {
                        if(token){
                            localStorage.setItem("token", token)
                            let user = await getPayload(token)  
                            onSetUser(user)
                        }

                    })
            }
        } catch(err) {
            console.log(err)
        }
 
        setIntervalId(null)
        setSeconds(0)
        setMinutes(0)
        setHours(0)
        setDisabled(false)
    }

    const handleChange = ({ target }) => {
        setInput({...input, [target.name] : target.value})
    }

    const handleSubmit =  (evt) => {
        evt.preventDefault()

        addHours({ hours_available : input.hours_available, email : user.email}) 
            .then(async token => {
                    if(token){
                        localStorage.setItem("token", token)
                        let user = await getPayload(token)  
                        onSetUser(user)
                    }

                }).catch(err => {
                    console.log(err)
            })    
    }
    const handleDelete = () => {

        deleteDependent({ email : user.email, position : user.position}) 
            .then(async token => {
                    if(token){
                        localStorage.setItem("token", token)
                        let user = await getPayload(token)  
                        onSetUser(user)
                    }

                }).catch(err => {
                    console.log(err)
            })    
    }
        
     return (
        
        <div className='wrapper-profile'>
            <header>
                <section>
                    <div>
                        <AiOutlineUser className='icon'/>
                    </div>
                    <div>
                        <h2>{user.name}</h2>
                        <h4>{user.email}</h4>
                    </div>
                    <div>
                        <h4 className='position-info'>{user.position}</h4>    
                        <h4>
                          {user.hours_available && user.hours_available + "h available"}
                        </h4>
                    </div>
                    <div>
                        {user.position !== 'unemployee' || user.position === null ? (
                        <>
                            {businessName?.name && (
                                <>
                                <div>
                                    <h4>{businessName.name}</h4>
                                </div>
                                <div>
                                    <Button variant="primary" size="sm" active onClick={handleDelete}>
                                        Delete
                                    </Button>
                                </div>
                                </>
                            )}
                        </>) : null}
                    </div>
                </section>
            </header>
            <section>
                <Accordion defaultActiveKey={['0']}>
                    <Accordion.Item eventKey="0">
                        <Accordion.Header>Clock In</Accordion.Header>
                            <Accordion.Body className="clock-in">
                                <h4>
                                    {user.hours_available ? user.hours_available + "h available" : "Set yor availability"}
                                </h4>
                                
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
                                    <Form.Control type="number" name="hours_available" placeholder="Enter hours available" required/>
                                
                                </Form.Group>
                                <Button variant="primary" type="submit">
                                            Submit
                                </Button>
                            </Form>
                        </Accordion.Body>
                    </Accordion.Item>
                  { user.id_business && <Tasks user={user}/>}
                </Accordion>
            </section>
       </div>
    )
}
