import React from "react";

type Account = {
  name?: string;
  bsb?: string;
  accNo?: string;
  image?: string;
  balance?: string;
};

type IAccount = {
  accounts: Account[];
};

export const ModalAccounts: React.FC<IAccount> = ({ accounts }) => {
  return (
    <div className="flex flex-col gap-space-5 w-full px-[60px]">
      <div>
        <h1 className="font-prosto text-xxxl">Welcome Back</h1>
      </div>
      {accounts.map((account, index) => (
        <div className="flex w-full bg-light-white justify-between rounded-s items-center py-space-2">
          <div className="flex flex-row justify-start gap-space-5 items-center">
            <div>
              <img
                src={`${account.image}`}
                alt="account representative"
                className="w-[60px] h-[75px] ml-space-4"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-poppins font-bold">{account.name}</span>
              <div className="flex flex-row gap-space-3">
                <span className="font-poppins">{account.bsb}</span>
                <span className="font-poppins">{account.accNo}</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col px-space-10">
            <div className="flex justify-center">
              <span className="font-poppins font-bold">Balance</span>
            </div>
            <div className="flex justify-start">
              <span className="font-poppins">{account.balance}</span>
            </div>
          </div>
        </div>
      ))}
      <div>top up</div>
    </div>
  );
};
