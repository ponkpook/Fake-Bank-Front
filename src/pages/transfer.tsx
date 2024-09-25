import React, { useEffect, useState } from "react";
import { Container } from "../components/container";
import { TransferBetweenAccounts } from "../components/TransferBetweenAccounts";
import { TransferToOthers } from "../components/TransferToOthers";
import { BPay } from "../components/BPay";
import { RecurringPayments } from "../components/RecurringPayments";
import { IAccount } from "../type";
import { userID } from "./viewaccount";


export const Transfer: React.FC = () => {
  // 初始化账户列表
  useEffect(() => {
    let storageAccounts = localStorage.getItem(userID);
    if (storageAccounts) {
      setAccounts(JSON.parse(storageAccounts));
    } else {
      setAccounts([
        {
          name: "Everyday Account",
          bsb: "010-010",
          accNo: "1234 5678",
          image: "/assets/number1.png",
          balance: "$100.00",
        },
        {
          name: "NetBank Saving",
          bsb: "010-010",
          accNo: "1234 5678",
          image: "/assets/number2.png",
          balance: "$1000.00",
        },
      ]);
    }
  }, []);

  const [accounts, setAccounts] = useState<IAccount[]>([]);

  const [activeComponent, setActiveComponent] = useState<number>(0);

  // 动态渲染不同的组件
  const renderComponent = () => {
    switch (activeComponent) {
      case 0:
        // 将 accounts 传递给 TransferBetweenAccounts
        return <TransferBetweenAccounts accounts={accounts} />;
      case 1:
        return <TransferToOthers accounts={accounts} />;
      case 2:
        return <BPay accounts={accounts} />;
      case 3:
        return <RecurringPayments accounts={accounts} />;
      default:
        return <TransferBetweenAccounts accounts={accounts} />;
    }
  };

  return (
    <Container>
      <div className="flex flex-col md:flex-row justify-center md:space-x-4 mt-10 w-[90%] mx-auto">
        <button
          className={`w-full md:w-[25%] text-[20px] py-3 flex items-center justify-center transition bg-light-green hover:bg-teal-green ${
            activeComponent === 0 ? "font-bold underline" : "font-light"
          }`}
          onClick={() => setActiveComponent(0)}
        >
          Transfer Between Own Accounts
        </button>
        <button
          className={`w-full md:w-[25%] text-[20px] py-3 flex items-center justify-center transition bg-light-green hover:bg-teal-green ${
            activeComponent === 1 ? "font-bold underline" : "font-light"
          }`}
          onClick={() => setActiveComponent(1)}
        >
          Pay to Others
        </button>
        <button
          className={`w-full md:w-[25%] text-[20px] py-3 flex items-center justify-center transition bg-light-green hover:bg-teal-green ${
            activeComponent === 2 ? "font-bold underline" : "font-light"
          }`}
          onClick={() => setActiveComponent(2)}
        >
          BPay
        </button>
        <button
          className={`w-full md:w-[25%] text-[20px] py-3 flex items-center justify-center transition bg-light-green hover:bg-teal-green ${
            activeComponent === 3 ? "font-bold underline" : "font-light"
          }`}
          onClick={() => setActiveComponent(3)}
        >
          Recurring Payments
        </button>
      </div>

      <div className="component-display justify-center space-x-4 w-[90%] mx-auto">
        {renderComponent()}
      </div>
    </Container>
  );
};
