import React from "react";
import Footer from "./Footer";

import Navbar from "./Auth/Navbar";
import Login from "./Auth/Login";
function LoginPage() {
  return (
    <div>
      <Navbar />
      <Login />

      <Footer />
    </div>
  );
}

export default LoginPage;
