import React from "react";

const CardProduct = ({ product }) => {
  const {
    productName,
    productDescription,
    stock,
    productPrice,
    productImage,
    categoryId,
  } = product;
  return (
    <div style={{ border: "1px solid #ccc", padding: "16px", margin: "16px" }}>
      <div style={{ textAlign: "center" }}>
        <img
          src={productImage}
          alt={productName}
          style={{ width: "18rem", height: "auto" }}
        />
      </div>
      <div style={{ textAlign: "center" }}>
        <p>{productName}</p>
        <p>{productDescription}</p>
        <p>Stock: {stock}</p>
        <p>Price: {productPrice}</p>
        <p>Category: {categoryId.categoryName}</p>
      </div>
    </div>
  );
};

export default CardProduct;
