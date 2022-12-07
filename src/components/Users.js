import { useContext, useState, useEffect } from "react";
import { Table, Button, Container, Row, Col, OverlayTrigger, Popover } from "react-bootstrap";
import { Navigate } from "react-router-dom";
import UserContext from "../UserContext";
import AdminDash from './AdminDash';

import './Users.css'

import Swal from "sweetalert2";

export default function Users(){

	const {user} = useContext(UserContext);

	const [allUsers, setAllUsers] = useState([]);

	const fetchData = () =>{

		fetch(`${process.env.REACT_APP_API_URL}/users/`,{
			headers:{
				"Authorization": `Bearer ${localStorage.getItem("token")}`
			}
		})
		.then(res => res.json())
		.then(data => {
			
			// console.log(data);

			setAllUsers(data.map(user => {

				return(
					<tr key={user._id}>
						<td>{user.firstName}</td>
						<td>{user.lastName}</td>
						<td>
							<OverlayTrigger
								trigger="click"
								placement="left"
								overlay={
									<Popover>
									<Popover.Body>
										User ID: {user._id}
									</Popover.Body>
									</Popover>
								}
							>
							
								<Button className="userEmail">
								{user.email}
								</Button>
							</OverlayTrigger>	
						</td>
						<td>{user.mobileNo}</td>
						<td>{user.isAdmin ? "Admin" : "User"}</td>
						<td>

							{

								(user.isAdmin)
								?	
									<>

										<Button variant="secondary" size="sm" onClick ={() => notAdmin(user._id, user.firstName, user.lastName)}>to User</Button>

									</>
								:
									<>

										<Button variant="primary" size="sm" onClick ={() => admin(user._id, user.firstName, user.lastName)}>to Admin</Button>

									</>
							}

						</td>
					</tr>
				)
			}))
		})
	}


	const admin = (userId, userName, userLName) =>{

		console.log(userId);
		console.log(userName);

		fetch(`${process.env.REACT_APP_API_URL}/users/updateAdmin/${userId}`,{
			method: "PUT",
			headers:{
				"Content-Type": "application/json",
				"Authorization": `Bearer ${localStorage.getItem('token')}`
			},
			body: JSON.stringify({
				isAdmin: true
			})
		})
		.then(res => res.json())
		.then(data =>{
			console.log(data);

			if(data){
				Swal.fire({
					title: "Change Succesful!",
					icon: "success",
					text: `${userName} ${userLName} is now an admin.`
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


	const notAdmin = (userId, userName, userLName) =>{
		console.log(userId);
		console.log(userName);

		fetch(`${process.env.REACT_APP_API_URL}/users/updateUser/${userId}`,{
			method: "PUT",
			headers:{
				"Content-Type": "application/json",
				"Authorization": `Bearer ${localStorage.getItem('token')}`
			},
			body: JSON.stringify({
				isAdmin: false
			})
		})
		.then(res => res.json())
		.then(data =>{
			console.log(data);

			if(data){
				Swal.fire({
					title: "Change Succesful!",
					icon: "success",
					text: `${userName} ${userLName} is now a regular user.`
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
		<Container>
      		<Row>
        		<Col md={12} lg={4}>
            		<AdminDash />
        		</Col>
        		
        		<Col md={12} lg={8}>
        			<div className="dataLabel mt-4 text-center">
        			USER DATABASE
        			</div>
        			<div>
						<Container>
							<Table className="text-center mt-4" striped bordered hover>
		     				<thead className="table-dark">
		       					<tr>
		         					<th>First Name</th>
		         					<th>Last Name</th>
		         					<th>Email Address</th>
		         					<th>Mobile No.</th>
		         					<th>Role</th>
		         					<th>Update</th>
		       					</tr>
		           			</thead>
		     	   			<tbody>
		            			{ allUsers }
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