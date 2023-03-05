import Banner from '../components/Banner';
import { Row, Col, Carousel } from 'react-bootstrap';
import FeaturedProducts from '../components/FeaturedProducts'

export default function Home(){

	const data = {
		title: "GPU ONLINE SHOP",
		content: "Your one-stop shop for Graphics Card Units!",
		destination: "/products",
		label: "Shop now!"
	}

	return(

		<div className="mt-5">
			<Row>
				<Col md={12} lg={8}>

					<Banner bannerProp={data} />
					
					<div className="mt-4">
					<Carousel className="mb-4">
						<Carousel.Item interval={2000}>
							<img
								className="d-block w-100"
								src={require('../images/productivity.jpg')}
								alt="First slide"
							/>
						<Carousel.Caption>
							Productivity
						</Carousel.Caption>
						</Carousel.Item>

						<Carousel.Item interval={2000}>
							<img
								className="d-block w-100"
								src={require('../images/gaming.jpg')}
								alt="Second slide"
							/>
						<Carousel.Caption>
							Gaming
						</Carousel.Caption>
						</Carousel.Item>

						<Carousel.Item interval={2000}>
							<img
								className="d-block w-100"
								src={require('../images/cryptoMining.jpg')}
								alt="Third slide"
							/>
						<Carousel.Caption>
							Crypto Mining
						</Carousel.Caption>
						</Carousel.Item>

						<Carousel.Item interval={2000}>
							<img
								className="d-block w-100"
								src={require('../images/virtualReality.jpg')}
								alt="Fourth slide"
							/>
						<Carousel.Caption>
							Virtual Reality
						</Carousel.Caption>
						</Carousel.Item>

						<Carousel.Item interval={2000}>
							<img
								className="d-block w-100"
								src={require('../images/rendering.jpg')}
								alt="Fifth slide"
							/>
						<Carousel.Caption>
							Rendering
						</Carousel.Caption>
						</Carousel.Item>

						<Carousel.Item interval={2000}>
							<img
								className="d-block w-100"
								src={require('../images/enthusiasts.jpg')}
								alt="Sixth slide"
							/>
						<Carousel.Caption>
							Enthusiasts
						</Carousel.Caption>
						</Carousel.Item>


					</Carousel>
					</div>

				</Col>
				<Col md={12} lg={4}>
					<FeaturedProducts />
				</Col>
			</Row>
		</div>

	);
};