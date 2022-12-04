
import { Link } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';

export default function ProductCard({productProp}){


	let { name, price, _id } = productProp;

	
	return(
		<Card className="p-3 mb-3">
			<Card.Body className="">
				<Card.Title>{name}</Card.Title>
				<Card.Subtitle>Price:</Card.Subtitle>
				<Card.Text className="text-warning">PHP {price}.00</Card.Text>
				<Button as={Link} to={`/products/${_id}`}>Details</Button>
			</Card.Body>
		</Card>
	)
}