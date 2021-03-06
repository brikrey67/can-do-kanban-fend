import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import App from "./components/App/App.js";
import "./index.css";

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById("root")
);
