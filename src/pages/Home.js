import Banner from '../components/Banner';

export default function Home(){

	const data = {
		title: "My E-Commerce-App",
		content: "Shop for your PC Parts here!",
		destination: "/products",
		label: "Shop now!"
	}

	return(
		<>
			<Banner bannerProp={data}/>
		</>
	)
}