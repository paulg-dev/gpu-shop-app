
import { Table, Button, Container, Row, Col, ButtonGroup } from "react-bootstrap";
import { useContext, useState, useEffect } from "react";
import { Navigate, Link } from "react-router-dom";
import AdminDashboard from './AdminDashboard';
import UserContext from "../UserContext";

import '../App.css'

import Swal from "sweetalert2";

export default function AllProducts() {

	const {user} = useContext(UserContext);

	const [allProducts, setAllProducts] = useState([]);

	const fetchData = () => {

		fetch(`${process.env.REACT_APP_API_URL}/products/`, {
			headers:{
				"Authorization": `Bearer ${localStorage.getItem("token")}`
			}
		})
		.then(res => res.json())
		.then(data => {

			setAllProducts(data.reverse());
			
			setAllProducts(data.map((product, index) => {

				const priceFormatted = product.price.toLocaleString(undefined, { style: 'currency', currency: 'PHP' })

				return (
					<tr key={product._id}>
						{/*<td>{product._id}</td>*/}
						<td>{index + 1}</td>
						<td className="hideOnSmall">
							{
								(product.brand !== "nvidia" && product.brand !== "amd") ?
								<img
									className="brandImg"
									src={require('../images/intel.png')}
									alt="intel"
								/>
								:
								<>
									{
										(product.brand !== "nvidia") ?
										<img
											className="brandImg"
											src={require('../images/amd.png')}
											alt="amd"
										/>
										:
										<img
											className="brandImg"
											src={require('../images/nvidia.png')}
											alt="nvidia"
										/>
									}
								</>
							}
						</td>
						<td>
							<Button className="prodNameButton" as={Link} to={`/products/${product._id}`}>
								{product.name}
							</Button>
						</td>
						{/*<td>{product.description}</td>*/}
						<td className="hideOnSmall">
							{priceFormatted}
						</td>
						<td>{product.stocks}</td>
						<td className="hideOnSmall">
								<div>
									{
										product.isListed ? "Active" : "Inactive"
									},
								</div>
								<div className="mt-3">
									{
										product.isFeatured ? "Featured" : "Not Feautured"
									}
								</div>
						</td>
						<td>
							<ButtonGroup vertical>
								{
									(product.isListed) ?	
									<Button
										className="py-2 px-1"
										variant="danger"
										size="sm"
										onClick = {() => archive(product._id, product.name)}
									>
										Archive
									</Button>
									:
									<Button
										className="py-2 px-1"
										variant="success"
										size="sm"
										onClick = {() => unarchive(product._id, product.name)}
									>
										Activate
									</Button>
								}
								{
									(product.isFeatured) ?	
									<Button 
										className="py-2 px-1 mt-1"
										variant="danger"
										size="sm"
										onClick = {() => removeFeatured(product._id, product.name)}
									>
										Remove From Featured
									</Button>
									:
									<Button
										className="py-2 px-1 mt-1"
										variant="success"
										size="sm"
										onClick = {() => addFeatured(product._id, product.name)}
									>
										Add to Featured
									</Button>
								}
 								<Button variant="primary" className="mt-1" as={Link} to={`/editProduct/${product._id}`}>Edit</Button>
							</ButtonGroup>
						</td>
					</tr>
				)
			}))
		})
	}


	const archive = (productId, productName) => {

		fetch(`${process.env.REACT_APP_API_URL}/products/archive/${productId}`, {
			method: "PUT",
			headers:{
				"Content-Type": "application/json",
				"Authorization": `Bearer ${localStorage.getItem('token')}`
			},
			body: JSON.stringify({
				isListed: false
			})
		})
		.then(res => res.json())
		.then(data =>{
			console.log(data);

			if (data) {
				Swal.fire({
					title: "Archive Succesful!",
					icon: "success",
					text: `${productName} is now inactive.`,
					confirmButtonColor: "#183153"
				})
				fetchData();
			} else {
				Swal.fire({
					title: "Archive Unsuccessful!",
					icon: "error",
					text: `Something went wrong. Please try again later!`
				})
			}
		})
	}


	const unarchive = (productId, productName) => {

		fetch(`${process.env.REACT_APP_API_URL}/products/activate/${productId}`, {
			method: "PUT",
			headers:{
				"Content-Type": "application/json",
				"Authorization": `Bearer ${localStorage.getItem('token')}`
			},
			body: JSON.stringify({
				isListed: true
			}),
		})
		.then(res => res.json())
		.then(data => {

			if (data) {
				Swal.fire({
					title: "Unarchive Succesful!",
					icon: "success",
					text: `${productName} is now active.`,
					confirmButtonColor: "#183153"
				})
				fetchData();
			} else {
				Swal.fire({
					title: "Unarchive Unsuccessful!",
					icon: "error",
					text: `Something went wrong. Please try again later!`
				})
			}
		})
	}


	const removeFeatured = (productId, productName) => {

		fetch(`${process.env.REACT_APP_API_URL}/products/removeFeatured/${productId}`, {
			method: "PUT",
			headers:{
				"Content-Type": "application/json",
				"Authorization": `Bearer ${localStorage.getItem('token')}`
			},
			body: JSON.stringify({
				isFeatured: false
			})
		})
		.then(res => res.json())
		.then(data => {

			if (data) {
				Swal.fire({
					title: "Change Succesful!",
					icon: "success",
					html: `<strong> ${productName} </strong> <br>
				  		is removed from the list of featured products.`,
				  	confirmButtonColor: "#183153"
				})
				fetchData();
			} else {
				Swal.fire({
					title: "Change Unsuccessful!",
					icon: "error",
					text: `Something went wrong. Please try again later!`
				})
			}
		})
	}


	const addFeatured = (productId, productName) => {

		fetch(`${process.env.REACT_APP_API_URL}/products/addFeatured/${productId}`, {
			method: "PUT",
			headers:{
				"Content-Type": "application/json",
				"Authorization": `Bearer ${localStorage.getItem('token')}`
			},
			body: JSON.stringify({
				isFeatured: true
			}),
		})
		.then(res => res.json())
		.then(data => {

			if (data) {
				Swal.fire({
					title: "Change Succesful!",
					icon: "success",
					html: `<strong> ${productName} </strong> <br>
				  		is added to the list of featured products.`,
				  	confirmButtonColor: "#183153"
				})
				fetchData();
			} else {
				Swal.fire({
					title: "Change Unsuccessful!",
					icon: "error",
					text: `Something went wrong. Please try again later!`
				})
			}
		})
	}


	useEffect(() => {

		fetchData();
	})


	return (

		(user.isAdmin) ?
		<>
		<Container>
      		<Row>
        		<Col md={12} lg={4}>
            		<AdminDashboard />
        		</Col>
        		<Col md={12} lg={8}>
        			<div className="dataLabel mt-4 text-center">
        				PRODUCT DATABASE
        			</div>
        			<Container className="dataTable">
	        			<Table className="text-center mt-4 align-middle" width="100%" bordered striped hover>
			     			<thead className="table-dark">
			       				<tr>
			         			{/*<th>Product ID</th>*/}
			         			<th width="6%">#</th>
			         			<th width="12%" className="hideOnSmall">Manufacturer</th>
			         			<th width="22%">Product Name</th>
			         			{/*<th>Description</th>*/}
			         			<th width="20%" className="hideOnSmall">Price</th>
			         			<th width="12%">Stocks</th>
			         			<th width="13%" className="hideOnSmall">Status</th>
			         			<th width="15%">Actions</th>
			       				</tr>
			     			</thead>
			     			<tbody>
			       				{ allProducts }
			     			</tbody>
			   			</Table>
			   		</Container>
                </Col>
      		</Row>
   		</Container>
		</>
		:
		<Navigate to="/products" />

	)
}