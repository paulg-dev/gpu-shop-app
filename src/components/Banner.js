import { Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function Banner({bannerProp}){

	// console.log(bannerProp);

	const {title, content, destination, label} = bannerProp;

	return (

		<div className="text-center mt-5">
			<Row>
				<Col>
					<h2 className="mb-3">{title}</h2>
					<h5 className="mb-4">{content}</h5>
					<Button className="mb-4" as={Link} to={destination} variant="primary">{label}</Button>
				</Col>
			</Row>
		</div>	
	)
}