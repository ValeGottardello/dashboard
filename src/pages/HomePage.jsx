import { Link } from "react-router-dom"
import "../css/HomePage.css"
import { Button } from "react-bootstrap"
import Carousel from '../components/Carousel'
export default function HomePage () {
    return (
        <main className="homepage-wrapper">
            <div className="left-sect">
                {/* more content h1, and description of for whats the app */}
                <Button variant="primary">
                    <Link className="home-btn" to="/signup/owner">Sign your business up</Link>
                </Button>
                <Button variant="primary">
                    <Link className="home-btn" to="/login/owner">Log as a business</Link>
                </Button>
            </div>
            <div className="right-sect">
                <Carousel/>
            </div>
        </main>
    )
}