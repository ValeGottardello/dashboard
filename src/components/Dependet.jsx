// import Button from 'react-bootstrap/Button';
import Accordion from 'react-bootstrap/Accordion';
// import { Link } from 'react-router-dom';
// import { useEffect, useState } from 'react';
import Timer from './Timer';
import {Availability} from './Availability';
import {Tasks} from './Task';
import Details from './Details';
import Manager from './Manager';
import '../css/Profile.css'

export default function Dependent (user) {
    
    return (
        <div className='wrapper-profile'>
            <header>
                <Details user={user}/>
            </header>
            <section>
                <Accordion defaultActiveKey={['0']}>
                    <Timer/>
                    <Availability user={user}/>
                    <Tasks user={user}/>
                    { user.user.position === "manager" ? (
                    <Manager user={user}/>
                    ): null}
                </Accordion>
            </section>
        </div>
    )
}