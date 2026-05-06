import React from "react";
import { Link } from "react-router-dom";
import logo from "../components/layouts/logoR.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  // Hover effects
  const handleSocialHover = (e, isHover) => {
    if (isHover) {
      e.target.style.background =
        "linear-gradient(135deg, #667eea 0%, #764ba2 100%)";
      e.target.style.transform = "translateY(-2px)";
      e.target.style.boxShadow = "0 8px 20px rgba(102, 126, 234, 0.4)";
    } else {
      e.target.style.background = "rgba(255, 255, 255, 0.1)";
      e.target.style.transform = "translateY(0)";
      e.target.style.boxShadow = "none";
    }
  };

  const handleLinkHover = (e, isHover) => {
    if (isHover) {
      e.target.style.color = "#667eea";
      e.target.style.transform = "translateX(4px)";
    } else {
      e.target.style.color = "#cbd5e1";
      e.target.style.transform = "translateX(0)";
    }
  };

  const handleBottomLinkHover = (e, isHover) => {
    if (isHover) {
      e.target.style.color = "#667eea";
    } else {
      e.target.style.color = "#94a3b8";
    }
  };

  const handleNewsletterFocus = (e, isFocus) => {
    if (isFocus) {
      e.target.style.borderColor = "#667eea";
      e.target.style.boxShadow = "0 0 0 3px rgba(102, 126, 234, 0.2)";
    } else {
      e.target.style.borderColor = "rgba(255, 255, 255, 0.2)";
      e.target.style.boxShadow = "none";
    }
  };

  const handleButtonHover = (e, isHover) => {
    if (isHover) {
      e.target.style.transform = "translateY(-2px)";
      e.target.style.boxShadow = "0 6px 16px rgba(102, 126, 234, 0.4)";
    } else {
      e.target.style.transform = "translateY(0)";
      e.target.style.boxShadow = "0 4px 12px rgba(102, 126, 234, 0.3)";
    }
  };

  return (
    <footer
      style={{
        background: "white",
        color: "#e2e8f0",
        marginTop: "auto",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Wave decoration */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "40px",
          background: "rgba(255, 255, 255, 0.1)",
          borderRadius: "50% 50% 0 0",
          transform: "translateY(-20px)",
        }}
      ></div>

      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "80px 20px 40px",
          position: "relative",
          zIndex: 2,
        }}
      >
        {/* Main footer content */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "40px",
            marginBottom: "40px",
          }}
        >
          {/* Brand section */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "16px",
            }}
          >
            <Link
              to="/"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                textDecoration: "none",
                color: "inherit",
              }}
            >
              <div
                style={{
                  width: "50px",
                  height: "50px",
                  borderRadius: "12px",
                  backgroundImage: `url(${logo})`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "22px",
                  fontWeight: "bold",
                  color: "black",
                  boxShadow: "0 8px 25px rgba(102, 126, 234, 0.3)",
                }}
              >
                <img
                  src={logo}
                  alt="Logo de Mall SN"
                  style={{ width: "100%" }}
                />
              </div>
              <h2
                style={{
                  fontSize: "28px",
                  fontWeight: "800",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  margin: 0,
                }}
              >
                Mall SN
              </h2>
            </Link>
            <p
              style={{
                color: "black",
                fontSize: "16px",
                lineHeight: "1.6",
                margin: 0,
              }}
            >
              Votre destination shopping ultime au Sénégal. Découvrez une
              expérience d'achat moderne avec des produits de qualité et un
              service client exceptionnel.
            </p>
            <div
              style={{
                display: "flex",
                gap: "12px",
                marginTop: "8px",
              }}
            >
              <button
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "44px",
                  height: "44px",
                  borderRadius: "12px",
                  background: "rgba(255, 255, 255, 0.1)",
                  color: "black",
                  textDecoration: "none",
                  fontSize: "20px",
                  transition: "all 0.3s ease",
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => handleSocialHover(e, true)}
                onMouseLeave={(e) => handleSocialHover(e, false)}
                aria-label="Facebook"
              >
                📘
              </button>
              <button
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "44px",
                  height: "44px",
                  borderRadius: "12px",
                  background: "black",
                  color: "white",
                  textDecoration: "none",
                  fontSize: "20px",
                  transition: "all 0.3s ease",
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => handleSocialHover(e, true)}
                onMouseLeave={(e) => handleSocialHover(e, false)}
                aria-label="Instagram"
              >
                📷
              </button>
              <button
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "44px",
                  height: "44px",
                  borderRadius: "12px",
                  background: "rgba(255, 255, 255, 0.1)",
                  color: "#e2e8f0",
                  textDecoration: "none",
                  fontSize: "20px",
                  transition: "all 0.3s ease",
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => handleSocialHover(e, true)}
                onMouseLeave={(e) => handleSocialHover(e, false)}
                aria-label="Twitter"
              >
                🐦
              </button>
              <button
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "44px",
                  height: "44px",
                  borderRadius: "12px",
                  background: "rgba(255, 255, 255, 0.1)",
                  color: "black",
                  textDecoration: "none",
                  fontSize: "20px",
                  transition: "all 0.3s ease",
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => handleSocialHover(e, true)}
                onMouseLeave={(e) => handleSocialHover(e, false)}
                aria-label="LinkedIn"
              >
                💼
              </button>
            </div>
          </div>

          {/* Quick Links */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "20px",
            }}
          >
            <h3
              style={{
                fontSize: "20px",
                fontWeight: "700",
                color: "black",
                margin: "0 0 16px 0",
                position: "relative",
              }}
            >
              Liens Rapides
              <div
                style={{
                  color: "black",
                  content: '""',
                  position: "absolute",
                  bottom: "-4px",
                  left: 0,
                  width: "40px",
                  height: "3px",
                  borderRadius: "2px",
                }}
              ></div>
            </h3>
            <ul
              style={{
                listStyle: "none",
                margin: 0,
                padding: 0,
                display: "flex",
                flexDirection: "column",
                gap: "12px",
              }}
            >
              <li>
                <Link
                  to="/"
                  style={{
                    color: "black",
                    textDecoration: "none",
                    fontSize: "15px",
                    fontWeight: "500",
                    transition: "all 0.3s ease",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                  onMouseEnter={(e) => handleLinkHover(e, true)}
                  onMouseLeave={(e) => handleLinkHover(e, false)}
                >
                  Accueil
                </Link>
              </li>
              <li>
                <Link
                  to="/product"
                  style={{
                    color: "black",
                    textDecoration: "none",
                    fontSize: "15px",
                    fontWeight: "500",
                    transition: "all 0.3s ease",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                  onMouseEnter={(e) => handleLinkHover(e, true)}
                  onMouseLeave={(e) => handleLinkHover(e, false)}
                >
                  Produits
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  style={{
                    color: "black",
                    textDecoration: "none",
                    fontSize: "15px",
                    fontWeight: "500",
                    transition: "all 0.3s ease",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                  onMouseEnter={(e) => handleLinkHover(e, true)}
                  onMouseLeave={(e) => handleLinkHover(e, false)}
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  style={{
                    color: "black",
                    textDecoration: "none",
                    fontSize: "15px",
                    fontWeight: "500",
                    transition: "all 0.3s ease",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                  onMouseEnter={(e) => handleLinkHover(e, true)}
                  onMouseLeave={(e) => handleLinkHover(e, false)}
                >
                  À propos
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "20px",
            }}
          >
            <h3
              style={{
                fontSize: "20px",
                fontWeight: "700",
                color: "black",
                margin: "0 0 16px 0",
                position: "relative",
              }}
            >
              Contact
              <div
                style={{
                  content: '""',
                  position: "absolute",
                  bottom: "-4px",
                  left: 0,
                  width: "40px",
                  height: "3px",
                  background:
                    "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  borderRadius: "2px",
                }}
              ></div>
            </h3>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "16px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  color: "black",
                  fontSize: "15px",
                }}
              >
                <span>Dakar, Sénégal</span>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  color: "#cbd5e1",
                  fontSize: "15px",
                }}
              >
                <span style={{ color: "black" }}>+221 76 527 86 85</span>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  color: "black",
                  fontSize: "15px",
                }}
              >
                <span>mallsn@gmail.com</span>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  color: "black",
                  fontSize: "15px",
                }}
              >
                <span>Lun-Dim: 9h-18h</span>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "20px",
            }}
          >
            <h3
              style={{
                fontSize: "20px",
                fontWeight: "700",
                color: "black",
                margin: "0 0 16px 0",
                position: "relative",
              }}
            >
              Newsletter
              <div
                style={{
                  content: '""',
                  position: "absolute",
                  bottom: "-4px",
                  left: 0,
                  width: "40px",
                  height: "3px",
                  background:
                    "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  borderRadius: "2px",
                }}
              ></div>
            </h3>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "16px",
              }}
            >
              <p
                style={{
                  color: "black",
                  fontSize: "15px",
                  lineHeight: "1.5",
                  margin: 0,
                }}
              >
                Restez informé de nos dernières offres et nouveautés.
              </p>
              <form
                style={{
                  display: "flex",
                  gap: "8px",
                  maxWidth: "300px",
                }}
              >
                <input
                  type="email"
                  placeholder="Votre email"
                  style={{
                    flex: 1,
                    padding: "12px 16px",
                    border: "solid",
                    borderRadius: "8px",
                    background: "rgba(255, 255, 255, 0.1)",
                    color: "black",
                    fontSize: "14px",
                    outline: "none",
                    transition: "all 0.3s ease",
                    backdropFilter: "blur(10px)",
                  }}
                  onFocus={(e) => handleNewsletterFocus(e, true)}
                  onBlur={(e) => handleNewsletterFocus(e, false)}
                />
                <button
                  type="submit"
                  style={{
                    padding: "12px 20px",
                    border: "none",
                    borderRadius: "8px",
                    background:
                      "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    color: "white",
                    fontSize: "14px",
                    fontWeight: "600",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    boxShadow: "0 4px 12px rgba(102, 126, 234, 0.3)",
                  }}
                  onMouseEnter={(e) => handleButtonHover(e, true)}
                  onMouseLeave={(e) => handleButtonHover(e, false)}
                >
                  S'abonner
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            borderTop: "1px solid rgba(255, 255, 255, 0.1)",
            paddingTop: "24px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "16px",
          }}
        >
          <p
            style={{
              color: "black",
              fontSize: "14px",
              margin: 0,
            }}
          >
            © {currentYear} Mall SN. Tous droits réservés.
          </p>
          <div
            style={{
              display: "flex",
              gap: "24px",
              flexWrap: "wrap",
            }}
          >
            <Link
              to="/privacy"
              style={{
                color: "black",
                textDecoration: "none",
                fontSize: "14px",
                fontWeight: "500",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => handleBottomLinkHover(e, true)}
              onMouseLeave={(e) => handleBottomLinkHover(e, false)}
            >
              Politique de confidentialité
            </Link>
            <Link
              to="/terms"
              style={{
                color: "black",
                textDecoration: "none",
                fontSize: "14px",
                fontWeight: "500",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => handleBottomLinkHover(e, true)}
              onMouseLeave={(e) => handleBottomLinkHover(e, false)}
            >
              Conditions d'utilisation
            </Link>
            <Link
              to="/faq"
              style={{
                color: "black",
                textDecoration: "none",
                fontSize: "14px",
                fontWeight: "500",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => handleBottomLinkHover(e, true)}
              onMouseLeave={(e) => handleBottomLinkHover(e, false)}
            >
              FAQ
            </Link>
          </div>
        </div>
      </div>

      {/* Global styles */}
      <style>
        {`
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @media (max-width: 768px) {
            .footer-grid {
              grid-template-columns: 1fr !important;
              gap: 30px !important;
            }
            .footer-bottom {
              flex-direction: column !important;
              text-align: center !important;
              gap: 16px !important;
            }
          }
        `}
      </style>
    </footer>
  );
};

export default Footer;
