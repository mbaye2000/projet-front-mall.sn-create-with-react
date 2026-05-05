import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";

const products = [
  {
    id: 1,
    title: "Chaise design",
    desc: "Un style élégant pour votre intérieur moderne.",
    img: "https://www.kahpoo.com/user-photos//cf1ecc75-a7ab-4649-9d7f-e4feabb892e602022026143620.jpeg",
  },
  {
    id: 2,
    title: "Lampe contemporaine",
    desc: "Un éclairage doux et moderne pour votre salon.",
    img: "https://www.kahpoo.com/user-photos//32d2d518-b600-4353-bc85-56b8ce33e89618122025150611.jpeg",
  },
  {
    id: 3,
    title: "Décoration murale",
    desc: "Un élément graphique pour dynamiser votre espace.",
    img: "https://www.kahpoo.com/user-photos//b66e3ee4-cfda-4dfc-815e-8cf03348b3ad09122025144418.jpeg",
  },
  {
    id: 4,
    title: "Table d'appoint",
    desc: "Une table fonctionnelle et stylée pour votre salon.",
    img: "https://www.kahpoo.com/user-photos//152802d5-dcde-4df3-9b92-3cddc7a659b425072025142416.jpeg",
  },
  {
    id: 5,
    title: "Sac tendance",
    desc: "Un accessoire chic pour compléter votre look.",
    img: "https://pictures-senegal.jijistatic.com/765810_MzAwLTM0Ny05YjdkN2JmMjBh.webp",
  },
];

function GridHome() {
  return (
    <section className="product-grid-section">
      <div className="product-grid-header">
        <div>
          <h2>Produits populaires</h2>
          <p>
            Le meilleur de notre marketplace élégant présenté de façon claire.
          </p>
        </div>
      </div>
      <div className="product-grid">
        {products.map((item) => (
          <Card key={item.id} className="product-card">
            <Card.Img
              className="product-card-img"
              variant="top"
              src={item.img}
            />
            <Card.Body className="product-card-body">
              <Card.Title className="product-card-title">
                {item.title}
              </Card.Title>
              <Card.Text className="product-card-text">{item.desc}</Card.Text>
              <Button
                as={Link}
                to={`/product/grid-${item.id}`}
                state={{
                  product: {
                    _id: `grid-${item.id}`,
                    productName: item.title,
                    productDescription: item.desc,
                    productPrice: "Prix sur demande",
                    productImage: item.img,
                    productRef: `GRID-${item.id}`,
                    categoryId: { categoryName: "Produits populaires" },
                  },
                }}
                className="product-card-btn"
                variant="primary"
              >
                Voir le produit
              </Button>
            </Card.Body>
          </Card>
        ))}
      </div>
    </section>
  );
}

export default GridHome;
