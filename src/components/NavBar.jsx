import { Link, useNavigate } from "react-router-dom"
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import '../css/NavBar.css'

export default function NavBar ({user, onLogOut}) {
    const navigate = useNavigate()
    return ( 
        <header className="navbar-wrapper">
        {[false].map((expand) => (
        <Navbar key={expand} expand={false} className="mb-3">
          <Container fluid>
            <Navbar.Brand className="logo-wrapper">   
                    <Link to="/" className="img-wrapper">
                        <img className="img" src="/logoapp.png" alt="" />
        
                    </Link>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end">
            { user !== null ? (
                <>
                    <Offcanvas.Header closeButton>
                        <Link
                        to="/profile">
                            Hello {user.email ? user.email : user.owner_email}
                            </Link>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        <Nav className="justify-content-end flex-grow-1 pe-3">
                            <Link to="/" className="home-link"> Home </Link>
                            <Nav.Link>
                                <button onClick={e => {
                                    onLogOut()
                                    navigate('/')
                                    }}>Log Out</button>
                            </Nav.Link>
                        </Nav>
                    </Offcanvas.Body>   
                </>
            ) : (
                <>
                    <Offcanvas.Header closeButton >
                        <h4>dependent account</h4>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        <Nav className="justify-content-end flex-grow-1 pe-3">
                            <Link to="/"> Home </Link>
                            <Link to="/login/dependent">Log In </Link>                           
                            <Link to="/signup/dependent">Sign Up</Link>                       
                        </Nav>
                    </Offcanvas.Body>   
                </>
            )}
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
        ))}
        </header>
    )
}
