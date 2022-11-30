import { Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function Banner({bannerProp}){

	// console.log(bannerProp);

	const {title, content, destination, label} = bannerProp;

	return (

		<div className="text-center my-5">
			<Row>
				<Col>
					<h1>{title}</h1>
					<p>{content}</p>
					<Button as={Link} to={destination} variant="primary">{label}</Button>
				</Col>
			</Row>
		</div>	
	)
}