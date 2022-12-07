import { Row, Col} from 'react-bootstrap';

import './Footer.css'

export default function Footer(){

	return (

		<div className="footerDiv text-center mt-5">
			<Row>
				<Col>
				Official Sites
				</Col>
				<Col>
				Downloads
				</Col>
				<Col>
				Partner Shops
				</Col>
				<Col>
				Forums
				</Col>
			</Row>
		</div>	
	)
}