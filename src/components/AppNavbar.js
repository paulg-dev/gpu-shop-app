import { useContext, useState } from 'react';
import { Navbar, Nav, Container, Modal, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import UserContext from '../UserContext';

export default function AppNavbar(){

	const { user } = useContext(UserContext);

	const [show, setShow] = useState(false);

  	const handleClose = () => setShow(false);
  	const handleShow = () => setShow(true);

	return(
		<Navbar expand="lg" sticky="top">
	      <Container>
	        <Navbar.Brand className="text-light" as={Link} to="/">GPU Shop Logo</Navbar.Brand>
	        <Navbar.Toggle aria-controls="basic-navbar-nav" />
	        <Navbar.Collapse id="basic-navbar-nav">
	          <Nav className="ms-auto">

	            <Nav.Link className="text-light" as={Link} to="/">Home</Nav.Link>
	            <Nav.Link className="text-light" as={Link} to="/products">Products</Nav.Link>
	            
	            {(user.id !== null) ?

	            	<>
	            		{(user.isAdmin) ?
	            			<Nav.Link className="text-light" as={Link} to="/admin/allProducts">Admin Dash</Nav.Link>
	            		:
	            		<>
	            			<Nav.Link className="text-light"  as={Link} to="/users/viewCart">Cart</Nav.Link>
	            			{/*<Nav.Link as={Link} to="/users/details">Profile</Nav.Link>*/}
	            		< />
	            		}
	            	
	            			{/*<Nav.Link as={Link} to="/logout">Logout</Nav.Link>*/}
	            			<Nav.Link className="text-light" onClick={handleShow}>Logout</Nav.Link>

	            				<Modal
        							show={show}
        							onHide={handleClose}
        							backdrop="static"
        							keyboard={false}
        							centered
      							>

        						<Modal.Header>
          						<Modal.Title>Are you sure you want to log out?</Modal.Title>
        						</Modal.Header>
        						<Modal.Body className="m-2 text-center">

 
        							<Button className="mx-2" variant="primary" as={Link} to="/logout" onClick={handleClose}>
        							Confirm
        							</Button>
        							<Button className="mx-2" variant="secondary" onClick={handleClose}>
        							Cancel
          							</Button>

        						</Modal.Body>

      							</Modal>
	            	</>
	            	:
	            	<>
	            		<Nav.Link className="text-light" as={Link} to="/login">Login</Nav.Link>
	            		<Nav.Link className="text-light" as={Link} to="/register">Register</Nav.Link>
	            	</>
	            }

	          </Nav>

	        </Navbar.Collapse>
	      </Container>
	    </Navbar>
	)
}