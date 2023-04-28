import { Link } from "react-router-dom"

export default function HomePage () {
    return (
        <>
            <div>Home Page</div>
            <Link to="/login/owner">
                <button>Log as a business</button>
            </Link>
            <Link to="/signup/owner">
                <button>Create an account for your business</button>
            </Link>
            <Link to="/login/dependent">
                <button>Log as a dependent</button>
            </Link>
            <Link to="/signup/dependent">
                <button>Create your account (dependent)</button>
            </Link>
        </>
    )
}