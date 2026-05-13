export const API_URL =
  process.env.REACT_APP_API_URL ||
  (process.env.NODE_ENV === "production"
    ? "https://projet-back-end-mall-sn-with-react.onrender.com/api"
    : "http://localhost:5020/api");
