import React from "react";
import { createRoot } from "react-dom/client";
declare global {
  interface Window {
    React: typeof React;
    createRoot: typeof createRoot;
  }
}

if (typeof window !== "undefined") {
  window.React = React;
  window.createRoot = createRoot;
}

import "../styles/index.css";
import "./globalInit";
