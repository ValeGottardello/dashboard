import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";
import Carousel from '../components/Carousel'

import FormLogBus from "../components/FormLogBus";

export default function LogInBusinessPage({ onLogIn }) {

    return (
        <div className="wrapper-from">
             <div className="left">
             <h3>LOG YOUR BUSINESS</h3>
                <FormLogBus onLogIn={ onLogIn }/>
             </div>
             <div className="right">
                <div className="wrapper-carousel">
                    <Carousel/>
                </div>
                <Button variant="primary">
                    <Link className="sign-btn" to="/signup/owner">Create a business account</Link>
                </Button>
            </div>
        </div>
    )
}

