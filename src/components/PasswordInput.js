import React, { useState } from "react";

const PasswordInput = ({
  id,
  name,
  value,
  onChange,
  placeholder = "Entrez votre mot de passe",
  label = "Mot de passe",
  autoComplete = "current-password",
  required = false,
  style = {},
  containerStyle = {},
  labelStyle = {},
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // SVG Eye Icon
  const EyeIcon = () => (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );

  // SVG Eye Off Icon
  const EyeOffIcon = () => (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  );

  return (
    <div
      style={{ display: "flex", flexDirection: "column", ...containerStyle }}
    >
      {label && (
        <label
          htmlFor={id}
          style={{
            fontSize: "0.95rem",
            fontWeight: "700",
            color: "#1a202c",
            marginBottom: "10px",
            textTransform: "uppercase",
            letterSpacing: "0.5px",
            fontFamily: "inherit",
            ...labelStyle,
          }}
        >
          {label}
        </label>
      )}

      <div
        style={{
          position: "relative",
          display: "flex",
          alignItems: "center",
        }}
      >
        <input
          type={showPassword ? "text" : "password"}
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          autoComplete={autoComplete}
          required={required}
          style={{
            padding: "14px 45px 14px 18px",
            border: "2px solid #e2e8f0",
            borderRadius: "12px",
            fontSize: "1rem",
            fontFamily: "inherit",
            transition: "all 0.3s ease",
            backgroundColor: "#f8fafc",
            color: "#1a202c",
            outline: "none",
            width: "100%",
            boxSizing: "border-box",
            ...style,
          }}
          onFocus={(e) => {
            e.target.style.borderColor = "#ff8c00";
            e.target.style.backgroundColor = "white";
            e.target.style.boxShadow = "0 0 0 4px rgba(255, 140, 0, 0.1)";
          }}
          onBlur={(e) => {
            e.target.style.borderColor = "#e2e8f0";
            e.target.style.backgroundColor = "#f8fafc";
            e.target.style.boxShadow = "none";
          }}
        />

        <button
          type="button"
          onClick={togglePasswordVisibility}
          style={{
            position: "absolute",
            right: "12px",
            background: "transparent",
            border: "none",
            cursor: "pointer",
            padding: "8px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: showPassword ? "#ff8c00" : "#a0aec0",
            transition: "all 0.3s ease",
            borderRadius: "8px",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "rgba(255, 140, 0, 0.1)";
            e.currentTarget.style.color = "#ff8c00";
          }}
          onMouseLeave={(e) => {
            if (!showPassword) {
              e.currentTarget.style.backgroundColor = "transparent";
              e.currentTarget.style.color = "#a0aec0";
            }
          }}
          aria-label={
            showPassword
              ? "Masquer le mot de passe"
              : "Afficher le mot de passe"
          }
          title={
            showPassword
              ? "Masquer le mot de passe"
              : "Afficher le mot de passe"
          }
        >
          {showPassword ? <EyeOffIcon /> : <EyeIcon />}
        </button>
      </div>
    </div>
  );
};

export default PasswordInput;
