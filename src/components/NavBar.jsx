import { Link } from "react-router-dom"

export default function NavBar ({user, onLogOut}) {
    

    return ( 
        <header>
            { user && (
                <>
                    <Link to="/profile">Hello {user.name}</Link>
                    <button onClick={e => onLogOut()}>Log Out</button>
                </>
            )}
        </header>
    )
}