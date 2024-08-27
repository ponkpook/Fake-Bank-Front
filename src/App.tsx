// src/App.tsx
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Homepage } from "./pages/homepage";
import { Login } from "./pages/login";
import { Signup } from "./pages/signup";
import { Viewaccount } from "./pages/viewaccount";
import "./App.css";

export const App = () => {
  return (
    <Router>
      <Routes>
        {/* Define routes for each page */}
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/accounts" element={<Viewaccount />} />
      </Routes>
    </Router>
  );
};
