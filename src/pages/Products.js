
import { Row, Col } from 'react-bootstrap';
import { useEffect, useState } from 'react';
// import { useEffect, useState, useContext } from 'react';
// import { Navigate } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
// import UserContext from '../UserContext';

export default function Products(){

	const [products, setProducts] =useState([])

	// const {user} = useContext(UserContext);
	// console.log(user);

	useEffect(()=>{

	fetch('http://localhost:4000/products')
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
				<Col md={12} lg={7}>
					{/*(user.isAdmin)?
					<Navigate to="/admin"/>
					:*/}
					<>
						<h3 className="text-center">Products</h3>
						{products}
					</>
				</Col>
				<Col md={12} lg={5}>
				</Col>
			</Row>
		</div>

	)
}