
import { Button, ButtonGroup, Container, Card, Form, InputGroup } from "react-bootstrap";
import { Navigate, Link } from "react-router-dom";
import { useContext } from "react";
import UserContext from "../UserContext";

export default function UserProfile(){

	const {user} = useContext(UserContext);

	return (

		(user.isAdmin) ?
		<Navigate to="/admin/allProducts" />
		:
		<>
			<Container>
				<div className="my-5 text-center">
					<h3>USER DASHBOARD</h3>
					<Card className="p-2 mb-3 mt-5" border="dark">
	        			<Card.Header as="h5">
	        				<Form.Group className="mb-3" controlId="profile">
		          				<Form.Label>Profile</Form.Label>
		          				<InputGroup className="mb-3">
			                	<InputGroup.Text className="userProfileLabel">Full Name</InputGroup.Text>
		          				<Form.Control
		          					type="text"
		          					readOnly
		          					value={user.firstName +  " " + user.lastName }
		          				/>
		          				</InputGroup>
		          				<InputGroup className="mb-3">
			                	<InputGroup.Text className="userProfileLabel">Email Add</InputGroup.Text>
		          				<Form.Control
		         					
		          					type="text"
		          					readOnly
		          					value={user.email}
		          				/>
		          				</InputGroup>
		        				<InputGroup className="mb-3">
			                	<InputGroup.Text className="userProfileLabel">Mobile No</InputGroup.Text>
		          				<Form.Control
		         					
		          					type="text"
		          					readOnly
		          					value={user.mobileNo}
		          				/>
		          				</InputGroup>
	        				</Form.Group>
	        			</Card.Header>
	        			<Card.Body>
	        				<h5>Order Management</h5>
	        					<ButtonGroup vertical>
	  								<Button as={Link} to="/users/viewCart" className="mt-1">My Cart</Button>
	 								<Button as={Link} to="/users/getUserOrders" className="mt-1">Orders</Button>
								</ButtonGroup>
	        			</Card.Body>
	      			</Card> 
      			</div>   
			</Container>
			
		</>

	)
}