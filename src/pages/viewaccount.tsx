import React, { useEffect, useState } from "react";
import { Container } from "../components/Container";
import { ModalAccounts } from "../components/modal-accounts";
import { IAccount } from "../type";

export const userID = "accounts"; // string

export const Viewaccount = () => {
  useEffect(() => {
    let storageAccounts = localStorage.getItem(userID);
    if (storageAccounts) {
      setAccounts(JSON.parse(storageAccounts));
    } else {
      setAccounts([
        {
          name: "Everyday",
          bsb: "010-010",
          accNo: "1234 5678",
          image: "/assets/section1.png",
          balance: "$100.00",
        },
        {
          name: "Saving",
          bsb: "010-010",
          accNo: "1234 5678",
          image: "/assets/section2.png",
          balance: "$1000.00",
        },
      ]);
    }
  }, []);
  const [accounts, setAccounts] = useState<IAccount[]>([]);

  // 充值函数，增加指定账户的余额
  const topUpAccount = (index: number, amount: number) => {
    const updatedAccounts = accounts.map((account, i) => {
      if (i === index) {
        // 更新账户余额
        const updatedBalance =
          parseFloat(account.balance.replace("$", "")) + amount;
        return { ...account, balance: `$${updatedBalance.toFixed(2)}` };
      }
      return account;
    });
    setAccounts(updatedAccounts);
    localStorage.setItem(userID, JSON.stringify(updatedAccounts)); // 更新 localStorage
  };

  const addAccount = () => {
    if (accounts.length >= 5) return;
    const newAccount = {
      name: `Saving ${accounts.length}`,
      bsb: "010-010",
      accNo: "1234 5678",
      image: "/assets/section2.png",
      balance: "$1000.00",
    };
    const newAccounts = [...accounts, newAccount];
    setAccounts(newAccounts);

    localStorage.setItem(userID, JSON.stringify(newAccounts));
  };

  return (
    <Container>
      <div>
        <div className="flex flex-row">
          <div className="flex w-[60%]">
            <ModalAccounts
              accounts={accounts}
              onAddAccount={addAccount}
              onTopUp={topUpAccount}
            />
          </div>
          {/* <div className="flex flex-[1]">
            <img
              src="assets/old-person.png"
              alt="person-interact"
              className="w-[347px] pt-space-6"
            />
          </div> */}
        </div>
      </div>
    </Container>
  );
};
