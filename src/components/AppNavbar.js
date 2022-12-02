import { useContext } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import UserContext from '../UserContext';

export default function AppNavbar(){

	const { user } = useContext(UserContext);

	return(
		<Navbar variant="dark" bg="primary" expand="lg" sticky="top">
	      <Container>
	        <Navbar.Brand as={Link} to="/">E-Commerce App Logo</Navbar.Brand>
	        <Navbar.Toggle aria-controls="basic-navbar-nav" />
	        <Navbar.Collapse id="basic-navbar-nav">
	          <Nav className="ms-auto">
	            <Nav.Link as={Link} to="/">Home</Nav.Link>
	            <Nav.Link as={Link} to="/products">Products</Nav.Link>

	            {(user.isAdmin) ?
	            	<Nav.Link as={Link} to="/admin">Admin Dashboard</Nav.Link>
	            	:
	            	<>< />
	            }
	            
	            {(user.id !== null) ?
	            	<Nav.Link as={Link} to="/logout">Logout</Nav.Link>
	            	:
	            	<>
	            		<Nav.Link as={Link} to="/login">Login</Nav.Link>
	            		<Nav.Link as={Link} to="/register">Register</Nav.Link>
	            	</>
	            }

	          </Nav>

	        </Navbar.Collapse>
	      </Container>
	    </Navbar>
	)
}