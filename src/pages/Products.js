
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
		// (user.isAdmin)?
		// <Navigate to="/admin"/>
		// :
		<>
			<h1>Products</h1>
			{products}
		</>
	)
}