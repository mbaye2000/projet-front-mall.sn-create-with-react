import React from "react";
import { Link } from "react-router-dom";
import Navbar from "./Auth/Navbar";
import PageHome from "./Auth/Home/PageHome";
import Footer from "./Footer";

const categories = [
  {
    title: "Électronique",
    img: "https://media.istockphoto.com/id/2154614902/fr/photo/test-de-smartphones.jpg?s=612x612&w=0&k=20&c=bDKV2mpc-hx0_LwK0PHJzcd2560Z7RhBYRhIr0YctWg=",
  },
  {
    title: "Informatique",
    img: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Cosmétique",
    img: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Électroménager",
    img: "https://media.istockphoto.com/id/1211554164/fr/photo/rendu-3d-de-lensemble-de-collecte-dappareils-m%C3%A9nagers.jpg?s=612x612&w=0&k=20&c=1bkZZ7TesSMzdPbFuT5n5o6_HngWMnSs_HEUeyxuk-E=",
  },
  {
    title: "Habillement",
    img: "https://media.istockphoto.com/id/2228695419/fr/photo/femme-heureuse-shopping-dans-un-magasin-de-v%C3%AAtements.jpg?s=612x612&w=0&k=20&c=sU1avLrhxoHUWNy9uYkZRGdXPuP1RiPDdFlwN4B7ULE=",
  },
];

const products = [
  {
    id: "69f0e5f20c02a4d14c1aa5cc",
    title: "Casque sans fil Premium",
    price: 45000,
    description: "Son clair, design léger et autonomie longue durée.",
    img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "69f0e5f20c02a4d14c1aa5cd",
    title: "Ordinateur portable Pro",
    price: 550000,
    description: "Puissance optimisée pour le travail et la création.",
    img: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "69f0e5f20c02a4d14c1aa5ce",
    title: "Palette maquillage Luxe",
    price: 25000,
    description: "Couleurs riches et tenue longue durée pour un look parfait.",
    img: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "69f0e5f20c02a4d14c1aa5cf",
    title: "Robot ménager Intelligent",
    price: 85000,
    description: "Préparez vos repas rapidement avec des performances fiables.",
    img: "https://media.istockphoto.com/id/1468780952/fr/photo/robot-nettoyeur-automatique-de-piscine-pour-lentretien-avant-la-baignade-robot-submersible.jpg?s=612x612&w=0&k=20&c=mUE-QxK1I9gniW7Ak8VEtZywpwVeqAXwDwqt3YamefQ=",
  },
];

const featureBoxes = [
  {
    icon: "🚚",
    title: "Livraison express",
    description:
      "Recevez vos produits rapidement avec un suivi de commande clair et réactif.",
  },
  {
    icon: "🛡️",
    title: "Paiement sécurisé",
    description:
      "Vos données sont protégées à chaque étape grâce à un chiffrement moderne.",
  },
  {
    icon: "⭐",
    title: "Sélection premium",
    description:
      "Des marques de confiance et des best-sellers sélectionnés pour vous.",
  },
  {
    icon: "💬",
    title: "Support client dédié",
    description:
      "Une équipe à l'écoute pour répondre à vos questions rapidement.",
  },
];

