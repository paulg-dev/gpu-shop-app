import { useContext, useState, useEffect } from "react";
import { Table, Container, Row, Col, Button } from "react-bootstrap";
import { Navigate, Link } from "react-router-dom";
import UserContext from "../UserContext";
import AdminDash from './AdminDash';

// import Swal from "sweetalert2";

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

	const fetchData = () =>{

		fetch('http://localhost:4000/orders/',{
			headers:{
				"Authorization": `Bearer ${localStorage.getItem("token")}`
			}
		})
		.then(res => res.json())
		.then(data => {

			setAllOrders(data.reverse());
			
			// console.log(data);
			
			// eslint-disable-next-line
			setAllOrders(data.map(order => {

				const priceFormatted = order.orderSubtotal.toLocaleString(undefined, { style: 'currency', currency: 'PHP' })

				for(let i=0; i<data.length; i++) {

				return(

					<tr key={order._id}>
						<td><div className="mt-3">{order.userId}</div></td>
						<td>
							<div className="mt-2">
							<Button 
								className="prodNameButton" 
								as={Link} to={`/products/${order.products[i].productId}`}
							>{order.products[i].productName}
							</Button>
							</div>
						</td>
						<td><div className="mt-3">{order.products[i].quantity}</div></td>
						<td><div className="mt-3">{priceFormatted}</div></td>
						<td><div className="mt-2">{formatDate(order.orderedOn)}</div></td>
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

		<Container>
      		<Row>
        		<Col md={12} lg={4}>
            		<AdminDash />
        		</Col>

        		<Col md={12} lg={8}>
        			<div className="dataLabel mt-4 text-center">
        			ORDER DATABASE
        			</div>
        			<div>
						<Container>
							<Table className="text-center mt-4" width="100%" striped bordered hover>
		     					<thead className="table-dark">
		       						<tr>
		         						<th width="10%">Customer Id</th>
		         						<th width="30%">Product</th>
		         						<th width="10%">Quantity</th>
		         						<th width="25%">Order Amount</th>
		         						<th width="25%">Order Date</th>
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