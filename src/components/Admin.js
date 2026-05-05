import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./Auth/Navbar";
import { API_URL } from "./Services/Config";
import { getToken, getUser } from "./Services/autorization";
import Footer from "./Footer";

const Admin = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [message, setMessage] = useState("");

  const [categoryName, setCategoryName] = useState("");
  const [categoryDescription, setCategoryDescription] = useState("");

  const [productName, setProductName] = useState("");
  const [productRef, setProductRef] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productImage, setProductImage] = useState("");
  const [productCategoryId, setProductCategoryId] = useState("");
  const [productStock, setProductStock] = useState(0);
  const [isCreatingCategory, setIsCreatingCategory] = useState(false);

  const token = getToken();
  const user = getUser();
  const authHeaders = token
    ? {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    : {};

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${API_URL}/categories`);
      setCategories(response.data.categories || []);
    } catch (error) {
      setMessage(
        error.response?.data?.message ||
          "Impossible de charger les catégories (backend indisponible).",
      );
      console.error("Erreur chargement categories", error);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${API_URL}/products`);
      setProducts(response.data.products || []);
    } catch (error) {
      console.error("Erreur chargement produits", error);
    }
  };

  const fetchOrders = async () => {
    try {
      const response = await axios.get(`${API_URL}/orders`, authHeaders);
      setOrders(response.data || []);
    } catch (error) {
      console.error("Erreur chargement commandes", error);
    }
  };

  const handleUpdateOrderStatus = async (orderId, newStatus) => {
    try {
      await axios.patch(
        `${API_URL}/orders/${orderId}/status`,
        { orderStatus: newStatus },
        authHeaders,
      );
      setMessage(`Statut de la commande mis à jour : ${newStatus}`);
      fetchOrders();
    } catch (error) {
      setMessage("Erreur lors de la mise à jour du statut");
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchProducts();
    fetchOrders();
  }, []);

  const handleCreateCategory = async (e) => {
    e.preventDefault();
    const normalizedName = categoryName.trim();
    const normalizedDescription = categoryDescription.trim();

    if (!token) {
      setMessage("Connectez-vous en admin pour créer une catégorie.");
      return;
    }

    if (!normalizedName || !normalizedDescription) {
      setMessage("Le nom et la description sont obligatoires.");
      return;
    }

    setIsCreatingCategory(true);
    try {
      const response = await axios.post(
        `${API_URL}/categories`,
        {
          categoryName: normalizedName,
          categoryDescription: normalizedDescription,
        },
        authHeaders,
      );
      setMessage(response.data.message || "Catégorie créée avec succès");
      setCategoryName("");
      setCategoryDescription("");
      fetchCategories();
    } catch (error) {
      setMessage(
        error.response?.data?.message ||
          "Erreur création catégorie. Vérifiez votre session admin.",
      );
      console.error(error);
    } finally {
      setIsCreatingCategory(false);
    }
  };

  const handleCreateProduct = async (e) => {
    e.preventDefault();
    if (!productCategoryId) {
      setMessage("Veuillez choisir une catégorie pour le produit.");
      return;
    }

    try {
      const response = await axios.post(
        `${API_URL}/products`,
        {
          productName,
          productRef,
          productDescription,
          productPrice: Number(productPrice),
          productImage,
          categoryId: productCategoryId,
          stock: {
            quantityAvailable: Number(productStock),
            quantitySold: 0,
          },
        },
        authHeaders,
      );
      setMessage(response.data.message || "Produit créé avec succès");
      setProductName("");
      setProductRef("");
      setProductDescription("");
      setProductPrice("");
      setProductImage("");
      setProductCategoryId("");
      setProductStock(0);
      fetchProducts();
    } catch (error) {
      setMessage(error.response?.data?.message || "Erreur création produit");
      console.error(error);
    }
  };

  const handleDeleteCategory = async (id) => {
    try {
      const response = await axios.delete(
        `${API_URL}/categories/${id}`,
        authHeaders,
      );
      setMessage(response.data.message || "Catégorie supprimée");
      fetchCategories();
    } catch (error) {
      setMessage(
        error.response?.data?.message || "Erreur suppression catégorie",
      );
      console.error(error);
    }
  };

  const handleDeleteProduct = async (id) => {
    try {
      const response = await axios.delete(
        `${API_URL}/products/${id}`,
        authHeaders,
      );
      setMessage(response.data.message || "Produit supprimé");
      fetchProducts();
    } catch (error) {
      setMessage(error.response?.data?.message || "Erreur suppression produit");
      console.error(error);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
      }}
    >
      <style>
        {`
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes slideInLeft {
            from {
              opacity: 0;
              transform: translateX(-30px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }

          @keyframes slideInRight {
            from {
              opacity: 0;
              transform: translateX(30px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }

          @keyframes pulse {
            0% {
              transform: scale(1);
            }
            50% {
              transform: scale(1.02);
            }
            100% {
              transform: scale(1);
            }
          }

          @media (max-width: 768px) {
            .admin-grid {
              grid-template-columns: 1fr !important;
              gap: 20px !important;
            }
            .admin-list-grid {
              grid-template-columns: 1fr !important;
            }
            .admin-panel {
              padding: 20px !important;
            }
          }

          @media (max-width: 480px) {
            .admin-header {
              padding: 20px !important;
            }
            .admin-title {
              font-size: 2rem !important;
            }
            .admin-subtitle {
              font-size: 1rem !important;
            }
          }
        `}
      </style>
      <Navbar />
      <main
        className="page-shell admin-page"
        style={{
          padding: "40px 20px",
          maxWidth: "1400px",
          margin: "0 auto",
          animation: "fadeIn 1s ease-out",
        }}
      >
        <header
          style={{
            textAlign: "center",
            marginBottom: "40px",
            padding: "40px",
            background: "rgba(255, 255, 255, 0.1)",
            borderRadius: "20px",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            animation: "slideInLeft 1s ease-out",
          }}
        >
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
          >
            Espace Administrateur
          </h1>
          <p
            style={{
              fontSize: "1.1rem",
              color: "#4a5568",
              maxWidth: "600px",
              margin: "0 auto",
              lineHeight: "1.6",
              fontWeight: "500",
            }}
          >
            Gérez efficacement les catégories et produits de Mall SN avec notre
            interface intuitive
          </p>
        </header>

        {message && (
          <div
            style={{
              marginBottom: "30px",
              padding: "16px 24px",
              borderRadius: "12px",
              textAlign: "center",
              fontWeight: "600",
              fontSize: "1rem",
              animation: "fadeIn 0.5s ease-out",
              background:
                message.includes("succès") ||
                message.includes("créé") ||
                message.includes("supprimé")
                  ? "linear-gradient(135deg, #10b981 0%, #059669 100%)"
                  : "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",
              color: "#ffffff",
              boxShadow: "0 8px 25px rgba(0, 0, 0, 0.15)",
              border: "1px solid rgba(255, 255, 255, 0.2)",
            }}
          >
            {message.includes("succès") ||
            message.includes("créé") ||
            message.includes("supprimé")
              ? " "
              : " "}
            {message}
          </div>
        )}

        <div
          className="admin-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(500px, 1fr))",
            gap: "30px",
            marginBottom: "40px",
          }}
        >
          <section
            className="admin-panel"
            style={{
              background: "rgba(255, 255, 255, 0.95)",
              backdropFilter: "blur(20px)",
              borderRadius: "20px",
              padding: "30px",
              boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)",
              border: "1px solid rgba(255, 255, 255, 0.3)",
              animation: "slideInLeft 1.2s ease-out",
            }}
          >
            <div>
              <h2
                style={{
                  fontSize: "1.8rem",
                  fontWeight: "700",
                  marginBottom: "24px",
                  color: "#1e293b",
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                }}
              >
                Créer une Catégorie
              </h2>
              <form
                onSubmit={handleCreateCategory}
                style={{ display: "grid", gap: "20px" }}
              >
                <div style={{ display: "grid", gap: "8px" }}>
                  <label
                    style={{
                      fontWeight: "600",
                      color: "#374151",
                      fontSize: "0.95rem",
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    Nom de la catégorie
                  </label>
                  <input
                    type="text"
                    value={categoryName}
                    onChange={(e) => setCategoryName(e.target.value)}
                    placeholder="Nom de la catégorie"
                    required
                    style={{
                      width: "80%",
                      border: "2px solid #e5e7eb",
                      borderRadius: "12px",
                      background: "#ffffff",
                      padding: "16px 18px",
                      outline: "none",
                      transition: "all 0.3s ease",
                      color: "#111827",
                      fontSize: "1rem",
                      fontFamily:
                        "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)",
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = "#667eea";
                      e.target.style.boxShadow =
                        "0 0 0 3px rgba(102, 126, 234, 0.1)";
                      e.target.style.transform = "translateY(-1px)";
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = "#e5e7eb";
                      e.target.style.boxShadow =
                        "0 2px 4px rgba(0, 0, 0, 0.05)";
                      e.target.style.transform = "translateY(0)";
                    }}
                  />
                </div>
                <div style={{ display: "grid", gap: "8px" }}>
                  <label
                    style={{
                      fontWeight: "600",
                      color: "#374151",
                      fontSize: "0.95rem",
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    Description
                  </label>
                  <textarea
                    value={categoryDescription}
                    onChange={(e) => setCategoryDescription(e.target.value)}
                    placeholder="Description de la catégorie"
                    rows="3"
                    required
                    style={{
                      width: "80%",
                      border: "2px solid #e5e7eb",
                      borderRadius: "12px",
                      background: "#ffffff",
                      padding: "16px 18px",
                      outline: "none",
                      transition: "all 0.3s ease",
                      color: "#111827",
                      fontSize: "1rem",
                      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)",
                      resize: "vertical",
                      fontFamily:
                        "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = "#667eea";
                      e.target.style.boxShadow =
                        "0 0 0 3px rgba(102, 126, 234, 0.1)";
                      e.target.style.transform = "translateY(-1px)";
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = "#e5e7eb";
                      e.target.style.boxShadow =
                        "0 2px 4px rgba(0, 0, 0, 0.05)";
                      e.target.style.transform = "translateY(0)";
                    }}
                  />
                </div>
                <button
                  type="submit"
                  disabled={isCreatingCategory}
                  style={{
                    width: "100%",
                    background: isCreatingCategory
                      ? "linear-gradient(135deg, #94a3b8 0%, #64748b 100%)"
                      : "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    color: "#ffffff",
                    border: "none",
                    borderRadius: "12px",
                    padding: "18px 24px",
                    fontSize: "1.1rem",
                    fontWeight: "700",
                    cursor: isCreatingCategory ? "not-allowed" : "pointer",
                    transition: "all 0.3s ease",
                    boxShadow: "0 4px 15px rgba(102, 126, 234, 0.3)",
                    animation: isCreatingCategory ? "none" : "pulse 3s infinite",
                    opacity: isCreatingCategory ? 0.8 : 1,
                  }}
                  onMouseEnter={(e) => {
                    if (isCreatingCategory) return;
                    e.target.style.transform = "translateY(-2px)";
                    e.target.style.boxShadow =
                      "0 8px 25px rgba(102, 126, 234, 0.4)";
                  }}
                  onMouseLeave={(e) => {
                    if (isCreatingCategory) return;
                    e.target.style.transform = "translateY(0)";
                    e.target.style.boxShadow =
                      "0 4px 15px rgba(102, 126, 234, 0.3)";
                  }}
                >
                  {isCreatingCategory
                    ? "Création en cours..."
                    : "Créer la catégorie"}
                </button>
              </form>
            </div>
          </section>

          <section
            className="admin-panel"
            style={{
              background: "rgba(255, 255, 255, 0.95)",
              backdropFilter: "blur(20px)",
              borderRadius: "20px",
              padding: "30px",
              boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)",
              border: "1px solid rgba(255, 255, 255, 0.3)",
              animation: "slideInRight 1.4s ease-out",
            }}
          >
            <div>
              <h2
                style={{
                  fontSize: "1.8rem",
                  fontWeight: "700",
                  marginBottom: "24px",
                  color: "#1e293b",
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                }}
              >
                Créer un Produit
              </h2>
              <form
                onSubmit={handleCreateProduct}
                style={{
                  fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
                  display: "grid",
                  gap: "20px",
                }}
              >
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "16px",
                  }}
                >
                  <div style={{ display: "grid", gap: "8px" }}>
                    <label
                      style={{
                        fontWeight: "600",
                        color: "#374151",
                        fontSize: "0.95rem",
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                      }}
                    >
                      Nom du produit
                    </label>
                    <input
                      type="text"
                      value={productName}
                      onChange={(e) => setProductName(e.target.value)}
                      placeholder="Nom du produit"
                      required
                      style={{
                        width: "90%",
                        border: "2px solid #e5e7eb",
                        borderRadius: "12px",
                        background: "#ffffff",
                        padding: "16px 18px",
                        outline: "none",
                        transition: "all 0.3s ease",
                        color: "#111827",
                        fontSize: "1rem",
                        fontFamily:
                          "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)",
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = "#667eea";
                        e.target.style.boxShadow =
                          "0 0 0 3px rgba(102, 126, 234, 0.1)";
                        e.target.style.transform = "translateY(-1px)";
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = "#e5e7eb";
                        e.target.style.boxShadow =
                          "0 2px 4px rgba(0, 0, 0, 0.05)";
                        e.target.style.transform = "translateY(0)";
                      }}
                    />
                  </div>

                  <div style={{ display: "grid", gap: "8px" }}>
                    <label
                      style={{
                        fontWeight: "600",
                        color: "#374151",
                        fontSize: "0.95rem",
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                      }}
                    >
                      Référence
                    </label>
                    <input
                      type="text"
                      value={productRef}
                      onChange={(e) => setProductRef(e.target.value)}
                      placeholder="Référence du produit"
                      required
                      style={{
                        width: "90%",
                        border: "2px solid #e5e7eb",
                        borderRadius: "12px",
                        background: "#ffffff",
                        padding: "16px 18px",
                        outline: "none",
                        transition: "all 0.3s ease",
                        color: "#111827",
                        fontSize: "1rem",
                        fontFamily:
                          "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)",
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = "#667eea";
                        e.target.style.boxShadow =
                          "0 0 0 3px rgba(102, 126, 234, 0.1)";
                        e.target.style.transform = "translateY(-1px)";
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = "#e5e7eb";
                        e.target.style.boxShadow =
                          "0 2px 4px rgba(0, 0, 0, 0.05)";
                        e.target.style.transform = "translateY(0)";
                      }}
                    />
                  </div>
                </div>

                <div style={{ display: "grid", gap: "8px" }}>
                  <label
                    style={{
                      fontWeight: "600",
                      color: "#374151",
                      fontSize: "0.95rem",
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    Description
                  </label>
                  <textarea
                    value={productDescription}
                    onChange={(e) => setProductDescription(e.target.value)}
                    placeholder="Description du produit"
                    rows="3"
                    required
                    style={{
                      width: "90%",
                      border: "2px solid #e5e7eb",
                      borderRadius: "12px",
                      background: "#ffffff",
                      padding: "16px 18px",
                      outline: "none",
                      transition: "all 0.3s ease",
                      color: "#111827",
                      fontSize: "1rem",
                      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)",
                      resize: "vertical",
                      fontFamily:
                        "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = "#667eea";
                      e.target.style.boxShadow =
                        "0 0 0 3px rgba(102, 126, 234, 0.1)";
                      e.target.style.transform = "translateY(-1px)";
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = "#e5e7eb";
                      e.target.style.boxShadow =
                        "0 2px 4px rgba(0, 0, 0, 0.05)";
                      e.target.style.transform = "translateY(0)";
                    }}
                  />
                </div>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr 1fr",
                    gap: "16px",
                  }}
                >
                  <div style={{ display: "grid", gap: "8px" }}>
                    <label
                      style={{
                        fontWeight: "600",
                        color: "#374151",
                        fontSize: "0.95rem",
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                      }}
                    >
                      Prix
                    </label>
                    <input
                      type="number"
                      value={productPrice}
                      onChange={(e) => setProductPrice(e.target.value)}
                      placeholder="Prix"
                      required
                      style={{
                        width: "50%",
                        border: "2px solid #e5e7eb",
                        borderRadius: "12px",
                        background: "#ffffff",
                        padding: "16px 18px",
                        outline: "none",
                        transition: "all 0.3s ease",
                        color: "#111827",
                        fontSize: "1rem",
                        fontFamily:
                          "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)",
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = "#667eea";
                        e.target.style.boxShadow =
                          "0 0 0 3px rgba(102, 126, 234, 0.1)";
                        e.target.style.transform = "translateY(-1px)";
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = "#e5e7eb";
                        e.target.style.boxShadow =
                          "0 2px 4px rgba(0, 0, 0, 0.05)";
                        e.target.style.transform = "translateY(0)";
                      }}
                    />
                  </div>

                  <div style={{ display: "grid", gap: "8px" }}>
                    <label
                      style={{
                        fontWeight: "600",
                        color: "#374151",
                        fontSize: "0.95rem",
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                      }}
                    >
                      Stock
                    </label>
                    <input
                      type="number"
                      value={productStock}
                      onChange={(e) => setProductStock(e.target.value)}
                      placeholder="Stock"
                      min="0"
                      required
                      style={{
                        width: "50%",
                        border: "2px solid #e5e7eb",
                        borderRadius: "12px",
                        background: "#ffffff",
                        padding: "16px 18px",
                        outline: "none",
                        transition: "all 0.3s ease",
                        color: "#111827",
                        fontSize: "1rem",
                        fontFamily:
                          "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)",
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = "#667eea";
                        e.target.style.boxShadow =
                          "0 0 0 3px rgba(102, 126, 234, 0.1)";
                        e.target.style.transform = "translateY(-1px)";
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = "#e5e7eb";
                        e.target.style.boxShadow =
                          "0 2px 4px rgba(0, 0, 0, 0.05)";
                        e.target.style.transform = "translateY(0)";
                      }}
                    />
                  </div>

                  <div style={{ display: "grid", gap: "8px" }}>
                    <label
                      style={{
                        fontWeight: "600",
                        color: "#374151",
                        fontSize: "0.95rem",
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                      }}
                    >
                      Catégorie
                    </label>
                    <select
                      value={productCategoryId}
                      onChange={(e) => setProductCategoryId(e.target.value)}
                      required
                      style={{
                        width: "90%",
                        border: "2px solid #e5e7eb",
                        borderRadius: "12px",
                        background: "#ffffff",
                        padding: "16px 18px",
                        outline: "none",
                        transition: "all 0.3s ease",
                        color: "#111827",
                        fontSize: "1rem",
                        fontFamily:
                          "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)",
                        cursor: "pointer",
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = "#667eea";
                        e.target.style.boxShadow =
                          "0 0 0 3px rgba(102, 126, 234, 0.1)";
                        e.target.style.transform = "translateY(-1px)";
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = "#e5e7eb";
                        e.target.style.boxShadow =
                          "0 2px 4px rgba(0, 0, 0, 0.05)";
                        e.target.style.transform = "translateY(0)";
                      }}
                    >
                      <option value="">Choisir une catégorie</option>
                      {categories.map((category) => (
                        <option key={category._id} value={category._id}>
                          {category.categoryName}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div style={{ display: "grid", gap: "8px" }}>
                  <label
                    style={{
                      fontWeight: "600",
                      color: "#374151",
                      fontSize: "0.95rem",
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    URL de l'image
                  </label>
                  <input
                    type="text"
                    value={productImage}
                    onChange={(e) => setProductImage(e.target.value)}
                    placeholder="URL de l'image du produit"
                    required
                    style={{
                      width: "90%",
                      border: "2px solid #e5e7eb",
                      borderRadius: "12px",
                      background: "#ffffff",
                      padding: "16px 18px",
                      outline: "none",
                      transition: "all 0.3s ease",
                      color: "#111827",
                      fontSize: "1rem",
                      fontFamily:
                        "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)",
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = "#667eea";
                      e.target.style.boxShadow =
                        "0 0 0 3px rgba(102, 126, 234, 0.1)";
                      e.target.style.transform = "translateY(-1px)";
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = "#e5e7eb";
                      e.target.style.boxShadow =
                        "0 2px 4px rgba(0, 0, 0, 0.05)";
                      e.target.style.transform = "translateY(0)";
                    }}
                  />
                </div>

                <button
                  type="submit"
                  style={{
                    width: "90%",
                    background:
                      "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    color: "#ffffff",
                    border: "none",
                    borderRadius: "12px",
                    padding: "18px 24px",
                    fontSize: "1.1rem",
                    fontWeight: "700",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    boxShadow: "0 4px 15px rgba(102, 126, 234, 0.3)",
                    animation: "pulse 3s infinite",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = "translateY(-2px)";
                    e.target.style.boxShadow =
                      "0 8px 25px rgba(102, 126, 234, 0.4)";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = "translateY(0)";
                    e.target.style.boxShadow =
                      "0 4px 15px rgba(102, 126, 234, 0.3)";
                  }}
                >
                  Créer le produit
                </button>
              </form>
            </div>
          </section>
        </div>

        <section
          className="admin-list-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))",
            gap: "30px",
            animation: "slideInLeft 1.6s ease-out",
          }}
        >
          <section
            style={{
              background: "rgba(255, 255, 255, 0.95)",
              backdropFilter: "blur(20px)",
              borderRadius: "20px",
              padding: "30px",
              boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)",
              border: "1px solid rgba(255, 255, 255, 0.3)",
            }}
          >
            <h2
              style={{
                fontSize: "1.8rem",
                fontWeight: "700",
                marginBottom: "24px",
                color: "#1e293b",
                display: "flex",
                alignItems: "center",
                gap: "12px",
              }}
            >
              Catégories Existantes
            </h2>
            {categories.length === 0 ? (
              <p
                style={{
                  textAlign: "center",
                  color: "#64748b",
                  fontSize: "1.1rem",
                  padding: "40px",
                  background: "rgba(102, 126, 234, 0.05)",
                  borderRadius: "12px",
                  border: "2px dashed rgba(102, 126, 234, 0.2)",
                }}
              >
                Aucune catégorie trouvée. Créez votre première catégorie !
              </p>
            ) : (
              <div style={{ display: "grid", gap: "16px" }}>
                {categories.map((category) => (
                  <div
                    key={category._id}
                    style={{
                      background:
                        "linear-gradient(135deg, #f8fafc 0%, #ffffff 100%)",
                      borderRadius: "12px",
                      padding: "20px",
                      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
                      border: "1px solid rgba(102, 126, 234, 0.1)",
                      transition: "all 0.3s ease",
                      cursor: "pointer",
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.transform = "translateY(-2px)";
                      e.target.style.boxShadow =
                        "0 8px 25px rgba(102, 126, 234, 0.15)";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.transform = "translateY(0)";
                      e.target.style.boxShadow =
                        "0 4px 12px rgba(0, 0, 0, 0.05)";
                    }}
                  >
                    <div style={{ flex: 1 }}>
                      <strong
                        style={{
                          fontSize: "1.1rem",
                          color: "#1e293b",
                          display: "block",
                          marginBottom: "8px",
                        }}
                      >
                        {category.categoryName}
                      </strong>
                      <p
                        style={{
                          color: "#64748b",
                          fontSize: "0.95rem",
                          lineHeight: "1.5",
                          margin: 0,
                        }}
                      >
                        {category.categoryDescription}
                      </p>
                    </div>
                    <button
                      onClick={() => handleDeleteCategory(category._id)}
                      style={{
                        background:
                          "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",
                        color: "#ffffff",
                        border: "none",
                        borderRadius: "8px",
                        padding: "10px 16px",
                        fontSize: "0.9rem",
                        fontWeight: "600",
                        cursor: "pointer",
                        transition: "all 0.3s ease",
                        boxShadow: "0 2px 8px rgba(239, 68, 68, 0.2)",
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.transform = "translateY(-1px)";
                        e.target.style.boxShadow =
                          "0 4px 12px rgba(239, 68, 68, 0.3)";
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.transform = "translateY(0)";
                        e.target.style.boxShadow =
                          "0 2px 8px rgba(239, 68, 68, 0.2)";
                      }}
                    >
                      Supprimer
                    </button>
                  </div>
                ))}
              </div>
            )}
          </section>

          <section
            style={{
              background: "rgba(255, 255, 255, 0.95)",
              backdropFilter: "blur(20px)",
              borderRadius: "20px",
              padding: "30px",
              boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)",
              border: "1px solid rgba(255, 255, 255, 0.3)",
            }}
          >
            <h2
              style={{
                fontSize: "1.8rem",
                fontWeight: "700",
                marginBottom: "24px",
                color: "#1e293b",
                display: "flex",
                alignItems: "center",
                gap: "12px",
              }}
            >
              Produits Existants
            </h2>
            {products.length === 0 ? (
              <p
                style={{
                  textAlign: "center",
                  color: "#64748b",
                  fontSize: "1.1rem",
                  padding: "40px",
                  background: "rgba(102, 126, 234, 0.05)",
                  borderRadius: "12px",
                  border: "2px dashed rgba(102, 126, 234, 0.2)",
                }}
              >
                Aucun produit trouvé. Créez votre premier produit !
              </p>
            ) : (
              <div style={{ display: "grid", gap: "16px" }}>
                {products.map((product) => (
                  <div
                    key={product._id}
                    style={{
                      background:
                        "linear-gradient(135deg, #f8fafc 0%, #ffffff 100%)",
                      borderRadius: "12px",
                      padding: "20px",
                      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
                      border: "1px solid rgba(102, 126, 234, 0.1)",
                      transition: "all 0.3s ease",
                      cursor: "pointer",
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.transform = "translateY(-2px)";
                      e.target.style.boxShadow =
                        "0 8px 25px rgba(102, 126, 234, 0.15)";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.transform = "translateY(0)";
                      e.target.style.boxShadow =
                        "0 4px 12px rgba(0, 0, 0, 0.05)";
                    }}
                  >
                    <div style={{ flex: 1 }}>
                      <strong
                        style={{
                          fontSize: "1.1rem",
                          color: "#1e293b",
                          display: "block",
                          marginBottom: "8px",
                        }}
                      >
                        {product.productName}
                      </strong>
                      <p
                        style={{
                          color: "#64748b",
                          fontSize: "0.95rem",
                          lineHeight: "1.5",
                          margin: 0,
                        }}
                      >
                        {product.productDescription}
                      </p>
                      <div
                        style={{
                          marginTop: "12px",
                          display: "flex",
                          gap: "16px",
                          fontSize: "0.9rem",
                          color: "#64748b",
                        }}
                      >
                        <span>{product.productPrice}€</span>
                        <span>
                          Stock: {product.stock?.quantityAvailable || 0}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => handleDeleteProduct(product._id)}
                      style={{
                        background:
                          "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",
                        color: "#ffffff",
                        border: "none",
                        borderRadius: "8px",
                        padding: "10px 16px",
                        fontSize: "0.9rem",
                        fontWeight: "600",
                        cursor: "pointer",
                        transition: "all 0.3s ease",
                        boxShadow: "0 2px 8px rgba(239, 68, 68, 0.2)",
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.transform = "translateY(-1px)";
                        e.target.style.boxShadow =
                          "0 4px 12px rgba(239, 68, 68, 0.3)";
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.transform = "translateY(0)";
                        e.target.style.boxShadow =
                          "0 2px 8px rgba(239, 68, 68, 0.2)";
                      }}
                    >
                      Supprimer
                    </button>
                  </div>
                ))}
              </div>
            )}
          </section>
        </section>

        <section
          style={{
            marginTop: "40px",
            background: "rgba(255, 255, 255, 0.95)",
            backdropFilter: "blur(20px)",
            borderRadius: "20px",
            padding: "30px",
            boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)",
            border: "1px solid rgba(255, 255, 255, 0.3)",
            animation: "slideInLeft 1.8s ease-out",
          }}
        >
          <h2
            style={{
              fontSize: "1.8rem",
              fontWeight: "700",
              marginBottom: "24px",
              color: "#1e293b",
              display: "flex",
              alignItems: "center",
              gap: "12px",
            }}
          >
            Gestion des Commandes
          </h2>
          {orders.length === 0 ? (
            <p
              style={{
                textAlign: "center",
                color: "#64748b",
                padding: "40px",
                background: "rgba(102, 126, 234, 0.05)",
                borderRadius: "12px",
                border: "2px dashed rgba(102, 126, 234, 0.2)",
              }}
            >
              Aucune commande trouvée.
            </p>
          ) : (
            <div style={{ overflowX: "auto" }}>
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  textAlign: "left",
                }}
              >
                <thead>
                  <tr style={{ borderBottom: "2px solid #e5e7eb" }}>
                    <th style={{ padding: "12px", color: "#475569" }}>Référence</th>
                    <th style={{ padding: "12px", color: "#475569" }}>Client</th>
                    <th style={{ padding: "12px", color: "#475569" }}>Montant</th>
                    <th style={{ padding: "12px", color: "#475569" }}>Statut</th>
                    <th style={{ padding: "12px", color: "#475569" }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr
                      key={order._id}
                      style={{ borderBottom: "1px solid #e5e7eb" }}
                    >
                      <td
                        style={{
                          padding: "12px",
                          fontWeight: "600",
                          color: "#1e293b",
                        }}
                      >
                        {order.refOrder}
                      </td>
                      <td style={{ padding: "12px" }}>
                        <div style={{ fontWeight: "600", color: "#1e293b" }}>
                          {order.user?.guest?.fullname || "Client inconnu"}
                        </div>
                        <div style={{ fontSize: "0.85rem", color: "#64748b" }}>
                          {order.user?.guest?.email}
                        </div>
                      </td>
                      <td
                        style={{
                          padding: "12px",
                          fontWeight: "700",
                          color: "#764ba2",
                        }}
                      >
                        {order.totalPrice} FCFA
                      </td>
                      <td style={{ padding: "12px" }}>
                        <span
                          style={{
                            padding: "6px 12px",
                            borderRadius: "20px",
                            fontSize: "0.85rem",
                            fontWeight: "600",
                            background:
                              order.orderStatus === "deliverd"
                                ? "#d1fae5"
                                : order.orderStatus === "canceled"
                                  ? "#fee2e2"
                                  : order.orderStatus === "shipped"
                                    ? "#dbeafe"
                                    : "#fef3c7",
                            color:
                              order.orderStatus === "deliverd"
                                ? "#065f46"
                                : order.orderStatus === "canceled"
                                  ? "#991b1b"
                                  : order.orderStatus === "shipped"
                                    ? "#1e40af"
                                    : "#92400e",
                          }}
                        >
                          {order.orderStatus === "deliverd"
                            ? "Livrée"
                            : order.orderStatus === "canceled"
                              ? "Annulée"
                              : order.orderStatus === "shipped"
                                ? "Expédiée"
                                : "En attente"}
                        </span>
                      </td>
                      <td style={{ padding: "12px" }}>
                        <select
                          value={order.orderStatus}
                          onChange={(e) =>
                            handleUpdateOrderStatus(order._id, e.target.value)
                          }
                          style={{
                            padding: "8px 12px",
                            borderRadius: "8px",
                            border: "1px solid #e5e7eb",
                            background: "white",
                            cursor: "pointer",
                            outline: "none",
                            fontSize: "0.9rem",
                          }}
                        >
                          <option value="pending">En attente</option>
                          <option value="shipped">Expédiée</option>
                          <option value="deliverd">Livrée</option>
                          <option value="canceled">Annulée</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Admin;
