import React from "react";

interface TotalBalanceBoxProps {
  accounts: { balance: string }[];
}

const TotalBalanceBox: React.FC<TotalBalanceBoxProps> = ({ accounts }) => {
  // 计算总余额
  const totalBalance = accounts.reduce((total, account) => {
    const balance = parseFloat(account.balance.replace("$", ""));
    return total + balance;
  }, 0);

  return (
    <div className="bg-pale-mint w-72 h-24 p-space-6 rounded-s">
      <div className="flex flex-col">
        <div className="flex justify-between">
          <span className="font-poppins font-bold">Bank Accounts:</span>
          <span className="font-poppins font-normal">{accounts.length}</span>
        </div>

        <div className="flex justify-between mt-2">
          <span className="font-poppins font-bold">Total Credits:</span>
          <span className="font-poppins font-normal">
            ${totalBalance.toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default TotalBalanceBox;
