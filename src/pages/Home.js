import Banner from '../components/Banner';

export default function Home(){

	const data = {
		title: "E-Commerce-App",
		content: "Shop for your Graphics Cards here!",
		destination: "/products",
		label: "Shop now!"
	}

	return(
		<>
			<Banner bannerProp={data}/>
		</>
	);
};