import React, { useEffect, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import Navbar from "./Auth/Navbar";
import axios from "axios";
import { API_URL } from "../Services/Config";
import Footer from "./Footer";

function Order() {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("wave");
  const [status, setStatus] = useState("");
  const [validationErrors, setValidationErrors] = useState([]);

  useEffect(() => {
    const productId = searchParams.get("productId");
    if (productId) {
      setSelectedProductId(productId);
    }

    const savedCart =
      location.state?.cart ||
      JSON.parse(localStorage.getItem("mallCart") || "[]");

    // Nettoyage des IDs dans le panier chargé
    const cleanedCart = savedCart.map((item) => {
      const id = item.productId || item._id;
      if (typeof id === "string" && id.startsWith("home-")) {
        return {
          ...item,
          productId: id.replace("home-", ""),
          _id: id.replace("home-", ""),
        };
      }
      return item;
    });

    if (cleanedCart.length > 0) {
      setCartItems(cleanedCart);
    }

    if (location.state?.paymentMethod) {
      setPaymentMethod(location.state.paymentMethod);
    }

    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${API_URL}/products`);
        setProducts(response.data.products || []);
      } catch (error) {
        console.error("Erreur chargement produits", error);
      }
    };
    fetchProducts();
  }, [location.state, searchParams]);

  const parsePrice = (price) => {
    if (typeof price === "number") return price;
    if (!price) return 0;
    const cleaned = price.toString().replace("€", "").replace(",", ".").trim();
    return parseFloat(cleaned) || 0;
  };

  const selectedProduct = products.find(
    (product) => product._id === selectedProductId,
  );

  const totalPrice = cartItems.length
    ? cartItems.reduce(
        (sum, item) => sum + parsePrice(item.productPrice) * item.quantity,
        0,
      )
    : selectedProduct
      ? parsePrice(selectedProduct.productPrice) * Number(quantity)
      : 0;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedProduct && cartItems.length === 0) {
      setStatus("Veuillez sélectionner un produit ou utiliser le panier.");
      return;
    }

    try {
      setStatus("Envoi de la commande...");

      // Validation des données
      if (!fullname.trim() || !email.trim() || !address.trim()) {
        setStatus(
          "Veuillez remplir tous les champs obligatoires (Nom, Email, Adresse).",
        );
        return;
      }

      const productsToSend = cartItems.length
        ? cartItems.map((item) => {
            const id = item.productId || item._id;
            // Sécurité : enlever le préfixe "home-" si présent
            const cleanId =
              typeof id === "string" ? id.replace("home-", "") : id;
            return {
              productId: cleanId,
              quantity: Number(item.quantity),
            };
          })
        : [
            {
              productId: selectedProductId.replace("home-", ""),
              quantity: Number(quantity),
            },
          ];

      // Vérifier si tous les IDs sont valides (pas undefined et format correct)
      const hasInvalidId = productsToSend.some(
        (p) => !p.productId || p.productId.length !== 24,
      );
      if (hasInvalidId) {
        setStatus(
          "Certains produits ont un identifiant invalide. Veuillez vider votre panier et réessayer.",
        );
        console.error("IDs invalides détectés:", productsToSend);
        return;
      }

      const orderBody = {
        user: {
          guest: {
            fullname: fullname.trim(),
            email: email.trim(),
            phone: phone.trim() || "Non fourni",
          },
        },
        products: productsToSend,
        shippingAddress: address.trim(),
        paymentMethod: paymentMethod.toLowerCase(), // S'assurer de la minuscule pour le backend
        totalPrice: totalPrice,
      };

      console.log("Envoi de la commande avec le corps:", orderBody);

      const orderResponse = await axios.post(`${API_URL}/orders`, orderBody);

      if (orderResponse.status === 201) {
        setStatus("Commande réussie !");

        // Redirection vers PayTech si une URL de redirection est fournie
        if (orderResponse.data.redirect_url) {
          // Nettoyer le panier avant de partir si c'est une commande groupée
          if (cartItems.length) {
            localStorage.removeItem("mallCart");
            window.dispatchEvent(new Event("cartUpdated"));
          }
          window.location.href = orderResponse.data.redirect_url;
          return;
        }

        localStorage.removeItem("mallCart");
        setCartItems([]);
      }
    } catch (error) {
      console.error("Erreur complète:", error);
      if (error.response?.data?.errors) {
        setValidationErrors(error.response.data.errors);
        setStatus("Erreur de validation. Veuillez vérifier les champs.");
      } else if (error.response?.data?.message) {
        setStatus(error.response.data.message);
      } else {
        setStatus("Erreur lors de la commande. Veuillez réessayer.");
      }
    }
  };

  const styles = {
    page: {
      minHeight: "100vh",

      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "40px 20px 60px",
    },

    header: {
      textAlign: "center",
      padding: "40px 32px 0",
    },
    title: {
      fontSize: "clamp(2.2rem, 2.8vw, 3rem)",
      color: "#0f172a",
      marginBottom: "10px",
    },
    subtitle: {
      color: "#475569",
      fontSize: "1rem",
      lineHeight: "1.8",
      maxWidth: "760px",
      margin: "0 auto 6px",
    },
    content: {
      display: "flex",
      flexWrap: "wrap",
      gap: "24px",
      padding: "32px",
      justifyContent: "center",
      minWidth: 0,
    },
    card: {
      flex: "1 1 420px",
      minWidth: 0,
      background: "#ffffff",
      border: "1px solid #e2e8f0",
      borderRadius: "28px",
      padding: "30px",
      boxShadow: "0 22px 48px rgba(15, 23, 42, 0.08)",
      minHeight: "fit-content",
    },
    sectionTitle: {
      fontSize: "1.4rem",
      margin: "0 0 14px",
      color: "#102043",
    },
    itemTitle: {
      fontSize: "1.05rem",
      margin: "0 0 10px",
      color: "#0f172a",
    },
    text: {
      margin: "4px 0",
      color: "#475569",
      lineHeight: "1.65",
    },
    inputBlock: {
      display: "flex",
      flexDirection: "column",
      gap: "10px",
      marginBottom: "18px",
    },
    label: {
      fontWeight: "700",
      color: "#1e293b",
      fontSize: "0.95rem",
    },
    control: {
      height: "52px",
      border: "1px solid #d6d8e6",
      borderRadius: "16px",
      padding: "0 18px",
      background: "#f8faff",
      color: "#0f172a",
      fontSize: "1rem",
      outline: "none",
      transition:
        "border-color 0.25s ease, box-shadow 0.25s ease, transform 0.25s ease",
    },
    productCard: {
      display: "grid",
      gap: "14px",
      padding: "22px",
      border: "1px solid #e2e8f0",
      borderRadius: "22px",
      background: "#f8fbff",
      marginBottom: "16px",
    },
    paymentOptions: {
      display: "flex",
      flexWrap: "wrap",
      gap: "12px",
      margin: "18px 0 24px",
    },
    paymentOption: {
      flex: "1 1 140px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "10px",
      padding: "16px 14px",
      borderRadius: "16px",
      borderWidth: "1px",
      borderStyle: "solid",
      borderColor: "#d6d8e6",
      background: "#f7f9ff",
      color: "#0f172a",
      cursor: "pointer",
      transition:
        "transform 0.2s ease, border-color 0.2s ease, background-color 0.2s ease",
      fontWeight: "700",
      minWidth: 0,
      textAlign: "center",
    },
    paymentActive: {
      borderColor: "#2563eb",
      background: "#eff6ff",
      color: "#1e3a8a",
    },
    totalBlock: {
      display: "flex",
      flexDirection: "column",
      gap: "18px",
    },
    orderBtn: {
      width: "100%",
      minHeight: "56px",
      border: "none",
      borderRadius: "18px",
      background: "linear-gradient(135deg, #2563eb 0%, #4f46e5 100%)",
      color: "#ffffff",
      fontWeight: "800",
      fontSize: "1rem",
      cursor: "pointer",
      transition: "transform 0.2s ease, box-shadow 0.2s ease",
      boxShadow: "0 18px 38px rgba(37, 99, 235, 0.22)",
    },
    status: {
      marginTop: "22px",
      padding: "16px 18px",
      borderRadius: "16px",
      background: "#eff6ff",
      color: "#1e40af",
      fontWeight: "700",
      boxShadow: "0 10px 20px rgba(37, 99, 235, 0.08)",
    },
    emptyState: {
      display: "flex",
      flexDirection: "column",
      gap: "14px",
      padding: "22px",
      borderRadius: "20px",
      border: "1px dashed #cbd5e1",
      background: "#f8fafc",
    },
  };

  return (
    <div>
      <Navbar />
      <main style={styles.page}>
        <section className="order-panel" style={styles.panel}>
          <header style={styles.header}>
            <h2 style={styles.title}>Finalisez votre commande</h2>
            <p style={styles.subtitle}>
              Remplissez vos informations de livraison et choisissez votre moyen
              de paiement.
            </p>
            {status && (
              <div
                style={{
                  padding: "15px",
                  borderRadius: "12px",
                  backgroundColor: status.includes("succès")
                    ? "#dcfce7"
                    : "#fee2e2",
                  color: status.includes("succès") ? "#166534" : "#991b1b",
                  marginTop: "20px",
                  textAlign: "center",
                  fontWeight: "600",
                }}
              >
                {status}
                {validationErrors.length > 0 && (
                  <ul style={{ textAlign: "left", marginTop: "10px" }}>
                    {validationErrors.map((err, i) => (
                      <li key={i}>{err}</li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </header>

          <div className="order-content" style={styles.content}>
            <div className="order-card" style={styles.card}>
              {cartItems.length > 0 ? (
                <>
                  <div style={styles.inputBlock}>
                    <h2 style={styles.sectionTitle}>Votre panier</h2>
                  </div>
                  {cartItems.map((item) => (
                    <div key={item.productId} style={styles.productCard}>
                      <div>
                        <h3 style={styles.itemTitle}>{item.productName}</h3>
                        <p style={styles.text}>Réf: {item.productRef}</p>
                        <p style={styles.text}>
                          Prix unitaire: {item.productPrice} FCFA
                        </p>
                        <p style={styles.text}>Quantité: {item.quantity}</p>
                      </div>
                    </div>
                  ))}
                </>
              ) : (
                <div style={styles.emptyState}>
                  <div style={styles.inputBlock}>
                    <label htmlFor="product" style={styles.label}>
                      Produit
                    </label>
                    <select
                      id="product"
                      value={selectedProductId}
                      onChange={(e) => setSelectedProductId(e.target.value)}
                      required
                      style={styles.control}
                    >
                      <option value="">Sélectionner un produit</option>
                      {products.map((product) => (
                        <option key={product._id} value={product._id}>
                          {product.productName} - {product.productRef}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              )}

              {!cartItems.length && (
                <div style={styles.inputBlock}>
                  <label htmlFor="quantity" style={styles.label}>
                    Quantité
                  </label>
                  <input
                    type="number"
                    id="quantity"
                    value={quantity}
                    min="1"
                    onChange={(e) => setQuantity(e.target.value)}
                    required
                    style={styles.control}
                  />
                </div>
              )}

              <div style={styles.inputBlock}>
                <label htmlFor="fullname" style={styles.label}>
                  Nom complet
                </label>
                <input
                  type="text"
                  id="fullname"
                  value={fullname}
                  onChange={(e) => setFullname(e.target.value)}
                  required
                  style={styles.control}
                />
              </div>

              <div style={styles.inputBlock}>
                <label htmlFor="email" style={styles.label}>
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  style={styles.control}
                />
              </div>

              <div style={styles.inputBlock}>
                <label htmlFor="phone" style={styles.label}>
                  Téléphone
                </label>
                <input
                  type="tel"
                  id="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  style={styles.control}
                />
              </div>

              <div style={styles.inputBlock}>
                <label htmlFor="address" style={styles.label}>
                  Adresse
                </label>
                <input
                  type="text"
                  id="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                  style={styles.control}
                />
              </div>
            </div>

            <aside className="order-card" style={styles.card}>
              <div>
                <h2 style={styles.sectionTitle}>Méthode de paiement</h2>
                <p style={styles.text}>
                  Choisissez un mode de paiement sécurisé pour valider votre
                  commande.
                </p>
              </div>

              <div style={styles.paymentOptions}>
                {[
                  { value: "wave", label: "Wave" },
                  { value: "orange money", label: "Orange Money" },
                  { value: "freemoney", label: "Free Money" },
                ].map((option) => {
                  const isActive = paymentMethod === option.value;
                  return (
                    <label
                      key={option.value}
                      className="order-payment-option"
                      style={{
                        ...styles.paymentOption,
                        ...(isActive ? styles.paymentActive : {}),
                      }}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        value={option.value}
                        checked={paymentMethod === option.value}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        style={{ display: "none" }}
                      />
                      {option.label}
                    </label>
                  );
                })}
              </div>

              <div style={styles.totalBlock}>
                <div>
                  <h3 style={styles.itemTitle}>Total de la commande</h3>
                  <p
                    style={{
                      ...styles.text,
                      fontSize: "1.7rem",
                      fontWeight: 700,
                      marginTop: "8px",
                      color: "#102043",
                    }}
                  >
                    {totalPrice} FCFA
                  </p>
                </div>
                <button style={styles.orderBtn} onClick={handleSubmit}>
                  Finaliser la commande
                </button>
              </div>

              {status && <p style={styles.status}>{status}</p>}
            </aside>
          </div>
        </section>
      </main>
      <style>{`
        @media (max-width: 900px) {
          .order-panel {
            padding: 20px 18px 26px !important;
          }

          .order-content {
            flex-direction: column !important;
            gap: 22px !important;
          }

          .order-card {
            width: 100% !important;
            min-width: 0 !important;
            padding: 24px !important;
          }

          .order-payment-option {
            width: 100% !important;
            min-width: 0 !important;
          }
        }
      `}</style>
      <Footer />
    </div>
  );
}

export default Order;
