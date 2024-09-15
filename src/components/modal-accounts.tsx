import React from 'react';
import AnimatedCounter from './AnimatedCounter';
import BalanceChart from './BalanceChart';

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
  // Convert balance from string to number for BalanceChart
  const chartData = accounts.map(account => ({
    balance: Number(account.balance) || 0,
    name: account.name || 'Unknown',
  }));

  // Calculate the total current balance
  const totalCurrentBalance = accounts.reduce((total, account) => {
    const balance = Number(account.balance) || 0;
    return total + balance;
  }, 0);

  return (
    <div className="flex flex-col md:flex-row w-[90%] mx-auto bg-native-milk shadow-lg mt-10 rounded-m">
      {/* Account Information Section */}
      <div className="flex flex-col w-full md:w-[60%] p-5">
        <div className="font-prosto text-xxxl text-center md:text-left mb-10">
          Welcome Back, Username
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
                className="w-[60px] h-[75px] ml-space-4"
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

      {/* Right Section: Chart and Image */}
      <div className="hidden md:flex flex-col md:w-[40%] items-center justify-center p-5">
        {/* Chart */}
        <div className="total-balance-chart flex justify-center items-center">
          <BalanceChart accounts={chartData} />
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
              <AnimatedCounter amount={1000} /> 
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
      <div className="md:hidden flex flex-col justify-center items-center mt-5">
        <div className="total-balance-chart flex justify-center items-center">
          <BalanceChart accounts={chartData} />
        </div>
        <img
          src="assets/old-person.png"
          alt="person-interact"
          className="w-[250px] pt-space-6"
        />
      </div>
    </div>
  );
};

