import React, { useState } from "react";
import { IAccount } from "../type";

interface BPayProps {
  accounts: IAccount[];
}

export const BPay: React.FC<BPayProps> = ({ accounts }) => {
  //const accounts = ["Smart Access", "NetBank Saver"];
  const [selectedAccount, setSelectedAccount] = useState<string>("");
  const [transferAmount, setTransferAmount] = useState<string>(""); // Separate state for transfer amount
  const [isAccountDropdownOpen, setIsAccountDropdownOpen] =
    useState<boolean>(false);

  const handleAccountChange = (account: string) => {
    setSelectedAccount(account);
    setIsAccountDropdownOpen(false);
  };

  return (
    <div className="flex max-w-[1328px] justify-center p-space-8 bg-light-green">
      <div className="flex space-x-8 w-full mt-space-4 mb-space-8">
        {/* Left Panel */}
        <div className="flex-1 bg-native-milk rounded-[40px] p-space-4 relative">
          <div className="relative p-space-4">
            <div className="text-black text-l font-normal font-['Poppins'] mb-space-4 mt-space-4">
              Select your account:
            </div>
            <div className="w-full h-l bg-gray-200 flex items-center justify-between px-space-4 relative">
              <button
                className={`w-full text-left ${
                  selectedAccount ? "text-black" : "text-grey-800"
                }`}
                onClick={() => setIsAccountDropdownOpen(!isAccountDropdownOpen)}
              >
                {selectedAccount || "Select Account"}
              </button>
              {isAccountDropdownOpen && (
                <div className="absolute top-full mt-space-2 w-full bg-white shadow-lg z-10">
                  {accounts.map((account) => (
                    <button
                      key={account.accNo}
                      className="w-full text-left px-space-4 py-space-2 hover:bg-gray-200 cursor-pointer"
                      onClick={() => handleAccountChange(account.name)}
                    >
                      {account.name} (BSB: {account.bsb}, Account:{" "}
                      {account.accNo})
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Panel */}
        <div className="flex-1 bg-native-milk rounded-[40px] p-space-4 relative">
          <div className="relative p-space-4">
            <div className="mb-4">
              <div className="text-black text-base font-normal font-['Poppins'] mb-space-4 mt-space-4">
                Biller Name:
              </div>
              <input
                type="text"
                className="w-full h-l bg-gray-200 rounded px-space-4 py-space-2"
                placeholder="Enter biller Name"
                disabled={!selectedAccount}
              />
            </div>

            <div className="flex mb-8">
              <div className="flex-1">
                <div className="text-black text-base font-normal font-['Poppins'] mb-space-4 mt-space-4">
                  Biller Code:
                </div>
                <input
                  type="text"
                  className="w-full h-l bg-gray-200 rounded px-space-4 py-space-2"
                  placeholder="Enter biller code"
                  disabled={!selectedAccount}
                />
              </div>
              <div className="flex-1 ml-4">
                <div className="text-black text-base font-normal font-['Poppins'] mb-space-4 mt-space-4">
                  Ref:
                </div>
                <input
                  type="text"
                  className="w-full h-l bg-gray-200 rounded px-space-4 py-space-2"
                  placeholder="Enter reference No."
                  disabled={!selectedAccount}
                />
              </div>
            </div>

            <div className="mb-20">
              <div className="text-black text-base font-normal font-['Poppins'] mb-space-4">
                Transfer amount:
              </div>
              <input
                type="number"
                min="0.01" // minimum transfer amount set to 0.01 dollar
                className="w-full h-l bg-gray-200 rounded px-space-4 py-space-2"
                placeholder="Enter amount"
                value={transferAmount} // Use the new state variable for amount
                onChange={(e) => setTransferAmount(e.target.value)}
                disabled={!selectedAccount}
              />
            </div>
            <button className="absolute bottom-space-4 right-space-4 bg-native-red text-white text-sm font-medium font-['Poppins'] py-space-2 px-space-6 rounded-full">
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
