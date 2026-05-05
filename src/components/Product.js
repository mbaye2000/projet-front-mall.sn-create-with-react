import React from "react";
import Navbar from "./Auth/Navbar";
import ProductList from "./Auth/Products/ProductList";
import Footer from "./Footer";

function Product() {
  return (
    <div
      style={{
        background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
        minHeight: "100vh",
      }}
    >
      <Navbar />
      <div
        style={{
          padding: "30px",
          maxWidth: "1400px",
          margin: "0 auto",
        }}
      >
        <h1>Produits</h1>
        <ProductList />
      </div>
      <Footer />
    </div>
  );
}

export default Product;
