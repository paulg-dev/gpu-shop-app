
import { Table, Button } from "react-bootstrap";
import { useContext, useState, useEffect } from "react";
import { Navigate, Link } from "react-router-dom";
import UserContext from "../UserContext";
import '../App.css'

export default function Orders(){

	const {user} = useContext(UserContext);

	const [allOrders, setAllOrders] = useState([]);

	function formatDate(isoDate) {
  		return (new Date(isoDate)).toLocaleString('en-PH',
    		{
      			year: 'numeric',
      			month: 'short',
      			day: 'numeric',
      			hour: 'numeric',
      			minute: 'numeric',
      			second: 'numeric',
      			hour12: true
    		}
  		)
	};

	const fetchData = () => {

		fetch(`${process.env.REACT_APP_API_URL}/orders/getUserOrders`,{
			headers:{
				"Authorization": `Bearer ${localStorage.getItem("token")}`
			}
		})
		.then(res => res.json())
		.then(data => {

			setAllOrders(data.reverse());

			if (data.length === 0) {
				const noOrders = (data => {
					return (
						<div className="d-flex flex-column text-center mx-auto mt-4">
							<h4>No orders yet.</h4>
							<Button className="my-4 mx-auto" as={Link} to="/products">
								Check Products
							</Button>
						</div>
					)
				})
				setAllOrders(noOrders)
			
			} else {
				// eslint-disable-next-line
				setAllOrders(data.map((order, index) => {

					const priceFormatted = order.orderSubtotal.toLocaleString(undefined, { style: 'currency', currency: 'PHP' })

					for (let i=0; i<data.length; i++) {

						return (

							<tr key={order._id}>
								<td className="sm-table-fontsize">{index + 1}</td>
								<td className="hide-on-small">{order._id}</td>
								<td className="sm-table-fontsize">
									{order.products[i].quantity} pc/s of
									<Button 
										className="product-link-btn" 
										as={Link} to={`/products/${order.products[i].productId}`}
									>
										{order.products[i].productName}
									</Button>
								</td>
								<td className="sm-table-fontsize">{priceFormatted}</td>
								<td className="sm-table-fontsize">{formatDate(order.orderedOn)}</td>
							</tr>

						)
					}

				}))
			}
		})
	}

	useEffect(() => {

		fetchData();
	})


	return (

		(user.id !== null) ?
		<>
			{
				allOrders.length > 0 ?
				<div className="user-table-container">
					<Table className="user-data-table text-center mt-4 align-middle" width="100%" striped hover>
	 					<thead className="align-middle">
	   						<tr>
	   							<th width="5%">#</th>
	     						<th className="hide-on-small" width="24%">Order Id</th>
	     						<th width="26%">Order Details</th>
	     						<th width="20%">Order Amount</th>
	     						<th width="25%">Order Date</th>
	   						</tr>
	       				</thead>
	 	   				<tbody>
	        				{ allOrders }
	       				</tbody>
	    			</Table>
				</div>
				:
				<>
					{allOrders}
				</>
			}
		</>
		:
		<Navigate to="/login" />
			
	)
}