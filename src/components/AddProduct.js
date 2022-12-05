import { useState, useEffect, useContext } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import UserContext from '../UserContext';

import { Form, Button, InputGroup, Row, Col } from 'react-bootstrap';

export default function AddProduct() {

	const {user} = useContext(UserContext);

	const navigate = useNavigate();


	const [name, setName] = useState('');
	const [description, setDescription] = useState('');
	const [imageUrl, setImageUrl] = useState('https://e1.pngegg.com/pngimages/485/484/png-clipart-bundle-icon-gpu-cpu-file-icon-thumbnail.png');
	const [brand, setBrand] = useState('');
	const [isListed, setIsListed] = useState(true);
	const [isFeatured, setIsFeatured] = useState(false);
	const [price, setPrice] = useState(0);
	const [stocks, setStocks] = useState(0)

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
			    imageUrl: imageUrl,
			    brand: brand,
			    isListed: isListed,
			    isFeatured: isFeatured,
			    price: price,
			    stocks: stocks

			})
	    })
	    .then(res => res.json())
	    .then(data => {
	    	
	    	console.log(data);
	    	console.log(data.err);

	    	if(data === true){
	    		Swal.fire({
	    		    title: "Product succesfully Added",
	    		    icon: "success",
	    		    text: `${name} is now listed in the shop.`
	    		});


	    		navigate("/admin/allProducts");
	    	}

	    	else if(data.err === 'Similar Product Name'){
	    		Swal.fire({
	    		    title: "Error!",
	    		    icon: "error",
	    		    text: `A product with the name ${name} is already listed the the shop.`,
	    		});


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
	    setImageUrl('https://e1.pngegg.com/pngimages/485/484/png-clipart-bundle-icon-gpu-cpu-file-icon-thumbnail.png');
	    setBrand('Select Brand');
	    setIsListed(true);
	    setIsFeatured(false);
	    setPrice(0);
	    setStocks(0);


	}

	useEffect(() => {


        if(name !== "" && description !== "" && (brand !=="" && brand !== "Select Brand") && price > 0 && stocks > 0){
            setIsActive(true);
        } else {
            setIsActive(false);
        }

    }, [name, description, imageUrl, brand, price, stocks]);

    return (
    	user.isAdmin
    	?
			<>
		    	{/*<h1 className="my-5 text-center">Add a Product</h1>*/}
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
		                />
		            </Form.Group>

		            <Form.Group controlId="imageUrl" className="mb-3">
		                <Form.Label>Image Url</Form.Label>
		                <Form.Control 
			                type="text"
			                placeholder="Enter Image Url" 
			                value = {imageUrl}
			                onChange={e => setImageUrl(e.target.value)}
		                />
		            </Form.Group>

		            <div className="d-flex p-2 mb-3 justify-content-center">

		            			<Form.Select
		            				className="mx-4 px-2"
		            				required
		            				onChange={e => setBrand(e.target.value)}>
      								<option className="mx-3">Select Brand</option>
      								<option value="nvidia">NVIDIA</option>
      								<option value="amd">AMD</option>
      								<option value="intel">INTEL</option>
    							</Form.Select>

		            			<Form.Check className="mx-4"
        							type="checkbox"
        							label="List Product"
      							/>

		            			<Form.Check className="mx-4"
		            				type="checkbox"
        							label="Feature Product"
      							/>

		            </div>

		            <div>
		            	<Row>

		            		<Col>
		            			<Form.Group controlId="price" className="mb-3">
		                			<Form.Label>Product Price</Form.Label>
		                			<InputGroup>
		                			<InputGroup.Text>₱</InputGroup.Text>
		                			<Form.Control
		                				className="text-end" 
			                			type="number"
			                			min = {0}
			                			placeholder="Enter Product Price" 
			                			value = {price}
			                			onChange={e => setPrice(e.target.value)}
			                			required
		                			/>
		                			<InputGroup.Text>.00</InputGroup.Text>
		                			</InputGroup>
		            			</Form.Group>
		            		</Col>

		            		<Col>
		            			<Form.Group controlId="stocks" className="mb-3">
		                			<Form.Label>Stocks</Form.Label>
		                			<InputGroup>
		                			<Form.Control 
		                				className="text-end"
			                			type="number"
			                			min = {0}
			                			placeholder="Enter Stocks" 
			                			value = {stocks}
			                			onChange={e => setStocks(e.target.value)}
			                			required
		                			/>
		                			<InputGroup.Text>pcs</InputGroup.Text>
		               			 	</InputGroup>
		            			</Form.Group>
		            		</Col>

		            	</Row>
		            </div>

		            <div className="text-center">
	        	    { isActive 
	        	    	? 
	        	    	<Button variant="success" type="submit" id="submitBtn">
	        	    		Save Product
	        	    	</Button>
	        	        : 
	        	        <Button variant="danger" type="submit" id="submitBtn" disabled>
	        	        	Save Product
	        	        </Button>
	        	    }
						{/*<Button className="m-2" as={Link} to="/admin/allProducts" variant="success" type="submit" id="submitBtn">
	        	    		Cancel
	        	    	</Button>*/}
	        	    </div>

		        </Form>
	    	</>
    	:
    	    <Navigate to="/products" />
	    	
    )

}
