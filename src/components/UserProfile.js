
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Container, Card, Form, InputGroup, Row, Col } from "react-bootstrap";
import { Navigate } from "react-router-dom";
import { useContext } from "react";
import UserContext from "../UserContext";
import UserOrder from '../components/UserOrder'

export default function UserProfile(){

	const {user} = useContext(UserContext);

	return (

		(user.isAdmin) ?
		<Navigate to="/admin/allProducts" />
		:
		<>
			<Container className="d-flex">
				<div className="mt-5 text-center mx-auto">
					<Row className="d-flex">
					<h3>USER DASHBOARD</h3>
					<Card className="p-3 mt-5" border="dark">
	        			<Card.Header>
		          				<h5>Profile</h5>
	        			</Card.Header>
	        			<Card.Body>
	        				<Row>
	        				<Col sm={12} md={4} className="d-flex align-items-center justify-content-center">
	        					<FontAwesomeIcon icon={faUserCircle} className="user-profile-image" size="10x"/>
	        				</Col>
	        				<Col sm={12} md={8} className="d-flex flex-column align-items-center justify-content-center">
	        				<InputGroup className="my-2 user-profile-details">
			                	<InputGroup.Text className="user-profile-label">Name</InputGroup.Text>
		          				<Form.Control
		          					type="text"
		          					readOnly
		          					value={user.firstName +  " " + user.lastName }
		          				/>
		          				</InputGroup>
		          				<InputGroup className="my-2 user-profile-details">
			                	<InputGroup.Text className="user-profile-label">Email</InputGroup.Text>
		          				<Form.Control
		         					
		          					type="text"
		          					readOnly
		          					value={user.email}
		          				/>
		          				</InputGroup>
		        				<InputGroup className="my-2 user-profile-details">
			                	<InputGroup.Text className="user-profile-label">Mobile</InputGroup.Text>
		          				<Form.Control

		          					type="text"
		          					readOnly
		          					value={user.mobileNo}
		          				/>
		          				</InputGroup>
		          				</Col>
		          				</Row>
	        			</Card.Body>
	      			</Card>
	      			</Row>
	      			<Row>
	      				<Card className="p-2 mt-5" border="dark">
	        			<Card.Header>
		          				<h5>Order History</h5>
	        			</Card.Header>
	        			<Card.Body>
	        				<UserOrder />
	        			</Card.Body>
	      			</Card>
	      			</Row> 
      			</div>   
			</Container>
		</>

	)
}