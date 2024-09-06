import React, { useState } from "react";
import { Container } from "../components/container";
import { TransferBetweenAccounts } from "../components/TransferBetweenAccounts";
import { TransferToOthers } from "../components/TransferToOthers";
import { BPay } from "../components/BPay";
import { RecurringPayments } from "../components/RecurringPayments";

export const Transfer: React.FC = () => {
  const [activeComponent, setActiveComponent] = useState<number>(0);

  const renderComponent = () => {
    switch (activeComponent) {
      case 0:
        return <TransferBetweenAccounts />;
      case 1:
        return <TransferToOthers />;
      case 2:
        return <BPay />;
      case 3:
        return <RecurringPayments />;
      default:
        return <TransferBetweenAccounts />;
    }
  };

  return (
    <Container>
      <div className="flex justify-center space-x-4">
        <button
          className={`w-80 h-10 flex items-center justify-center transition bg-light-green hover:bg-teal-green ${
            activeComponent === 0 ? "font-bold underline" : "font-light"
          }`}
          onClick={() => setActiveComponent(0)}
        >
          Transfer Between Own Accounts
        </button>
        <button
          className={`w-80 h-10 flex items-center justify-center transition bg-light-green hover:bg-teal-green ${
            activeComponent === 1 ? "font-bold underline" : "font-light"
          }`}
          onClick={() => setActiveComponent(1)}
        >
          Pay to Others
        </button>
        <button
          className={`w-80 h-10 flex items-center justify-center transition bg-light-green hover:bg-teal-green ${
            activeComponent === 2 ? "font-bold underline" : "font-light"
          }`}
          onClick={() => setActiveComponent(2)}
        >
          BPay
        </button>
        <button
          className={`w-80 h-10 flex items-center justify-center transition bg-light-green hover:bg-teal-green ${
            activeComponent === 3 ? "font-bold underline" : "font-light"
          }`}
          onClick={() => setActiveComponent(3)}
        >
          Recurring Payments
        </button>
      </div>

      <div className="component-display max-w-[1328px] mx-auto">
        {renderComponent()}
      </div>
    </Container>
  );
};
