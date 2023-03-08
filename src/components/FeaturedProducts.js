
import { useEffect, useState } from 'react';
import { Row, Card, Badge } from 'react-bootstrap';
import ProductCard from '../components/ProductCard';
import '../css/FeaturedProducts.css';


export default function Products () {

	const [products, setProducts] = useState([])

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
			})
	}, [products])

	return (

		<div className="mt-3" >
			<Card className="featuredProdCard text-center p-3" border="light">
				<Card.Header className="text-light">
					Featured Products
					<Badge className="m-2" bg="danger">
						NEW!
					</Badge>
				</Card.Header>
				<Card.Body>
					<div className="d-flex flex-row">
						<Row sm={2} md={2} lg={1}>
							{products}
						</Row>
					</div>
				</Card.Body>
			</Card>
		</div>

	)
}