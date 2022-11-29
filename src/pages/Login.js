import { Form, Button } from 'react-bootstrap';
import { useState, useEffect, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import UserContext from '../UserContext';
import Swal from 'sweetalert2';


export default function Login() {


  const [email, setEmail] = useState ('');
  const [password, setPassword] = useState ('');
  const [isActive, setIsActive] = useState ('');

  console.log(email);
  console.log(password);

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

        console.log(data);


        if(typeof data.access !== "undefined"){

          localStorage.setItem('token',data.access)

          retrieveUserDetails(data.access)

          Swal.fire({
            title: "Login Successful!",
            icon: "success",
            text: "Welcome to my E-Commerce-App!"
          });

        }else{

          Swal.fire({
            title: "Authentication Failed!",
            icon: "error",
            text: "Check your credentials!" 
          });
          
        }
      })

    
      const retrieveUserDetails = (token) =>{

        fetch('http//localhost:4000/users/details', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        .then(res=>res.json())
        .then(data=>{
          console.log(data);


          setUser({
            id: data._id,
            isAdmin: data.isAdmin
          });
        })
      }

      setEmail("");
      setPassword("");

  }

  useEffect(()=>{

    if(email !== "" && password !== ""){
      setIsActive(true)
    } else {
      setIsActive(false)
    }
 

  }, [email, password])


  return (

    (user.id !== null)
    ?
    <Navigate to="/courses"/>

    :
    <Form onSubmit={(e)=>authenticate(e)}>
      <Form.Group className="mb-3" controlId="userEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={e=>setEmail(e.target.value)}
        required
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="password">
        <Form.Label>Password</Form.Label>
        <Form.Control
        type="password"
        placeholder="Password"
        value={password}
        onChange={e=>setPassword(e.target.value)}
        required
        />
      </Form.Group>
      
      { isActive ?
      <Button variant="success" type="submit" id="submitBtn">
        Login
      </Button>
      :
      <Button variant="danger" type="submit" id="submitBtn" disabled>
        Login
      </Button>
      }

    </Form>
  );
}