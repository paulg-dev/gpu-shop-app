
import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { UserProvider } from './UserContext';
import AppNavbar from './components/AppNavbar';
import Error from './pages/Error';
import Home from './pages/Home';
import Login from './pages/Login';
import Logout from './pages/Logout';
import Register from './pages/Register';
import Products from './pages/Products';
import AdminDash from './components/AdminDash';
import AllProducts from './components/AllProducts';
import ProductView from './components/ProductView';
// import AddProduct from './components/AddProduct';
import EditProduct from './components/EditProduct';
import Users from './components/Users';
import Orders from './components/Orders';

import './App.css';

function App() {

  const [user, setUser] = useState({
    id: null,
    isAdmin: null
  })

  const unsetUser = () => {
    localStorage.clear();
  }

  useEffect(()=>{

    fetch('http://localhost:4000/users/details',{
      method: 'GET',
      headers:{
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    
    .then(res=>res.json())
    .then(data=>{
      // console.log(data);

      if(typeof data._id !== "undefined"){
        setUser({
          id: data._id,
          isAdmin: data.isAdmin,
          email: data.email,
          firstName: data.firstName,
          lastName: data.lastName
        });
      }else{
        setUser({
          id: null,
          isAdmin: null
        })
      }
    })
  },[]);

  return (

    <UserProvider value = {{user, setUser, unsetUser}}>
        <Router>
          <AppNavbar/>
          <Container>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/logout" element={<Logout />} />
              <Route path="/register" element={<Register />} />
              <Route path="/products" element={<Products />} />
              <Route path="/admin" element={<AdminDash />} />
              {/*<Route path="/addProduct" element={<AddProduct />} />*/}
              <Route path="/editProduct/:productId" element={<EditProduct />} />
              <Route path="/products/:productId" element={<ProductView />} />
              <Route path="/admin/users" element={<Users />} />
              <Route path="/admin/orders" element={<Orders />} />
              <Route path="/admin/allProducts" element={<AllProducts />} />
              <Route path="*" element={<Error />} />
            </Routes>
          </Container>
        </Router>
    </UserProvider>

  );
}

export default App;
