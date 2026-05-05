import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home_new";
import Product from "./components/Product";
import Contact from "./components/Contact";
import LoginPage from "./components/LoginPage";
import User from "./components/User";
import Order from "./components/Order";
import Cart from "./components/Cart";
import ProductDetail from "./components/ProductDetail";
import ProductList from "./components/Auth/Products/ProductList";
import Admin from "./components/Admin";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/login/user" element={<User />} />
      <Route path="/product" element={<Product />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/order" element={<Order />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/product/:productId" element={<ProductDetail />} />
      <Route path="/product/list" element={<ProductList />} />
      <Route path="/admin" element={<Admin />} />
    </Routes>
  );
}

export default App;
