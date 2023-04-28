import { Link } from "react-router-dom"
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';

export default function NavBar ({user, onLogOut}) {
    
    return ( 
        <header>
        {[false].map((expand) => (
        <Navbar key={expand} bg="light" expand={false} className="mb-3">
          <Container fluid>
            <Navbar.Brand> 
                <Link to="/">
                AppName or Logo
                </Link>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end">
            { user ? (
                <>
                    <Offcanvas.Header closeButton>
                        <Link to="/profile">Hello {user.email}</Link>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        <Nav className="justify-content-end flex-grow-1 pe-3">
                            <Nav.Link><Link to="/"> Home </Link></Nav.Link>
                            <Nav.Link>
                                <button onClick={e => onLogOut()}>Log Out</button>
                            </Nav.Link>
                        </Nav>
                    </Offcanvas.Body>   
                </>
            ) : (
                <>
                    <Offcanvas.Header closeButton >
                        <h3>Are you part of the team?</h3>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        <Nav className="justify-content-end flex-grow-1 pe-3">
                                <Nav.Link>
                                    <Link to="/"> Home </Link>
                                </Nav.Link>
                                <Nav.Link>
                                    <Link to="/login/dependent">Log In</Link>
                                </Nav.Link>
                                <Nav.Link>
                                    <Link to="/signup/dependent">Sign Up</Link>
                                </Nav.Link>
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
