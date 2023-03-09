
import { Form, Button, InputGroup, Row, Col } from 'react-bootstrap';
import { useState, useEffect, useContext } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import UserContext from '../UserContext';


export default function AddProduct() {

	const {user} = useContext(UserContext);

	const navigate = useNavigate();

	const [name, setName] = useState('');
	const [description, setDescription] = useState('');
	const [imageUrl, setImageUrl] = useState(require('../images/defaultGpu.png'));
	const [brand, setBrand] = useState('');
	const [isListed, setIsListed] = useState(true);
	const [isFeatured, setIsFeatured] = useState(false);
	const [price, setPrice] = useState(0);
	const [stocks, setStocks] = useState(0)
    const [isActive, setIsActive] = useState(false);

    const handleListChange = () => {
    	setIsListed(!isListed)
    	if (!isListed === false && isFeatured === true) {
    		setIsFeatured(false);
    	}
  	};

  	const handleFeatureChange = () => {
    	setIsFeatured(!isFeatured)
    	if (!isFeatured === true && isListed === false) {
    		setIsFeatured(false);
    	}
  	};

	function addProduct(e) {

	    e.preventDefault();

	    fetch(`${process.env.REACT_APP_API_URL}/products/`, {
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

	    	if (data === true) {
	    		Swal.fire({
	    		    icon: "success",
	    		    title: "Product successfully added.",
	    		    html: `<strong> ${name} </strong> <br>
				  		is now listed in the shop.`,
				  	confirmButtonColor: "#183153"
	    		});

	    		navigate("/admin/allProducts");
	    	} else if (data.err === 'Similar Product Name') {
	    		Swal.fire({
	    		    title: "Error!",
	    		    icon: "error",
	    		    text: `A product with the name ${name} is already listed the the shop.`,
	    		    confirmButtonColor: "#183153"
	    		});
	    	} else {
	    		Swal.fire({
	    		    title: "Error!",
	    		    icon: "error",
	    		    text: `Something went wrong. Please try again later!`
	    		});
	    	}
	    })

	    setName('');
	    setDescription('');
	    setImageUrl(require('../images/defaultGpu.png'));
	    setBrand('Select Brand');
	    setIsListed(true);
	    setIsFeatured(false);
	    setPrice(0);
	    setStocks(0);

	}

	useEffect(() => {

        if ((name !== "" && description !== "") 
        	&& (brand !=="" && brand !== "Select Brand")
        	&& (price > 0 && stocks > 0)) {
            setIsActive(true);
        } else {
            setIsActive(false);
        }

    }, [name, description, imageUrl, brand, price, stocks]);

    return (
    	user.isAdmin ?
		<>
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
	                	rows={4}
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
	            <Row>
	            	<Col sm={6} className="d-flex p-2 my-auto justify-content-center">
        			<Form.Select
        				className="mx-4 px-2"
        				required
        				onChange={e => setBrand(e.target.value)}>
							<option className="mx-3">Select Brand</option>
							<option value="nvidia">NVIDIA</option>
							<option value="amd">AMD</option>
							<option value="intel">INTEL</option>
					</Form.Select>
					</Col>
					<Col sm={6} className="d-flex p-2 my-auto justify-content-center">
	        			<Form.Check
	        				className="mx-auto"
							type="checkbox"
							label="List Product"
							checked={isListed}
							onChange={handleListChange}
						/>
	        			<Form.Check 
	        				className="mx-auto"
	        				type="checkbox"
							label="Feature Product"
							checked={isFeatured}
							onChange={handleFeatureChange}
						/>
					</Col>
	            </Row>
            	<Row>
            		<Col xs={7}>
            			<Form.Group controlId="price" className="mb-3">
                			<Form.Label>Product Price</Form.Label>
                			<InputGroup>
                			<InputGroup.Text>₱</InputGroup.Text>
                			<Form.Control
                				className="text-end" 
	                			type="number"
	                			min = {0}
	                			placeholder="Price" 
	                			value = {price}
	                			onChange={e => setPrice(e.target.value)}
	                			required
                			/>
                			<InputGroup.Text>.00</InputGroup.Text>
                			</InputGroup>
            			</Form.Group>
            		</Col>
            		<Col xs={5}>
            			<Form.Group controlId="stocks" className="mb-3">
                			<Form.Label>Stocks</Form.Label>
                			<InputGroup>
                			<Form.Control 
                				className="text-end"
	                			type="number"
	                			min = {0}
	                			placeholder="Stocks" 
	                			value = {stocks}
	                			onChange={e => setStocks(e.target.value)}
	                			required
                			/>
                			<InputGroup.Text>pcs</InputGroup.Text>
               			 	</InputGroup>
            			</Form.Group>
            		</Col>
            	</Row>
	            <div className="text-center">
        	    { 
        	    	isActive ? 
        	    	<Button variant="success" type="submit" id="submitBtn">
        	    		Save Product
        	    	</Button>
        	        : 
        	        <Button variant="danger" type="submit" id="submitBtn" disabled>
        	        	Save Product
        	        </Button>
        	    }
        	    </div>
	        </Form>
    	</>
    	:
    	<Navigate to="/products" />
	    	
    )

}
