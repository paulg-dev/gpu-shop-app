
import { faShoppingCart, faHome, faStore, faExternalLink, faUser, faPen, faGear } from '@fortawesome/free-solid-svg-icons';
import { Navbar, Nav, Container, Modal, Button } from 'react-bootstrap';
import { useContext, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import UserContext from '../UserContext';
import '../css/AppNavbar.css';


export default function AppNavbar() {

	const { user } = useContext(UserContext);

	const [show, setShow] = useState(false);
  	const handleClose = () => setShow(false);
  	const handleShow = () => setShow(true);

	return (
		<Navbar className="nav-gradient" expand="lg false" sticky="top" variant="dark" collapseOnSelect>
	      <Container>
	        <Navbar.Brand as={Link} to="/">
	        	<img className="navbarLogo" src={require("../images/navbarLogo.png")} alt="GPU_Shop_Logo"/>
	        </Navbar.Brand>
	        <Navbar.Toggle aria-controls="basic-navbar-nav" />
	        <Navbar.Collapse id="basic-navbar-nav">
	          <Nav className="ms-auto">

	            <Nav.Link as={Link} to="/" eventKey="1">
	            	<FontAwesomeIcon icon={faHome} /> &nbsp; Home
	            </Nav.Link>
	            <Nav.Link as={Link} to="/products" eventKey="2">
	            	<FontAwesomeIcon icon={faStore} /> &nbsp; Products
	            </Nav.Link>
	            
	            {(user.id !== null) ?

	            	<>
	            		{(user.isAdmin) ?
	            			<Nav.Link as={Link} to="/admin/allProducts" eventKey="3">
	            				<FontAwesomeIcon icon={faGear} /> &nbsp; Manage
	            			</Nav.Link>
	            		:
	            		<>
	            			<Nav.Link as={Link} to="/users/viewCart" eventKey="4">
	            				<FontAwesomeIcon icon={faShoppingCart} /> &nbsp; Cart
	            			</Nav.Link>
	            			{/*<Nav.Link as={Link} to="/users/details">Profile</Nav.Link>*/}
	            		< />
	            		}
	            			<Nav.Link onClick={handleShow}>
	            				<FontAwesomeIcon icon={faExternalLink} /> &nbsp; Logout
	            			</Nav.Link>

	            				<Modal
        							show={show}
        							onHide={handleClose}
        							backdrop="static"
        							keyboard={false}
        							centered
      							>

        						<Modal.Header>
          						<Modal.Title>Sure you want to log out?</Modal.Title>
        						</Modal.Header>
        						<Modal.Body className="m-2 text-center">

 
        							<Button className="mx-2" variant="primary" as={Link} to="/logout" onClick={handleClose}>
        								Logout
        							</Button>
        							<Button className="mx-2" variant="secondary" onClick={handleClose}>
        								Cancel
          							</Button>

        						</Modal.Body>

      							</Modal>
	            	</>
	            	:
	            	<>
	            		<Nav.Link as={Link} to="/login" eventKey="5">
	            			<FontAwesomeIcon icon={faUser} /> &nbsp; Login
	            		</Nav.Link>
	            		<Nav.Link as={Link} to="/register" eventKey="6">
	            			<FontAwesomeIcon icon={faPen} /> &nbsp; Register
	            		</Nav.Link>
	            	</>
	            }

	          </Nav>

	        </Navbar.Collapse>
	      </Container>
	    </Navbar>

	)
}