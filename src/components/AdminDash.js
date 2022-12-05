import { useContext, useState } from "react";
import { Button, Dropdown, DropdownButton, Container, Row, Col, Modal, Card, Form, ButtonGroup } from "react-bootstrap";
import { Navigate, Link } from "react-router-dom";
import UserContext from "../UserContext";
import AddProduct from './AddProduct';

export default function AdminDash(){

	const [show, setShow] = useState(false);

  	const handleClose = () => setShow(false);
  	const handleShow = () => setShow(true);

	const {user} = useContext(UserContext);

	return(
		(user.isAdmin)
		?
		<>
			<div className="my-5 text-center">
				<h3>Administrator Dashboard</h3>
				<Container>
				<Row>
					
					<Col className="mx-auto">

					<Card className="p-2 mb-3 mt-5" border="dark">
            			<Card.Header as="h5">
            				<Form.Group className="mb-3" controlId="profile">
              				<Form.Label>Profile</Form.Label>
              				<Form.Control
              					className="mb-3"
              					type="text"
              					readOnly
              					value={"Name: " + user.firstName +  " " + user.lastName }
              				/>
              				<Form.Control
             					className="mb-3"
              					type="text"
              					readOnly
              					value={"Email: " + user.email}
              				/>
            				</Form.Group>
            			</Card.Header>
            			<Card.Body>
            				<h5>Database Management</h5>

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
       					 				{/*<Modal.Footer>
          									<Button variant="secondary" onClick={handleClose}>
            								Cancel
          									</Button>
          									<Button variant="primary">Add Product</Button>
        								</Modal.Footer>*/}
      									</Modal>
      								</DropdownButton>

      								<Button as={Link} to="/admin/users" className="mt-1">Users</Button>
     								<Button as={Link} to="/admin/orders" className="mt-1">Orders</Button>

    							</ButtonGroup>

            			</Card.Body>
            			<Card.Footer className="text-center">
                  
            			</Card.Footer>
          			</Card>     
					
					</Col>
				</Row>
				</Container>
			</div>
			
		</>
		:
		<Navigate to="/products" />
	)
}