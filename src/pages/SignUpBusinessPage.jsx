import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";
import '../css/LogInPage.css'
import Carousel from '../components/Carousel'
import FormBusiness from '../components/FormBusiness';


export default function SignUpBusinessPage ({ onLogIn }) {

    return (
        <div className="wrapper-from">
        <div className="left">
            <h3>DO YOU HAVE A BUSINESS?</h3>
            <FormBusiness onLogIn={ onLogIn }/>
        </div>
        <div className="right">
            <div className="wrapper-carousel">
                <Carousel/>
            </div>
            <Button variant="primary">
                <Link className="sign-btn" to="/login/owner">Log In your business</Link>
            </Button>
        </div>
  </div>
    )
}
