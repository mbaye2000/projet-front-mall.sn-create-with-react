function CategoryBare() {
  return (
    <div>
      <ul
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "50px",
          listStyleType: "none",
          padding: 0,
          fontSize: "18px",
          marginTop: "50px",
        }}
      >
        <li
          style={{
            border: "1px solid #ccc",
            padding: "5px",
            fontSize: "15px",
            height: "35px",
          }}
        >
          electronique
        </li>
        <li
          style={{
            border: "1px solid #ccc",
            padding: "5px",
            fontSize: "15px",
            height: "35px",
          }}
        >
          informatique
        </li>
        <li
          style={{
            border: "1px solid #ccc",
            padding: "5px",
            fontSize: "15px",
            height: "35px",
          }}
        >
          cosmetique
        </li>
        <li
          style={{
            border: "1px solid #ccc",
            padding: "5px",
            fontSize: "15px",
            height: "35px",
          }}
        >
          electroménager
        </li>
        <li
          style={{
            border: "1px solid #ccc",
            padding: "5px",
            fontSize: "15px",
            height: "35px",
          }}
        >
          habillement
        </li>
      </ul>
    </div>
  );
}

export default CategoryBare;
