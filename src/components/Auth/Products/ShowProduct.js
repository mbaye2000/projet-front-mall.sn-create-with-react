import React, { useEffect, useState } from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../Services/Config";

function ShowProduct() {
  const { productId } = useParams();
  const location = useLocation();
  const productFromState = location.state?.product || null;
  const [product, setProduct] = useState(null);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const styles = {
    page: {
      minHeight: "100vh",
      background: "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)",
      padding: "40px 16px",
    },
    shell: {
      maxWidth: "1100px",
      margin: "0 auto",
    },
    panel: {
      background: "rgba(255, 255, 255, 0.92)",
      borderRadius: "24px",
      border: "1px solid rgba(148, 163, 184, 0.2)",
      boxShadow: "0 20px 50px rgba(15, 23, 42, 0.12)",
      backdropFilter: "blur(10px)",
      overflow: "hidden",
    },
    grid: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "0",
    },
    mediaWrap: {
      background: "linear-gradient(135deg, #e0e7ff 0%, #f8fafc 100%)",
      minHeight: "420px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "20px",
    },
    image: {
      width: "100%",
      maxWidth: "480px",
      height: "420px",
      objectFit: "cover",
      borderRadius: "18px",
      boxShadow: "0 16px 36px rgba(15, 23, 42, 0.22)",
    },
    info: {
      padding: "34px 30px",
      display: "flex",
      flexDirection: "column",
      gap: "16px",
    },
    title: {
      margin: 0,
      fontSize: "clamp(1.8rem, 3vw, 2.4rem)",
      color: "#0f172a",
      fontWeight: "800",
      lineHeight: "1.2",
    },
    desc: {
      margin: 0,
      color: "#475569",
      lineHeight: "1.8",
      fontSize: "1rem",
    },
    price: {
      margin: 0,
      fontSize: "1.8rem",
      fontWeight: "900",
      color: "#1d4ed8",
    },
    metaGrid: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "12px",
    },
    metaCard: {
      background: "#f8fafc",
      border: "1px solid rgba(148, 163, 184, 0.2)",
      borderRadius: "14px",
      padding: "12px 14px",
      color: "#334155",
      fontWeight: "600",
      fontSize: "0.95rem",
    },
    actions: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "12px",
      marginTop: "8px",
    },
    primaryBtn: {
      border: "none",
      borderRadius: "14px",
      padding: "13px 16px",
      fontWeight: "700",
      cursor: "pointer",
      background: "linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)",
      color: "#ffffff",
    },
    accentBtn: {
      display: "inline-block",
      textAlign: "center",
      textDecoration: "none",
      borderRadius: "14px",
      padding: "13px 16px",
      fontWeight: "700",
      border: "2px solid #1d4ed8",
      color: "#1d4ed8",
      background: "#ffffff",
    },
    status: {
      margin: 0,
      padding: "10px 12px",
      borderRadius: "10px",
      background: "rgba(16, 185, 129, 0.12)",
      color: "#047857",
      fontWeight: "700",
      fontSize: "0.92rem",
    },
    centerPanel: {
      maxWidth: "760px",
      margin: "0 auto",
      textAlign: "center",
      padding: "34px 24px",
      background: "#ffffff",
      borderRadius: "18px",
      border: "1px solid rgba(148, 163, 184, 0.2)",
      boxShadow: "0 12px 30px rgba(15, 23, 42, 0.08)",
    },
  };

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
        // Fallback: allow product details from navigation state (home cards)
        if (productFromState) {
          setProduct(productFromState);
          setError("");
          return;
        }
        setError(err.response?.data?.message || "Impossible de charger le produit.");
      }
    };
    fetchProduct();
  }, [productId, productFromState]);

  const addToCart = () => {
    if (!product) return;
    const cart = JSON.parse(localStorage.getItem("mallCart") || "[]");
    const existingItem = cart.find((item) => item.productId === product._id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({
        productId: product._id || product.id || product.productRef || "local-product",
        productName: product.productName,
        productRef: product.productRef,
        productPrice: product.productPrice,
        productImage: product.productImage,
        quantity: 1,
      });
    }

    localStorage.setItem("mallCart", JSON.stringify(cart));
    window.dispatchEvent(new Event("cartUpdated"));
    setMessage("Produit ajouté au panier !");
  };

  if (error) {
    return (
      <main style={styles.page}>
        <div style={styles.shell}>
          <div style={styles.centerPanel}>
            <h1 style={styles.title}>Produit non trouvé</h1>
            <p style={styles.desc}>{error}</p>
          </div>
        </div>
      </main>
    );
  }

  if (!product) {
    return (
      <main style={styles.page}>
        <div style={styles.shell}>
          <div style={styles.centerPanel}>
            <h1 style={styles.title}>Chargement du produit...</h1>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main style={styles.page}>
      <div style={styles.shell}>
        <article style={styles.panel}>
          <div style={styles.grid} className="product-detail-grid">
            <div style={styles.mediaWrap}>
              <img
                src={product.productImage}
                alt={product.productName}
                style={styles.image}
              />
            </div>
            <div style={styles.info}>
              <h1 style={styles.title}>{product.productName}</h1>
              <p style={styles.desc}>
                {product.productDescription || product.description}
              </p>
              <p style={styles.price}>Prix: {product.productPrice}</p>
              <div style={styles.metaGrid}>
                <div style={styles.metaCard}>
                  Référence: {product.productRef || "N/A"}
                </div>
                <div style={styles.metaCard}>
                  Stock: {product.stock?.quantityAvailable ?? "N/A"}
                </div>
                <div style={styles.metaCard}>
                  Catégorie: {product.categoryId?.categoryName || "Non définie"}
                </div>
                <div style={styles.metaCard}>
                  Ventes: {product.stock?.quantitySold ?? 0}
                </div>
              </div>
              <div style={styles.actions} className="product-detail-actions">
                <button style={styles.primaryBtn} onClick={addToCart}>
                  Ajouter au panier
                </button>
                <Link
                  style={styles.accentBtn}
                  to={`/order?productId=${product._id || ""}`}
                >
                  Commander ce produit
                </Link>
              </div>
              {message && <p style={styles.status}>{message}</p>}
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
    </main>
  );
}

export default ShowProduct;
