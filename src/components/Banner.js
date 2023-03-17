
import { Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../App.css';


export default function Banner({bannerProp}) {

	const {title, content, destination, label} = bannerProp;

	return (

		<div className="text-center mt-5">
			<Row>
				<Col>
					<h2 className="banner-title mb-3">{title}</h2>
					<h5 className="banner-text mb-4">{content}</h5>
					<Button className="banner-btn mb-4" as={Link} to={destination} variant="primary">{label}</Button>
				</Col>
			</Row>
		</div>	
	)
}