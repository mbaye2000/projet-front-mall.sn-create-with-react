import React, { useState } from "react";
import axios from "axios";
import { API_URL } from "../Services/Config";
import { saveToken } from "./Services/autorization";
import Navbar from "./Auth/Navbar";
import logo from "./layouts/logoR.png";
import Footer from "./Footer";
import PasswordInput from "./PasswordInput";

const User = () => {
  const [formData, setFormData] = useState({
    fullname: "",
    address: "",
    email: "",
    age: "",
    phone: "",
    password: "",
    role: "client",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post(`${API_URL}/register`, formData);
      setMessage(result.data.message || "Inscription réussie");
      if (result.data.token) {
        saveToken(result.data.token, result.data.user);
      }
    } catch (error) {
      setMessage(
        error.response?.data?.message || "Erreur lors de l'inscription",
      );
      console.error(
        "Registration error",
        error.response?.data || error.message,
      );
    }
  };

  return (
    <>
      {/*   <style>
        {`
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes slideIn {
            from {
              opacity: 0;
              transform: translateX(-30px);
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
              transform: scale(1.05);
            }
            100% {
              transform: scale(1);
            }
          }

          @media (max-width: 768px) {
            .form-container {
              padding: 30px 20px !important;
              margin: 20px !important;
            }
            .form-title {
              font-size: 2rem !important;
            }
            .form-description {
              font-size: 1rem !important;
            }
          }

          @media (max-width: 480px) {
            .form-container {
              padding: 20px 15px !important;
              margin: 10px !important;
            }
            .form-title {
              font-size: 1.8rem !important;
            }
            .form-grid {
              gap: 16px !important;
            }
          }
        `}
      </style>*/}
      <Navbar />
      <main
        style={{
          width: "100%",
          background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
          padding: "20px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div>
          <img
            src={logo}
            alt="Mall SN Logo"
            style={{
              position: "absolute",
              top: "20px",
              left: "20px",
              marginLeft: "7rem",
            }}
          />
          <p
            style={{
              paddingRight: "100px",
              marginTop: "250px",
              color: "#374151",
              textAlign: "center",
              fontSize: "clamp(1rem, 2vw, 1.4rem)",
              animation: "fadeIn 1.5s ease-out",
            }}
          >
            Rejoignez-nous dès aujourd’hui en créant votre compte.
            <br />
            Remplissez les informations demandées <br /> pour accéder à tous nos
            services et profiter d’une expérience personnalisée.
            <br /> Renseignez votre nom, votre adresse e-mail et choisissez un
            mot de passe sécurisé pour protéger votre compte.
            <br /> En créant un compte, vous pourrez suivre vos commandes,
            enregistrer vos produits favoris et bénéficier d’offres exclusives.
            <br /> Vous avez déjà un compte ? Connectez-vous simplement pour
            continuer.
          </p>
        </div>
        <div
          style={{
            position: "absolute",
            top: "0",
            left: "0",
            width: "100%",
            height: "100%",
            background:
              'url(\'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="20" cy="20" r="2" fill="rgba(255,255,255,0.1)"/><circle cx="80" cy="80" r="2" fill="rgba(255,255,255,0.1)"/><circle cx="40" cy="60" r="1" fill="rgba(255,255,255,0.1)"/><circle cx="60" cy="30" r="1" fill="rgba(255,255,255,0.1)"/></svg>\')',
            animation: "fadeIn 2s ease-in-out",
          }}
        ></div>
        <section
          className="form-container"
          style={{
            width: "100%",
            maxWidth: "600px",
            background: "rgba(255, 255, 255, 0.95)",
            backdropFilter: "blur(20px)",
            borderRadius: "24px",
            padding: "40px",
            marginRight: "50px",
            boxShadow:
              "0 25px 50px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(255, 255, 255, 0.2)",
            border: "1px solid rgba(255, 255, 255, 0.3)",
            animation: "fadeIn 1s ease-out",
            position: "relative",
            zIndex: "1",
          }}
        >
          <div style={{ textAlign: "center", marginBottom: "32px" }}>
            <h1
              className="form-title"
              style={{
                fontSize: "clamp(2.2rem, 3vw, 2.8rem)",
                fontWeight: "800",
                marginBottom: "12px",
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                animation: "slideIn 1s ease-out",
              }}
            >
              Créer un Compte
            </h1>
            <p
              className="form-description"
              style={{
                color: "#64748b",
                fontSize: "1.1rem",
                lineHeight: "1.6",
                animation: "slideIn 1.2s ease-out",
              }}
            >
              Rejoignez Mall SN et accédez à toutes nos fonctionnalités
              exclusives
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="form-grid"
            style={{
              display: "grid",
              gap: "20px",
              animation: "slideIn 1.4s ease-out",
            }}
          >
            <div style={{ display: "grid", gap: "8px" }}>
              <label
                htmlFor="fullname"
                style={{
                  fontWeight: "600",
                  color: "#374151",
                  fontSize: "0.95rem",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                Nom complet
              </label>
              <input
                type="text"
                id="fullname"
                name="fullname"
                value={formData.fullname}
                onChange={handleChange}
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
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "#667eea";
                  e.target.style.boxShadow =
                    "0 0 0 3px rgba(102, 126, 234, 0.1)";
                  e.target.style.transform = "translateY(-1px)";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "#e5e7eb";
                  e.target.style.boxShadow = "0 2px 4px rgba(0, 0, 0, 0.05)";
                  e.target.style.transform = "translateY(0)";
                }}
                placeholder="Votre nom complet"
              />
            </div>

            <div style={{ display: "grid", gap: "8px" }}>
              <label
                htmlFor="address"
                style={{
                  fontWeight: "600",
                  color: "#374151",
                  fontSize: "0.95rem",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                Adresse
              </label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
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
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "#667eea";
                  e.target.style.boxShadow =
                    "0 0 0 3px rgba(102, 126, 234, 0.1)";
                  e.target.style.transform = "translateY(-1px)";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "#e5e7eb";
                  e.target.style.boxShadow = "0 2px 4px rgba(0, 0, 0, 0.05)";
                  e.target.style.transform = "translateY(0)";
                }}
                placeholder="Votre adresse complète"
              />
            </div>

            <div style={{ display: "grid", gap: "8px" }}>
              <label
                htmlFor="email"
                style={{
                  fontWeight: "600",
                  color: "#374151",
                  fontSize: "0.95rem",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
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
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "#667eea";
                  e.target.style.boxShadow =
                    "0 0 0 3px rgba(102, 126, 234, 0.1)";
                  e.target.style.transform = "translateY(-1px)";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "#e5e7eb";
                  e.target.style.boxShadow = "0 2px 4px rgba(0, 0, 0, 0.05)";
                  e.target.style.transform = "translateY(0)";
                }}
                placeholder="votre.email@example.com"
              />
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "16px",
              }}
            >
              <div style={{ display: "grid", gap: "8px" }}>
                <label
                  htmlFor="age"
                  style={{
                    fontWeight: "600",
                    color: "#374151",
                    fontSize: "0.95rem",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  Âge
                </label>
                <input
                  type="number"
                  id="age"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
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
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = "#667eea";
                    e.target.style.boxShadow =
                      "0 0 0 3px rgba(102, 126, 234, 0.1)";
                    e.target.style.transform = "translateY(-1px)";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "#e5e7eb";
                    e.target.style.boxShadow = "0 2px 4px rgba(0, 0, 0, 0.05)";
                    e.target.style.transform = "translateY(0)";
                  }}
                  placeholder="25"
                />
              </div>

              <div style={{ display: "grid", gap: "8px" }}>
                <label
                  htmlFor="phone"
                  style={{
                    fontWeight: "600",
                    color: "#374151",
                    fontSize: "0.95rem",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  Téléphone
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
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
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = "#667eea";
                    e.target.style.boxShadow =
                      "0 0 0 3px rgba(102, 126, 234, 0.1)";
                    e.target.style.transform = "translateY(-1px)";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "#e5e7eb";
                    e.target.style.boxShadow = "0 2px 4px rgba(0, 0, 0, 0.05)";
                    e.target.style.transform = "translateY(0)";
                  }}
                  placeholder="+221 XX XXX XX XX"
                />
              </div>
            </div>

            <PasswordInput
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Votre mot de passe sécurisé"
              label="Mot de passe"
              required
              containerStyle={{ display: "grid", gap: "8px" }}
              labelStyle={{
                fontWeight: "600",
                color: "#374151",
                fontSize: "0.95rem",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
              style={{
                width: "90%",
                border: "2px solid #e5e7eb",
                backgroundColor: "#ffffff",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)",
              }}
            />

            <button
              type="submit"
              style={{
                margin: "0 auto",
                width: "40%",
                backgroundColor: "orange",
                color: "#ffffff",
                border: "none",
                borderRadius: "12px",
                padding: "18px 24px",
                fontSize: "1.1rem",
                fontWeight: "700",
                cursor: "pointer",
                transition: "all 0.3s ease",
                boxShadow: "0 4px 15px rgba(102, 126, 234, 0.3)",
                marginTop: "8px",
                animation: "pulse 2s infinite",
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
              Créer mon compte
            </button>
          </form>

          {message && (
            <div
              style={{
                marginTop: "24px",
                padding: "16px",
                borderRadius: "12px",
                textAlign: "center",
                fontWeight: "600",
                animation: "fadeIn 0.5s ease-out",
                background:
                  message.includes("succès") || message.includes("réussie")
                    ? "linear-gradient(135deg, #10b981 0%, #059669 100%)"
                    : "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",
                color: "#ffffff",
                boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
              }}
            >
              {message.includes("succès") || message.includes("réussie")
                ? "✅ "
                : "❌ "}
              {message}
            </div>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
};

export default User;
