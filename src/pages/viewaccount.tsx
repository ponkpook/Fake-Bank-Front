import React, { useState } from "react";
import { Container } from "../components/container";
import { ModalAccounts } from "../components/modal-accounts";

export const Viewaccount = () => {
  const [accounts, setAccounts] = useState([
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

  const addAccount = () => {
    if (accounts.length >= 5) return;

    const newAccount = {
      name: `Saving ${accounts.length}`,
      bsb: "010-010",
      accNo: "1234 5678",
      image: "/assets/section2.png",
      balance: "$1000.00",
    };

    setAccounts([...accounts, newAccount]);
  };

  return (
    <Container>
      <div>
        <div className="flex flex-row">
          <div className="flex w-[60%]">
            <ModalAccounts accounts={accounts} onAddAccount={addAccount} />
          </div>
          <div className="flex flex-[1]">
            <img
              src="assets/old-person.png"
              alt="person-interact"
              className="w-[347px] pt-space-6"
            />
          </div>
        </div>
      </div>
    </Container>
  );
};
