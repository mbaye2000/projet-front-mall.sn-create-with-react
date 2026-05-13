import React, { useState } from "react";
import Navbar from "./Auth/Navbar";
import axios from "axios";
import { API_URL } from "../Services/Config";
import Footer from "./Footer";
import logoMallSn from "./layouts/logo.jpeg";

function Contact() {
  const [formData, setFormData] = useState({
    fullname: "",
    address: "",
    email: "",
    message: "",
  });
  const [feedback, setFeedback] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await axios.post(`${API_URL}/contact`, formData);
      setFeedback(response.data.message || "Message envoyé avec succès");
      setFormData({ fullname: "", address: "", email: "", message: "" });
    } catch (error) {
      setFeedback(
        error.response?.data?.message || "Erreur lors de l'envoi du message",
      );
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <Navbar />
      <main
        style={{
          background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
          minHeight: "100vh",
          padding: "60px 20px",
          fontFamily: "'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', sans-serif",
        }}
      >
        {/* Header Section */}
        <div
          style={{
            textAlign: "center",
            marginBottom: "60px",
            animation: "fadeIn 0.8s ease-in",
          }}
        >
          <img
            src={logoMallSn}
            alt="Logo Mall SN"
            style={{
              width: "300px",
              height: "auto",
              marginTop: "-50px",
              marginBottom: "-50px",
              animation: "fadeIn 0.8s ease-in",
              borderRadius: "50%",
              boxShadow: "0 10px 30px rgba(102, 126, 234, 0.3)",
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
            Contactez-nous
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
            Posez-nous vos questions, partagez votre retour ou demandez de
            l'aide. Nous sommes ici pour vous!
          </p>
        </div>

        {/* Main Content Container */}
        <div
          className="contact-grid"
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            alignItems: "start",
          }}
        >
          {/* Left Side - Contact Info */}
          <div
            className="contact-card"
            style={{
              background: "white",
              padding: "50px 40px",
              borderRadius: "24px",
              boxShadow:
                "0 20px 60px rgba(102, 126, 234, 0.1), 0 0 1px rgba(0, 0, 0, 0.03)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255, 255, 255, 0.8)",
              transition: "all 0.3s ease",
              cursor: "default",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow =
                "0 30px 80px rgba(102, 126, 234, 0.2), 0 0 1px rgba(0, 0, 0, 0.03)";
              e.currentTarget.style.transform = "translateY(-5px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow =
                "0 20px 60px rgba(102, 126, 234, 0.1), 0 0 1px rgba(0, 0, 0, 0.03)";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            <div
              style={{
                display: "inline-block",
                padding: "12px 24px",
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                borderRadius: "999px",
                color: "white",
                fontSize: "0.85rem",
                fontWeight: "700",
                letterSpacing: "1px",
                textTransform: "uppercase",
                marginBottom: "30px",
              }}
            >
              Restons en contact
            </div>

            <h2
              style={{
                fontSize: "2.2rem",
                fontWeight: "800",
                color: "#1a202c",
                marginBottom: "20px",
                lineHeight: "1.2",
              }}
            >
              Votre message compte pour nous
            </h2>

            <p
              style={{
                fontSize: "1rem",
                color: "#4a5568",
                lineHeight: "1.8",
                marginBottom: "40px",
                fontWeight: "500",
              }}
            >
              Nous sommes disponibles pour répondre à vos questions, suggestions
              ou demandes commerciales. Envoyez-nous un message et nous
              reviendrons vers vous rapidement.
            </p>

            {/* Contact Details */}
            <div
              style={{ display: "flex", flexDirection: "column", gap: "30px" }}
            >
              {/* Email */}
              <div
                style={{
                  paddingBottom: "30px",
                  borderBottom: "2px solid #e2e8f0",
                  transition: "all 0.3s ease",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    marginBottom: "8px",
                  }}
                >
                  <div
                    style={{
                      width: "40px",
                      height: "40px",
                      background:
                        "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "white",
                      fontSize: "1.2rem",
                    }}
                  >
                    ✉
                  </div>
                  <strong
                    style={{
                      fontSize: "1rem",
                      color: "#1a202c",
                      fontWeight: "700",
                    }}
                  >
                    Email
                  </strong>
                </div>
                <a
                  href="mailto:support@mallapp.com"
                  style={{
                    fontSize: "1rem",
                    color: "#667eea",
                    textDecoration: "none",
                    fontWeight: "600",
                    display: "block",
                    marginLeft: "52px",
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "#764ba2";
                    e.currentTarget.style.textDecoration = "underline";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "#667eea";
                    e.currentTarget.style.textDecoration = "none";
                  }}
                >
                  support@mallapp.com
                </a>
              </div>

              {/* Phone */}
              <div
                style={{
                  paddingBottom: "30px",
                  borderBottom: "2px solid #e2e8f0",
                  transition: "all 0.3s ease",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    marginBottom: "8px",
                  }}
                >
                  <div
                    style={{
                      width: "40px",
                      height: "40px",
                      background:
                        "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "white",
                      fontSize: "1.2rem",
                    }}
                  >
                    ☎
                  </div>
                  <strong
                    style={{
                      fontSize: "1rem",
                      color: "#1a202c",
                      fontWeight: "700",
                    }}
                  >
                    Téléphone
                  </strong>
                </div>
                <a
                  href="tel:+221123456789"
                  style={{
                    fontSize: "1rem",
                    color: "#f5576c",
                    textDecoration: "none",
                    fontWeight: "600",
                    display: "block",
                    marginLeft: "52px",
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "#f093fb";
                    e.currentTarget.style.textDecoration = "underline";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "#f5576c";
                    e.currentTarget.style.textDecoration = "none";
                  }}
                >
                  +221 12 345 6789
                </a>
              </div>

              {/* Address */}
              <div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    marginBottom: "8px",
                  }}
                >
                  <div
                    style={{
                      width: "40px",
                      height: "40px",
                      background:
                        "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "white",
                      fontSize: "1.2rem",
                    }}
                  >
                    📍
                  </div>
                  <strong
                    style={{
                      fontSize: "1rem",
                      color: "#1a202c",
                      fontWeight: "700",
                    }}
                  >
                    Adresse
                  </strong>
                </div>
                <span
                  style={{
                    fontSize: "1rem",
                    color: "#4a5568",
                    display: "block",
                    marginLeft: "52px",
                    fontWeight: "500",
                  }}
                >
                  Rue de l'Innovation, Dakar, Sénégal
                </span>
              </div>
            </div>
          </div>

          {/* Right Side - Contact Form */}
          <form
            onSubmit={handleSubmit}
            style={{
              background: "white",
              padding: "50px 40px",
              borderRadius: "24px",
              boxShadow:
                "0 20px 60px rgba(102, 126, 234, 0.1), 0 0 1px rgba(0, 0, 0, 0.03)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255, 255, 255, 0.8)",
              display: "flex",
              flexDirection: "column",
              gap: "25px",
            }}
          >
            {/* Full Name */}
            <div style={{ display: "flex", flexDirection: "column" }}>
              <label
                htmlFor="fullname"
                style={{
                  fontSize: "0.95rem",
                  fontWeight: "700",
                  color: "#1a202c",
                  marginBottom: "10px",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
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
                  padding: "14px 18px",
                  border: "2px solid #e2e8f0",
                  borderRadius: "12px",
                  fontSize: "1rem",
                  fontFamily: "inherit",
                  transition: "all 0.3s ease",
                  backgroundColor: "#f8fafc",
                  color: "#1a202c",
                  outline: "none",
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

            {/* Address */}
            <div style={{ display: "flex", flexDirection: "column" }}>
              <label
                htmlFor="address"
                style={{
                  fontSize: "0.95rem",
                  fontWeight: "700",
                  color: "#1a202c",
                  marginBottom: "10px",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
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
                  padding: "14px 18px",
                  border: "2px solid #e2e8f0",
                  borderRadius: "12px",
                  fontSize: "1rem",
                  fontFamily: "inherit",
                  transition: "all 0.3s ease",
                  backgroundColor: "#f8fafc",
                  color: "#1a202c",
                  outline: "none",
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
                  padding: "14px 18px",
                  border: "2px solid #e2e8f0",
                  borderRadius: "12px",
                  fontSize: "1rem",
                  fontFamily: "inherit",
                  transition: "all 0.3s ease",
                  backgroundColor: "#f8fafc",
                  color: "#1a202c",
                  outline: "none",
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

            {/* Message */}
            <div style={{ display: "flex", flexDirection: "column" }}>
              <label
                htmlFor="message"
                style={{
                  fontSize: "0.95rem",
                  fontWeight: "700",
                  color: "#1a202c",
                  marginBottom: "10px",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                }}
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows="6"
                value={formData.message}
                onChange={handleChange}
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
                  resize: "vertical",
                  minHeight: "120px",
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
              {isSubmitting ? "Envoi en cours..." : "Envoyer le message"}
            </button>

            {/* Feedback Message */}
            {feedback && (
              <div
                style={{
                  padding: "16px 18px",
                  borderRadius: "12px",
                  fontSize: "0.95rem",
                  fontWeight: "600",
                  color: feedback.toLowerCase().includes("erreur")
                    ? "#c53030"
                    : "#22863a",
                  backgroundColor: feedback.toLowerCase().includes("erreur")
                    ? "#fff5f5"
                    : "#f0f8f4",
                  border: `2px solid ${
                    feedback.toLowerCase().includes("erreur")
                      ? "#fc8181"
                      : "#9ae6b4"
                  }`,
                  animation: "slideIn 0.4s ease",
                }}
              >
                {feedback}
              </div>
            )}
          </form>
        </div>

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

              main > div:nth-child(2) {
                grid-template-columns: 1fr !important;
                gap: 30px !important;
              }

              main > div:nth-child(2) > div,
              main > div:nth-child(2) > form {
                padding: 30px 20px;
              }

              main > div:nth-child(2) > div h2 {
                font-size: 1.8rem;
              }

              main > div:nth-child(2) > div p {
                font-size: 0.95rem;
              }

              main > div:nth-child(2) > form {
                gap: 18px;
              }

              main > div:nth-child(2) > form input,
              main > div:nth-child(2) > form textarea {
                font-size: 16px;
                padding: 12px 16px;
              }

              main > div:nth-child(2) > form button {
                padding: 14px 24px;
                font-size: 0.9rem;
              }
            }
          `}
        </style>
      </main>
      <Footer />
    </div>
  );
}

export default Contact;
