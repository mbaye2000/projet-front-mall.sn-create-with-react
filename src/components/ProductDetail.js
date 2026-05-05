import React, { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import axios from "axios";
import { API_URL } from "./Services/Config";
import Navbar from "./Auth/Navbar";
import Footer from "./Footer";

function ProductDetail() {
  const { productId } = useParams();
  const location = useLocation();
  const productFromState = location.state?.product || null;
  const [product, setProduct] = useState(null);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      if (!productId) {
        setProduct(productFromState);
        return;
      }

      try {
        const response = await axios.get(`${API_URL}/products/${productId}`);
        setProduct(response.data.product);
      } catch (err) {
        if (productFromState) {
          setProduct(productFromState);
          setError("");
          return;
        }
        setError(
          err.response?.data?.message || "Impossible de charger le produit.",
        );
      }
    };
    fetchProduct();
  }, [productId, productFromState]);

  const addToCart = () => {
    if (!product) return;
    const cart = JSON.parse(localStorage.getItem("mallCart") || "[]");
    const rawId = product._id || product.id || product.productRef || "local-product";
    const currentId = typeof rawId === 'string' ? rawId.replace('home-', '') : rawId;
    const existingItem = cart.find((item) => item.productId === currentId);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({
        productId: currentId,
        productName: product.productName,
        productRef: product.productRef,
        productPrice: product.productPrice,
        productImage: product.productImage,
        quantity: 1,
      });
    }

    localStorage.setItem("mallCart", JSON.stringify(cart));
    window.dispatchEvent(new Event("cartUpdated"));
    setMessage("Produit ajoute au panier !");
  };

  if (error) {
    return (
      <main
        style={{
          minHeight: "100vh",
          background: "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)",
          padding: "40px 16px",
        }}
      >
        <div
          style={{
            background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
            maxWidth: "1100px",
            margin: "0 auto",
          }}
        >
          <div
            style={{
              maxWidth: "760px",
              margin: "0 auto",
              textAlign: "center",
              padding: "34px 24px",
              background: "#ffffff",
              borderRadius: "18px",
              border: "1px solid rgba(148, 163, 184, 0.2)",
              boxShadow: "0 12px 30px rgba(15, 23, 42, 0.08)",
            }}
          >
            <h1
              style={{
                margin: 0,
                fontSize: "clamp(1.8rem, 3vw, 2.4rem)",
                color: "#0f172a",
                fontWeight: "800",
                lineHeight: "1.2",
              }}
            >
              Produit non trouve
            </h1>
            <p
              style={{
                margin: 0,
                color: "#475569",
                lineHeight: "1.8",
                fontSize: "1rem",
              }}
            >
              {error}
            </p>
          </div>
        </div>
      </main>
    );
  }

  if (!product) {
    return (
      <main
        style={{
          minHeight: "100vh",
          background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
          padding: "40px 16px",
        }}
      >
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div
            style={{
              maxWidth: "760px",
              margin: "0 auto",
              textAlign: "center",
              padding: "34px 24px",
              background: "#ffffff",
              borderRadius: "18px",
              border: "1px solid rgba(148, 163, 184, 0.2)",
              boxShadow: "0 12px 30px rgba(15, 23, 42, 0.08)",
            }}
          >
            <h1
              style={{
                margin: 0,
                fontSize: "clamp(1.8rem, 3vw, 2.4rem)",
                color: "#0f172a",
                fontWeight: "800",
                lineHeight: "1.2",
              }}
            >
              Chargement du produit...
            </h1>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main>
      <Navbar />
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <article>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "0",
            }}
            className="product-detail-grid"
          >
            <div>
              <img
                src={product.productImage}
                alt={product.productName}
                style={{
                  width: "100%",
                  maxWidth: "480px",
                  height: "420px",
                  objectFit: "cover",
                  borderRadius: "18px",
                  boxShadow: "0 16px 36px rgba(15, 23, 42, 0.22)",
                }}
              />
            </div>
            <div
              style={{
                padding: "34px 30px",
                display: "flex",
                flexDirection: "column",
                gap: "16px",
              }}
            >
              <h1
                style={{
                  margin: 0,
                  fontSize: "clamp(1.8rem, 3vw, 2.4rem)",
                  color: "#0f172a",
                  fontWeight: "800",
                  lineHeight: "1.2",
                }}
              >
                {product.productName}
              </h1>
              <p
                style={{
                  margin: 0,
                  color: "#475569",
                  lineHeight: "1.8",
                  fontSize: "1rem",
                }}
              >
                {product.productDescription || product.description}
              </p>
              <p
                style={{
                  margin: 0,
                  fontSize: "1.8rem",
                  fontWeight: "900",
                  color: "#1d4ed8",
                }}
              >
                Prix: {product.productPrice}
              </p>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "12px",
                }}
              >
                <div
                  style={{
                    padding: "12px 14px",
                    color: "#334155",
                    fontWeight: "600",
                    fontSize: "0.95rem",
                  }}
                >
                  Reference: {product.productRef || "N/A"}
                </div>
                <div
                  style={{
                    padding: "12px 14px",
                    color: "#334155",
                    fontWeight: "600",
                    fontSize: "0.95rem",
                  }}
                >
                  Stock: {product.stock?.quantityAvailable ?? "N/A"}
                </div>
                <div
                  style={{
                    padding: "12px 14px",
                    color: "#334155",
                    fontWeight: "600",
                    fontSize: "0.95rem",
                  }}
                >
                  Categorie: {product.categoryId?.categoryName || "Non definie"}
                </div>
                <div
                  style={{
                    padding: "12px 14px",
                    color: "#334155",
                    fontWeight: "600",
                    fontSize: "0.95rem",
                  }}
                >
                  Ventes: {product.stock?.quantitySold ?? 0}
                </div>
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "12px",
                  marginTop: "8px",
                }}
                className="product-detail-actions"
              >
                <button
                  style={{
                    border: "none",
                    borderRadius: "14px",
                    padding: "13px 16px",
                    fontWeight: "700",
                    cursor: "pointer",
                    background:
                      "linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)",
                    color: "#ffffff",
                  }}
                  onClick={addToCart}
                >
                  Ajouter au panier
                </button>
                <Link
                  style={{
                    display: "inline-block",
                    textAlign: "center",
                    textDecoration: "none",
                    borderRadius: "14px",
                    padding: "13px 16px",
                    fontWeight: "700",
                    border: "2px solid #1d4ed8",
                    color: "#1d4ed8",
                    background: "#ffffff",
                  }}
                  to={`/order?productId=${product._id || ""}`}
                >
                  Commander ce produit
                </Link>
              </div>
              {message && (
                <p
                  style={{
                    margin: 0,
                    padding: "10px 12px",
                    borderRadius: "10px",
                    background: "rgba(16, 185, 129, 0.12)",
                    color: "#047857",
                    fontWeight: "700",
                    fontSize: "0.92rem",
                  }}
                >
                  {message}
                </p>
              )}
            </div>
          </div>
        </article>
      </div>

      <style>{`
        @media (max-width: 860px) {
          .product-detail-grid {
            grid-template-columns: 1fr !important;
          }
          .product-detail-actions {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
      <Footer />
    </main>
  );
}

export default ProductDetail;
