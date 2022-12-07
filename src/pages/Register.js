import { Form, Button, Container, Row, Col, Card } from 'react-bootstrap';
import { useState, useEffect, useContext } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import UserContext from '../UserContext';
import Swal from 'sweetalert2';


export default function Register() {

  const { user } = useContext(UserContext);

  const navigate = useNavigate();

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email,setEmail] = useState('');
    const [mobileNo, setMobileNo] = useState('');
    const [password1, setPassword1] = useState('');
    const [password2, setPassword2] = useState('');

    const [isActive, setIsActive] = useState(false);


    function registerUser(e){


      e.preventDefault();


      fetch(`${process.env.REACT_APP_API_URL}/users/checkEmail`,{
        method: "POST",
        headers:{
          'Content-Type':'application/json'
        },
        body: JSON.stringify({
          email: email
        })
      })
      .then(res=>res.json())
      .then(data=>{
      
      console.log(data)

        if(data === true){

            Swal.fire({
            title: "Duplicate Email Found!",
            icon: "error",
            text: "Kindly use another email to complete the registration!"
          })

        }else{

          fetch(`${process.env.REACT_APP_API_URL}/users/register`,{
            method:"POST",
            headers:{
              'Content-Type':'application/json'
            },
            body: JSON.stringify({
              firstName: firstName,
              lastName: lastName,
              email: email,
              mobileNo: mobileNo,
              password: password1
            })
          })
          .then(res=>res.json())
          .then(data=>{
          	

            if(data === true){

              setFirstName("");
              setLastName("");
              setEmail("");
              setMobileNo("");
              setPassword1("");
              setPassword2("");

              Swal.fire({
                title: "Registration successful!",
                icon: "success",
                text: "Please login to start shopping!"
              })

              navigate("/login")

            }else{

              Swal.fire({
                title: "Something went wrong!",
                icon: "error",
                text: "Please try again!"

            })



          }
        })
      }
    })
  }


  useEffect(()=>{

    if ((firstName !=="" && lastName !== "" && mobileNo.length === 11 && email !=="" && password1 !=="" && password2 !=="")&&(password1===password2)){
      setIsActive(true)
    }else{
      setIsActive(false)
    }

  }, [firstName, lastName, email, mobileNo, password1, password2]);


  return (

    (user.id !== null)
    ?
    <Navigate to="/products"/>
    :
    <Container>
      <Row>
        <Col md={12} lg={7}>
            {/*<img src=""  className="img-fluid" alt="Sample Image" />*/}
        </Col>
        <Col md={12} lg={5}>

        <Card className="p-2 mb-3 mt-5" border="dark">
            <Card.Header as="h4">Register</Card.Header>
            <Card.Body>

          <Form className="mt-3" onSubmit={(e)=>registerUser(e)}>
            <Form.Group className="mb-3" controlId="firstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control
              type="text"
              placeholder=""
              value={firstName}
              onChange={e=>setFirstName(e.target.value)}
              required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="lastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
              type="text"
              placeholder=""
              value={lastName}
              onChange={e=>setLastName(e.target.value)}
              required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="userEmail">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
              type="email"
              placeholder="Enter a valid email address"
              value={email}
              onChange={e=>setEmail(e.target.value)}
              required
              />
              
            </Form.Group>

            <Form.Group className="mb-3" controlId="mobileNo">
              <Form.Label>Mobile Number</Form.Label>
              <Form.Control
              type="text"
              placeholder="Mobile number must be 11 digits"
              value={mobileNo}
              onChange={e=>setMobileNo(e.target.value)}
              required
              />
              <Form.Text className="text-muted">
                
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="password1">
              <Form.Label>Password</Form.Label>
              <Form.Control
              type="password"
              placeholder="Passwords must match"
              value={password1}
              onChange={e=>setPassword1(e.target.value)}
              required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="password2">
              <Form.Label>Verify Password</Form.Label>
              <Form.Control
              type="password"
              placeholder="Passwords must match"
              value={password2}
              onChange={e=>setPassword2(e.target.value)}
              required/>
            </Form.Group>

              <div className="text-center">
              { isActive ?      
                  <Button variant="success" type="submit" id="submitBtn">
                      Sign Up
                  </Button>
                :
                  <Button variant="danger" type="submit" id="submitBtn" disabled>
                      Sign Up
                  </Button>
              }
              </div>
           </Form>

            </Card.Body>
            <Card.Footer className="text-center">
                  Already have an account? <a href="/login">Log In</a>
            </Card.Footer>
          </Card>  

        </Col>
      </Row>
    </Container>

  );
}