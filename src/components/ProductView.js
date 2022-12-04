import { useState, useEffect, useContext } from 'react';
import { Container, Card, Button, Row, Col } from 'react-bootstrap';
import { useParams, useNavigate, Link } from 'react-router-dom';
import UserContext from '../UserContext';
import Swal from 'sweetalert2';
import NumericInput from "react-numeric-input";

import './ProductView.css'

//import the "useNavigate" hook from react-router-dom and redirect the user back to the "Products" page after enrolling to a course.

export default function ProductView(){

	//Consume the "User" context object to be able to obtain the user ID so we can buy a product
	const { user } = useContext(UserContext);

	// Allows us to gain access to methods that will allow us to redirect a user to a different page after buying a
	const navigate = useNavigate();

	//Retrieve the "prductId" via the url using the "useParams" hook from react-router-dom and create a "useEffect" hook to check if the courseId is retrieved properly
	const { productId } = useParams();

	const [name, setName] = useState('');
	const [description, setDescription] = useState('');
	const [imageUrl, setImageUrl] = useState('');
	// const [brand, setBrand] = useState('');
	// const [isListed, setIsListed] = useState(true);
	// const [isFeatured, setIsFeatured] = useState(false);
	const [price, setPrice] = useState(0);
	const [stocks, setStocks] = useState(0);


	//"order" function that will "purchase" a product and bind it to the "Buy Now" button
	const order = (productId) =>{

		fetch(`http://localhost:4000/orders`,{
			method:'POST',
			headers:{
				'Content-Type':'application/json',
				Authorization:`Bearer ${localStorage.getItem('token')}`
			},
			body: JSON.stringify({
				productId: productId
			})
		})
		.then(res=>res.json())
		.then(data=>{
			//conditional statement that will alert the user of a successful/failed purhcase
			if(data===true){

				Swal.fire({
				  title: "Order Successful!",
				  icon: "success",
				  text: "Thank you for purchasing!"
				});
				// redirect the user back to products page
				navigate("/products")

			}else{

				Swal.fire({
				  title: "Something went wrong!",
				  icon: "error",
				  text: "Check your credentials!"
				});

			}

		})
	}

	const addToCart = (productId) =>{

	}

	useEffect(()=>{
		//fetch request that will retrieve the details of the product from our database to be displayed in the "ProductView" page
		console.log(productId);
		fetch(`http://localhost:4000/products/${productId}`)
		.then(res=>res.json())
		.then(data=>{
			setName(data.name);
			setDescription(data.description);
			setImageUrl(data.imageUrl);
			// setBrand(data.brand);
			// setIsListed(data.isListed);
			// setIsFeatured(data.isFeatured);
			setPrice(data.price);
			setStocks(data.stocks);
			
		})

	},[productId])


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
						<Card.Title>{name}</Card.Title>
						<Card.Subtitle className="mt-3">Description:</Card.Subtitle>
						<Card.Text>{description}</Card.Text>
						<Card.Subtitle>Price:</Card.Subtitle>
						<Card.Text className="text-warning">PHP {price}.00</Card.Text>
						
						<div className="text-center">
							<Row>
								<Col>
									Quantity:

									<NumericInput 
										mobile
										className = "text-center px-3"
										min = {1}
										max = {stocks}
										size = {8}
										required
									/>

								</Col>
{/*								<Col>
									
								</Col>*/}
								<Col className = "text-muted">
									{stocks} pieces available
								</Col>
							</Row>
						</div>
						
					</Card.Body>
					{/*conditionally render the order button if a user is logged in and a button that will redirect the a user to the "Login" page if they are not logged in*/}
					<Card.Footer className="text-center">

						{
							(user.id!==null)?
								<>
									{
									(user.isAdmin)?
									<div>
									<a href="/logout">Log out</a> and use a customer account to purchase.
									</div>
									:
									<>
									<Button className="mx-3" variant="secondary" onClick={()=>addToCart(productId)}>Add to Cart</Button>
									<Button className="mx-3" variant="primary" onClick={()=>order(productId)}>Check Out</Button>
									</>
									}
								</>

							
							:
							<Link className="btn btn-danger" to="/login">Log in to purchase</Link>
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