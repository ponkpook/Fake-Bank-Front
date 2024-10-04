import React from 'react';
import AnimatedCounter from './AnimatedCounter';
import BalanceChart from './BalanceChart';
import TotalBalanceBox from './totalBalanceBox';
import { IAccount } from '../type';

type ModalAccountsProps = {
  accounts: IAccount[];
  onAddAccount: () => void;
  onTopUp: (index: number, amount: number) => void;
};

export const ModalAccounts: React.FC<ModalAccountsProps> = ({
  accounts,
  onAddAccount,
  onTopUp,
}) => {


  return (
    <div className="flex flex-col md:flex-row w-[90%] mx-auto bg-native-milk shadow-lg my-10 rounded-m">
      {/* Account Information Section */}
      <div className="flex flex-col w-full md:w-[60%] p-5 mt-4">
        <div className="font-prosto text-xxxl text-center md:text-left mb-10">
          Welcome Back, {sessionStorage.getItem("username")}!
        </div>
        {accounts.map((account, index) => (
          <div
            key={index}
            className="flex flex-col md:flex-row w-full bg-pale-mint justify-between rounded-s items-center py-space-2 md:py-space-4 px-space-2 md:px-space-4 mb-5"
          >
            <div className="flex flex-row justify-start gap-space-5 items-center w-full">
              <img
                src={`${account.image}`}
                alt="account representative"
                className="w-[80px] h-[80px] ml-space-4"
              />
              <div className="flex flex-col">
                <span className="font-poppins font-bold">{account.name}</span>
                <div className="flex flex-row gap-space-3">
                  <span className="font-poppins">{account.bsb}</span>
                  <span className="font-poppins">{account.accNo}</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col px-space-2 md:px-space-10 text-center md:text-left">
              <span className="font-poppins font-bold">Balance</span>
              <span className="font-poppins">{account.balance}</span>
            </div>
            <div className="flex flex-col px-space-10">
              <div className="flex items-center space-x-4">
                {/* Add Top Up button */}
                <button
                  onClick={() => onTopUp(index, 100)} // Clicking button tops up $100
                  className="bg-teal-green text-white font-poppins px-3 py-1 text-sm rounded-m"
                >
                  Top Up $100
                </button>
              </div>
            </div>
          </div>
        ))}

        {/* Add Account Button */}
        <div className="flex justify-center md:justify-start mt-space-6">
          <button
            onClick={onAddAccount}
            className="bg-teal-green text-white font-poppins px-4 py-2 rounded-m"
          >
            Add One More Saving Account
          </button>
        </div>
      </div>

      {/* Right Section: Chart and Total Balance */}
      <div className="hidden md:flex flex-col md:w-[40%] items-center justify-center p-5 mt-4">
        {/* Balance Chart */}
        <div className="total-balance-chart flex justify-center items-center">
          <BalanceChart accounts={accounts} />
        </div>
        {/* Total Balance Display */}
        <div className="flex flex-col gap-6 flex-1">
          <h2 className="font-prosto text-xxl text-center mt-2">
            Bank Accounts:  {accounts.length}
          </h2>
          <div className="font-prosto text-xxl text-center">
            <p className="font-prosto">
              Total Credits:
              <div className="font-prosto text-xl text-center">
                <AnimatedCounter accounts={accounts} />
              </div>
            </p>
          </div>
        </div>
        <img
          src="assets/old-person.png"
          alt="person-interact"
          className="w-[347px] pt-space-6"
        />
      </div>

      {/* Mobile Image Section */}
      <div className="md:hidden flex flex-col justify-center items-center mt-2 w-full">
        <div className="flex justify-center items-center w-[56%]">
          <TotalBalanceBox accounts={accounts} />
        </div>
        <img
          src="assets/old-person.png"
          alt="person-interact"
          className="w-[60%] py-space-6"
        />
      </div>
    </div>
  );
};
