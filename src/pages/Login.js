import { Form, Button, Container, Row, Col, Card } from 'react-bootstrap';
import { useState, useEffect, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import UserContext from '../UserContext';
import Swal from 'sweetalert2';


export default function Login() {

  const [email, setEmail] = useState ('');
  const [password, setPassword] = useState ('');
  const [isActive, setIsActive] = useState ('');

  // console.log(email);
  // console.log(password);

  const { user, setUser } = useContext(UserContext);

  function authenticate(e) {

     e.preventDefault()

      fetch('http://localhost:4000/users/login', {
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

        if(typeof data.access !== "undefined"){

          localStorage.setItem('token', data.access)
          localStorage.setItem('userId', data.id);
          localStorage.setItem('isAdmin', data.isAdmin);

          retrieveUserDetails(data.access)

          Swal.fire({
            title: "Login Successful!",
            icon: "success",
            text: "Welcome to my E-Commerce-App!"
          });

        }else{

          Swal.fire({
            title: "Login Failed!",
            icon: "error",
            text: "Check your email and password!" 
          });
          
        }
      })

    
      const retrieveUserDetails = (token) => {


        fetch('http://localhost:4000/users/details', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        .then(res=>res.json())
        .then(data=>{
        
        console.log("Data from bearer token fetch:");
        console.log(data);

          setUser({
            id: data._id,
            isAdmin: data.isAdmin
          });

        })

      }

      // setEmail("");
      setPassword("");


  }

  useEffect(()=>{

    if(email !== "" && password !== ""){
      setIsActive(true)
    } else {
      setIsActive(false)
    }
 
  }, [email, password])


  // console.log("User details set for current session:");
  // console.log(user);


  return (

    (user.id !== null)
    ?
    <Navigate to="/" />
    :
    <Container>
      <Row>
        <Col md={12} lg={6}>
            {/*<img src=""  className="img-fluid" alt="Sample Image" />*/}
        </Col>
        <Col md={12} lg={6}>

          <Card className="p-2 mb-3 mt-5" border="dark">
            <Card.Header as="h4">Log In</Card.Header>
            <Card.Body>

                <Form className="mt-3" onSubmit={(e)=>authenticate(e)}>

                  <Form.Group className="mb-4 " controlId="userEmail">
                    {/*<Form.Label>Email address</Form.Label>*/}
                    <Form.Control
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={e=>setEmail(e.target.value)}
                    required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="password">
                    {/*<Form.Label>Password</Form.Label>*/}
                    <Form.Control
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={e=>setPassword(e.target.value)}
                    required
                      />
                  </Form.Group>

                  <div className="text-center">
                  { isActive ?
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


  );
}