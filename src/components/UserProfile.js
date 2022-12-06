import { useContext } from "react";
import { Button, ButtonGroup, Container, Row, Col, Card, Form } from "react-bootstrap";
import { Navigate, Link } from "react-router-dom";
import UserContext from "../UserContext";


export default function UserProfile(){

	// const [show, setShow] = useState(false);

  	// const handleClose = () => setShow(false);
  	// const handleShow = () => setShow(true);

	const {user} = useContext(UserContext);


	return(
		(user.isAdmin)
		?
		<Navigate to="/admin/allProducts" />
		:
		<>
		<Container>
			<Row>
				<Col md={12} lg={4}>
					<div className="my-5 text-center">
					<h3>User Profile</h3>

					<Card className="p-2 mb-3 mt-5" border="dark">
            			<Card.Header as="h5">
            				<Form.Group className="mb-3" controlId="profile">
              				<Form.Label>Account Details</Form.Label>
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

              				<Form.Control
             					className="mb-3"
              					type="text"
              					readOnly
              					value={"Contact: " + user.mobileNo}
              				/>


            				</Form.Group>
            			</Card.Header>
            			<Card.Body>
            				<h5>Orders Management</h5>

            					<ButtonGroup vertical>

      								<Button as={Link} to="/myCart" className="mt-1">My Cart</Button>
     								<Button as={Link} to="/myCart" className="mt-1">Orders</Button>

    							</ButtonGroup>

            			</Card.Body>

          			</Card> 
          			</div>   
				
				</Col>
				
				<Col md={12} lg={8}>
				</Col>

				</Row>
				</Container>
			
		</>
	)
}