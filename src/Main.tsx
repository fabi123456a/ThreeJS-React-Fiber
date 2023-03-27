import ErrorBoundary from "./utils/ErrorBoundary";
import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.css";
import App from "./App";

const rootElement: string = "root";

const root = ReactDOM.createRoot(
  document.getElementById(rootElement) as HTMLElement
);

root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);
