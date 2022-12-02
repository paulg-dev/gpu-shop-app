import { useContext, useState, useEffect } from "react";
import { Table, Button } from "react-bootstrap";
import { Navigate, Link } from "react-router-dom";
import UserContext from "../UserContext";
import AdminDash from './AdminDash';

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
			
			// console.log(data);

			setAllProducts(data.map(product => {

				return(
					<tr key={product._id}>
						{/*<td>{product._id}</td>*/}
						<td>{product.name}</td>
						<td>{product.description}</td>
						<td>{product.price}</td>
						<td>{product.stocks}</td>
						<td>{product.isActive ? "Active" : "Inactive"}</td>
						<td>

							{

								(product.isActive)
								?	
									<>

										<Button variant="warning" size="sm" onClick ={() => archive(product._id, product.name)}>Archive</Button>

										<Button as={ Link } to={`/editProduct/${product._id}`} variant="secondary" size="sm" className="m-2">Edit</Button>

									</>
								:
									<>

										<Button variant="success" size="sm" onClick ={() => unarchive(product._id, product.name)}>Unarchive</Button>

										<Button as={ Link } to={`/editProduct/${product._id}`} variant="secondary" size="sm" className="m-2">Edit</Button>
									</>
							}

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
				isActive: false
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
				isActive: true
			})
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


	useEffect(()=>{

		fetchData();
	})


	return(
		(user.isAdmin)
		?
		<>
			<AdminDash />
			<Table className="text-center" striped bordered hover>
		     <thead>
		       <tr>
		         {/*<th>Product ID</th>*/}
		         <th>Product Name</th>
		         <th>Description</th>
		         <th>Price</th>
		         <th>Stocks</th>
		         <th>Status</th>
		         <th>Action</th>
		       </tr>
		     </thead>
		     <tbody>
		       { allProducts }
		     </tbody>
		   </Table>
		</>
		:
		<Navigate to="/products" />
	)
}