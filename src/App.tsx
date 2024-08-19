import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import MyHomePage from "./pages/MyHomePage"; // Import the new My Home Page
import NavBar from "./components/NavBar";

const App = () => {
  return (
    <Router>
      {/* NavBar at the top */}
      <NavBar />

      {/* Main content area */}
      <div className="mt-16">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/my-home" element={<MyHomePage />} />{" "}
          {/* Add My Home route */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
