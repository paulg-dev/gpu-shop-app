
import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { UserProvider } from './UserContext';
import AppNavbar from './components/AppNavbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Logout from './pages/Logout';
import Register from './pages/Register';
import Error from './pages/Error';
import ProductView from './components/ProductView';
import ActiveProducts from './pages/ActiveProducts';
import EditProduct from './components/EditProduct';
import NvidiaFilter from './components/NvidiaFilter';
import AmdFilter from './components/AmdFilter';
import IntelFilter from './components/IntelFilter';
import UserProfile from './components/UserProfile';
import UserOrder from './components/UserOrder';
import UserCart from './components/UserCart';
import AdminDashboard from './components/AdminDashboard';
import AdminProductDatabase from './components/AdminProductDatabase';
import AdminUserDatabase from './components/AdminUserDatabase';
import AdminOrderDatabase from './components/AdminOrderDatabase';
import Footer from './components/Footer';
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
    fetch(`${process.env.REACT_APP_API_URL}/users/details`, {
      method: 'GET',
      headers:{
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then(res => res.json())
    .then(data => {

      if (typeof data._id !== "undefined") {
        setUser({
          id: data._id,
          isAdmin: data.isAdmin,
          email: data.email,
          firstName: data.firstName,
          lastName: data.lastName,
          mobileNo: data.mobileNo,
          cart: data.cart
        });
      } else {
        setUser({
          id: null,
          isAdmin: null
        })
      }
    })
  }, []);

  return (
    
    <UserProvider value = {{user, setUser, unsetUser}}>
        <Router>
          <AppNavbar />
          <Container className="main-container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/logout" element={<Logout />} />
              <Route path="/products" element={<ActiveProducts />} />
              <Route path="/products/nvidia" element={<NvidiaFilter />} />
              <Route path="/products/amd" element={<AmdFilter />} />
              <Route path="/products/intel" element={<IntelFilter />} />
              <Route path="/products/:productId" element={<ProductView />} />
              <Route path="/editProduct/:productId" element={<EditProduct />} />
              <Route path="/users/details" element={<UserProfile />} />
              <Route path="/users/getUserOrders" element={<UserOrder />} />
              <Route path="/users/viewCart" element={<UserCart />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin/users" element={<AdminUserDatabase />} />
              <Route path="/admin/orders" element={<AdminOrderDatabase />} />
              <Route path="/admin/allProducts" element={<AdminProductDatabase />} />
              <Route path="*" element={<Error />} />
            </Routes>
          </Container>
          <Footer />
        </Router>
    </UserProvider>

  )
}

export default App;
