
import { Navigate } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import UserContext from '../UserContext';
import Swal from 'sweetalert2';

export default function Logout() {

		const { unsetUser, setUser } = useContext(UserContext);

		Swal.fire({
			toast: true,
			width: 280,
  			title: 'Logged out!',
  			icon: 'success',
  			showConfirmButton: false,
  			timer: 2000
		})

		unsetUser();

		useEffect(() => {
			setUser({id: null});
		})

		return (
			<Navigate to="/login"/>
		)
}