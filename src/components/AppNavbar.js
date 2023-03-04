import { useContext, useState } from 'react';
import { Navbar, Nav, Container, Modal, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import UserContext from '../UserContext';
import '../css/AppNavbar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faHome, faStore, faExternalLink, faUser, faPen, faGear } from '@fortawesome/free-solid-svg-icons'


export default function AppNavbar(){

	const { user } = useContext(UserContext);

	const [show, setShow] = useState(false);

  	const handleClose = () => setShow(false);
  	const handleShow = () => setShow(true);

	return (
		<Navbar className="gradient" expand="lg" sticky="top">
	      <Container>
	        <Navbar.Brand as={Link} to="/">
	        	<img className="navbarLogo" src={require("../images/navbarLogo.png")} alt="GPU_Shop_Logo"/>
	        </Navbar.Brand>
	        <Navbar.Toggle aria-controls="basic-navbar-nav" />
	        <Navbar.Collapse id="basic-navbar-nav">
	          <Nav className="ms-auto">

	            <Nav.Link className="text-light" as={Link} to="/">
	            	<FontAwesomeIcon icon={faHome} />
	            	&nbsp; Home
	            </Nav.Link>
	            <Nav.Link className="text-light" as={Link} to="/products">
	            	<FontAwesomeIcon icon={faStore} />
	            	&nbsp; Products
	            </Nav.Link>
	            
	            {(user.id !== null) ?

	            	<>
	            		{(user.isAdmin) ?
	            			<Nav.Link className="text-light" as={Link} to="/admin/allProducts">
	            				<FontAwesomeIcon icon={faGear} />
	            				&nbsp; Manage
	            			</Nav.Link>
	            		:
	            		<>
	            			<Nav.Link className="text-light"  as={Link} to="/users/viewCart">
	            				<FontAwesomeIcon icon={faShoppingCart} />
	            				&nbsp; Cart
	            			</Nav.Link>
	            			{/*<Nav.Link as={Link} to="/users/details">Profile</Nav.Link>*/}
	            		< />
	            		}
	            	
	            			{/*<Nav.Link as={Link} to="/logout">Logout</Nav.Link>*/}
	            			<Nav.Link className="text-light" onClick={handleShow}>
	            				<FontAwesomeIcon icon={faExternalLink} />
	            				&nbsp; Logout
	            			</Nav.Link>

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
	            		<Nav.Link className="text-light" as={Link} to="/login">
	            			<FontAwesomeIcon icon={faUser} />
	            			&nbsp; Login
	            		</Nav.Link>
	            		<Nav.Link className="text-light" as={Link} to="/register">
	            			<FontAwesomeIcon icon={faPen} />
	            			&nbsp; Register
	            		</Nav.Link>
	            	</>
	            }

	          </Nav>

	        </Navbar.Collapse>
	      </Container>
	    </Navbar>
	)
}