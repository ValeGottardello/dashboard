// import Button from 'react-bootstrap/Button';
import Accordion from 'react-bootstrap/Accordion';
// import { Link } from 'react-router-dom';
// import { useEffect, useState } from 'react';
import Timer from './Timer';
import {Availability} from './Availability';
import {Tasks} from './Task';

export default function Dependent (user) {
    
    return (
        <div>
            <header>
                <img src="" alt="" />
                <div>
                    {/* info */}
                    <div>
                        {/* name */}
                        {/* role */}
                    </div>
                    <div>
                        {/* email */}
                        {/* hours */}
                    </div>
                </div>
                <div>
                    {/* <Button variant="secondary" size="sm" active>
                        EDIT PHOTO
                    </Button> */}
                </div>
            </header>
            <div>
                <Accordion defaultActiveKey={['0']}>
                    <Timer/>
                    <Availability user={user}/>
                    <Tasks user={user}/>
                </Accordion>
            </div>
        </div>
    )
}