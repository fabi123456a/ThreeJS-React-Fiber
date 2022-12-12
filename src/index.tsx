import React from "react";
import ReactDOM from "react-dom/client";
import Main from "./Main";

const rootElement: string = "root";

const root = ReactDOM.createRoot(
  document.getElementById(rootElement) as HTMLElement
);

root.render(
  <React.StrictMode>
    <Main />
  </React.StrictMode>
);
