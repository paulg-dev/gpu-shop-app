
import { Table, Container, Row, Col, Button, ButtonGroup } from "react-bootstrap";
import { useContext, useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Navigate, Link } from "react-router-dom";
import UserContext from "../UserContext";
import UserProfile from './UserProfile';
import Swal from 'sweetalert2';
import '../App.css';


export default function Orders() {

	const { user } = useContext(UserContext);

	const [allInCart, setAllInCart] = useState([]);
	const [stocks, setStocks] = useState(0);
	// const [cartQuantity, setCartQuantity] = useState(0);

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

				for (let i=0; i<data.length; i++) {

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
									<Button className="mb-1" variant="success" onClick = {() => reviewCheckOut(cart.productId, cart.productName, cart.quantity, subTotalFormatted)}>
	        	    					Checkout
	        	    				</Button>
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
		.then(data => {

    		setStocks(data.stocks);

    	});
	}

	const removeFromCart = (productId, productName) => {

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

	    	if (data === true) {
	    		Swal.fire({
	    		    icon: 'success',
	    		    html: `<strong> ${productName} </strong> <br>
				  		has been removed from your cart!`,
				  	confirmButtonColor: '#183153'
	    		});
	    	} else {
	    		Swal.fire({
	    		    icon: "warning",
	    		    html: `Database might be slow in removing items. <br>
				  		Please review your actions.`
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

	    	if (data === true) {
	    		fetchData()
	    	}

	    	else {
	    		Swal.fire({
	    		    icon: "warning",
	    		    html: `Database might be slow in updating. <br>
				  		Please review your actions.`
	    		});
	    	}
	    })
	}


	function reviewCheckOut (productId, productName, quantity, subTotal) {

		Swal.fire({
		  title: 'Confirm Order?',
    	  html: `<a href="/products/${productId}"> ${productName} </a> <hr>
	    	  		Quantity: <b>${quantity} pc/s</b> <hr>
	    	  		Order Amount: <b>${subTotal}</b>`,
		  showCancelButton: true,
		  confirmButtonColor: '#198754',
		  cancelButtonColor: '#7e191b',
		  confirmButtonText: 'Confirm'
		}).then((result) => {
		  if (result.isConfirmed) {
				checkOut(productId, quantity)
		  }
		})
	}


	function checkOut (productId, quantity) {

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

				Swal.fire({
				  title: "Order Successful!",
				  icon: "success",
				  text: "Thank you for purchasing!",
				  confirmButtonColor: "#183153"
				});
			} else {
				Swal.fire({
				  title: "Something went wrong in!",
				  icon: "error",
				  text: "Please try again in a while."
				});
			}
		})
	}


	return (

		(user.id !== null) ?
		<>
			<Container>
	      		<Row>
	        		<Col md={12} lg={4}>
	            		<UserProfile />
	        		</Col>
	        		<Col md={12} lg={8}>
	        			<div className="dataLabel mt-5 text-center">
	        			CART
	        			</div>{/*
	        			{
	        				(user.cart.length === 0) ?
	        				<div className="text-center mt-4 yourCartIsEmpty">
	        					Your cart is empty. <a href="/products">Start shopping!</a>
	          				</div>
	          				:
	          				<>
	          				*/}<div>
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
		          				{/*<Button variant="secondary" disabled>
		        					Checkout Selected
		          				</Button>*/}
		          			</div>{/*
		          			</>
	          			}*/}
	        		</Col>
	      		</Row>
	    	</Container>
		</>
		:
		<Navigate to="/login" />
			
	)
}