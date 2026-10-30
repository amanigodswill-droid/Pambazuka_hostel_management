import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom";
import "./styles/Global.css";
import App from "./App.jsx";
import HostelProvider from "./context/HostelContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
  <HashRouter>
    <HostelProvider>
    <App />
    </HostelProvider>
  </HashRouter>
  </React.StrictMode>
);
