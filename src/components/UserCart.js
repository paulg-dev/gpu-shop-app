import { useContext, useState, useEffect } from "react";
import { Table, Container, Row, Col, Button, Form, Modal, InputGroup, ButtonGroup } from "react-bootstrap";
import { Navigate, Link } from "react-router-dom";
import UserContext from "../UserContext";
import UserProfile from './UserProfile';
import Swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons'

import '../App.css';

export default function Orders(){

	const {user} = useContext(UserContext);

	const [allInCart, setAllInCart] = useState([]);
	const [stocks, setStocks] = useState(0);
	// const [cartQuantity, setCartQuantity] = useState(0);

	const [show, setShow] = useState(false);
  	const handleClose = () => setShow(false);
  	const handleShow = () => setShow(true);

	const fetchData = () => {

		fetch(`${process.env.REACT_APP_API_URL}/users/viewCart`,{
			headers:{
				"Authorization": `Bearer ${localStorage.getItem("token")}`
			}
		})
		.then(res => res.json())
		.then(data => {

			setAllInCart(data.reverse());
						
			// eslint-disable-next-line
			setAllInCart(data.map((cart, index) => {

				for(let i=0; i<data.length; i++) {

				const priceFormatted = cart.price.toLocaleString(undefined, { style: 'currency', currency: 'PHP' })

				const subTotalFormatted = cart.subTotal.toLocaleString(undefined, { style: 'currency', currency: 'PHP' })

				return (

					<tr key={cart._id}>
						<td>{index + 1}</td>
						{/*<td>
							<Form.Check
	            				type="checkbox"
    							defaultChecked={false}
      						/>
      					</td>*/}
						<td>
							<Button 
								className="prodNameButton" 
								as={Link} to={`/products/${cart.productId}`}
							>
							{cart.productName}
							</Button>
						</td>
						<td className="hideOnSmall">{priceFormatted}</td>
						<td> 
							<Button className="editQty p-1" onClick = {() => editProductQuantity(cart.productId, (cart.quantity - 1), cart.productName)}>
								<FontAwesomeIcon icon={faMinus} className="editQty" />
							</Button>
							&nbsp; {cart.quantity} &nbsp;
							<Button className="editQty p-1" onClick = {() => editProductQuantity(cart.productId, (cart.quantity + 1))}>
								<FontAwesomeIcon icon={faPlus} className="editQty" />
							</Button>
						</td>

						<td className="hideOnSmall">{subTotalFormatted}</td>

						<td>
							<ButtonGroup vertical>
								<Button className="mb-1" variant="success" onClick={handleShow}>
			        	    					Checkout
			        	    				</Button>

			        	    					<Modal
			        	    						className="orderModal"
		        									show={show}
		        									onHide={handleClose}
		        									backdrop="static"
		        									// keyboard={false}
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

		      			
		      					<Button variant="danger" onClick = {() => removeFromCart(cart.productId, cart.productName)}>
		      					Remove
		      					</Button>					
	      					</ButtonGroup>
						</td>
					</tr>
				)

				}

			}))
		})
	}


	useEffect(() => {

		fetchData();
	})

	const retrieveProductStocks = (productId) => {

		console.log(productId)

		fetch(`${process.env.REACT_APP_API_URL}/products/${productId}`,{
			method: "GET",
			headers:{
				"Content-Type": "application/json",
				"Authorization": `Bearer ${localStorage.getItem('token')}`
			}
		})
		.then(res => res.json())
		.then(data =>{

    		setStocks(data.stocks);

    	});

	}


	const removeFromCart = (productId, productName) => {

	    console.log (productId)

	    fetch(`${process.env.REACT_APP_API_URL}/users/removeFromCart`, {
	    	method: "PATCH",
	    	headers: {
				"Content-Type": "application/json",
				"Authorization": `Bearer ${localStorage.getItem('token')}`
			},
			body: JSON.stringify({
				productId: productId
			})
	    })
	    .then(res => res.json())
	    .then(data => {
	    	
	    	console.log(data);

	    	if (data === true) {
	    		Swal.fire({
	    		    icon: "success",
	    		    text: `${productName} was successfully removed from the cart.`
	    		});
	    	}

	    	else {
	    		Swal.fire({
	    		    title: "Warning!",
	    		    icon: "warning",
	    		    text: "Database might be slow in removing items. Please review your actions."
	    		});
	    	}
	    })
	}

	const editProductQuantity = (productId, quantity, productName) => {

		retrieveProductStocks(productId);

		let quantityUpdate = quantity;

		if (quantity === 0) {
			removeFromCart (productId, productName)
		}

		if (stocks !== 0) {

			if (quantity > stocks) {
				quantityUpdate = stocks;
			} else {
				quantityUpdate = quantity
			}

		} else {
			quantityUpdate = quantity
		}

		// {(quantity > stocks) ? quantityUpdate = stocks : quantityUpdate = quantity}

	    fetch(`${process.env.REACT_APP_API_URL}/users/viewCart/${productId}`, {
	    	method: "PATCH",
	    	headers: {
				"Content-Type": "application/json",
				"Authorization": `Bearer ${localStorage.getItem('token')}`
			},
			body: JSON.stringify({
				quantity: quantityUpdate
			})
	    })
	    .then(res => res.json())
	    .then(data => {
	    	
	    	console.log(data);

	    	if (data === true) {
	    		fetchData()
	    	}

	    	else {
	    		Swal.fire({
	    		    title: "Warning!",
	    		    icon: "warning",
	    		    text: "Database might be slow in updating. Please review your actions."
	    		});
	    	}
	    })
	}

	// console.log(user)

	return (

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
						<Container className="dataTable">
							<Table className="text-center mt-4 align-middle" width="100%" striped bordered hover>
		     					<thead className="table-dark align-middle">
		       						<tr>
		       							<th width="6%">#</th>
		         						{/*<th width="9%">Select</th>*/}
		         						<th width="25%">Product Name</th>
		         						<th className="hideOnSmall" width="15%">Price</th>
		         						<th width="18%">Quantity</th>
		         						<th className="hideOnSmall" width="20%">Subtotal</th>
		         						<th width="17%">Action</th>
		       						</tr>
		           				</thead>
		     	   				<tbody>
		            				{ allInCart }
		           				</tbody>
		        			</Table>
		    			</Container>
		    		</div>
		    		<div className="checkOutSelected text-end mx-4 mt-4">

          				<Button variant="primary">
        					Checkout All
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