import { useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';
import Accordion from 'react-bootstrap/Accordion';
import { Link } from "react-router-dom";
// import moment from 'moment';
import '../css/Profile.css'
export default function Timer () {
    const [intervalId, setIntervalId] = useState(null)
    const [seconds, setSeconds] = useState(0)

    const startTimer = () => {
        const id = setInterval(() => {
            setSeconds(prevSeconds => prevSeconds + 1)
         
        }, 1000);
        setIntervalId(id);
      }
    
    const resetTimer = () => {
        clearInterval(intervalId);
        setIntervalId(null);
        setSeconds(0);
    }

    // useEffect(() => {
    //     if(timer > 60){
    //         setTimer(moment.duration(timer * 1000).minutes())
    
    //     } else if (timer > 60) {
    //         moment.duration(timer * 1000).hours();
    //     }
    // }, [timer])

    useEffect(() => {
        if (seconds > 60) {
          setSeconds((prevSeconds) => prevSeconds % 60);
        }
      }, [seconds])
    return (
        <Accordion.Item eventKey="0">
            <Accordion.Header>Clock In</Accordion.Header>
                <Accordion.Body>
                    <h4>20hs available</h4>
                    <h4>Timer:{seconds} seconds</h4>
                    <Button onClick={startTimer} variant="primary" size="sm" active>
                              Clock In
                    </Button> 
                    <Button onClick={resetTimer} variant="primary" size="sm" active>
                              Clock Off
                    </Button>  
                    <Link to="/roster">See your roster</Link>
            </Accordion.Body>
        </Accordion.Item>
    )
}