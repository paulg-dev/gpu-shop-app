import { useState, useEffect, useContext } from 'react';
import { Container, Card, Button, Row, Col, Form, Modal, InputGroup } from 'react-bootstrap';
import { useParams, Link } from 'react-router-dom';
import UserContext from '../UserContext';
import Swal from 'sweetalert2';
// import NumericInput from "react-numeric-input";

import '../css/ProductView.css'


export default function ProductView(){

	const [show, setShow] = useState(false);

  	const handleClose = () => setShow(false);
  	const handleShow = () => setShow(true);

	//Consume the "User" context object to be able to obtain the user ID so we can buy a product
	const { user } = useContext(UserContext);

	// const navigate = useNavigate();

	//Retrieve the "prductId" via the url using the "useParams" hook from react-router-dom and create a "useEffect" hook to check if the courseId is retrieved properly
	const { productId } = useParams();

	const [name, setName] = useState('');
	const [description, setDescription] = useState('');
	const [imageUrl, setImageUrl] = useState('');
	const [brand, setBrand] = useState('');
	// const [isListed, setIsListed] = useState(true);
	// const [isFeatured, setIsFeatured] = useState(false);
	const [price, setPrice] = useState(0);
	const [stocks, setStocks] = useState(0);

	const [quantity, setQuantity] = useState(0);

	const [isActive, setIsActive] = useState(false);


	//"order" function that will "purchase" a product and bind it to the "Check out" button


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
	    .then(res=>res.json())
		.then(data=>{

			console.log(data)
			console.log(quantity)

			if(data===true){

				Swal.fire({
				  title: "Order Successful!",
				  icon: "success",
				  text: "Thank you for purchasing!"
				});
				
				// navigate("/products")

			}else{

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
	    	method: "PUT",
	    	headers: {
				"Content-Type": "application/json",
				"Authorization": `Bearer ${localStorage.getItem('token')}`
			},
			body: JSON.stringify({
					name: name,
					quantity: quantity
			})
	    })
	    .then(res=>res.json())
		.then(data=>{

			console.log(data)
			console.log(quantity)

			if(data===true){

				Swal.fire({
				  title: "Successfully added to Cart!",
				  icon: "success",
				});
				
				// navigate("/products")

			}else{

				Swal.fire({
				  title: "Something went wrong!",
				  icon: "error",
				  text: "Please try again in a while."
				});

			}

		})

		setQuantity(0);

	}


	useEffect(()=>{

		//fetch request that will retrieve the details of the product from our database to be displayed in the "ProductView" page

		console.log(productId);

		fetch(`${process.env.REACT_APP_API_URL}/products/${productId}`)
		.then(res=>res.json())
		.then(data=>{
			setName(data.name);
			setDescription(data.description);
			setImageUrl(data.imageUrl);
			setBrand(data.brand);
			// setIsListed(data.isListed);
			// setIsFeatured(data.isFeatured);
			setPrice(data.price);
			setStocks(data.stocks);
			
		})
	

	},[productId])



	useEffect(() => {

		// eslint-disable-next-line
        if(quantity == 0 || quantity > stocks || quantity < 0 ){
            setIsActive(false);
        } else {
            setIsActive(true);
        }

    }, [quantity, stocks]);


	const orderSubtotal = (quantity)*(price)

	const priceFormatted = price.toLocaleString(undefined, { style: 'currency', currency: 'PHP' })

	const subtotalFormatted = orderSubtotal.toLocaleString(undefined, { style: 'currency', currency: 'PHP' })

	// console.log(priceFormatted)


	return(
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

					<Form onSubmit={(e) => order(e)}>
						<div className="text-end">

							{
									(brand !== "nvidia" && brand !== "amd")?
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
						<Card.Subtitle className="mt-3">Description:</Card.Subtitle>
						<Card.Text>{description}</Card.Text>
						<Card.Subtitle>Price:</Card.Subtitle>
						<Card.Text className="prodPrice">{priceFormatted}</Card.Text>
						
						<div className="text-center">
							<Row>
								<Col className="text-end mt-1">
									Quantity:
								</Col>
								<Col>
									<Form.Control
		                				className="qtyInput text-center" 
			                			type="number"
			                			min = {0}
			                			max = {stocks}
			                			placeholder="Enter Qty" 
			                			value = {quantity}
			                			onChange={e => setQuantity(e.target.value)}
			                			required
		                			/>

									{/*<NumericInput 
										mobile
										className = "text-center px-3 m-1"
										min = {1}
										max = {stocks}
										size = {8}
										value = {quantity}
										onClick={e => setQuantity(e.target.value)}
										required
									/>*/}

								</Col>
								<Col className = "text-muted mt-1">
									{
									(stocks < 10)?
									<>
										{
										(stocks === 0)?
										<>Out of Stock</>
										:
										<>
										{
										(stocks === 1)?
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
							(user.id!==null)?
								<>
									{
									(user.isAdmin)?
									<div>
									<Button className="logout" onClick={handleShow}><strong>Log out</strong> and use a customer account to purchase.</Button>
									{/*<a className="logout" onClick={handleShow}>Log out</a> and use a customer account to purchase.*/}

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

									{ isActive 
	        	    				?
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
              															value={quantity}
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
							<Button variant="primary" as={Link} to={`/editProduct/${productId}`}>Edit Product</Button>
							:
							<></>
						}
				</div>
		     </Col>
		  </Row>
		</Container>
	)
}


