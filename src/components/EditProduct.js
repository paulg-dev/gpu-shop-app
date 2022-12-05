import { useState, useEffect, useContext } from 'react';
import { Navigate, useParams, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import UserContext from '../UserContext';
import AdminDash from './AdminDash';

import { Form, Button, Container, Col, Row, Card, InputGroup } from 'react-bootstrap';

export default function EditProduct() {

	const {user} = useContext(UserContext);

	const { productId } = useParams();

	const navigate = useNavigate();


	const [name, setName] = useState('');
	const [description, setDescription] = useState('');
	const [imageUrl, setImageUrl] = useState('');
	const [brand, setBrand] = useState('');
	const [isListed, setIsListed] = useState(true);
	const [isFeatured, setIsFeatured] = useState(false);
	const [price, setPrice] = useState(0);
	const [stocks, setStocks] = useState(0);


    const [isActive, setIsActive] = useState(false);


	function editProduct(e) {

	    e.preventDefault();

	    fetch(`http://localhost:4000/products/${productId}`, {
	    	method: "PUT",
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

	    	if(data===true){
	    		Swal.fire({
	    		    title: "Edit Success!",
	    		    icon: "success",
	    		    text: `${name} has been updated!`
	    		});

	    		navigate("/admin/allProducts");
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
	    setImageUrl('');
	    setBrand('Select Brand');
	    setIsListed(true);
	    setIsFeatured(false);
	    setPrice(0);
	    setStocks(0);

	}


	useEffect(() => {


        if(name !== "" && description !== "" && imageUrl !== "" && (brand !=="" && brand !== "Select Brand") && price > 0 && stocks > 0){
            setIsActive(true);
        } else {
            setIsActive(false);
        }

    }, [name, description, imageUrl, brand, price, stocks]);


    useEffect(()=> {

    	console.log(productId);

    	fetch(`http://localhost:4000/products/${productId}`,{
			method: "GET",
			headers:{
				"Content-Type": "application/json",
				"Authorization": `Bearer ${localStorage.getItem('token')}`
			}
		})
		.then(res => res.json())
		.then(data =>{

    		console.log(data);

    		setName(data.name);
    		setDescription(data.description);
    		setImageUrl(data.imageUrl);
    		setBrand(data.brand);
    		setIsListed(data.isListed);
    		setIsFeatured(data.isFeatured);
    		setPrice(data.price);
    		setStocks(data.stocks);

    	});

    }, [productId]);

    function backButton(){
    	window.history.back()
    }



    return (

    	user.isAdmin
    	?
    	<>
    	<Container>
    		<Row>
    			<Col md={12} lg={4}>
            		<AdminDash />
        		</Col>
        		
        		<Col md={12} lg={8}>

        		<Card className="p-2 mb-3 mt-5" border="dark">
            		<Card.Header as="h4">Edit Product</Card.Header>
            		<Card.Body>
			
		    	{/*<h5 className="my-5 text-center">Edit Product</h5>*/}
		        <Form onSubmit={(e) => editProduct(e)}>
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
		            				value = {brand}
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
			                			placeholder="Enter Number of Stocks" 
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
	        	    		Update Product
	        	    	</Button>
	        	        : 
	        	        <Button variant="danger" type="submit" id="submitBtn" disabled>
	        	        	Update Product
	        	        </Button>
	        	    }
	        	    	{/*<Button className="m-2" as={Link} to="/admin/allProducts" variant="danger" type="submit" id="submitBtn">
	        	    	*/}<Button className="m-2" onClick={backButton} variant="danger">
	        	    		Cancel
	        	    	</Button>
	        	    </div>
		        </Form>
		        	</Card.Body>
		        	</Card>

		        </Col>
		    </Row>
		</Container> 
	   	</>
    	:
    	    <Navigate to="/products" />
	    	
    )

}