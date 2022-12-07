import { useContext, useState, useEffect } from "react";
import { Table, Button, Container, Row, Col, ButtonGroup } from "react-bootstrap";
import { Navigate, Link } from "react-router-dom";
import UserContext from "../UserContext";
import AdminDash from './AdminDash';

import './AllProducts.css'

import Swal from "sweetalert2";

export default function AllProducts(){

	const {user} = useContext(UserContext);

	const [allProducts, setAllProducts] = useState([]);

	const fetchData = () =>{

		fetch('http://localhost:4000/products/',{
			headers:{
				"Authorization": `Bearer ${localStorage.getItem("token")}`
			}
		})
		.then(res => res.json())
		.then(data => {

			setAllProducts(data.reverse());
			
			// console.log(data);

			setAllProducts(data.map(product => {


				const priceFormatted = product.price.toLocaleString(undefined, { style: 'currency', currency: 'PHP' })

				return(
					<tr key={product._id} className="prodTableRow">
						{/*<td>{product._id}</td>*/}
						<td className="hideOnSmall"><div className="mt-5">

							{
									(product.brand !== "nvidia" && product.brand !== "amd")?
										<img
											className="brandImg mb-3"
											src={require('../images/intel.png')}
											alt="intel"
										/>
										:
										<>
											{
												(product.brand !== "nvidia") ?
													<img
														className="brandImg mb-3"
														src={require('../images/amd.png')}
														alt="amd"
													/>
													:
													<img
														className="brandImg mb-3"
														src={require('../images/nvidia.png')}
														alt="nvidia"
													/>
											}
										</>
							}


						</div></td>
						<td><div className="mt-5"><Button className="prodNameButton" as={Link} to={`/products/${product._id}`}>{product.name}</Button></div></td>
						{/*<td>{product.description}</td>*/}
						<td className="hideOnSmall"><div className="mt-5">{priceFormatted}</div></td>
						<td><div className="mt-5">{product.stocks}</div></td>
						<td className="hideOnSmall"><div className="mt-4"><div>{product.isListed ? "Active" : "Inactive"},</div><div className="mt-3"> {product.isFeatured ? "Featured" : "Not Feautured"}</div></div></td>
						<td>
								
								<ButtonGroup vertical>

									{
										(product.isListed)
										?	
										<>
										<Button className="p-2" variant="danger" size="sm" onClick ={() => archive(product._id, product.name)}>Archive</Button>
										</>
										:
										<>
										<Button className="p-2" variant="success" size="sm" onClick ={() => unarchive(product._id, product.name)}>Activate</Button>
										</>
									}

									{
										(product.isFeatured)
										?	
										<>
										<Button className="p-2 mt-1" variant="danger" size="sm" onClick ={() => removeFeatured(product._id, product.name)}>Remove From Featured</Button>
										</>
										:
										<>
										<Button className="p-2 mt-1" variant="success" size="sm" onClick ={() => addFeatured(product._id, product.name)}>Add to Featured</Button>
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


	const archive = (productId, productName) =>{

		console.log(productId);
		console.log(productName);

		fetch(`http://localhost:4000/products/archive/${productId}`,{
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

			if(data){
				Swal.fire({
					title: "Archive Succesful!",
					icon: "success",
					text: `${productName} is now inactive.`
				})
				fetchData();
			}
			else{
				Swal.fire({
					title: "Archive Unsuccessful!",
					icon: "error",
					text: `Something went wrong. Please try again later!`
				})
			}
		})
	}


	const unarchive = (productId, productName) =>{
		
		console.log(productId);
		console.log(productName);

		fetch(`http://localhost:4000/products/activate/${productId}`,{
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
		.then(data =>{
			console.log(data);

			if(data){
				Swal.fire({
					title: "Unarchive Succesful!",
					icon: "success",
					text: `${productName} is now active.`
				})
				fetchData();
			}
			else{
				Swal.fire({
					title: "Unarchive Unsuccessful!",
					icon: "error",
					text: `Something went wrong. Please try again later!`
				})
			}
		})
	}


	const removeFeatured = (productId, productName) =>{

		console.log(productId);
		console.log(productName);

		fetch(`http://localhost:4000/products/removeFeatured/${productId}`,{
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
		.then(data =>{
			console.log(data);

			if(data){
				Swal.fire({
					title: "Change Succesful!",
					icon: "success",
					text: `${productName} is removed from the list of featured products.`
				})
				fetchData();
			}
			else{
				Swal.fire({
					title: "Change Unsuccessful!",
					icon: "error",
					text: `Something went wrong. Please try again later!`
				})
			}
		})
	}



	const addFeatured = (productId, productName) =>{
		
		console.log(productId);
		console.log(productName);

		fetch(`http://localhost:4000/products/addFeatured/${productId}`,{
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
		.then(data =>{
			console.log(data);

			if(data){
				Swal.fire({
					title: "Change Succesful!",
					icon: "success",
					text: `${productName} is now added to list of featured products.`
				})
				fetchData();
			}
			else{
				Swal.fire({
					title: "Change Unsuccessful!",
					icon: "error",
					text: `Something went wrong. Please try again later!`
				})
			}
		})
	}


	useEffect(()=>{

		fetchData();
	})



	return(

		(user.isAdmin)
		?
		<>
		<Container>
      		<Row>
        		<Col md={12} lg={4}>
            		<AdminDash />
        		</Col>
        		
        		<Col md={12} lg={8}>
        			<div className="dataLabel mt-4 text-center">
        			PRODUCT DATABASE
        			</div>
        			<Table className="prodTable text-center mt-4" width="100%" bordered striped hover>
		     			<thead className="table-dark prodTableHead">
		       				<tr>
		         			{/*<th>Product ID</th>*/}
		         			<th width="15%" className="hideOnSmall">Manufacturer</th>
		         			<th width="25%">Product Name</th>
		         			{/*<th>Description</th>*/}
		         			<th width="20%" className="hideOnSmall">Price</th>
		         			<th width="12%">Stocks</th>
		         			<th width="13%" className="hideOnSmall">Status</th>
		         			<th width="15%">Actions</th>
		       				</tr>
		     			</thead>
		     			<tbody className="prodTableBody">
		       				{ allProducts }
		     			</tbody>
		   			</Table>
                </Col>
      		</Row>
   		</Container>
			
		</>
		:
		<Navigate to="/products" />
	)
}