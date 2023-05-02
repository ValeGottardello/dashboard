import { Link } from "react-router-dom"
import "../css/HomePage.css"
import { Button } from "react-bootstrap"
import Carousel from '../components/Carousel'
export default function HomePage () {
    return (
        <main className="homepage-wrapper">
            <div className="left-sect">
                <article className="home-info">
                    <h1>
                    Power your business with <span className="app-name">
                    FIXUP</span>
                    </h1>
                    <p>Do you have a business and would you like to organize your staff? </p>
                    <span>Create an account so you can add team members, assign them tasks, and organize your business schedules</span>
                </article>
                <div className="btn-home">
                    <Button variant="primary">
                        <Link className="home-btn" to="/signup/owner">Sign up</Link>
                    </Button>
                    <Button variant="primary">
                        <Link className="home-btn" to="/login/owner">Log in</Link>
                    </Button>
                </div>
            </div>
            <div className="right-sect">
                <Carousel/>
            </div>
        </main>
    )
}