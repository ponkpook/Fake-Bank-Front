import React, { useState } from "react";
import { backEndUserAccount, IAccount } from "../type";
import TransferConfirmationModal from "./TransferConfirmationModal";
import axios from "axios";
import { useEffect } from "react";

const userID = "admin1"; 

interface TransferBetweenAccountsProps {
  accounts: IAccount[];
}


export const TransferBetweenAccounts: React.FC<TransferBetweenAccountsProps> = () => {

  const [accounts] = useState<IAccount[]>([]);

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const response = await axios.get<backEndUserAccount[]>(`http://localhost:3001/user/${userID}/accounts`);
        for(var i = 0; i < Math.min(response.data.length, 5); i++) {
          accounts.push({
            name: response.data[i].accountName,
            bsb: response.data[i].BSB,
            accNo: response.data[i].accountNumber,
            image: "null",
            balance: response.data[i].balance.toString(),
          });
        }
        
      } catch (error) {
        console.error("Error fetching accounts:", error);
      }
    };

    fetchAccounts();
  }, []);

  const [selectedAccount, setSelectedAccount] = useState<string>("");
  const [selectedTransferTo, setSelectedTransferTo] = useState<string>("");
  const [transferAmount, setTransferAmount] = useState<string>("");
  const [isPopupVisible, setIsPopupVisible] = useState<boolean>(false);

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

  // 过滤出可用的转账目标账户（不能转账给自己）
  const availableTransferToOptions = accounts.filter(
    (account) => account.accNo !== selectedAccount
  );
  

  const handleConfirm = () => {
    if (selectedAccount && selectedTransferTo && transferAmount) {
      setIsPopupVisible(true); // 显示确认弹窗
    } else {
      alert("Please fill in all fields.");
    }
  };

  return (
    <div className="flex max-w-[1328px] justify-center p-space-8 bg-light-green">
      <div className="flex space-x-8 w-full mt-space-4 mb-space-8">
        {/* 左侧账户选择 */}
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
                      onClick={() => handleAccountChange(account.accNo)}
                    >
                      {account.name} (BSB: {account.bsb}, Account:{" "}
                      {account.accNo}, Balance: {account.balance})
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 右侧选择转账账户 */}
        <div className="flex-1 bg-native-milk rounded-[40px] p-space-4 relative">
          <div className="relative p-space-4">
            <div className="mb-16">
              <div className="text-black text-base font-normal font-['Poppins'] mb-space-4 mt-space-4">
                Transfer to:
              </div>
              <div className="w-full h-l bg-gray-200 rounded flex items-center justify-between px-space-4 relative">
                <button
                  className={`w-full text-left ${
                    selectedAccount ? "text-black" : "text-grey-800"
                  }`}
                  onClick={() =>
                    setIsTransferToDropdownOpen(!isTransferToDropdownOpen)
                  }
                  disabled={!selectedAccount} // 禁用直到选择了账户
                >
                  {selectedTransferTo || "Select Account"}
                </button>
                {isTransferToDropdownOpen && (
                  <div className="absolute top-full mt-space-2 w-full bg-white shadow-lg z-10">
                    {availableTransferToOptions.map((account) => (
                      <button
                        key={account.accNo}
                        className="w-full text-left px-space-4 py-space-2 hover:bg-gray-200 cursor-pointer"
                        onClick={() => handleTransferToChange(account.accNo)}
                      >
                        {account.name} (BSB: {account.bsb}, Account:{" "}
                        {account.accNo}, Balance: {account.balance})
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
                min="0.01"
                className="w-full h-l bg-gray-200 rounded px-space-4 py-space-2"
                placeholder="Enter amount"
                value={transferAmount}
                onChange={(e) => setTransferAmount(e.target.value)}
              />
            </div>
            <button
              className="absolute bottom-space-4 right-space-4 bg-native-red text-white text-sm font-medium font-['Poppins'] py-space-2 px-space-6 rounded-full"
              onClick={handleConfirm}
            >
              Confirm
            </button>
          </div>
        </div>
        {/* 弹窗组件，展示转账确认信息 */}
        {isPopupVisible && (
          <TransferConfirmationModal
            show={isPopupVisible}
            handleClose={
              () => {
                axios.post(`http://localhost:3001/user/${userID}/transfer`, {
                  fromAccount: selectedAccount,
                  toAccount: selectedTransferTo,
                  amount: Number(transferAmount)
                }).then(response => {
                  console.log(response);
                });

                console.log("Transfer successful!");
                console.log("From: ", selectedAccount);
                console.log("To: ", selectedTransferTo);
                console.log("Amount: ", transferAmount);
                setIsPopupVisible(false)
              }
            }
            amount={transferAmount}
            recipient={selectedTransferTo}
            fromAccount={selectedAccount} // Pass the selected "from" account
          />
        )}
      </div>
    </div>
  );
};
