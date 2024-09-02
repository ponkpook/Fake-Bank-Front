import React, { useState } from "react";

export const TransferBetweenAccounts: React.FC = () => {
  const accounts = ["Smart Access", "NetBank Saver"];
  const [selectedAccount, setSelectedAccount] = useState<string>("");
  const [selectedTransferTo, setSelectedTransferTo] = useState<string>("");
  const [transferAmount, setTransferAmount] = useState<string>(""); // Separate state for transfer amount
  const [isAccountDropdownOpen, setIsAccountDropdownOpen] =
    useState<boolean>(false);
  const [isTransferToDropdownOpen, setIsTransferToDropdownOpen] =
    useState<boolean>(false);

  const handleAccountChange = (account: string) => {
    setSelectedAccount(account);
    setSelectedTransferTo(""); // Reset transfer to when a new account is selected
    setIsAccountDropdownOpen(false);
  };

  const handleTransferToChange = (account: string) => {
    setSelectedTransferTo(account);
    setIsTransferToDropdownOpen(false);
  };

  const availableTransferToOptions = accounts.filter(
    (account) => account !== selectedAccount
  );

  return (
    <div className="flex w-[1200px] justify-center p-space-8 bg-light-green">
      <div className="flex space-x-8 w-full mt-space-4 mb-space-8">
        {/* 左侧面板 */}
        <div className="flex-1 bg-native-milk rounded-[40px] p-space-4 relative">
          <div className="relative p-space-4">
            <div className="text-black text-base font-normal font-['Poppins'] mb-space-4 mt-space-4">
              Select your account:
            </div>
            <div className="w-full h-l bg-gray-200 rounded flex items-center justify-between px-space-4 relative">
              <button
                className="text-grey-800 w-full text-left"
                onClick={() => setIsAccountDropdownOpen(!isAccountDropdownOpen)}
              >
                {selectedAccount || "Select Account"}
              </button>
              {isAccountDropdownOpen && (
                <div className="absolute top-full mt-space-2 w-full bg-white shadow-lg z-10">
                  {accounts.map((account) => (
                    <button
                      key={account}
                      className="w-full text-left px-space-4 py-space-2 hover:bg-gray-200 cursor-pointer"
                      onClick={() => handleAccountChange(account)}
                    >
                      {account}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 右侧面板 */}
        <div className="flex-1 bg-native-milk rounded-[40px] p-space-4 relative">
          <div className="relative p-space-4">
            <div className="mb-16">
              <div className="text-black text-base font-normal font-['Poppins'] mb-space-4 mt-space-4">
                Transfer to:
              </div>
              <div className="w-full h-l bg-gray-200 rounded flex items-center justify-between px-space-4 relative">
                <button
                  className="text-grey-800 w-full text-left"
                  onClick={() =>
                    setIsTransferToDropdownOpen(!isTransferToDropdownOpen)
                  }
                  disabled={!selectedAccount} // 禁用按钮直到选择了账户
                >
                  {selectedTransferTo || "Select Account"}
                </button>
                {isTransferToDropdownOpen && (
                  <div className="absolute top-full mt-space-2 w-full bg-white shadow-lg z-10">
                    {availableTransferToOptions.map((account) => (
                      <button
                        key={account}
                        className="w-full text-left px-space-4 py-space-2 hover:bg-gray-200 cursor-pointer"
                        onClick={() => handleTransferToChange(account)}
                      >
                        {account}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div className="mb-20">
              <div className="text-black text-base font-normal font-['Poppins'] mb-space-4">
                Transfer amount:
              </div>
              <input
                type="number"
                min="0.00" // 确保输入的值至少为0.01
                className="w-full h-l bg-gray-200 rounded px-space-4 py-space-2"
                placeholder="Enter amount"
                value={transferAmount} // Use the new state variable for amount
                onChange={(e) => setTransferAmount(e.target.value)}
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
