
import { Container, Card, Button, Row, Col, Form, Modal, InputGroup } from 'react-bootstrap';
import { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import UserContext from '../UserContext';
import Swal from 'sweetalert2';
import '../css/ProductView.css'


export default function ProductView() {

	const { user } = useContext(UserContext);
	const { productId } = useParams();

	const [show, setShow] = useState(false);
  	const handleClose = () => setShow(false);
  	const handleShow = () => setShow(true);

	const [name, setName] = useState('');
	const [description, setDescription] = useState('');
	const [imageUrl, setImageUrl] = useState('');
	const [brand, setBrand] = useState('');
	const [price, setPrice] = useState(0);
	const [stocks, setStocks] = useState(0);
	const [quantity, setQuantity] = useState(0);
	const [isActive, setIsActive] = useState(false);
	// const [isListed, setIsListed] = useState(true);
	// const [isFeatured, setIsFeatured] = useState(false);

	function order (e) {

	    e.preventDefault();

	    fetch(`${process.env.REACT_APP_API_URL}/orders`, {
	    	method: "POST",
	    	headers: {
				"Content-Type": "application/json",
				"Authorization": `Bearer ${localStorage.getItem('token')}`
			},
			body: JSON.stringify({
				products : [ 
			   		{
						productId: productId,
						quantity: quantity
					}
				]
			})
	    })
	    .then(res => res.json())
		.then(data => {

			if (data === true) {
				Swal.fire({
				  title: "Order Successful!",
				  icon: "success",
				  text: "Thank you for purchasing!",
				  confirmButtonColor: "#183153"
				});
			} else {
				Swal.fire({
				  title: "Something went wrong!",
				  icon: "error",
				  text: "Please try again in a while."
				});
			}
		})
		setQuantity(0);
	}


	function addToCart (e) {

	    e.preventDefault();

	    fetch(`${process.env.REACT_APP_API_URL}/users/addToCart`, {
	    	method: "PATCH",
	    	headers: {
				"Content-Type": "application/json",
				"Authorization": `Bearer ${localStorage.getItem('token')}`
			},
			body: JSON.stringify({
					name: name,
					quantity: quantity
			})
	    })
	    .then(res => res.json())
		.then(data => {

			if (data === true) {
				Swal.fire({
				  html: `<strong> ${name} </strong> <br>
				  		has been added to your cart!`,
				  icon: 'success',
				  confirmButtonColor: '#183153'
				});

			} else {
				Swal.fire({
				  title: "Something went wrong!",
				  icon: "error",
				  text: "Please try again in a while."
				});
			}
		})
		setQuantity(0);
	}


	useEffect(() => {

		fetch(`${process.env.REACT_APP_API_URL}/products/${productId}`)
		.then(res => res.json())
		.then(data => {
			setName(data.name);
			setDescription(data.description);
			setImageUrl(data.imageUrl);
			setBrand(data.brand);
			setPrice(data.price);
			setStocks(data.stocks);
			// setIsListed(data.isListed);
			// setIsFeatured(data.isFeatured);
			
		})

	}, [productId])


	useEffect(() => {

        if(quantity <= 0 || quantity > stocks){
            setIsActive(false);
        } else {
            setIsActive(true);
        }

    }, [quantity, stocks]);


	const orderSubtotal = quantity * price

	const priceFormatted = price
		.toLocaleString(undefined, { style: 'currency', currency: 'PHP' });

	const subtotalFormatted = orderSubtotal
		.toLocaleString(undefined, { style: 'currency', currency: 'PHP' });

	return (

		<Container className="mt-5">
		  <Row>
		  	<Col md={12} lg={5}>
				<Card className="prodImgCard p-3 mb-3">
					<Card.Img className="prodImg rounded-2" variant="top" src={imageUrl} />
				</Card>
        	</Col>
        	<Col md={12} lg={7}>
        		<Card>
					<Card.Body>
						<Form onSubmit={e => order(e)}>
							<div className="text-end productViewBrand">
								{
									(brand !== "nvidia" && brand !== "amd") ?
										<a href="/products/intel">
										<img
											className="brandImg mb-3"
											src={require('../images/intel.png')}
											alt="intel"
										/>
										</a>
										:
										<>
											{
												(brand !== "nvidia") ?
													<a href="/products/amd">
													<img
														className="brandImg mb-3"
														src={require('../images/amd.png')}
														alt="amd"
													/>
													</a>
													:
													<a href="/products/nvidia">
													<img
														className="brandImg mb-3"
														src={require('../images/nvidia.png')}
														alt="nvidia"
													/>
													</a>
											}
										</>
								}
							</div>
							<Card.Title className="prodName">{name}</Card.Title>
							<Card.Text className="prodDescription mt-3">{description}</Card.Text>
							<Card.Subtitle>Price:</Card.Subtitle>
							<Card.Text className="prodPrice">{priceFormatted}</Card.Text>
							
							<div className="text-center">
								<Row>
									<Col sm={6} className="d-flex p-1 my-auto justify-content-center align-items-center">
										Quantity:
										<Form.Control
			                				className="qtyInput text-center mx-2" 
				                			type="number"
				                			min = {0}
				                			max = {stocks}
				                			placeholder="Enter Qty" 
				                			value = {quantity}
				                			onChange={e => setQuantity(e.target.value)}
				                			required
			                			/>
									</Col>
									<Col sm={6} className="d-flex p-1 my-auto text-muted justify-content-center align-items-center">
										{
											(stocks < 10) ?
											<>
												{
													(stocks === 0) ?
													<>Out of Stock</>
													:
													<>
													{
														(stocks === 1) ?
														<>Only 1 piece left</>
														:
														<>Only {stocks} pieces left</>
													}
													</>
												}
											</>
											:
											<>
											{stocks} pieces available
											</>
										}
									</Col>
								</Row>
							</div>
						</Form>
					</Card.Body>
					<Card.Footer className="text-center">
						{
							(user.id!==null) ?
							<>
							{
								(user.isAdmin) ?
								<div>
									<Button className="logout" onClick={handleShow}>
										<strong>Log out</strong> and use a customer account to purchase.
									</Button>
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
								</div>
								:
								<>
								{ 
									isActive ?
        	    					<>
	        	    				<Button className="mx-3" variant="warning" onClick={addToCart}>
	        	    					Add to Cart
	        	    				</Button>
	        	    				<Button className="mx-3" variant="primary" onClick={handleShow}>
	        	    					Check Out
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
	          												value={name}
		                								/>
		               			 					</InputGroup>
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
          															value={quantity}
	                											/>
	               			 									</InputGroup>
	            											</Form.Group>
	            										</Col>
	            									</Row>
		            								<InputGroup>
		                								<InputGroup.Text>Order Amount:</InputGroup.Text>
		                								<Form.Control
		                									className="orderDetailsPrice" 
	          												type="text"
	          												readOnly
	          												value={subtotalFormatted}
		                								/>
		               			 					</InputGroup>
	        									</Form.Group>
	    										<Button className="mx-2" variant="primary" onClick={order}>
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
	        	        			<Button className="mx-3" variant="warning" disabled>
	        	    					Add to Cart
	        	    				</Button>
	        	        			<Button className="mx-3" variant="primary" disabled>
	        	        				Check Out
	        	        			</Button>
	        	        			</>
        	    				}
								</>
							}
							</>
							:
							<Link className="btn btn-warning" to="/login">Log in to purchase</Link>
						}
           			</Card.Footer>
				</Card>
				<div className="text-center mt-4">
					{
						(user.isAdmin) ?
						<Button variant="primary" as={Link} to={`/editProduct/${productId}`}>
							Edit Product
						</Button>
						:
						<></>
					}
				</div>
		     </Col>
		  </Row>
		  <Row className="mt-4">
		  	<Card>
		  		<Card.Header>
		  			<h4 className="pt-2"> SPECIFICATIONS </h4>
		  		</Card.Header>
		  		<Card.Body>
		  			This section is for displaying product specifications in future updates.
		  		</Card.Body>
		  	</Card>
		  </Row>
		</Container>
	)
}


