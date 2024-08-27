import React from "react";
import { Container } from "../components/container";
import { ModalAccounts } from "../components/modal-accounts";

export const Viewaccount = () => {
  const accounts = [
    {
      name: "Everyday",
      bsb: "010-010",
      accNo: "1234 5678",
      image: "/assets/section1.png",
      balance: "$100.00",
    },
  ];
  return (
    <Container>
      <div className="flex w-[60%]">
        <ModalAccounts accounts={accounts} />
      </div>
    </Container>
  );
};
