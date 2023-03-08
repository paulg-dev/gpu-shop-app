

import { Card, Button, Container, Row, Col } from 'react-bootstrap';
import { faChevronRight, faCartPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import '../css/ProductCard.css';


export default function ProductCard ({productProp}) {

	let { _id, imageUrl, name, price } = productProp;

	const priceFormatted = price
		.toLocaleString(undefined, { style: 'currency', currency: 'PHP' });

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
					quantity: 1
			})
	    })
	    .then(res => res.json())
		.then(data => {

			if (data === true) {
				Swal.fire({
					icon: 'success',
					html: `<strong> ${name} </strong> <br>
				  		has been added to your cart!`,
				  	confirmButtonColor: '#183153'
				});
			} else {
				Swal.fire({
					icon: 'error',
					html: `<strong> Add to cart failed! </strong> <br>
						<a href="/login">Login</a> a customer account to start shopping.`,
					confirmButtonColor: '#183153'
				});
			}
		})
	}
	
	return (

		<Container className="p-2 mb-2">
			<Card className="cardProd mb-3 h-100">
				<Button className="quickCart" onClick={addToCart}>
					<FontAwesomeIcon icon={faCartPlus}/>
				</Button>
				<Card.Img className="cardProdImg" variant="top" src={imageUrl} alt={name}/>
				<Card.Body className="cardBody d-flex flex-column text-center">
					<Card.Title className="cardProdName">{name}</Card.Title>
					<Row className="cardProdDetails">
						<Col className="py-2" md={12} lg={6}>
							<Card.Text className="cardProdPrice">{priceFormatted}</Card.Text>
						</Col>
						<Col md={12} lg={6}>
							<Button className="cardProdBtn" as={Link} to={`/products/${_id}`}>
								Details
								<FontAwesomeIcon icon={faChevronRight} className="hideOnSpecial"/>
							</Button>
						</Col>
					</Row>
				</Card.Body>
			</Card>
		</Container>

	)
}