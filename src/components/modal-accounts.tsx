<<<<<<< Updated upstream
import React from "react";
=======
import React from 'react';
import AnimatedCounter from './AnimatedCounter';
import BalanceChart from './BalanceChart';

>>>>>>> Stashed changes
import { IAccount } from "../type";
import TotalBalanceBox from "../components/totalBalanceBox";

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
<<<<<<< Updated upstream
=======

  // // Convert balance from string to number for BalanceChart
  // const chartData = accounts.map(account => ({
  //   balance: Number(account.balance) || 0,
  //   name: account.name || 'Unknown',
  // }));


>>>>>>> Stashed changes
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
                className="w-[80px] h-[80px] ml-space-4 justify-center"
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
            <div className="flex items-center space-x-4">
              {/* 显示余额 */}
              <div className="flex flex-col">
                <div className="flex justify-center">
                  <span className="font-poppins font-bold">Balance</span>
                </div>
                <div className="flex justify-start">
                  <span className="font-poppins">{account.balance}</span>
                </div>
              </div>
<<<<<<< Updated upstream
              {/* 新增充值按钮，放在余额的右边，调整大小 */}
              <button
                onClick={() => onTopUp(index, 100)} // 点击按钮充值100
                className="bg-teal-green text-white font-poppins px-3 py-1 text-sm rounded-m"
=======
            </div>
            <div className="flex flex-row justify-between items-center md:px-space-10 text-center md:text-left gap-space-4">
              {/* Balance label and value */}
              <div className="flex flex-row gap-space-2 items-center">
                <span className="font-poppins font-bold">Balance:</span>
                <span className="font-poppins">{account.balance}</span>
              </div>

              {/* Top Up button */}
              <button
                onClick={() => onTopUp(index, 100)} // 点击按钮充值100
                className="bg-teal-green text-white font-poppins px-3 py-1 text-sm rounded-m "
>>>>>>> Stashed changes
              >
                Top Up $100
              </button>
            </div>
          </div>
<<<<<<< Updated upstream
        </div>
      ))}
      {/* add accounts buttom & totalBalanceBox*/}
      <div className="mt-space-6 flex justify-between items-start w-full">
        {/* Add One More Saving Account buttom */}
        <button
          onClick={onAddAccount}
          className="bg-teal-green text-white font-poppins px-4 py-2 rounded-m"
        >
          Add One More Saving Account
        </button>

        {/* TotalBalanceBox */}
        <div className="flex justify-end">
          <TotalBalanceBox accounts={accounts} />
        </div>
      </div>
=======
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

      {/* Right Section: Chart and Image */}
      <div className="hidden md:flex flex-col md:w-[40%] items-center justify-center p-5 mt-4">
        {/* Chart */}
        <div className="total-balance-chart flex justify-center items-center">
          <BalanceChart accounts={accounts} />
        </div>
        {/* Text and Image */}
        <div className='flex flex-col gap-6 flex-1'>
          <h2 className='font-prosto text-xxl text-center mt-2'>
            Bank Accounts: {accounts.length}
          </h2>
          <div className='font-prosto text-xxl text-center'>
            <p className='font-prosto '>
              Total Blance: 
              <div className='font-prosto text-xl text-center'>
                {/* Needs update */}
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
      <div className="md:hidden flex flex-col justify-center items-center my-4">
        {/* TotalBalanceBox */}
        <div className="flex justify-center w-full px-4">
          <TotalBalanceBox accounts={accounts} />
        </div>

        {/* Uncomment the BalanceChart if needed */}
        {/* <div className="total-balance-chart flex justify-center items-center">
          <BalanceChart accounts={chartData} />
        </div> */}

        <img
          src="assets/old-person.png"
          alt="person-interact"
          className="w-[250px] pt-space-6"
        />
      </div>

>>>>>>> Stashed changes
    </div>
  );
};