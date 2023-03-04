 
import { Row, Col,  ButtonGroup, Button } from 'react-bootstrap';
import { useEffect, useState } from 'react';
// import { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
// import UserContext from '../UserContext';
import FeaturedProducts from '../components/FeaturedProducts'

export default function ActiveProducts (){

	const [products, setProducts] =useState([])

	useEffect(()=>{

	fetch(`${process.env.REACT_APP_API_URL}/products/active`)
	.then(res=>res.json())
	.then(data=>{

	setProducts(data.reverse());

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
						<h4 className="productsMain text-center">PRODUCTS</h4>

								<div className="text-center">

								<ButtonGroup className="mt-3 mb-5">

									<Button as={Link} to="/products" className="mt-1" variant="primary">All GPUs</Button>
									<Button as={Link} to="/products/nvidia" className="mt-1" variant="secondary">NVIDIA</Button>
      								<Button as={Link} to="/products/amd" className="mt-1" variant="secondary">AMD</Button>
     								<Button as={Link} to="/products/intel" className="mt-1" variant="secondary">INTEL</Button>

    							</ButtonGroup>

    							</div>

						<div className="prodSection flex-row">
						<Row className="prodRow" xs={2} md={3}>
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