import React from "react";
import { Routes, Route } from "react-router-dom";
import { Homepage } from "./pages/homepage";
import { Login } from "./pages/login";
import { Signup } from "./pages/signup";
import { Transfer } from "./pages/transfer";
import { Viewaccount } from "./pages/viewaccount";
import { Transaction } from "./pages/transaction";
import "./App.css";

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/accounts" element={<Viewaccount />} />
      <Route path="/transfer" element={<Transfer />} />
      <Route path="/transaction" element={<Transaction />} />
    </Routes>
  );
};
