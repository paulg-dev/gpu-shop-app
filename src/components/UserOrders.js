
import { useContext, useState, useEffect } from "react";
import { Table, Container, Row, Col, Button } from "react-bootstrap";
import { Navigate, Link } from "react-router-dom";
import UserContext from "../UserContext";
import UserProfile from './UserProfile';

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

		fetch('http://localhost:4000/orders/getUserOrders',{
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
						<td><div className="mt-4">{order._id}</div></td>
						<td>
							<div className="mt-2">
							{order.products[i].quantity} pc/s of
							<Button 
								className="prodNameButton" 
								as={Link} to={`/products/${order.products[i].productId}`}
							>{order.products[i].productName}
							</Button>
							</div>
						</td>
						<td><div className="mt-4">{priceFormatted}</div></td>
						<td><div className="mt-4">{formatDate(order.orderedOn)}</div></td>
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

		(user.id !== null)
		?
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
						<Container>
							<Table className="text-center mt-4" width="100%" striped bordered hover>
		     					<thead className="table-dark">
		       						<tr>
		         						<th width="25%">Order Id</th>
		         						<th width="30%">Order Details</th>
		         						<th width="25%">Order Amount</th>
		         						<th width="20%">Order Date</th>
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