function Home() {
  return (
    <div
      style={{
        background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
        minHeight: "100vh",
      }}
    >
      <Navbar />
      <main
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "20px",
        }}
      >
        <section style={{ marginBottom: "60px" }}>
          <PageHome />
        </section>

        <section style={{ marginBottom: "80px" }}>
          <div style={{ marginBottom: "36px" }}>
            <div>
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "8px 16px",
                  borderRadius: "999px",
                  background:
                    "linear-gradient(135deg, rgba(255, 122, 38, 0.12), rgba(255, 157, 60, 0.08))",
                  color: "#d9732d",
                  fontSize: "0.75rem",
                  fontWeight: "700",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                }}
              >
                Catégories
              </span>
              <h2
                style={{
                  fontSize: "clamp(1.5rem, 4vw, 2.2rem)",
                  margin: "12px 0 0 0",
                  color: "#0f172a",
                  fontWeight: "700",
                  lineHeight: "1.3",
                }}
              >
                Explorez nos catégories les plus populaires
              </h2>
            </div>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "10px",
            }}
          >
            {categories.map((category) => (
              <article
                key={category.title}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  borderRadius: "24px",
                  background: "#ffffff",
                  border: "1px solid rgba(148, 163, 184, 0.12)",
                  boxShadow:
                    "0 12px 40px rgba(15, 23, 42, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.7)",
                  overflow: "hidden",
                  cursor: "pointer",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-10px)";
                  e.currentTarget.style.boxShadow =
                    "0 24px 60px rgba(15, 23, 42, 0.16)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow =
                    "0 12px 40px rgba(15, 23, 42, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.7)";
                }}
              >
                <div
                  style={{
                    position: "relative",
                    minHeight: "20rem",
                    overflow: "hidden",
                  }}
                >
                  <img
                    src={category.img}
                    alt={category.title}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      display: "block",
                      transition: "transform 0.4s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "scale(1.05)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "scale(1)";
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      inset: "0",
                      background:
                        "linear-gradient(180deg, rgba(15, 23, 42, 0) 40%, rgba(15, 23, 42, 0.65) 100%)",
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      left: "16px",
                      right: "16px",
                      bottom: "18px",
                      color: "#ffffff",
                      fontWeight: "800",
                      fontSize: "1.15rem",
                      lineHeight: "1.2",
                      textShadow: "0 16px 32px rgba(15, 23, 42, 0.35)",
                    }}
                  >
                    {category.title}
                  </div>
                </div>
                <div
                  style={{
                    padding: "22px 20px 24px",
                    background: "#f8fafc",
                  }}
                >
                  <p
                    style={{
                      margin: "0",
                      color: "#64748b",
                      fontSize: "0.95rem",
                      lineHeight: "1.8",
                    }}
                  >
                    Découvrez une sélection inspirante pour votre univers{" "}
                    {category.title.toLowerCase()}.
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section style={{ marginBottom: "80px" }}>
          <div style={{ marginBottom: "36px" }}>
            <div>
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "8px 16px",
                  borderRadius: "999px",
                  background:
                    "linear-gradient(135deg, rgba(59, 130, 246, 0.12), rgba(99, 102, 241, 0.08))",
                  color: "#3b82f6",
                  fontSize: "0.75rem",
                  fontWeight: "700",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                }}
              >
                Produits populaires
              </span>
              <h2
                style={{
                  fontSize: "clamp(1.5rem, 4vw, 2.2rem)",
                  margin: "12px 0 0 0",
                  color: "#0f172a",
                  fontWeight: "700",
                  lineHeight: "1.3",
                }}
              >
                Découvrez nos best-sellers
              </h2>
            </div>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: "28px",
            }}
          >
            {products.map((product) => (
              <article
                key={product.id}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  borderRadius: "28px",
                  background: "#ffffff",
                  border: "1px solid rgba(148, 163, 184, 0.16)",
                  boxShadow:
                    "0 16px 48px rgba(15, 23, 42, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.6)",
                  overflow: "hidden",
                  cursor: "pointer",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-10px)";
                  e.currentTarget.style.boxShadow =
                    "0 24px 60px rgba(15, 23, 42, 0.16)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow =
                    "0 16px 48px rgba(15, 23, 42, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.6)";
                }}
              >
                <div
                  style={{
                    position: "relative",
                    height: "220px",
                    background:
                      "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)",
                    overflow: "hidden",
                  }}
                >
                  <img
                    src={product.img}
                    alt={product.title}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      transition: "transform 0.4s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "scale(1.1)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "scale(1)";
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      inset: "0",
                      background:
                        "linear-gradient(180deg, rgba(15, 23, 42, 0) 40%, rgba(15, 23, 42, 0.45) 100%)",
                    }}
                  />
                  <span
                    style={{
                      position: "absolute",
                      top: "18px",
                      right: "18px",
                      background: "rgba(255, 255, 255, 0.92)",
                      color: "#1e293b",
                      borderRadius: "999px",
                      padding: "8px 14px",
                      fontSize: "0.8rem",
                      fontWeight: "700",
                      boxShadow: "0 10px 24px rgba(15, 23, 42, 0.1)",
                    }}
                  >
                    Best seller
                  </span>
                </div>
                <div style={{ padding: "24px 22px 20px" }}>
                  <h3
                    style={{
                      margin: "0 0 10px 0",
                      fontSize: "1.15rem",
                      fontWeight: "800",
                      color: "#0f172a",
                      lineHeight: "1.3",
                    }}
                  >
                    {product.title}
                  </h3>
                  <p
                    style={{
                      margin: "0 0 18px 0",
                      fontSize: "1.25rem",
                      fontWeight: "900",
                      color: "#2563eb",
                    }}
                  >
                    {product.price}
                  </p>
                  <Link
                    to={`/product/${product.id}`}
                    state={{
                      product: {
                        _id: product.id,
                        productName: product.title,
                        productDescription: product.description,
                        productPrice: product.price,
                        productImage: product.img,
                        productRef: `HOME-${product.id}`,
                        categoryId: { categoryName: "Produits populaires" },
                      },
                    }}
                    style={{
                      display: "inline-block",
                      textAlign: "center",
                      textDecoration: "none",
                      width: "100%",
                      padding: "12px 0",
                      borderRadius: "16px",
                      border: "none",
                      background: "#2563eb",
                      color: "#ffffff",
                      fontWeight: "700",
                      cursor: "pointer",
                      transition: "background 0.3s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "#1d4ed8";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "#2563eb";
                    }}
                  >
                    Voir le produit
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section
          style={{
            height: "500px",
            marginBottom: "80px",
            position: "relative",
            left: "50%",
            right: "50%",
            marginLeft: "-50vw",
            marginRight: "-50vw",
            width: "100vw",
            padding: "36px 20px",
            boxSizing: "border-box",
            background: "#ffffff",
            borderTop: "1px solid rgba(148, 163, 184, 0.16)",
            borderBottom: "1px solid rgba(148, 163, 184, 0.16)",
            boxShadow: "0 16px 48px rgba(15, 23, 42, 0.08)",
          }}
        >
          <div
            style={{
              maxWidth: "1200px",
              margin: "0 auto",
              borderRadius: "28px",
              background: "#ffffff",
              padding: "0",
            }}
          >
            <h2
              style={{
                fontSize: "clamp(1.75rem, 3vw, 2.4rem)",
                margin: "0 0 20px 0",
                color: "#0f172a",
                fontWeight: "800",
                lineHeight: "1.15",
              }}
            >
              Bienvenue sur Mall SN
            </h2>
            <p
              style={{
                margin: "0 0 18px 0",
                color: "#475569",
                lineHeight: "1.9",
                fontSize: "1rem",
              }}
            >
              Mall SN est votre destination e-commerce pensée pour offrir une
              expérience de shopping simple, moderne et sécurisée. Nous
              réunissons une sélection de produits de qualité, allant de
              l'électronique au prêt-à-porter, en passant par la beauté et
              l'électroménager.
            </p>
            <p
              style={{
                margin: "0 0 18px 0",
                color: "#475569",
                lineHeight: "1.9",
                fontSize: "1rem",
              }}
            >
              Notre objectif est de vous accompagner dans chaque étape de votre
              parcours d'achat grâce à des fiches produits claires, une
              navigation intuitive et une livraison réactive. Que vous
              recherchiez un cadeau, une nouveauté technologique ou des
              essentiels du quotidien, Mall SN vous propose des articles choisis
              pour leur rapport qualité-prix.
            </p>
            <p
              style={{
                margin: "0",
                color: "#475569",
                lineHeight: "1.9",
                fontSize: "1rem",
              }}
            >
              Découvrez une expérience d'achat adaptée à vos besoins, soutenue
              par un service client à l'écoute et des paiements sécurisés. Avec
              Mall SN, le shopping devient simple, fiable et agréable, à chaque
              visite.
            </p>
          </div>
        </section>

        <section style={{ marginBottom: "40px" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              gap: "24px",
            }}
          >
            {featureBoxes.map((box, index) => (
              <div
                key={index}
                style={{
                  padding: "32px 24px",
                  borderRadius: "20px",
                  background: "#ffffff",
                  border: "1px solid rgba(148, 163, 184, 0.12)",
                  boxShadow:
                    "0 8px 32px rgba(20, 32, 60, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.6)",
                  textAlign: "center",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.boxShadow =
                    "0 16px 48px rgba(20, 32, 60, 0.12)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow =
                    "0 8px 32px rgba(20, 32, 60, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.6)";
                }}
              >
                <div
                  style={{
                    fontSize: "2.5rem",
                    marginBottom: "16px",
                    display: "block",
                  }}
                >
                  {box.icon}
                </div>
                <h3
                  style={{
                    margin: "0 0 12px 0",
                    fontSize: "1.2rem",
                    fontWeight: "700",
                    color: "#0f172a",
                  }}
                >
                  {box.title}
                </h3>
                <p
                  style={{
                    margin: "0",
                    color: "#64748b",
                    lineHeight: "1.6",
                    fontSize: "0.95rem",
                  }}
                >
                  {box.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section
          style={{
            marginBottom: "60px",
            padding: "40px 20px",
            background: "#f3f4f6",
            borderRadius: "28px",
          }}
        >
          <div
            style={{
              maxWidth: "1200px",
              margin: "0 auto",
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: "24px",
            }}
          >
            <div
              style={{
                color: "#475569",
                lineHeight: "1.8",
                fontSize: "0.98rem",
              }}
            >
              <strong
                style={{
                  display: "block",
                  marginBottom: "12px",
                  color: "#1f2937",
                }}
              >
                Notre mission
              </strong>
              Offrir une expérience d’achat simple, rapide et sécurisée pour
              tous nos clients.
            </div>
            <div
              style={{
                color: "#475569",
                lineHeight: "1.8",
                fontSize: "0.98rem",
              }}
            >
              <strong
                style={{
                  display: "block",
                  marginBottom: "12px",
                  color: "#1f2937",
                }}
              >
                Service client
              </strong>
              Une assistance disponible et réactive pour vous accompagner à
              chaque étape de votre commande.
            </div>
            <div
              style={{
                color: "#475569",
                lineHeight: "1.8",
                fontSize: "0.98rem",
              }}
            >
              <strong
                style={{
                  display: "block",
                  marginBottom: "12px",
                  color: "#1f2937",
                }}
              >
                Qualité & confiance
              </strong>
              Une sélection de produits soigneusement choisie pour allier
              performance, beauté et fiabilité.
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default Home;
