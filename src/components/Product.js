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
      <div className="page-shell">
        <div style={{ padding: "2rem 0" }}>
          <h1 className="section-headline">Produits</h1>
          <ProductList />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Product;
