import { useContext, useState, useEffect } from "react";
import { Table, Container } from "react-bootstrap";
import { Navigate } from "react-router-dom";
import UserContext from "../UserContext";
import AdminDash from './AdminDash';

// import Swal from "sweetalert2";

export default function Orders(){

	const {user} = useContext(UserContext);

	const [allOrders, setAllOrders] = useState([]);

	const fetchData = () =>{

		fetch('http://localhost:4000/orders/',{
			headers:{
				"Authorization": `Bearer ${localStorage.getItem("token")}`
			}
		})
		.then(res => res.json())
		.then(data => {
			
			// console.log(data);

			setAllOrders(data.map(order => {

				for(let i=0; i<data.length; i++) {

				return(

					<tr key={order._id}>
						<td>{order.userId}</td>
						<td>{order.products[i].productName}</td>
						<td>{order.products[i].quantity}</td>
						<td>₱ {order.productSubtotal}.00</td>
						<td>{order.purchasedOn}</td>
					</tr>
				)

				}

			}))
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

			<div>
			<Container>
				<Table className="text-center" striped bordered hover>
		     		<thead>
		       			<tr>
		         			<th>Customer Id</th>
		         			<th>Product</th>
		         			<th>Quantity</th>
		         			<th>Product Subtotal</th>
		         			<th>Purchased On</th>
		       			</tr>
		           </thead>
		     	   <tbody>
		            { allOrders }
		           </tbody>
		        </Table>
		    </Container>
		    </div>
		</>
		:
		<Navigate to="/login" />
			
	)
}