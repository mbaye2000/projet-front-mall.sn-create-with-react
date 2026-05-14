import React from "react";
import img2 from "../../layouts/image2.jpg";

function HomePage() {
  return (
    <div
      style={{
        position: "relative",
        left: "0px",
        width: "100%",
        height: "100vh",
        overflow: "hidden",
        borderRadius: "15px 15px 15px 15px",
      }}
    >
      <img
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          position: "relative",
          top: 0,
          left: 0,
          zIndex: 1,
          borderRadius: "15px 15px 15px 15px",
        }}
        className="hero-visual-img"
        src={img2}
        alt="Fond de page"
      />
      {/* Overlay sombre pour améliorer la lisibilité du texte */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: "linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.5))",
          zIndex: 2,
        }}
      />
      {/* Texte positionné à gauche sur l'image */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          transform: "translateY(-50%)",
          textAlign: "left",
          color: "white",
          zIndex: 3,
          maxWidth: "500px",
          padding: "20px",
        }}
      >
        <span
          style={{
            display: "block",
            fontSize: "18px",
            fontWeight: "300",
            marginBottom: "20px",
            textTransform: "uppercase",
            letterSpacing: "2px",
          }}
        >
          Marketplace moderne
        </span>
        <h1
          style={{
            fontSize: "48px",
            fontWeight: "700",
            marginBottom: "20px",
            lineHeight: "1.2",
          }}
        >
          Bienvenue sur Mall SN – Votre marketplace de confiance
        </h1>
        <p
          style={{
            fontSize: "20px",
            fontWeight: "300",
            marginBottom: "40px",
            lineHeight: "1.6",
            maxWidth: "600px",
            margin: "0 auto 40px auto",
          }}
        >
          Découvrez des produits de qualité à des prix imbattables, livrés
          rapidement chez vous.
        </p>
        <button
          style={{
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            color: "white",
            border: "none",
            padding: "15px 40px",
            fontSize: "18px",
            fontWeight: "600",
            borderRadius: "50px",
            cursor: "pointer",
            transition: "all 0.3s ease",
            boxShadow: "0 8px 25px rgba(102, 126, 234, 0.3)",
          }}
        >
          Acheter maintenant
        </button>
      </div>
    </div>
  );
}

export default HomePage;
