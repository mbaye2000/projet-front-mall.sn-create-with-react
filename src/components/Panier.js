import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Auth/Navbar";
import Footer from "./Footer";

function Panier() {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("mallCart") || "[]");
    setCartItems(storedCart);
  }, []);

  const updateQuantity = (productId, value) => {
    const updated = cartItems.map((item) => {
      if (item.productId === productId) {
        return {
          ...item,
          quantity: Math.max(1, Number(value)),
        };
      }
      return item;
    });
    setCartItems(updated);
    localStorage.setItem("mallCart", JSON.stringify(updated));
  };

  const removeItem = (productId) => {
    const updated = cartItems.filter((item) => item.productId !== productId);
    setCartItems(updated);
    localStorage.setItem("mallCart", JSON.stringify(updated));
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) return;
    navigate("/order", { state: { cart: cartItems } });
  };

  const parsePrice = (price) => {
    if (typeof price === "number") return price;
    if (!price) return 0;
    const cleaned = price.toString().replace("€", "").replace(",", ".").trim();
    return parseFloat(cleaned) || 0;
  };

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + parsePrice(item.productPrice) * item.quantity,
    0,
  );

  return (
    <div>
      <Navbar />
      <main
        className="panier-main"
        style={{
          maxWidth: "1180px",
          margin: "0 auto",
          padding: "36px 24px 70px",
          display: "flex",
          flexDirection: "column",
          gap: "24px",
          background: "#f4f7ff",
          overflowX: "hidden",
          boxSizing: "border-box",
          width: "100%",
        }}
      >
        <header
          style={{
            textAlign: "center",
            marginBottom: "28px",
            wordBreak: "break-word",
            overflow: "hidden",
          }}
        >
          <h1
            style={{
              fontSize: "2.2rem",
              color: "#152033",
              marginBottom: "10px",
              wordBreak: "break-word",
            }}
          >
            Panier
          </h1>
          <p
            style={{
              maxWidth: "760px",
              margin: "0 auto",
              color: "#5d6a84",
              lineHeight: "1.75",
              wordBreak: "break-word",
              wordWrap: "break-word",
              overflowWrap: "break-word",
            }}
          >
            Retrouvez ici les produits sélectionnés et finalisez votre commande
            en quelques clics.
          </p>
        </header>

        {cartItems.length === 0 ? (
          <div
            style={{
              background: "#ffffff",
              border: "1px solid #dfe6f1",
              borderRadius: "28px",
              padding: "30px",
              boxShadow: "0 20px 40px rgba(20, 38, 80, 0.08)",
            }}
          >
            <p style={{ color: "#5d6f8b", lineHeight: "1.8" }}>
              Votre panier est vide. Ajoutez des produits depuis la page
              Produits pour commencer.
            </p>
          </div>
        ) : (
          <div
            className="panier-layout"
            style={{
              display: "grid",
              gridTemplateColumns: "1.7fr 0.9fr",
              gap: "24px",
            }}
          >
            <div
              className="panier-products"
              style={{
                background: "#ffffff",
                border: "1px solid #dfe6f1",
                borderRadius: "28px",
                padding: "30px",
                boxShadow: "0 20px 40px rgba(20, 38, 80, 0.08)",
                minWidth: 0,
                overflowX: "hidden",
                boxSizing: "border-box",
              }}
            >
              {cartItems.map((item) => (
                <div
                  key={item.productId}
                  className="panier-item"
                  style={{
                    display: "grid",
                    gridTemplateColumns: "170px 1fr",
                    gap: "22px",
                    alignItems: "start",
                    padding: "24px",
                    borderRadius: "24px",
                    border: "1px solid #e8eff8",
                    background: "#ffffff",
                    marginBottom: "20px",
                  }}
                >
                  {item.productImage && (
                    <div
                      className="panier-image-container"
                      style={{
                        width: "170px",
                        minHeight: "170px",
                        borderRadius: "24px",
                        overflow: "hidden",
                        background:
                          "linear-gradient(180deg, #eef4ff 0%, #f9fbff 100%)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      <img
                        src={item.productImage}
                        alt={item.productName}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                    </div>
                  )}
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "12px",
                      minWidth: 0,
                      overflow: "hidden",
                    }}
                  >
                    <h3
                      style={{
                        margin: "0",
                        fontSize: "1.25rem",
                        color: "#111b2b",
                        wordBreak: "break-word",
                        wordWrap: "break-word",
                        overflowWrap: "break-word",
                      }}
                    >
                      {item.productName}
                    </h3>
                    <p
                      style={{
                        margin: "0",
                        color: "#4d6078",
                        lineHeight: "1.75",
                        wordBreak: "break-word",
                        overflowWrap: "break-word",
                      }}
                    >
                      Référence : {item.productRef}
                    </p>
                    <p
                      style={{
                        margin: "0",
                        color: "#4d6078",
                        lineHeight: "1.75",
                      }}
                    >
                      Prix unitaire : {item.productPrice} FCFA
                    </p>
                    <div
                      style={{
                        display: "grid",
                        gap: "10px",
                        width: "fit-content",
                      }}
                    >
                      <label
                        htmlFor={`qty-${item.productId}`}
                        style={{ fontSize: "0.95rem", color: "#4e627e" }}
                      >
                        Quantité
                      </label>
                      <input
                        id={`qty-${item.productId}`}
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) =>
                          updateQuantity(item.productId, e.target.value)
                        }
                        style={{
                          width: "130px",
                          height: "48px",
                          border: "1px solid #cdd7e6",
                          borderRadius: "18px",
                          padding: "0 14px",
                          background: "#f8fbff",
                          color: "#17263f",
                          boxShadow: "inset 0 1px 2px rgba(15, 30, 60, 0.05)",
                        }}
                      />
                    </div>
                    <p
                      style={{
                        margin: "0",
                        fontWeight: "700",
                        color: "#0f1c33",
                      }}
                    >
                      Sous-total : {item.productPrice * item.quantity} FCFA
                    </p>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "flex-end",
                        marginTop: "12px",
                      }}
                    >
                      <button
                        style={{
                          borderRadius: "18px",
                          padding: "14px 20px",
                          minWidth: "150px",
                          fontWeight: "700",
                          fontSize: "0.98rem",
                          cursor: "pointer",
                          background: "#ffffff",
                          color: "#2c4260",
                          border: "1px solid #d8e0eb",
                        }}
                        onClick={() => removeItem(item.productId)}
                      >
                        Supprimer
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <aside
              className="panier-summary"
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "16px",
                background: "#ffffff",
                border: "1px solid #dfe6f1",
                borderRadius: "28px",
                padding: "30px",
                boxShadow: "0 20px 40px rgba(20, 38, 80, 0.08)",
              }}
            >
              <h2
                style={{
                  marginTop: "0",
                  fontSize: "1.55rem",
                  color: "#111b2b",
                }}
              >
                Total panier
              </h2>
              <p style={{ margin: "0", color: "#5c6d88" }}>
                {cartItems.length} article(s)
              </p>
              <p
                style={{
                  display: "block",
                  margin: "24px 0",
                  fontSize: "2rem",
                  fontWeight: "800",
                  color: "#0d1a2f",
                }}
              >
                {totalPrice} FCFA
              </p>
              <button
                style={{
                  width: "100%",
                  background:
                    "linear-gradient(135deg, #3058ff 0%, #4f6bff 100%)",
                  color: "#ffffff",
                  border: "none",
                  minHeight: "56px",
                  boxShadow: "0 14px 30px rgba(48, 88, 255, 0.18)",
                  borderRadius: "18px",
                  padding: "14px 20px",
                  fontWeight: "700",
                  fontSize: "0.98rem",
                  cursor: "pointer",
                }}
                onClick={handleCheckout}
              >
                Passer à la commande
              </button>
            </aside>
          </div>
        )}
      </main>
      <style>{`
        @media (max-width: 900px) {
          .panier-layout {
            grid-template-columns: 1fr !important;
          }

          .panier-item {
            grid-template-columns: 130px 1fr !important;
            gap: 16px !important;
            padding: 18px !important;
            align-items: start !important;
          }

          .panier-image-container {
            width: 130px !important;
            min-height: 130px !important;
          }
        }

        @media (max-width: 768px) {
          .panier-main h1 {
            font-size: "clamp(1.4rem, 4vw, 2rem)" !important;
          }

          .panier-main > p {
            font-size: 0.95rem !important;
          }
        }

        @media (max-width: 640px) {
          .panier-main {
            padding: 20px 14px 50px !important;
            gap: 18px !important;
          }

          .panier-main header {
            margin-bottom: 16px !important;
          }

          .panier-main h1 {
            font-size: 1.4rem !important;
            margin-bottom: 8px !important;
          }

          .panier-main > p {
            font-size: 0.9rem !important;
            padding: 0 8px !important;
          }

          .panier-products {
            padding: 16px !important;
            border-radius: 20px !important;
          }

          .panier-item {
            grid-template-columns: 85px 1fr !important;
            gap: 10px !important;
            padding: 12px !important;
            margin-bottom: 12px !important;
          }

          .panier-image-container {
            width: 85px !important;
            min-height: 85px !important;
            border-radius: 14px !important;
            flex-shrink: 0;
          }

          .panier-item h3 {
            font-size: 0.9rem !important;
            margin: 0 0 4px 0 !important;
          }

          .panier-item p {
            font-size: 0.8rem !important;
            margin: 2px 0 !important;
          }

          .panier-item div:has(input) {
            gap: 6px !important;
          }

          .panier-item label {
            font-size: 0.75rem !important;
          }

          .panier-item input {
            width: 70px !important;
            height: 36px !important;
            padding: 0 6px !important;
            font-size: 0.8rem !important;
            border-radius: 12px !important;
          }

          .panier-item button {
            padding: 6px 10px !important;
            min-width: 90px !important;
            font-size: 0.75rem !important;
            margin-top: 8px !important;
            height: 40px !important;
          }

          .panier-summary {
            padding: 16px !important;
            gap: 10px !important;
            width: 100% !important;
            border-radius: 20px !important;
          }

          .panier-summary h2 {
            font-size: 1.1rem !important;
            margin-top: 0 !important;
          }

          .panier-summary p {
            font-size: 0.85rem !important;
            margin: 0 !important;
          }

          .panier-summary p:last-of-type {
            font-size: 1.5rem !important;
            margin: 16px 0 !important;
          }

          .panier-summary button {
            min-height: 44px !important;
            font-size: 0.85rem !important;
            padding: 12px 16px !important;
          }
        }

        @media (max-width: 480px) {
          .panier-main {
            padding: 16px 12px 40px !important;
          }

          .panier-main h1 {
            font-size: 1.2rem !important;
          }

          .panier-item {
            grid-template-columns: 75px 1fr !important;
            gap: 8px !important;
            padding: 10px !important;
          }

          .panier-image-container {
            width: 75px !important;
            min-height: 75px !important;
          }

          .panier-item input {
            width: 60px !important;
          }

          .panier-summary p:last-of-type {
            font-size: 1.3rem !important;
          }
        }
      `}</style>
      <Footer />
    </div>
  );
}

export default Panier;
