
import { Table, Container, Button, ButtonGroup, Card } from "react-bootstrap";
import { useContext, useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus, faTrashAlt, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { Navigate, Link } from "react-router-dom";
import UserContext from "../UserContext";
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

			console.log(data.length)
			console.log(data)

			if (data.length === 0) {
				const cartEmpty = (data => {
					return (
						<Container className="d-flex flex-column text-center mx-auto mt-4">
							<h3>Your cart is empty.</h3>
							<Button className="my-4 mx-auto" as={Link} to="/products">
								Check Products
							</Button>
						</Container>
					)
				})
				setAllInCart(cartEmpty)
			} else {
						
				// eslint-disable-next-line
				setAllInCart(data.map((cart, index) => {

					for (let i = 0; i < data.length; i++) {

						const priceFormatted = cart.price.toLocaleString(undefined, { style: 'currency', currency: 'PHP' })
						const subTotalFormatted = cart.subTotal.toLocaleString(undefined, { style: 'currency', currency: 'PHP' })

						return (

							<tr key={cart._id}>
								<td className="sm-table-fontsize">{index + 1}</td>
								{/*<td>
									<Form.Check
			            				type="checkbox"
		    							defaultChecked={false}
		      						/>
		      					</td>*/}
								<td className="hideOnSmall">
									<Button 
										className="prodNameButton" 
										as={Link} to={`/products/${cart.productId}`}
									>
										<img src={cart.productImage} className="in-cart-image" alt={cart.productName}/> 
									</Button>
									
								</td>
								<td className="sm-table-fontsize">
									<Button 
										className="prodNameButton" 
										as={Link} to={`/products/${cart.productId}`}
									>
										{cart.productName}
									</Button>
									<br/>
									{priceFormatted}/pc
								</td>
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
		        	    					<FontAwesomeIcon icon={faArrowRight} />
		        	    				</Button>
				      					<Button variant="danger" onClick = {() => removeFromCart(cart.productId, cart.productName)}>
				      						<FontAwesomeIcon icon={faTrashAlt} />
				      					</Button>					
			      					</ButtonGroup>
								</td>
							</tr>
						)
					}
				}))
			}
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
			<Card className="mt-5 text-center">
				<Card.Header className="data-table-header">
    				CART
    			</Card.Header>
    			<Card.Body>
					{
						allInCart.length >= 1 ?
							<Table className="text-center mt-4 align-middle" width="100%" striped bordered hover>
		     					<thead className="table-dark align-middle">
		       						<tr>
		       							<th width="6%">#</th>
		         						{/*<th width="9%">Select</th>*/}
		         						<th className="hideOnSmall" width="18%">Product</th>
		         						<th width="23%">Details</th>
		         						<th width="23%">Quantity</th>
		         						<th className="hideOnSmall" width="18%">Subtotal</th>
		         						<th width="12%">Action</th>
		       						</tr>
		           				</thead>
		     	   				<tbody>
		            				{ allInCart }
		           				</tbody>
		        			</Table>
						:
						<>
							{allInCart}
						</>
        			}
	    		{/*<div className="checkOutSelected text-end mx-4 mt-4">
	    			<Button variant="secondary" disabled>
    					Checkout Selected
      				</Button>
      			</div>*/}
      			</Card.Body>
      			</Card>
		</>
		:
		<Navigate to="/login" />
			
	)
}