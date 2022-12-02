import { useContext } from "react";
import { Button, Dropdown, DropdownButton, Container, Row, Col } from "react-bootstrap";
import { Navigate, Link } from "react-router-dom";
import UserContext from "../UserContext";


export default function AdminDash(){

	const {user} = useContext(UserContext);

	return(
		(user.isAdmin)
		?
		<>
			<div className="my-5 text-center">
				<h3>Database Management</h3>
				<Container>
				<Row>
					<Col>
						<DropdownButton id="dropdown-basic-button" title="Products">
      						<Dropdown.Item as={Link} to="/admin/allProducts">View Products</Dropdown.Item>
      						<Dropdown.Item as={Link} to="/addProduct">Add Product</Dropdown.Item>
    					</DropdownButton>
					</Col>
					
					<Col>
					<Button variant="primary" className="mx-2 px-4" as={Link} to="/admin/users">Users</Button>
					</Col>
					
					<Col>
					<Button variant="primary" className="mx-2 px-4" as={Link} to="/admin/orders">Orders</Button>
					</Col>
				</Row>
				</Container>
			</div>
			
		</>
		:
		<Navigate to="/products" />
	)
}