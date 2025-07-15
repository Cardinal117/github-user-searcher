import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import SearchForUsers from "./components/searchForUsers";
import UserGitDetails from "./components/UserGitDetails";

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Route to search page if on root. */}
        <Route path="/" element={<Navigate to="/search" />} />
        <Route path="/search" element={<SearchForUsers />} />
        <Route path="/user/:username" element={<UserGitDetails />} />
      </Routes>
    </Router>
  );
}
