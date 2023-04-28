import { Link } from "react-router-dom"

export default function HomePage () {
    return (
        <>
            <div>Home Page</div>
            <Link to="/login/owner">
                <button>Log Your Business</button>
            </Link>
        </>
    )
}