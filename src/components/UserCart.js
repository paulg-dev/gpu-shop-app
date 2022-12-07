import { useContext, useState, useEffect } from "react";
import { Table, Container, Row, Col, Button, Form, Modal, InputGroup, ButtonGroup } from "react-bootstrap";
import { Navigate, Link } from "react-router-dom";
import UserContext from "../UserContext";
import UserProfile from './UserProfile';

import './UserProfile.css'


export default function Orders(){

	const {user} = useContext(UserContext);

	const [allInCart, setAllInCart] = useState([]);

	const [show, setShow] = useState(false);

  	const handleClose = () => setShow(false);
  	const handleShow = () => setShow(true);

	// const [orderQuantity, setOrderQuantity] = useState(0);

	// function removeFromCart(e) {

	//     e.preventDefault();

	//     fetch('http://localhost:4000/users/re', {
	//     	method: "PATCH",
	//     	headers: {
	// 			"Content-Type": "application/json",
	// 			"Authorization": `Bearer ${localStorage.getItem('token')}`
	// 		},
	// 		body: JSON.stringify({

	// 		})
	//     })
	//     .then(res => res.json())
	//     .then(data => {
	    	
	//     	console.log(data);
	//     	console.log(data.err);

	//     	if(data === true){
	//     		Swal.fire({
	//     		    icon: "success",
	//     		    text: `${productName} was successfully removed from the cart.`
	//     		});

	//     	}

	//     	else{
	//     		Swal.fire({
	//     		    title: "Error!",
	//     		    icon: "error",
	//     		    text: `Something went wrong. Please try again later!`
	//     		});

	//     	}
	    	
	//     })

	// }


	const fetchData = () =>{

		fetch(`${process.env.REACT_APP_API_URL}/users/viewCart`,{
			headers:{
				"Authorization": `Bearer ${localStorage.getItem("token")}`
			}
		})
		.then(res => res.json())
		.then(data => {

			setAllInCart(data.reverse());
			
			// console.log(data);
			
			// eslint-disable-next-line
			setAllInCart(data.map(cart => {

				for(let i=0; i<data.length; i++) {

				const priceFormatted = cart.price.toLocaleString(undefined, { style: 'currency', currency: 'PHP' })

				const subTotalFormatted = cart.subTotal.toLocaleString(undefined, { style: 'currency', currency: 'PHP' })

				return(

					<tr key={cart._id}>
						<td>
							<Form.Check className="mt-4"
		            				type="checkbox"
        							defaultChecked={false}
      						/>
      					</td>
						
						<td>
							<div className="mt-2">
							<Button 
								className="prodNameButton" 
								as={Link} to={`/products/${cart.productId}`}
							>{cart.productName}
							</Button>
							</div>
						</td>
						<td><div className="mt-4">{priceFormatted}</div></td>
						<td><div className="mt-4">{cart.quantity}</div></td>
						<td><div className="mt-4">{subTotalFormatted}</div></td>
						<td>
						<div>
						<ButtonGroup vertical className="mt-2">
						<Button className="mb-1" variant="success" onClick={handleShow}>
	        	    					Checkout
	        	    				</Button>

	        	    					<Modal
	        	    						className="orderModal"
        									show={show}
        									onHide={handleClose}
        									backdrop="static"
        									keyboard={false}
        									centered
      									>

        									<Modal.Header>
          									<Modal.Title>Confirm order?</Modal.Title>
        									</Modal.Header>

        									<Modal.Body className="m-2 text-center">
        									
        										<Form.Group className="mb-3" controlId="purchaseDetails">
              										<Form.Label>Purchase Details</Form.Label>

              										<InputGroup className="mb-3">
		                								<InputGroup.Text>Product:</InputGroup.Text>
		                								<Form.Control
		                									className="orderDetailsText" 
              												type="text"
              												readOnly
              												value={cart.productName}
		                								/>
		               			 					</InputGroup>

              										<div>
		            									<Row>

		            										<Col>
		            											<Form.Group controlId="price" className="mb-3">
		                											<InputGroup>
		                											<InputGroup.Text>Price:</InputGroup.Text>
		                											<Form.Control
		                												className="orderDetailsText"
              															type="text"
              															readOnly
              															value={priceFormatted}
		                											/>
		                											</InputGroup>
		            											</Form.Group>
		            										</Col>

		            										<Col>
		            											<Form.Group controlId="quantity" className="mb-3">
		                											<InputGroup>
		                											<InputGroup.Text>Quantity:</InputGroup.Text>
		                											<Form.Control
		                												className="orderDetailsText"
              															type="text"
              															readOnly
              															value={cart.quantity}
		                											/>
		               			 									</InputGroup>
		            											</Form.Group>
		            										</Col>

		            									</Row>
		            								</div>


		            								<InputGroup>
		                								<InputGroup.Text>Order Amount:</InputGroup.Text>
		                								<Form.Control
		                									className="orderDetailsPrice" 
              												type="text"
              												readOnly
              												value={subTotalFormatted}
		                								/>
		               			 					</InputGroup>

            									</Form.Group>

        										<Button className="mx-2" variant="primary" >
        											Confirm
        										</Button>
        										<Button className="mx-2" variant="secondary" onClick={handleClose}>
        											Cancel
          										</Button>
        									</Modal.Body>

      									</Modal>

      			
      					<Button variant="danger">
      					Remove
      					</Button>					
      					</ButtonGroup>
						</div>
						</td>
					</tr>

				)

				}

			}))
		})
	}


	useEffect(()=>{

		fetchData();
	})


	return(

		(user.id !== null)
		?
		<>

		<Container>
      		<Row>
        		<Col md={12} lg={4}>
            		<UserProfile />
        		</Col>

        		<Col md={12} lg={8}>
        			<div className="dataLabel mt-5 text-center">
        			CART
        			</div>
        			<div>
						<Container>
							<Table className="text-center mt-4" width="100%" striped bordered hover>
		     					<thead className="table-dark">
		       						<tr>
		         						<th width="13%">Select</th>
		         						<th width="25%">Product Name</th>
		         						<th width="15%">Price</th>
		         						<th width="12%">Quantity</th>
		         						<th width="20%">Subtotal</th>
		         						<th width="15%">Action</th>
		       						</tr>
		           				</thead>
		     	   				<tbody>
		            				{ allInCart }
		           				</tbody>
		        			</Table>
		    			</Container>
		    		</div>
		    		<div className="checkOutSelected text-end mx-4 mt-4">
						<Button variant="warning">
        					Checkout Selected
          				</Button>
          			</div>
        		</Col>
      		</Row>
    	</Container>

			
		</>
		:
		<Navigate to="/login" />
			
	)
}