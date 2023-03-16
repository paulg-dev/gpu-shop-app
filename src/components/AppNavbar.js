
import { faShoppingCart, faHome, faStore, faExternalLink, faUser, faUserGear, faPen, faGear, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { Navbar, Nav, Container, Modal, Button } from 'react-bootstrap';
import { useContext, useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import UserContext from '../UserContext';
import '../css/AppNavbar.css';


export default function AppNavbar() {

	const { user } = useContext(UserContext);

	const [cartCount, setCartCount] = useState(0);
	const [show, setShow] = useState(false);
  	const handleClose = () => setShow(false);
  	const handleShow = () => setShow(true);

  	useEffect(() => {
		fetch(`${process.env.REACT_APP_API_URL}/users/viewCart`, {
			headers: {
				"Authorization": `Bearer ${localStorage.getItem("token")}`
			}
		})
		.then(res => res.json())
		.then(data => {
			setCartCount(data);
			const cartCounter = (data => {
				return (
					<Button className="nav-cart-counter bg-danger">
						{data.length}
					</Button>
				)
			})
			setCartCount(cartCounter)
		})
	}, [cartCount])

	function backButton() {
    	window.history.back()
    }

	return (

		<div className="sticky-top">
			<Navbar className="nav-gradient" expand="lg false" sticky="top" variant="dark" collapseOnSelect>
		      <Container>
		        <Navbar.Brand as={Link} to="/">
		        	<img className="nav-logo" src={require("../images/navbarLogo.png")} alt="GPU_Shop_Logo"/>
		        </Navbar.Brand>
		        <Navbar.Toggle aria-controls="basic-navbar-nav" />
		        <Navbar.Collapse id="basic-navbar-nav">
		          <Nav className="ms-auto">

		            <Nav.Link as={Link} to="/" eventKey="1">
		            	<FontAwesomeIcon className="nav-svg" icon={faHome} />
		            	&nbsp; Home
		            </Nav.Link>
		            <Nav.Link as={Link} to="/products" eventKey="2">
		            	<FontAwesomeIcon className="nav-svg" icon={faStore} />
		            	&nbsp; Products
		            </Nav.Link>
		            {
		            	(user.id !== null) ?
		            	<>
		            		{
		            			(user.isAdmin) ?
		            			<Nav.Link as={Link} to="/admin/allProducts" eventKey="3">
		            				<FontAwesomeIcon className="nav-svg" icon={faGear} />
		            				&nbsp; Manage
		            			</Nav.Link>
		            			:
		            			<>
		            			<Nav.Link as={Link} to="/users/details" eventKey="4">
		            				<FontAwesomeIcon className="nav-svg" icon={faUserGear} />
		            				&nbsp; Account
		            			</Nav.Link>
		            			< />
		            		}
	            			<Nav.Link onClick={handleShow}>
	            				<FontAwesomeIcon className="nav-svg" icon={faExternalLink} />
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
		      							<Modal.Title>Confirm log out?</Modal.Title>
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
		            			<FontAwesomeIcon className="nav-svg" icon={faUser} />
		            			&nbsp; Login
		            		</Nav.Link>
		            		<Nav.Link as={Link} to="/register" eventKey="6">
		            			<FontAwesomeIcon className="nav-svg" icon={faPen} />
		            			&nbsp; Register
		            		</Nav.Link>
		            	</>
		            }
		          </Nav>
		        </Navbar.Collapse>
		      </Container>
		    </Navbar>
		    <div className="nav-cart">
		    	{
		    		(user.id !== null && !(user.isAdmin)) ?
			    	<Container className="d-flex align-items-center">
				    	<Nav.Link>
				    		<FontAwesomeIcon className="nav-svg" icon={faArrowLeft} onClick={backButton}/>
		    			</Nav.Link>
		    			<Nav.Link className="d-flex align-items-center ms-auto" as={Link} to="/users/viewCart" eventKey="5">
		    			<FontAwesomeIcon className="nav-svg" icon={faShoppingCart}/>
		    				&nbsp; Cart {cartCount}
		    			</Nav.Link>
	    			</Container>
	    			:
	    			<></>
    			}
		    </div>
	    </div>
	)	

}