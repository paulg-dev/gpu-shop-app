
import { Table, Button, Row, Col, ButtonGroup } from "react-bootstrap";
import { useContext, useState, useEffect } from "react";
import { Navigate, Link } from "react-router-dom";
import AdminDashboard from './AdminDashboard';
import UserContext from "../UserContext";
import Swal from "sweetalert2";
import '../App.css'


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
						<td className="hide-on-small">
							{
								(product.brand !== "nvidia" && product.brand !== "amd") ?
								<img
									className="product-brand"
									src={require('../images/intel.png')}
									alt="intel"
								/>
								:
								<>
									{
										(product.brand !== "nvidia") ?
										<img
											className="product-brand"
											src={require('../images/amd.png')}
											alt="amd"
										/>
										:
										<img
											className="product-brand"
											src={require('../images/nvidia.png')}
											alt="nvidia"
										/>
									}
								</>
							}
						</td>
						<td>
							<Button className="product-link-btn" as={Link} to={`/products/${product._id}`}>
								{product.name}
							</Button>
						</td>
						{/*<td>{product.description}</td>*/}
						<td className="hide-on-small">
							{priceFormatted}
						</td>
						<td>{product.stocks}</td>
						<td className="hide-on-small">
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
									(product.isListed) ?
									<>
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
									</>
									:
									<>
										<Button
											className="py-2 px-1 mt-1"
											variant="success"
											size="sm"
											disabled
										>
											Add to Featured
										</Button>
									</>	
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
      		<Row>
        		<Col md={12} lg={4}>
            		<AdminDashboard />
        		</Col>
        		<Col md={12} lg={8}>
        			<div className="data-label mt-4 text-center">
        				PRODUCT DATABASE
        			</div>
        			<div className="admin-table-container">
	        			<Table className="admin-data-table text-center mt-4 align-middle" width="100%" striped hover>
			     			<thead className="align-middle">
			       				<tr>
			         			{/*<th>Product ID</th>*/}
			         			<th width="6%">#</th>
			         			<th width="12%" className="hide-on-small">Manufacturer</th>
			         			<th width="22%">Product Name</th>
			         			{/*<th>Description</th>*/}
			         			<th width="20%" className="hide-on-small">Price</th>
			         			<th width="12%">Stocks</th>
			         			<th width="13%" className="hide-on-small">Status</th>
			         			<th width="15%">Actions</th>
			       				</tr>
			     			</thead>
			     			<tbody>
			       				{ allProducts }
			     			</tbody>
			   			</Table>
			   		</div>
                </Col>
      		</Row>
		</>
		:
		<Navigate to="/products" />

	)
}