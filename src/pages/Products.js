
import { Row, Col } from 'react-bootstrap';
import { useEffect, useState } from 'react';
// import { useEffect, useState, useContext } from 'react';
// import { Navigate } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
// import UserContext from '../UserContext';
import FeaturedProducts from '../components/FeaturedProducts'

import './Product.css';

export default function Products(){

	const [products, setProducts] =useState([])

	useEffect(()=>{

	fetch('http://localhost:4000/products/active')
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

		<div className="mt-5">
			<Row>
				<Col md={12} lg={8}>
					{/*(user.isAdmin)?
					<Navigate to="/admin"/>
					:*/}
					<>	
						<h4 className="text-center">PRODUCTS</h4>
						<div className="prodSection flex-row">
						<Row className="prodRow" sm={1} md={4}>
						{products}
						</Row>
						</div>
					</>
				</Col>
				<Col md={12} lg={4}>
					<FeaturedProducts />
				</Col>
			</Row>
		</div>

	)
}