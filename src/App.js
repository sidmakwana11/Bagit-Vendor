import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './pages/homePage/HomePage';
import LoginForm from './userAuth/Login/Login';
import RegisterForm from './userAuth/Register/Register';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Orders from './pages/orders/Orders';
import Dashboard from './pages/dashboard/Dashboard';
import AddProducts from './pages/addProducts/AddProducts';
import Profile from './pages/profile/Profile';
import Categories from './pages/products/Products';
import Customers from './pages/customers/Customers';
import AddAdmin from './pages/addStaff/AddStaff';
import UpdateProducts from './pages/addProducts/UpdateProduct';
import Category from './pages/category/Category';
import SubSubCategory from './pages/category/SubSubCategory';
import SubCategory from './pages/category/SubCategory';
import ProtectedRoute from './components/protectedRoutes';
import Team from './pages/team/team';
import Email from './components/emailConfirmation/email';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <ToastContainer position="top-left" autoClose={3000} />
      <Routes>
        <Route path="/Register" element={<RegisterForm/>}/>
        <Route path="/" element={<LoginForm/>}/>
        <Route path="/HomePage" element={<HomePage/>}/>
        <Route path="/Dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>}/>
        <Route path="/Orders" element={<ProtectedRoute><Orders/></ProtectedRoute>}/>
        <Route path="/Products" element={<ProtectedRoute><Categories/></ProtectedRoute>}/>
        <Route path="/AddProducts" element={<ProtectedRoute><AddProducts/></ProtectedRoute>}/>
        <Route path="/UpdateProducts" element={<ProtectedRoute><UpdateProducts/></ProtectedRoute>}/>
        <Route path="/Category" element={<ProtectedRoute><Category/></ProtectedRoute>}/>
        <Route path="/SubCategory" element={<ProtectedRoute><SubCategory/></ProtectedRoute>}/>
        <Route path="/SubSubCategory" element={<ProtectedRoute><SubSubCategory/></ProtectedRoute>}/>
        <Route path="/Customers" element={<ProtectedRoute><Customers/></ProtectedRoute>}/>
        <Route path="/Profile" element={<ProtectedRoute><Profile/></ProtectedRoute>}/>
        <Route path="/Team" element={<ProtectedRoute><Team/></ProtectedRoute>}/>
        <Route path="/Addstaff" element={<ProtectedRoute><AddAdmin/></ProtectedRoute>}/>
        <Route path="/MailConfirmation" element={<Email/>}/>
      </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
