import Button from 'react-bootstrap/Button';
import Carousel from '../components/Carousel'
import { Link } from "react-router-dom";
import FormDependent from '../components/FormDependent';


export default function SignUpDependentPage ({onLogIn}) {

    return (
        <div className="wrapper-from">
            <div className="left">
                <h3>ARE YOU A TEAM MEMBER?</h3>
                <FormDependent onLogIn={onLogIn}/>
            </div>
            <div className="right">
                <div className="wrapper-carousel">
                    <Carousel/>
                </div>
                <Button variant="primary">
                    <Link className="sign-btn" to="/login/dependent">Log In</Link>
                 </Button>
            </div>
      </div>
    )
}