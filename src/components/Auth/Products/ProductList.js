import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { API_URL } from "../../Services/Config";

const fallbackProducts = [
  {
    _id: "69f0e5f20c02a4d14c1aa5cc",
    productName: "Casque sans fil Premium",
    productDescription: "Son clair, design léger et autonomie longue durée.",
    productPrice: 45000,
    productImage:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80",
    categoryId: { categoryName: "Électronique" },
    productRef: "CASQUE-PREMIUM",
  },
  {
    _id: "69f0e5f20c02a4d14c1aa5cd",
    productName: "Ordinateur portable Pro",
    productDescription: "Puissance optimisée pour le travail et la création.",
    productPrice: 550000,
    productImage:
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=800&q=80",
    categoryId: { categoryName: "Informatique" },
    productRef: "LAPTOP-PRO",
  },
  {
    _id: "69f0e5f20c02a4d14c1aa5ce",
    productName: "Palette maquillage Luxe",
    productDescription:
      "Couleurs riches et tenue longue durée pour un look parfait.",
    productPrice: 25000,
    productImage:
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=800&q=80",
    categoryId: { categoryName: "Cosmétique" },
    productRef: "MAKEUP-LUXE",
  },
  {
    _id: "69f0e5f20c02a4d14c1aa5cf",
    productName: "Robot ménager Intelligent",
    productDescription:
      "Préparez vos repas rapidement avec des performances fiables.",
    productPrice: 85000,
    productImage:
      "https://media.istockphoto.com/id/1468780952/fr/photo/robot-nettoyeur-automatique-de-piscine-pour-lentretien-avant-la-baignade-robot-submersible.jpg?s=612x612&w=0&k=20&c=mUE-QxK1I9gniW7Ak8VEtZywpwVeqAXwDwqt3YamefQ=",
    categoryId: { categoryName: "Électroménager" },
    productRef: "ROBOT-SMART",
  },
];

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [message, setMessage] = useState("");

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${API_URL}/products`);
      setProducts(response.data.products || fallbackProducts);
    } catch (error) {
      console.error("Error fetching products:", error);
      setProducts(fallbackProducts);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const addToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem("mallCart") || "[]");
    const existingItem = cart.find((item) => item.productId === product._id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({
        productId: product._id,
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

  // Inline Styles
  const styles = {
    headerContainer: {
      maxWidth: "1400px",
      margin: "0 auto 20px",
      textAlign: "center",
      position: "relative",
      zIndex: 2,
      padding: "28px 20px",
      borderRadius: "20px",
      background: "rgba(255, 255, 255, 0.75)",
      boxShadow: "0 12px 30px rgba(26, 40, 71, 0.08)",
      border: "1px solid rgba(102, 126, 234, 0.15)",
      backdropFilter: "blur(8px)",
    },

    pageSubtitle: {
      fontSize: "1.2rem",
      color: "#5a6b82",
      fontWeight: "400",
      maxWidth: "600px",
      margin: "0 auto",
      lineHeight: "1.8",
      letterSpacing: "0.3px",
      fontFamily: "'Segoe UI', 'Helvetica Neue', sans-serif",
    },
    statusMessage: {
      maxWidth: "1400px",
      margin: "0 auto 30px",
      padding: "18px 24px",
      background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
      color: "#ffffff",
      borderRadius: "12px",
      fontSize: "1rem",
      fontWeight: "600",
      boxShadow: "0 8px 24px rgba(16, 185, 129, 0.25)",
      animation: "slideDown 0.4s ease-out",
      letterSpacing: "0.2px",
    },
    panel: {
      maxWidth: "1400px",
      margin: "60px auto",
      padding: "60px 40px",
      background: "linear-gradient(135deg, #ffffff 0%, #f8fbff 100%)",
      borderRadius: "20px",
      textAlign: "center",
      boxShadow: "0 10px 40px rgba(26, 40, 71, 0.08)",
      border: "1px solid rgba(212, 175, 55, 0.1)",
    },
    panelText: {
      fontSize: "1.3rem",
      color: "#5a6b82",
      fontWeight: "500",
    },
    productGrid: {
      maxWidth: "1400px",
      margin: "0 auto",
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
      gap: "32px",
      paddingBottom: "40px",
    },
    productCard: {
      background: "#ffffff",
      borderRadius: "16px",
      overflow: "hidden",
      boxShadow: "0 6px 20px rgba(26, 40, 71, 0.08)",
      transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
      border: "1px solid rgba(212, 175, 55, 0.15)",
      cursor: "pointer",
      position: "relative",
      display: "flex",
      flexDirection: "column",
    },
    productCardHover: {
      transform: "translateY(-12px)",
      boxShadow: "0 20px 50px rgba(26, 40, 71, 0.15)",
    },
    productMedia: {
      position: "relative",
      height: "260px",
      overflow: "hidden",
      background: "linear-gradient(135deg, #f0f3ff 0%, #f8f9fb 100%)",
    },
    productBadge: {
      position: "absolute",
      top: "14px",
      left: "14px",
      zIndex: 2,
      padding: "6px 10px",
      borderRadius: "999px",
      fontSize: "0.75rem",
      fontWeight: "700",
      color: "#ffffff",
      letterSpacing: "0.3px",
      background: "linear-gradient(135deg, #6366f1 0%, #7c3aed 100%)",
      boxShadow: "0 6px 16px rgba(99, 102, 241, 0.35)",
    },
    productImage: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
      transition: "transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
    },
    productCardBody: {
      padding: "28px 24px",
      display: "flex",
      flexDirection: "column",
      flex: 1,
    },
    productCardName: {
      fontSize: "1.35rem",
      fontWeight: "700",
      color: "#1a2847",
      marginBottom: "12px",
      letterSpacing: "-0.3px",
      lineHeight: "1.4",
      fontFamily: "'Segoe UI', 'Helvetica Neue', sans-serif",
      marginTop: "-20px",
    },
    productCardText: {
      color: "#4b5d79",
      marginTop: "-18px",
      fontSize: "15px",

      marginBottom: "16px",
      lineHeight: "1.6",
      fontWeight: "400",
      flexGrow: 1,
    },
    productMeta: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      paddingBottom: "20px",
      borderBottom: "1px solid rgba(212, 175, 55, 0.1)",
      marginBottom: "20px",
      flexWrap: "wrap",
      gap: "8px",
      marginTop: "-60px",
    },
    productMetaSpan: {
      fontSize: "0.95rem",
      fontWeight: "600",
      color: "#1a2847",
    },
    productPrice: {
      fontSize: "1.4rem",
      fontWeight: "800",
      paddingTop: "30px",
      background: "black",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      backgroundClip: "text",
    },
    productCategory: {
      paddingTop: "30px",
      fontSize: "0.85rem",
      fontWeight: "600",
      background: "white",
      color: "#5a6b82",
      padding: "6px 12px",
      borderRadius: "20px",
      display: "inline-block",
      textTransform: "uppercase",
      letterSpacing: "0.4px",
    },
    productActions: {
      display: "flex",
      gap: "12px",
      flexDirection: "column",
      marginTop: "auto",
    },
    buttonOutline: {
      padding: "12px 20px",
      border: "2px solid #d4af37",
      background: "#ffffff",
      color: "black",
      borderRadius: "10px",
      fontSize: "0.95rem",
      fontWeight: "700",
      cursor: "pointer",
      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
      letterSpacing: "0.3px",
      textDecoration: "none",
      textAlign: "center",
      display: "inline-block",
      position: "relative",
      overflow: "hidden",
    },
    buttonOutlineHover: {
      color: "#1a2847",
      boxShadow: "0 8px 20px rgba(212, 175, 55, 0.3)",
      transform: "translateY(-2px)",
    },
    buttonPrimary: {
      padding: "12px 20px",
      background: "linear-gradient(135deg, #1a2847 0%, #2a3e5f 100%)",
      color: "#ffffff",
      border: "none",
      borderRadius: "10px",
      fontSize: "0.95rem",
      fontWeight: "700",
      cursor: "pointer",
      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
      letterSpacing: "0.3px",
      textDecoration: "none",
      textAlign: "center",
      display: "inline-block",
      position: "relative",
      overflow: "hidden",
    },
    buttonPrimaryHover: {
      background: "linear-gradient(135deg, #2a3e5f 0%, #1a2847 100%)",
      boxShadow: "0 12px 30px rgba(26, 40, 71, 0.4)",
      transform: "translateY(-2px)",
    },
  };

  return (
    <>
      <style>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .product-card-wrapper:hover {
          transform: translateY(-12px);
          box-shadow: 0 20px 50px rgba(26, 40, 71, 0.15);
        }

        .product-card-wrapper:hover .product-image {
          transform: scale(1.08);
        }

        .button-outline-wrapper:hover {
          background: linear-gradient(135deg, #d4af37 0%, #f4e4c1 100%);
          color: #1a2847;
          box-shadow: 0 8px 20px rgba(212, 175, 55, 0.3);
          transform: translateY(-2px);
        }

        .button-primary-wrapper:hover {
          background: linear-gradient(135deg, #2a3e5f 0%, #1a2847 100%);
          box-shadow: 0 12px 30px rgba(26, 40, 71, 0.4);
          transform: translateY(-2px);
        }

        .product-card-wrapper {
          animation: fadeUp 0.45s ease-out both;
        }

        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(18px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .product-title-clamp {
          min-height: 56px;
        }

        .product-description-clamp {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
          min-height: 72px;
        }

        @media (max-width: 1024px) {
          .product-grid-container {
            grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
            gap: 24px;
          }
          h1.page-title-main {
            font-size: 2.8rem;
          }
        }

        @media (max-width: 768px) {
          .page-shell-main {
            padding: 40px 16px;
          }
          .product-grid-container {
            grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
            gap: 20px;
          }
          h1.page-title-main {
            font-size: 2.2rem;
          }
          p.page-subtitle-main {
            font-size: 1rem;
          }
          .product-actions-wrapper {
            flex-direction: row;
          }
          .button-outline-wrapper,
          .button-primary-wrapper {
            flex: 1;
            padding: 10px 16px;
            font-size: 0.9rem;
            
          }
        }

        @media (max-width: 480px) {
          .product-grid-container {
            grid-template-columns: 1fr;
            gap: 16px;
          }
          h1.page-title-main {
            font-size: 1.8rem;
          }
          p.page-subtitle-main {
            font-size: 0.9rem;
          }
          .product-actions-wrapper {
            flex-direction: column;
          }
        }
      `}</style>
      {/*ajouter des products en base de données*/}

      <main style={styles.pageShell} className="page-shell-main">
        <header style={styles.headerContainer}>
          <h1
            style={{
              fontSize: "3.5rem",
              fontWeight: "800",
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              marginBottom: "20px",
              letterSpacing: "-1px",
            }}
            className="page-title-main"
          >
            Nos Produits
          </h1>
          <p style={styles.pageSubtitle} className="page-subtitle-main">
            Une sélection claire et moderne des produits disponibles sur Mall
            SN.
          </p>
        </header>

        {message && <div style={styles.statusMessage}>✓ {message}</div>}

        {products.length === 0 ? (
          <div style={styles.panel}>
            <p style={styles.panelText}>
              🛍️ Aucun produit disponible pour le moment.
            </p>
          </div>
        ) : (
          <div style={styles.productGrid} className="product-grid-container">
            {products.map((product) => (
              <article
                style={styles.productCard}
                key={product._id}
                className="product-card-wrapper"
              >
                <div style={styles.productMedia}>
                  <span style={styles.productBadge}>Nouveau</span>
                  <img
                    src={product.productImage}
                    alt={product.productName}
                    style={styles.productImage}
                    className="product-image"
                  />
                </div>
                <div style={styles.productCardBody}>
                  <h2
                    style={styles.productCardName}
                    className="product-title-clamp"
                  >
                    {product.productName}
                  </h2>
                  <p
                    style={styles.productCardText}
                    className="product-description-clamp"
                  >
                    {product.productDescription}
                  </p>
                  <div style={styles.productMeta}>
                    <span
                      style={{
                        ...styles.productMetaSpan,
                        ...styles.productPrice,
                      }}
                    >
                      {product.productPrice}
                    </span>
                    <span style={styles.productCategory}>
                      {product.categoryId?.categoryName || "Non définie"}
                    </span>
                  </div>
                  <p
                    style={{
                      marginTop: "-18px",
                      fontSize: "0.88rem",
                      color: "#4b5d79",
                      fontWeight: "600",
                    }}
                  >
                    Stock disponible: {product.stock?.quantityAvailable ?? 0}
                  </p>
                  <div
                    style={styles.productActions}
                    className="product-actions-wrapper"
                  >
                    <button
                      style={styles.buttonOutline}
                      className="button-outline-wrapper"
                      onClick={() => addToCart(product)}
                    >
                      🛒 Ajouter au panier
                    </button>
                    <Link
                      style={styles.buttonPrimary}
                      className="button-primary-wrapper"
                      to={`/product/${product._id}`}
                    >
                      👁️ Voir le produit
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>
    </>
  );
};

export default ProductList;
