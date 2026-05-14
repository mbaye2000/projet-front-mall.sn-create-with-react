import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Auth/Navbar";
import Footer from "./Footer";

function Cart() {
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
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const removeItem = (productId) => {
    const updated = cartItems.filter((item) => item.productId !== productId);
    setCartItems(updated);
    localStorage.setItem("mallCart", JSON.stringify(updated));
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) return;
    navigate("/order", { state: { cart: cartItems } });
  };

  const handlePayTech = () => {
    if (cartItems.length === 0) return;
    navigate("/order", { state: { cart: cartItems, paymentMethod: "wave" } });
  };

  const parsePrice = (price) => {
    if (typeof price === "number") return price;
    if (!price) return 0;
    // Supprime "€", remplace "," par "." et nettoie les espaces
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
        style={{
          maxWidth: "100%",
          marginTop: "40px",
          marginLeft: "auto",
          marginRight: "auto",
          padding: "36px 24px 70px",
          display: "flex",
          flexDirection: "column",
          gap: "24px",
          background: "#f4f7ff",
        }}
      >
        <header style={{ textAlign: "center", marginBottom: "28px" }}>
          <p
            style={{
              fontSize: "2.5rem",
              fontWeight: "800",
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              marginBottom: "20px",
              letterSpacing: "-1px",
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
          /*
            style={{
              display: "grid",
              gridTemplateColumns: "1.7fr 0.9fr",
              gap: "24px",
            }}*/
          >
            {/* Section des produits dans le panier */}
            <div
              style={{
                borderRadius: "28px",
                padding: "30px",
              }}
            >
              {cartItems.map((item) => (
                <div
                  key={item.productId}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "170px 1fr",
                    gap: "22px",
                    alignItems: "center",
                    padding: "24px",
                    borderRadius: "24px",
                    border: "1px solid #e8eff8",
                    background: "#ffffff",
                    marginBottom: "20px",
                  }}
                >
                  {item.productImage && (
                    <div
                      style={{
                        width: "170px",
                        minHeight: "200PX",
                        borderRadius: "10px",
                        marginBottom: "50px",
                        overflow: "hidden",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <img
                        src={item.productImage}
                        alt={item.productName}
                        style={{
                          width: "100%",
                          height: "12rem",
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
                    }}
                  >
                    <h3
                      style={{
                        margin: "0",
                        fontSize: "1.25rem",
                        color: "#111b2b",
                      }}
                    >
                      {item.productName}
                    </h3>
                    <p
                      style={{
                        margin: "0",
                        color: "#4d6078",
                        lineHeight: "1.75",
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
                          width: "50px",
                          height: "30px",
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
                          minWidth: "100px",
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
            {/* Section du résumé de la commande et paiement */}
            <aside
              style={{
                /*
                display: "flex",
                flexDirection: "column",
                gap: "16px",
                background: "#ffffff",
                border: "1px solid #dfe6f1",
                borderRadius: "28px",
                padding: "30px",
                boxShadow: "0 20px 40px rgba(20, 38, 80, 0.08)",*/
                justifyContent: "center",
                display: "flex",
                flexDirection: "column",
                gap: "16px",
                marginLeft: "24px",
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
                  justifyContent: "center",
                  width: "300px",
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
                  marginBottom: "12px",
                }}
                onClick={handlePayTech}
              >
                Payer maintenant
              </button>
              <button
                style={{
                  background: "#ffffff",
                  color: "#3058ff",
                  border: "2px solid #3058ff",
                  minHeight: "56px",
                  borderRadius: "18px",
                  padding: "14px 20px",
                  fontWeight: "700",
                  fontSize: "0.98rem",
                  cursor: "pointer",
                  width: "300px",
                }}
                onClick={handleCheckout}
              >
                Passer à la commande (Livraison)
              </button>
            </aside>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}

export default Cart;
