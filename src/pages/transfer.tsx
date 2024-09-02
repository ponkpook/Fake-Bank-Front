import React, { useState } from "react";
import { Container } from "../components/container";
import { TransferBetweenAccounts } from "../components/TransferBetweenAccounts";
import { TransferToOthers } from "../components/TransferToOthers";
import { BPay } from "../components/BPay";
import { RecurringPayments } from "../components/RecurringPayments";
import { NavLink } from "react-router-dom";

export const Transfer: React.FC = () => {
  const [activeComponent, setActiveComponent] = useState<string>(
    "TransferBetweenAccounts"
  );

  const renderComponent = () => {
    switch (activeComponent) {
      case "TransferBetweenAccounts":
        return <TransferBetweenAccounts />;
      case "TransferToOthers":
        return <TransferToOthers />;
      case "BPay":
        return <BPay />;
      case "RecurringPayments":
        return <RecurringPayments />;
      default:
        return <TransferBetweenAccounts />;
    }
  };

  return (
    <Container>
      <div className="flex justify-center space-x-4">
        <NavLink
          to="#"
          className={`w-72 h-10 flex items-center justify-center transition bg-light-green hover:bg-teal-green ${
            activeComponent === "TransferBetweenAccounts"
              ? "font-bold underline"
              : "font-light"
          }`}
          onClick={() => setActiveComponent("TransferBetweenAccounts")}
        >
          Transfer Between Own Accounts
        </NavLink>
        <NavLink
          to="#"
          className={`w-72 h-10 flex items-center justify-center transition bg-light-green hover:bg-teal-green ${
            activeComponent === "TransferToOthers"
              ? "font-bold underline"
              : "font-light"
          }`}
          onClick={() => setActiveComponent("TransferToOthers")}
        >
          Pay to Others
        </NavLink>
        <NavLink
          to="#"
          className={`w-72 h-10 flex items-center justify-center transition bg-light-green hover:bg-teal-green ${
            activeComponent === "BPay" ? "font-bold underline" : "font-light"
          }`}
          onClick={() => setActiveComponent("BPay")}
        >
          BPay
        </NavLink>
        <NavLink
          to="#"
          className={`w-72 h-10 flex items-center justify-center transition bg-light-green hover:bg-teal-green ${
            activeComponent === "RecurringPayments"
              ? "font-bold underline"
              : "font-light"
          }`}
          onClick={() => setActiveComponent("RecurringPayments")}
        >
          Recurring Payments
        </NavLink>
      </div>

      <div className="component-display w-[1200px] mx-auto">
        {renderComponent()}
      </div>
    </Container>
  );
};
