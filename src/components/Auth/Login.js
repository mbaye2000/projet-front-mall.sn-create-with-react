import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../Services/Config";
import { saveToken } from "../Services/autorization";
import logoMallSn from "../layouts/logo.jpeg";

function Login() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { email, password } = data;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setIsSubmitting(true);

    try {
      const result = await axios.post(`${API_URL}/login`, data);
      const token = result.data.token;
      const user = result.data.user;
      saveToken(token, user);
      if (user?.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "Erreur de connexion");
      console.error("login error", error.response?.data || error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <main
        style={{
          background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
          minHeight: "100vh",
          padding: "60px 20px",
          fontFamily: "'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', sans-serif",
          animation: "fadeIn 0.8s ease-in",
        }}
      >
        {/* Header Section */}
        <div
          style={{
            textAlign: "center",
            marginBottom: "60px",
          }}
        >
          <img
            src={logoMallSn}
            alt="Logo Mall SN"
            style={{
              width: "400px",
              height: "auto",
              marginTop: "-50px",
              marginBottom: "-50px",
              animation: "fadeIn 0.8s ease-in",
            }}
          />
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
            Connexion
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
            Accédez à votre espace client et gérez vos commandes.
          </p>
        </div>

        <section
          style={{
            maxWidth: "500px",
            margin: "0 auto",
            padding: "50px 40px",
            background: "white",
            borderRadius: "24px",
            boxShadow:
              "0 20px 60px rgba(102, 126, 234, 0.1), 0 0 1px rgba(0, 0, 0, 0.03)",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(255, 255, 255, 0.8)",
            transition: "all 0.3s ease",
          }}
        >
          <form
            onSubmit={handleSubmit}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "25px",
            }}
          >
            {/* Email */}
            <div style={{ display: "flex", flexDirection: "column" }}>
              <label
                htmlFor="email"
                style={{
                  fontSize: "0.95rem",
                  fontWeight: "700",
                  color: "#1a202c",
                  marginBottom: "10px",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                  fontFamily: "inherit",
                }}
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={handleChange}
                placeholder="votre.email@exemple.com"
                autoComplete="email"
                required
                style={{
                  padding: "14px 18px",
                  border: "2px solid #e2e8f0",
                  borderRadius: "12px",
                  fontSize: "1rem",
                  fontFamily: "inherit",
                  transition: "all 0.3s ease",
                  backgroundColor: "#f8fafc",
                  color: "#1a202c",
                  outline: "none",
                  width: "100%",
                  boxSizing: "border-box",
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "#667eea";
                  e.target.style.backgroundColor = "white";
                  e.target.style.boxShadow =
                    "0 0 0 4px rgba(102, 126, 234, 0.1)";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "#e2e8f0";
                  e.target.style.backgroundColor = "#f8fafc";
                  e.target.style.boxShadow = "none";
                }}
              />
            </div>

            {/* Password */}
            <div style={{ display: "flex", flexDirection: "column" }}>
              <label
                htmlFor="password"
                style={{
                  fontSize: "0.95rem",
                  fontWeight: "700",
                  color: "#1a202c",
                  marginBottom: "10px",
                  textTransform: "uppercase",
                  fontFamily: "inherit",
                  letterSpacing: "0.5px",
                }}
              >
                Mot de passe
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={handleChange}
                placeholder="Entrez votre mot de passe"
                autoComplete="current-password"
                required
                style={{
                  padding: "14px 18px",
                  border: "2px solid #e2e8f0",
                  borderRadius: "12px",
                  fontSize: "1rem",
                  fontFamily: "inherit",
                  transition: "all 0.3s ease",
                  backgroundColor: "#f8fafc",
                  color: "#1a202c",
                  outline: "none",
                  width: "100%",
                  boxSizing: "border-box",
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "#667eea";
                  e.target.style.backgroundColor = "white";
                  e.target.style.boxShadow =
                    "0 0 0 4px rgba(102, 126, 234, 0.1)";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "#e2e8f0";
                  e.target.style.backgroundColor = "#f8fafc";
                  e.target.style.boxShadow = "none";
                }}
              />
            </div>

            {/* Error Message */}
            {errorMessage && (
              <div
                style={{
                  padding: "16px 18px",
                  borderRadius: "12px",
                  fontSize: "0.95rem",
                  fontWeight: "600",
                  color: "#c53030",
                  backgroundColor: "#fff5f5",
                  border: "2px solid #fc8181",
                  animation: "slideIn 0.4s ease",
                }}
              >
                {errorMessage}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              style={{
                padding: "16px 32px",
                background: isSubmitting
                  ? "linear-gradient(135deg, #cbd5e0 0%, #a0aec0 100%)"
                  : "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                color: "white",
                border: "none",
                borderRadius: "12px",
                fontSize: "1rem",
                fontWeight: "700",
                cursor: isSubmitting ? "not-allowed" : "pointer",
                transition: "all 0.3s ease",
                letterSpacing: "0.5px",
                textTransform: "uppercase",
                boxShadow: isSubmitting
                  ? "0 10px 30px rgba(0, 0, 0, 0.1)"
                  : "0 15px 40px rgba(102, 126, 234, 0.3)",
                marginTop: "10px",
                width: "100%",
                boxSizing: "border-box",
              }}
              onMouseEnter={(e) => {
                if (!isSubmitting) {
                  e.target.style.transform = "translateY(-3px)";
                  e.target.style.boxShadow =
                    "0 20px 50px rgba(102, 126, 234, 0.4)";
                }
              }}
              onMouseLeave={(e) => {
                if (!isSubmitting) {
                  e.target.style.transform = "translateY(0)";
                  e.target.style.boxShadow =
                    "0 15px 40px rgba(102, 126, 234, 0.3)";
                }
              }}
            >
              {isSubmitting ? "Connexion en cours..." : "Se connecter"}
            </button>
          </form>

          <p
            style={{
              textAlign: "center",
              marginTop: "30px",
              fontSize: "0.9rem",
              color: "#4a5568",
            }}
          >
            Pas encore de compte ?{" "}
            <Link
              to="/login/user"
              style={{
                color: "#667eea",
                textDecoration: "none",
                fontWeight: "600",
                transition: "color 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.target.style.color = "#764ba2";
              }}
              onMouseLeave={(e) => {
                e.target.style.color = "#667eea";
              }}
            >
              Créer un compte
            </Link>
          </p>
        </section>

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

            @keyframes slideIn {
              from {
                opacity: 0;
                transform: translateX(-20px);
              }
              to {
                opacity: 1;
                transform: translateX(0);
              }
            }

            @media (max-width: 768px) {
              main {
                padding: 40px 15px;
              }

              main > div:first-child h1 {
                font-size: 2.5rem;
              }

              main > div:first-child p {
                font-size: 0.95rem;
              }

              main > section {
                padding: 30px 20px !important;
                max-width: 100% !important;
              }

              main > section form {
                gap: 18px !important;
              }

              main > section form input {
                font-size: 16px;
                padding: 12px 16px;
              }

              main > section form button {
                padding: 14px 24px;
                font-size: 0.9rem;
              }

              main > section form label {
                font-size: 0.85rem !important;
              }
            }

            @media (max-width: 480px) {
              main > div:first-child h1 {
                font-size: 2rem;
              }

              main > section {
                padding: 20px 15px !important;
              }

              main > section form {
                gap: 14px !important;
              }
            }
          `}
        </style>
      </main>
    </>
  );
}

export default Login;
