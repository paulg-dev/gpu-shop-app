import { useContext, useState, useEffect } from "react";
import { Table, Container, Row, Col } from "react-bootstrap";
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
			
			// eslint-disable-next-line
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

		<Container>
      		<Row>
        		<Col md={12} lg={4}>
            		<AdminDash />
        		</Col>

        		<Col md={12} lg={8}>
        			<div>
						<Container>
							<Table className="text-center my-5" striped bordered hover>
		     					<thead className="table-dark">
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
        		</Col>
      		</Row>
    	</Container>

			
		</>
		:
		<Navigate to="/login" />
			
	)
}