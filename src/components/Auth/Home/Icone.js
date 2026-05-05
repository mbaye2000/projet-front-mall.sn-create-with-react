import React from "react";
function Icone() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-around",
        marginTop: "80px",
        marginBottom: "60px",
      }}
    >
      <div style={{ textAlign: "center" }}>
        <img
          style={{ borderRadius: "250px", height: "20rem" }}
          src="https://www.kahpoo.com/user-photos//c51e1bf7-133c-4c14-8a4c-a4b1416f2a9026062025090212.png"
          alt=""
        />
        <h2>high-tech</h2>
        <p style={{ fontFamily: "-apple-system", fontSize: "20px" }}>
          Vous pouvez trouver des materrielles high tech <br />
          des materielles informatiques et bureautiques <br />
          des ordinateur portable et accessoires de toute marques
        </p>
      </div>

      <div style={{ textAlign: "center" }}>
        <img
          style={{ borderRadius: "250px", height: "20rem" }}
          src="https://www.kahpoo.com/user-photos//934dedab-7785-4d53-a6f7-0909d23d7c9a26062025085755.png"
          alt=""
        />
        <h2>beaute</h2>
        <p style={{ fontFamily: "-apple-system", fontSize: "20px" }}>
          Vous pouvez trouver des produits cosmetiques <br />
          des produits corporelles differantes <br />
          pour tout genre de peau dans ce site
        </p>
      </div>

      <div style={{ textAlign: "center" }}>
        <img
          style={{ borderRadius: "250px", height: "20rem" }}
          src="https://www.kahpoo.com/user-photos//e8fc4bfe-bc2f-4fd3-9e1b-303eedcef7b426062025085641.png"
          alt=""
        />
        <h2>loisirs</h2>
        <p style={{ fontFamily: "-apple-system", fontSize: "20px" }}>
          Vous pouvez avoire egalement des accesssoirs <br />
          de categorie differant et de marque different <br />
          et genre Homme , Femme , enfant et bebe
        </p>
      </div>
    </div>
  );
}
export default Icone;
