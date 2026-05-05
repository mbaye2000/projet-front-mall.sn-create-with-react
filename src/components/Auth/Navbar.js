import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getUser, clearToken } from "../Services/autorization";
import logo from "../layouts/logoR.png";

function Navbar() {
  const user = getUser();
  const token = localStorage.getItem("token");
  const location = useLocation();
  const navigate = useNavigate();
  const [cartCount, setCartCount] = useState(0);

  const updateCartCount = () => {
    const count = JSON.parse(localStorage.getItem("mallCart") || "[]").reduce(
      (sum, item) => sum + Number(item.quantity || 0),
      0,
    );
    setCartCount(count);
  };

  useEffect(() => {
    updateCartCount();
    window.addEventListener("cartUpdated", updateCartCount);
    window.addEventListener("storage", updateCartCount);
    return () => {
      window.removeEventListener("cartUpdated", updateCartCount);
      window.removeEventListener("storage", updateCartCount);
    };
  }, []);

  const [authMenuOpen, setAuthMenuOpen] = useState(false);
  const [hoveredNavLink, setHoveredNavLink] = useState(null);
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 1000,
  });
  const authMenuRef = useRef(null);

  // Handle responsive behavior
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth });
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const closeMenuOnOutsideClick = (event) => {
      if (
        authMenuOpen &&
        authMenuRef.current &&
        !authMenuRef.current.contains(event.target)
      ) {
        setAuthMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", closeMenuOnOutsideClick);
    return () =>
      document.removeEventListener("mousedown", closeMenuOnOutsideClick);
  }, [authMenuOpen]);

  useEffect(() => {
    setAuthMenuOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    clearToken();
    navigate("/", { replace: true });
  };

  const navLinks = [
    { path: "/", label: "Accueil" },
    { path: "/product", label: "Produits" },
    { path: "/order", label: "Commande" },
    { path: "/contact", label: "Contact" },
  ];

  if (user && user.role === "admin") {
    navLinks.push({ path: "/admin", label: "Admin" });
  }

  const isMobile = windowSize.width < 768;
  const isTablet = windowSize.width < 1024;

  // ============ STYLE DEFINITIONS ============

  const [hoveredAuthItem, setHoveredAuthItem] = useState(null);
  const [cartHovered, setCartHovered] = useState(false);
  const [authButtonHovered, setAuthButtonHovered] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);

  return (
    <>
      <header
        style={{
          background: "rgba(255, 255, 255, 0.97)",
          backdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(148, 163, 184, 0.12)",
          position: "sticky",
          top: 0,
          zIndex: 999,
          boxShadow: "0 8px 32px rgba(15, 23, 42, 0.08)",
          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        <div
          style={{
            maxWidth: "100%",
            width: windowSize.width > 1280 ? "1240px" : "calc(100% - 40px)",
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: isMobile ? "12px" : isTablet ? "16px" : "24px",
            paddingBottom: isMobile ? "0px" : "8px",
            paddingLeft: "20px",
            paddingRight: "20px",
            flexWrap: isMobile ? "wrap" : "nowrap",
          }}
        >
          <Link
            to="/"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              minWidth: "150px",
              textDecoration: "none",
              cursor: "pointer",
            }}
            title="Aller à l'accueil"
          >
            {/*================logo================================*/}
            <div>
              <img
                src={logo}
                alt="Logo de Mall SN"
                style={{ width: "7rem", height: "7rem" }}
              />
            </div>
            <div>
              <div
                style={{
                  fontSize: isMobile ? "1rem" : "1.12rem",
                  fontWeight: "800",
                  color: "#0f172a",
                  letterSpacing: "-0.01em",
                  lineHeight: "1.2",
                }}
              >
                Mall SN
              </div>
              <div
                style={{
                  color: "#64748b",
                  fontSize: isMobile ? "0.8rem" : "0.9rem",
                  fontWeight: "500",
                  letterSpacing: "0.02em",
                  marginTop: "2px",
                }}
              >
                Marketplace Premium
              </div>
            </div>
          </Link>
          {/*======nave barre============*/}
          <nav
            style={{
              flex: isMobile ? "1 0 100%" : 1,
              minWidth: 0,
              order: isMobile ? "2" : "0",
            }}
          >
            <ul
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: isMobile ? "center" : "center",
                gap: isMobile ? "8px" : "10px",
                margin: 0,
                padding: 0,
                listStyle: "none",
              }}
            >
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                const isHovered = hoveredNavLink === link.path;
                return (
                  <li style={{ display: "inline-flex" }} key={link.path}>
                    <Link
                      style={
                        isHovered
                          ? {
                              display: "inline-flex",
                              alignItems: "center",
                              gap: "6px",
                              padding: isMobile ? "8px 14px" : "10px 18px",
                              borderRadius: "12px",
                              color: isActive ? "#fff" : "#2364fe",
                              background: isActive
                                ? "linear-gradient(135deg, #2976ff 0%, #2457e8 100%)"
                                : "rgba(59, 130, 246, 0.15)",
                              border: "1px solid",
                              borderColor: isActive
                                ? "rgba(35, 100, 254, 0.4)"
                                : "transparent",
                              textDecoration: "none",
                              transition:
                                "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                              fontSize: isMobile ? "0.9rem" : "0.95rem",
                              fontWeight: isActive ? "600" : "500",
                              cursor: "pointer",
                              textTransform: "capitalize",
                              transform: "translateY(-3px)",
                              boxShadow: isActive
                                ? "0 8px 20px rgba(35, 100, 254, 0.25)"
                                : "0 6px 16px rgba(35, 100, 254, 0.12)",
                            }
                          : {
                              display: "inline-flex",
                              alignItems: "center",
                              gap: "6px",
                              padding: isMobile ? "8px 14px" : "10px 18px",
                              borderRadius: "12px",
                              color: isActive ? "#fff" : "#475569",
                              background: isActive
                                ? "linear-gradient(135deg, #2364fe 0%, #1e4dd8 100%)"
                                : "rgba(255, 255, 255, 0.6)",
                              border: "1px solid",
                              borderColor: isActive
                                ? "rgba(35, 100, 254, 0.4)"
                                : "transparent",
                              textDecoration: "none",
                              transition:
                                "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                              fontSize: isMobile ? "0.9rem" : "0.95rem",
                              fontWeight: isActive ? "600" : "500",
                              cursor: "pointer",
                              textTransform: "capitalize",
                            }
                      }
                      to={link.path}
                      onMouseEnter={() => setHoveredNavLink(link.path)}
                      onMouseLeave={() => setHoveredNavLink(null)}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div
            style={{
              display: "flex",
              gap: isMobile ? "8px" : "12px",
              alignItems: "center",
              justifyContent: isMobile ? "center" : "flex-end",
              width: isMobile ? "100%" : "auto",
              order: isMobile ? "3" : "0",
              flexWrap: "wrap",
            }}
          >
            <Link
              to="/cart"
              style={
                cartHovered
                  ? {
                      position: "relative",
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: isMobile ? "44px" : "48px",
                      height: isMobile ? "44px" : "48px",
                      borderRadius: "12px",
                      background:
                        "linear-gradient(135deg, rgba(35, 100, 254, 0.15) 0%, rgba(245, 141, 47, 0.1) 100%)",
                      color: "#2364fe",
                      textDecoration: "none",
                      border: "1px solid rgba(35, 100, 254, 0.25)",
                      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                      cursor: "pointer",
                      transform: "translateY(-3px) scale(1.05)",
                      boxShadow: "0 8px 20px rgba(35, 100, 254, 0.2)",
                    }
                  : {
                      position: "relative",
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: isMobile ? "44px" : "48px",
                      height: isMobile ? "44px" : "48px",
                      borderRadius: "12px",
                      background:
                        "linear-gradient(135deg, rgba(35, 100, 254, 0.08) 0%, rgba(245, 141, 47, 0.04) 100%)",
                      color: "#2364fe",
                      textDecoration: "none",
                      border: "1px solid rgba(35, 100, 254, 0.12)",
                      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                      cursor: "pointer",
                    }
              }
              onMouseEnter={() => setCartHovered(true)}
              onMouseLeave={() => setCartHovered(false)}
              aria-label="Voir le panier"
              title="Panier"
            >
              <span style={{ fontSize: isMobile ? "1.2rem" : "1.3rem" }}>
                🛒
              </span>
              {cartCount > 0 && (
                <span
                  style={{
                    position: "absolute",
                    top: "-6px",
                    right: "-6px",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    minWidth: "22px",
                    height: "22px",
                    padding: "0 6px",
                    borderRadius: "999px",
                    background:
                      "linear-gradient(135deg, #ff6b35 0%, #f58d2f 100%)",
                    color: "#fff",
                    fontSize: "0.75rem",
                    fontWeight: "700",
                    boxShadow: "0 4px 12px rgba(245, 141, 47, 0.3)",
                    border: "2px solid #fff",
                  }}
                >
                  {cartCount}
                </span>
              )}
            </Link>

            <div style={{ position: "relative" }}>
              <button
                type="button"
                style={
                  authButtonHovered
                    ? {
                        width: isMobile ? "44px" : "48px",
                        height: isMobile ? "44px" : "48px",
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: "12px",
                        background:
                          "linear-gradient(135deg, rgba(35, 100, 254, 0.12) 0%, rgba(35, 100, 254, 0.08) 100%)",
                        border: "1px solid rgba(35, 100, 254, 0.25)",
                        color: "#0f172a",
                        cursor: "pointer",
                        fontSize: isMobile ? "1.2rem" : "1.3rem",
                        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                        transform: "translateY(-3px)",
                        boxShadow: "0 8px 20px rgba(35, 100, 254, 0.15)",
                      }
                    : {
                        width: isMobile ? "44px" : "48px",
                        height: isMobile ? "44px" : "48px",
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: "12px",
                        background:
                          "linear-gradient(135deg, rgba(15, 23, 42, 0.06) 0%, rgba(100, 116, 139, 0.04) 100%)",
                        border: "1px solid rgba(15, 23, 42, 0.08)",
                        color: "#0f172a",
                        cursor: "pointer",
                        fontSize: isMobile ? "1.2rem" : "1.3rem",
                        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                      }
                }
                onClick={() => setAuthMenuOpen((value) => !value)}
                onMouseEnter={() => setAuthButtonHovered(true)}
                onMouseLeave={() => setAuthButtonHovered(false)}
                aria-expanded={authMenuOpen}
                aria-label="Ouvrir le menu utilisateur"
                title="Menu utilisateur"
              >
                👤
              </button>

              {authMenuOpen && (
                <div
                  ref={authMenuRef}
                  style={{
                    position: "absolute",
                    right: 0,
                    top: "calc(100% + 12px)",
                    minWidth: "180px",
                    padding: "8px",
                    borderRadius: "16px",
                    background: "#fff",
                    boxShadow:
                      "0 20px 60px rgba(15, 23, 42, 0.15), 0 0 1px rgba(15, 23, 42, 0.1)",
                    border: "1px solid rgba(148, 163, 184, 0.12)",
                    zIndex: 20,
                    backdropFilter: "blur(10px)",
                    animation:
                      "slideDownAuth 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  }}
                >
                  <Link
                    to="/login"
                    style={
                      hoveredAuthItem === "login"
                        ? {
                            display: "block",
                            width: "100%",
                            padding: "10px 14px",
                            borderRadius: "10px",
                            textAlign: "left",
                            color: "#2364fe",
                            textDecoration: "none",
                            background:
                              "linear-gradient(135deg, rgba(35, 100, 254, 0.1) 0%, rgba(245, 141, 47, 0.05) 100%)",
                            border: "none",
                            cursor: "pointer",
                            fontSize: "0.95rem",
                            fontWeight: "500",
                            transition:
                              "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
                            whiteSpace: "nowrap",
                            transform: "translateX(2px)",
                          }
                        : {
                            display: "block",
                            width: "100%",
                            padding: "10px 14px",
                            borderRadius: "10px",
                            textAlign: "left",
                            color: "#0f172a",
                            textDecoration: "none",
                            background: "transparent",
                            border: "none",
                            cursor: "pointer",
                            fontSize: "0.95rem",
                            fontWeight: "500",
                            transition:
                              "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
                            whiteSpace: "nowrap",
                          }
                    }
                    onMouseEnter={() => setHoveredAuthItem("login")}
                    onMouseLeave={() => setHoveredAuthItem(null)}
                    onClick={() => setAuthMenuOpen(false)}
                  >
                    🔐 Connexion
                  </Link>
                  {token ? (
                    <button
                      type="button"
                      style={
                        hoveredAuthItem === "logout"
                          ? {
                              display: "block",
                              width: "100%",
                              padding: "10px 14px",
                              borderRadius: "10px",
                              textAlign: "left",
                              color: "#2364fe",
                              background:
                                "linear-gradient(135deg, rgba(35, 100, 254, 0.1) 0%, rgba(245, 141, 47, 0.05) 100%)",
                              border: "none",
                              cursor: "pointer",
                              fontSize: "0.95rem",
                              fontWeight: "500",
                              transition:
                                "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
                              whiteSpace: "nowrap",
                              transform: "translateX(2px)",
                            }
                          : {
                              display: "block",
                              width: "100%",
                              padding: "10px 14px",
                              borderRadius: "10px",
                              textAlign: "left",
                              color: "#0f172a",
                              background: "transparent",
                              border: "none",
                              cursor: "pointer",
                              fontSize: "0.95rem",
                              fontWeight: "500",
                              transition:
                                "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
                              whiteSpace: "nowrap",
                            }
                      }
                      onMouseEnter={() => setHoveredAuthItem("logout")}
                      onMouseLeave={() => setHoveredAuthItem(null)}
                      onClick={handleLogout}
                    >
                      🚪 Déconnexion
                    </button>
                  ) : (
                    <button
                      type="button"
                      style={{
                        display: "block",
                        width: "100%",
                        padding: "10px 14px",
                        borderRadius: "10px",
                        textAlign: "left",
                        color: "#0f172a",
                        background: "transparent",
                        border: "none",
                        cursor: "pointer",
                        fontSize: "0.95rem",
                        fontWeight: "500",
                        transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
                        whiteSpace: "nowrap",
                        opacity: "0.4",
                      }}
                      disabled
                      title="Connectez-vous pour vous déconnecter"
                    >
                      🚪 Déconnexion
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            padding: "12px 0 14px",
            order: isMobile ? "4" : "0",
            borderTop: isMobile
              ? "1px solid rgba(148, 163, 184, 0.08)"
              : "none",
            marginTop: isMobile ? "8px" : "0",
          }}
        >
          <div
            style={{
              display: "flex",
              width: isMobile ? "100%" : "360px",
              maxWidth: "100%",
              justifyContent: "center",
              paddingLeft: isMobile ? "20px" : "0",
              paddingRight: isMobile ? "20px" : "0",
              boxSizing: "border-box",
            }}
          >
            <input
              style={
                searchFocused
                  ? {
                      width: "100%",
                      padding: isMobile ? "10px 14px" : "11px 16px",
                      borderRadius: "12px",
                      border: "1.5px solid #2364fe",
                      background: "#fff",
                      fontSize: isMobile ? "0.9rem" : "0.95rem",
                      color: "#0f172a",
                      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                      boxShadow:
                        "0 8px 24px rgba(35, 100, 254, 0.12), inset 0 0 0 1px rgba(35, 100, 254, 0.08)",
                      outline: "none",
                      fontFamily:
                        "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
                    }
                  : {
                      width: "100%",
                      padding: isMobile ? "10px 14px" : "11px 16px",
                      borderRadius: "12px",
                      border: "1px solid rgba(148, 163, 184, 0.2)",
                      background: "rgba(255, 255, 255, 0.8)",
                      fontSize: isMobile ? "0.9rem" : "0.95rem",
                      color: "#0f172a",
                      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                      boxShadow: "0 2px 8px rgba(15, 23, 42, 0.04)",
                      fontFamily:
                        "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
                    }
              }
              type="text"
              placeholder="Rechercher des produits..."
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
              aria-label="Barre de recherche"
            />
          </div>
        </div>
      </header>
    </>
  );
}

export default Navbar;
