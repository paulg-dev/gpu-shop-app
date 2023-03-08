
import { Button, Dropdown, DropdownButton, Row, Col, Modal, Card, Form, ButtonGroup, InputGroup } from "react-bootstrap";
import { useContext, useState } from "react";
import { Navigate, Link } from "react-router-dom";
import UserContext from "../UserContext";
import AddProduct from './AddProduct';

export default function AdminDash() {

	const [show, setShow] = useState(false);

  	const handleClose = () => setShow(false);
  	const handleShow = () => setShow(true);

	const {user} = useContext(UserContext);

	return (
		(user.isAdmin)
		?
		<>
			<div className="my-5 text-center">
				<h3>ADMIN DASHBOARD</h3>
				<Row>
					<Col className="mx-auto">
						<Card className="p-2 mb-3 mt-5" border="dark">
	            			<Card.Header as="h5">
	            				<Form.Group className="mb-3" controlId="profile">
		              				<Form.Label>Profile</Form.Label>
		              				<InputGroup className="mb-3">
					                	<InputGroup.Text className="adminProfileLabel">Name</InputGroup.Text>
			              				<Form.Control
			              					type="text"
			              					readOnly
			              					value={user.firstName +  " " + user.lastName }
			              				/>
		              				</InputGroup>
		              				<InputGroup className="mb-3">
					                	<InputGroup.Text className="adminProfileLabel">Email</InputGroup.Text>
			              				<Form.Control
			             					
			              					type="text"
			              					readOnly
			              					value={user.email}
			              				/>
		              				</InputGroup>
	            				</Form.Group>
	            			</Card.Header>
	            			<Card.Body>
	            				<h5>Data Management</h5>
            					<ButtonGroup vertical>
      								<DropdownButton
        								as={ButtonGroup}
        								title="Products"
        								id="bg-vertical-dropdown-1"
        								className="mt-1"
      								>
        							<Dropdown.Item as={Link} to="/admin/allProducts">View Products</Dropdown.Item>
        							<Dropdown.Item onClick={handleShow}>Add Product</Dropdown.Item>
        								<Modal
        									show={show}
        									onHide={handleClose}
        									backdrop="static"
        									keyboard={false}
        									centered
      									>
	        								<Modal.Header closeButton>
	          								<Modal.Title>Add Product</Modal.Title>
	        								</Modal.Header>
	        								<Modal.Body>
	          									<AddProduct />
	        								</Modal.Body>
      									</Modal>
      								</DropdownButton>
      								<Button as={Link} to="/admin/users" className="mt-1">Users</Button>
     								<Button as={Link} to="/admin/orders" className="mt-1">Orders</Button>
    							</ButtonGroup>
	            			</Card.Body>
	          			</Card>     
					</Col>
				</Row>
			</div>
		</>
		:
		<Navigate to="/products" />
	)
}