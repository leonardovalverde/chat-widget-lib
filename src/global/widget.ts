import React from "react";
import ReactDOM from "react-dom/client";

// Expor React globalmente para standalone
if (typeof window !== "undefined") {
  window.React = React;
  window.ReactDOM = ReactDOM;
}

// CRÍTICO: Importar CSS para que seja processado pelo Vite
import "../styles/index.css";

import "./globalInit";

console.log(
  "[ChatWidget] Standalone script loaded - CSS should be loaded separately via <link>"
);
