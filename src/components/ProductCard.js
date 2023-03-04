
import { Link } from 'react-router-dom';
import { Card, Button, Container, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'

import '../css/ProductCard.css';

export default function ProductCard({productProp}){


	let { _id, imageUrl, name, price } = productProp;

	const priceFormatted = price.toLocaleString(undefined, { style: 'currency', currency: 'PHP' })
	
	return(
		<Container className="p-2 mb-2">
			<Card className="cardProd mb-3 h-100">
			<Card.Img className="cardProdImg" variant="top" src={imageUrl} alt="Product image"/>
				{/*<Card.ImgOverlay className="d-flex align-items-end">	*/}
				<Card.Body className="cardBody d-flex flex-column text-center">
					<Card.Title className="cardProdName">{name}</Card.Title>
					{/*<Card.Subtitle className="cardPriceLabel mt-2">Price:</Card.Subtitle>*/}
					<Row className="cardProdDetails">
						<Col className="py-2" md={12} lg={6}>
						<Card.Text className="cardProdPrice">{priceFormatted}</Card.Text>
						</Col>
						<Col md={12} lg={6}>
						<Button className="cardProdBtn" as={Link} to={`/products/${_id}`}>
							Details &nbsp;
							<FontAwesomeIcon icon={faArrowRight} />
						</Button>
						</Col>
					</Row>
				</Card.Body>
				{/*</Card.ImgOverlay>*/}
			</Card>
		</Container>
	)
}