import React from "react";
import ReactDOM from "react-dom/client";
import "./components/gitStyles.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import SearchForUsers from "./components/searchForUsers";
import UserGitDetails from "./components/UserGitDetails";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Router>
    <Routes>
      {/* Route to search page if on root. */}
      <Route path="/" element={<Navigate to="/search" />} />
      <Route path="/search" element={<SearchForUsers />} />
      <Route path="/user/:username" element={<UserGitDetails />} />
    </Routes>
  </Router>
);

reportWebVitals();
