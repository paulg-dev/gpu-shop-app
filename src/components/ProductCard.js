
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';

import './ProductCard.css';

export default function ProductCard({productProp}){


	let { _id, imageUrl, name, price } = productProp;
	
	return(

		<Card className="cardProd p-2 mb-3" border="light" as={Link} to={`/products/${_id}`}>
		<Card.Img className="cardProdImg rounded-3" variant="top" src={imageUrl} alt="Card image"/>
			<Card.ImgOverlay className="d-flex align-items-end">	
			<Card.Body className="cardBody rounded-3">
				<Card.Title className="cardProdName" as={Link} to={`/products/${_id}`}>{name}</Card.Title>
				{/*<Card.Subtitle className="cardPriceLabel mt-2">Price:</Card.Subtitle>*/}
				<Card.Text className="cardProdPrice">PHP {price}.00</Card.Text>
				{/*<Button as={Link} to={`/products/${_id}`}>Details</Button>*/}
			</Card.Body>
			</Card.ImgOverlay>
		</Card>


	)
}