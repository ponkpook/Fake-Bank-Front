import React from "react";
import ReactDOM from "react-dom";
import "./index.css"; // Import Tailwind's styles
import 'bootstrap/dist/css/bootstrap.min.css';
import { App } from "./App";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
