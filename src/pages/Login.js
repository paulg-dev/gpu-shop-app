
import { Form, Button, Container, Row, Col, Card, FloatingLabel } from 'react-bootstrap';
import { useState, useEffect, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import UserContext from '../UserContext';
import Swal from 'sweetalert2';


export default function Login() {

  const { user, setUser } = useContext(UserContext);

  const [email, setEmail] = useState ('');
  const [password, setPassword] = useState ('');
  const [isActive, setIsActive] = useState ('');

  function authenticate(e) {

     e.preventDefault()

      fetch(`${process.env.REACT_APP_API_URL}/users/login`, {
        method: 'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body: JSON.stringify({
          email: email,
          password: password
        })
      })
      .then(res=>res.json())
      .then(data=>{

      console.log("Data from login fetch:")  
      console.log(data);

        if (typeof data.access !== "undefined") {
          localStorage.setItem('token', data.access)
          localStorage.setItem('userId', data.id);
          localStorage.setItem('isAdmin', data.isAdmin);

          retrieveUserDetails(data.access)

          Swal.fire({
            title: `Welcome ${data.firstName}!`,
            icon: "success",
            text: "It's time for a new GPU!",
            confirmButtonColor: "#183153"
          });
        } else {
          Swal.fire({
            title: "Login Failed!",
            icon: "error",
            text: "Check your email and password!" 
          });
        }
      })
    
      const retrieveUserDetails = (token) => {


        fetch(`${process.env.REACT_APP_API_URL}/users/details`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        .then(res => res.json())
        .then(data => {
        
        console.log("Data from bearer token fetch:");
        console.log(data);

          setUser({
            id: data._id,
            isAdmin: data.isAdmin,
            email: data.email,
            firstName: data.firstName,
            lastName: data.lastName,
            mobileNo: data.mobileNo,
            cart: data.cart
          });
        })
      }
      // setEmail("");
      setPassword("");
  }

  useEffect(() => {

    if (email !== "" && password !== "") {
      setIsActive(true)
    } else {
      setIsActive(false)
    }
 
  }, [email, password])

  return (

    (user.id !== null)
    ?
    <Navigate to="/" />
    :
    <Container className="loginContainer">
      <Row>
        <Col md={12} lg={7}>
            
        </Col>
        <Col md={12} lg={5}>
          <Card className="p-2" border="dark">
            <Card.Header as="h4">Log In</Card.Header>
            <Card.Body>
                <Form className="mt-3" onSubmit={e => authenticate(e)}>
                  <Form.Group className="mb-4 " controlId="userEmail">
                    <FloatingLabel
                      controlId="floatingEmail"
                      label="Email address"
                    >  
                    <Form.Control
                      type="email"
                      placeholder="Email address"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      required
                    />
                    </FloatingLabel>
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="password">
                    <FloatingLabel
                      controlId="floatingPassword"
                      label="Password"
                    >
                    <Form.Control
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      required
                    />
                    </FloatingLabel>
                  </Form.Group>
                  <div className="text-center">
                    { 
                      isActive ?
                      <Button width="50" variant="success" type="submit" id="submitBtn">
                        Sign In
                      </Button>
                      :
                      <Button width="50" variant="danger" type="submit" id="submitBtn" disabled>
                        Sign In
                      </Button>
                    }
                  </div>
                </Form>
            </Card.Body>
            <Card.Footer className="text-center">
                  Don't have an account? <a href="/register">Register</a>
            </Card.Footer>
          </Card>     
        </Col>
      </Row>
    </Container>
    
  )
}