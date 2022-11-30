import { useState, useEffect, useContext } from 'react';
import { Navigate, Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import UserContext from '../UserContext';

import { Form, Button } from 'react-bootstrap';

export default function AddProduct() {

	const {user} = useContext(UserContext);

	const navigate = useNavigate();


	const [name, setName] = useState('');
	const [description, setDescription] = useState('');
	const [price, setPrice] = useState(0);

    const [isActive, setIsActive] = useState(false);

	function addProduct(e) {

	    e.preventDefault();

	    fetch('http://localhost:4000/products/', {
	    	method: "POST",
	    	headers: {
				"Content-Type": "application/json",
				"Authorization": `Bearer ${localStorage.getItem('token')}`
			},
			body: JSON.stringify({
			    name: name,
			    description: description,
			    price: price,

			})
	    })
	    .then(res => res.json())
	    .then(data => {
	    	
	    	console.log(data);

	    	if(data){
	    		Swal.fire({
	    		    title: "Product succesfully Added",
	    		    icon: "success",
	    		    text: `${name} is now listed in the shop.`
	    		});

	    		navigate("/admin");
	    	}
	    	else{
	    		Swal.fire({
	    		    title: "Error!",
	    		    icon: "error",
	    		    text: `Something went wrong. Please try again later!`
	    		});
	    	}

	    })


	    setName('');
	    setDescription('');
	    setPrice(0);

	}

	useEffect(() => {


        if(name !== "" && description !== "" && price > 0){
            setIsActive(true);
        } else {
            setIsActive(false);
        }

    }, [name, description, price]);

    return (
    	user.isAdmin
    	?
			<>
		    	<h1 className="my-5 text-center">Add a Product</h1>
		        <Form onSubmit={(e) => addProduct(e)}>
		        	<Form.Group controlId="name" className="mb-3">
		                <Form.Label>Product Name</Form.Label>
		                <Form.Control 
			                type="text" 
			                placeholder="Enter Product Name" 
			                value = {name}
			                onChange={e => setName(e.target.value)}
			                required
		                />
		            </Form.Group>

		            <Form.Group controlId="description" className="mb-3">
		                <Form.Label>Product Description</Form.Label>
		                <Form.Control
		                	as="textarea"
		                	rows={3}
			                placeholder="Enter Product Description" 
			                value = {description}
			                onChange={e => setDescription(e.target.value)}
			                required
		                />
		            </Form.Group>

		            <Form.Group controlId="price" className="mb-3">
		                <Form.Label>Product Price</Form.Label>
		                <Form.Control 
			                type="number" 
			                placeholder="Enter Product Price" 
			                value = {price}
			                onChange={e => setPrice(e.target.value)}
			                required
		                />
		            </Form.Group>

	        	    { isActive 
	        	    	? 
	        	    	<Button variant="primary" type="submit" id="submitBtn">
	        	    		Save
	        	    	</Button>
	        	        : 
	        	        <Button variant="danger" type="submit" id="submitBtn" disabled>
	        	        	Save
	        	        </Button>
	        	    }
	        	    	<Button className="m-2" as={Link} to="/admin" variant="success" type="submit" id="submitBtn">
	        	    		Cancel
	        	    	</Button>
		        </Form>
	    	</>
    	:
    	    <Navigate to="/products" />
	    	
    )

}