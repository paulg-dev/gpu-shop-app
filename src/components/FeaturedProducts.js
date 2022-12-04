
import { Row, Card } from 'react-bootstrap';
import { useEffect, useState } from 'react';

import ProductCard from '../components/ProductCard';

export default function Products(){

	const [products, setProducts] =useState([])

	useEffect(()=>{

	fetch('http://localhost:4000/products/featured')
	.then(res=>res.json())
	.then(data=>{


	const productArr = (data.map(product => {

		return (

			<ProductCard productProp={product} key={product._id}/>
			)
		}))
		setProducts(productArr)
	})

	},[products])


	return(

		<div className="mt-3" >
			<Card className="bg-primary text-center p-3" border="light">
					<Card.Header className="text-light">FEATURED PRODUCTS</Card.Header>
					<Card.Body>
					<div className="d-flex flex-row">
					<Row sm={1} md={1}>
						{products}
					</Row>
					</div>
					</Card.Body>
			</Card>
		</div>

	)
}