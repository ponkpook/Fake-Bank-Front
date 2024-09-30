import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Homepage } from "./pages/homepage";
import { Login } from "./pages/login";
import { Signup } from "./pages/signup";
import { Transfer } from "./pages/transfer";
import { Viewaccount } from "./pages/viewaccount";
import { TransactionHistory } from "./pages/transactionHistory"; // Import TransactionHistory
import { TransactionSelect } from "./pages/transactionSelect";
import { Admin } from "./pages/admin";

import "./App.css";

import { IAccount } from "./type";

export const App = () => {
  const [accounts, setAccounts] = useState<IAccount[]>([]);

  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/accounts" element={<Viewaccount />} />
      <Route path="/transfer" element={<Transfer />} />
      <Route path="/transaction" element={<TransactionSelect accounts={accounts} />} />
      <Route path="/transaction-history" element={<TransactionHistory />} />
      <Route path="/user-management" element={<Admin />} />
    </Routes>
  );
};

