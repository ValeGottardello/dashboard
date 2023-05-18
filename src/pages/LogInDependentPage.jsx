import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";
import '../css/LogInPage.css'
import Carousel from '../components/Carousel'
import FormLogDep from "../components/FormLogDep";

export default function LogInDependentPage({ onLogIn }) {


    return (
        <div className="wrapper-from">
        <div className="left">
        <h3>LOG IN AS A TEAM MEMBER?</h3>
            <FormLogDep onLogIn={ onLogIn }/>
        </div>
        <div className="right">
                <div className="wrapper-carousel">
                    <Carousel/>
                </div>
                <Button variant="primary">
                    <Link className="sign-btn" to="/signup/dependent">Create an account</Link>
                </Button>
        </div>
      </div>
    )
}