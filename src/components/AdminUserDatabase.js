
import { Table, Button, Row, Col, OverlayTrigger, Popover } from "react-bootstrap";
import { faUser, faPhone } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useContext, useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import AdminDashboard from './AdminDashboard';
import UserContext from "../UserContext";
import Swal from "sweetalert2";


export default function Users() {

	const {user} = useContext(UserContext);

	const [allUsers, setAllUsers] = useState([]);

	const fetchData = () => {

		fetch(`${process.env.REACT_APP_API_URL}/users/`, {
			headers:{
				"Authorization": `Bearer ${localStorage.getItem("token")}`
			}
		})
		.then(res => res.json())
		.then(data => {

			setAllUsers(data.map((user, index) => {

				return (
					<tr key={user._id}>
						<td className="sm-table-fontsize">{index + 1}</td>
						<td className="hide-on-small">{user.firstName}</td>
						<td className="hide-on-small">{user.lastName}</td>
						<td>
							<OverlayTrigger
								trigger="click"
								placement="top"
								overlay={
									<Popover>
										<Popover.Body className="text-center">
											User Id : {user._id}
											<div className="show-on-small">
												<FontAwesomeIcon icon={faUser} /> {user.firstName} {user.lastName}<br />
												<FontAwesomeIcon icon={faPhone} /> {user.mobileNo} 
											</div>
										</Popover.Body>
									</Popover>
								}
							>
								<Button className="user-email-button">
									{user.email}
								</Button>
							</OverlayTrigger>	
						</td>
						<td className="hide-on-small">{user.mobileNo}</td>
						<td className="hide-on-small">{user.isAdmin ? "Admin" : "User"}</td>
						<td className="sm-table-fontsize">
							{
								(user.isAdmin) ?
								<Button
									variant="secondary"
									size="sm"
									onClick ={() => notAdmin(user._id, user.firstName, user.lastName)}
								>
									to User
								</Button>
								:
								<Button
									variant="primary"
									size="sm"
									onClick ={() => admin(user._id, user.firstName, user.lastName)}
								>
									to Admin
								</Button>
							}
						</td>
					</tr>
				)
			}))
		})
	}


	const admin = (userId, userName, userLName) => {

		console.log(userId);
		console.log(userName);

		fetch(`${process.env.REACT_APP_API_URL}/users/updateAdmin/${userId}`, {
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
		.then(data => {

			if (data) {
				Swal.fire({
					title: "Change Succesful!",
					icon: "success",
					text: `${userName} ${userLName} is now an admin.`,
					confirmButtonColor: "#183153"
				})
				fetchData();
			} else {
				Swal.fire({
					title: "Change Unsuccessful!",
					icon: "error",
					text: `Something went wrong. Please try again later!`
				})
			}
		})
	}


	const notAdmin = (userId, userName, userLName) => {

		fetch(`${process.env.REACT_APP_API_URL}/users/updateUser/${userId}`, {
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
		.then(data => {

			if (data) {
				Swal.fire({
					title: "Change Succesful!",
					icon: "success",
					text: `${userName} ${userLName} is now a regular user.`,
					confirmButtonColor: "#183153"
				})
				fetchData();
			} else {
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


	return (
		
		(user.isAdmin) ?
		<>
      		<Row>
        		<Col md={12} lg={4}>
            		<AdminDashboard />
        		</Col>
        		<Col md={12} lg={8}>
        			<div className="data-label mt-4 text-center">
        				USER DATABASE
        			</div>
        			<div className="admin-table-container">
						<Table className="admin-data-table text-center mt-4 align-middle" striped hover>
	     				<thead className="align-middle">
	       					<tr>
	       						<th>#</th>
	         					<th className="hide-on-small">First Name</th>
	         					<th className="hide-on-small">Last Name</th>
	         					<th>Email Address</th>
	         					<th className="hide-on-small">Mobile No.</th>
	         					<th className="hide-on-small">Role</th>
	         					<th>Update</th>
	       					</tr>
	           			</thead>
	     	   			<tbody>
	            			{ allUsers }
	           			</tbody>
	        			</Table>
		    		</div>
        		</Col>
      		</Row>
		</>
		:
		<Navigate to="/login" />
			
	)
}