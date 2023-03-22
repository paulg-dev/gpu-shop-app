
import { useEffect, useState } from 'react';
import { Row, Card, Badge } from 'react-bootstrap';
import ProductCard from '../components/ProductCard';
import { SkeletonCard } from '../components/SkeletonCard';


export default function Products () {

	const [products, setProducts] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		fetch(`${process.env.REACT_APP_API_URL}/products/featured`)
			.then(res => res.json())
			.then(data => {
				const productArr = (data.map(product => {
					return (
						<ProductCard
							productProp={product}
							key={product._id}
						/>
					)
				}))
				setProducts(productArr)
				setIsLoading(false)
			})
	}, [products])

	return (

		<div className="mt-3" >
			<Card className="featured-section text-center p-3" border="light">
				<Card.Header className="featured-section-header">
					<h5>
						Featured Products &nbsp;
						<Badge bg="danger">
							NEW!
						</Badge>
					</h5>	
				</Card.Header>
				<Card.Body>
					<div className="d-flex flex-row">
						<Row sm={2} md={2} lg={1} className="mx-auto">
							{ isLoading && <SkeletonCard cards={3}/>}
							{ products }
						</Row>
					</div>
				</Card.Body>
			</Card>
		</div>

	)
}