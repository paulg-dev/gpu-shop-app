
import { Table, Container, Row, Col, Button } from "react-bootstrap";
import { useContext, useState, useEffect } from "react";
import { Navigate, Link } from "react-router-dom";
import AdminDashboard from './AdminDashboard';
import UserContext from "../UserContext";


export default function Orders() {

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

		fetch(`${process.env.REACT_APP_API_URL}/orders/`,{
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

				for(let i=0; i<data.length; i++) {

					return (
						<tr key={order._id}>
							<td className="sm-table-fontsize">{index + 1}</td>
							<td className="hideOnSmall">{order.userId}</td>
							<td>
								<Button 
									className="prodNameButton" 
									as={Link} to={`/products/${order.products[i].productId}`}
								>
									{order.products[i].productName}
								</Button>
							</td>
							<td className="sm-table-fontsize">{order.products[i].quantity}</td>
							<td className="hideOnSmall">{priceFormatted}</td>
							<td className="sm-table-fontsize">{formatDate(order.orderedOn)}</td>
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

		(user.isAdmin) ?
		<>
			<Container>
	      		<Row>
	        		<Col md={12} lg={4}>
	            		<AdminDashboard />
	        		</Col>
	        		<Col md={12} lg={8}>
	        			<div className="dataLabel mt-4 text-center">
	        				ORDER DATABASE
	        			</div>
	        			<div>
							<Container className="dataTable">
								<Table className="text-center mt-4 align-middle" width="100%" striped bordered hover>
			     					<thead className="table-dark align-middle">
			       						<tr>
			       							<th width="6%">#</th>
			         						<th width="10%" className="hideOnSmall">Customer Id</th>
			         						<th width="28%">Product</th>
			         						<th width="10%">Qty</th>
			         						<th width="24%" className="hideOnSmall">Order Amount</th>
			         						<th width="24%">Order Date</th>
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