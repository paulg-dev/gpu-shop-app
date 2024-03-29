 
import { Row, Col, ToggleButton, ToggleButtonGroup } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
import FeaturedProducts from '../components/FeaturedProducts'
import { SkeletonCard } from '../components/SkeletonCard'
// import { useEffect, useState, useContext } from 'react';
// import UserContext from '../UserContext';


export default function ActiveProducts() {

	const [products, setProducts] = useState([]);
	const [selectedBrand, setSelectedBrand] = useState('all');
	const [isLoading, setIsLoading] = useState(true);

	const handleBrandFilter = (brand) => {
		setSelectedBrand(brand);
	};

	useEffect(() => {

	fetch(`${process.env.REACT_APP_API_URL}/products/active`)
		.then(res => res.json())
		.then(data => {
			let filteredProducts = data;
			if (selectedBrand !== 'all') {
				filteredProducts = data.filter((product) => product.brand === selectedBrand);
			}
			setProducts(filteredProducts.reverse());
			setIsLoading(false);
		})
		.catch((error) => {
      		console.error(error);
		});
	}, [selectedBrand])

	const productCards = products.map((product) => (
  		<ProductCard productProp={product} key={product._id} />
	));

	return (

		<div className="mt-5">
			<Row>
				<Col md={12} lg={8}>
					<h2 className="products-main text-center">PRODUCTS</h2>
					<div className="text-center">
						<ToggleButtonGroup className="brand-buttongroup mt-3 mb-5" type="radio" name="brand" defaultValue={1}>
							<ToggleButton className="brand-filter-btn" variant="secondary" id="radio-1" value={1} onClick={() => handleBrandFilter('all')}>
								All GPUs
							</ToggleButton>
							<ToggleButton className="brand-filter-btn" variant="secondary" id="radio-2" value={2} onClick={() => handleBrandFilter('nvidia')}>
								NVIDIA
							</ToggleButton>
							<ToggleButton className="brand-filter-btn" variant="secondary" id="radio-3" value={3} onClick={() => handleBrandFilter('amd')}>
								AMD
							</ToggleButton>
							<ToggleButton className="brand-filter-btn" variant="secondary" id="radio-4" value={4} onClick={() => handleBrandFilter('intel')}>
								INTEL
							</ToggleButton>
						</ToggleButtonGroup>
					</div>
					<Row xs={2} md={3} className="mx-auto">
						{isLoading && <SkeletonCard cards={12} />}
						{productCards}
					</Row>
				</Col>
				<Col md={12} lg={4}>
					<FeaturedProducts />
				</Col>
			</Row>
		</div>

	)
}