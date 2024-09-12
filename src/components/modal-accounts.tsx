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
  onAddAccount: () => void;
};

export const ModalAccounts: React.FC<IAccount> = ({
  accounts,
  onAddAccount,
}) => {
  return (
    <div className="flex flex-col gap-space-5 w-full px-[60px]">
      <div>
        <h1 className="font-prosto text-xxxl">Welcome Back</h1>
      </div>
      {accounts.map((account, index) => (
        <div
          key={index}
          className="flex w-full bg-pale-mint justify-between rounded-s items-center py-space-2"
        >
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
      {/* add accounts buttom */}
      <div className="mt-space-6">
        <button
          onClick={onAddAccount}
          className="bg-teal-green text-white font-poppins px-4 py-2 rounded-m"
        >
          Add One More Saving Account
        </button>
      </div>
    </div>
  );
};
