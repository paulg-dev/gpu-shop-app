
import { Container, Col, Row, Card } from 'react-bootstrap';
import Skeleton from 'react-loading-skeleton';


export const SkeletonCard = ({cards}) => {
	return Array(cards)
		.fill(0)
		.map((item, i) => (
			<Container className="p-2 mb-2" key={i}>
				<Card className="card-product mb-2">
					<Skeleton height="170px" width="88%" style={{margin: "6%"}} />
					<Card.Body className="card-product-body d-flex flex-column text-center">
						<Skeleton height="22px" width="75%"/>
						<Row className="card-product-details">
							<Col className="py-2" md={12} lg={6}>
								<Skeleton height="22px" width="70%"/>
							</Col>
							<Col md={12} lg={6}>
								<Skeleton height="35px" width="85px"/>
							</Col>
						</Row>
					</Card.Body>
				</Card>
			</Container>
		));
}
