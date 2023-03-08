
import { Table, Container, Row, Col, Button } from "react-bootstrap";
import { useContext, useState, useEffect } from "react";
import { Navigate, Link } from "react-router-dom";
import UserContext from "../UserContext";
import UserProfile from './UserProfile';
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
			
			// eslint-disable-next-line
			setAllOrders(data.map((order, index) => {

				const priceFormatted = order.orderSubtotal.toLocaleString(undefined, { style: 'currency', currency: 'PHP' })

				for (let i=0; i<data.length; i++) {

					return (

						<tr key={order._id}>
							<td>{index + 1}</td>
							<td className="hideOnSmall">{order._id}</td>
							<td>
								{order.products[i].quantity} pc/s of
								<Button 
									className="prodNameButton" 
									as={Link} to={`/products/${order.products[i].productId}`}
								>
									{order.products[i].productName}
								</Button>
							</td>
							<td>{priceFormatted}</td>
							<td>{formatDate(order.orderedOn)}</td>
						</tr>

					)

				}

			}))
		})
	}

	useEffect(() => {

		fetchData();
	})


	return(

		(user.id !== null) ?
		<>
			<Container>
	      		<Row>
	        		<Col md={12} lg={4}>
	            		<UserProfile />
	        		</Col>
	        		<Col md={12} lg={8}>
	        			<div className="dataLabel mt-5 text-center">
	        				ORDER HISTORY
	        			</div>
	        			<div>
							<Container className="dataTable">
								<Table className="text-center mt-4 align-middle" width="100%" striped bordered hover>
			     					<thead className="table-dark align-middle">
			       						<tr>
			       							<th width="6%">#</th>
			         						<th className="hideOnSmall" width="24%">Order Id</th>
			         						<th width="28%">Order Details</th>
			         						<th width="24%">Order Amount</th>
			         						<th width="18%">Order Date</th>
			       						</tr>
			           				</thead>
			     	   				<tbody>
			            				{ allOrders }
			           				</tbody>
			        			</Table>
			    			</Container>
			    		</div>
	        		</Col>
	      		</Row>
	    	</Container>
		</>
		:
		<Navigate to="/login" />
			
	)
}