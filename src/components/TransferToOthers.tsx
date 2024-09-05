import React, { useState } from "react";

export const TransferToOthers: React.FC = () => {
  const accounts = ["Smart Access", "NetBank Saver"];
  const existingPayees = ["Payee1", "Payee2"];
  
  const [selectedAccount, setSelectedAccount] = useState<string>("");
  const [selectedTransferTo, setSelectedTransferTo] = useState<string>("");
  const [transferAmount, setTransferAmount] = useState<string>("");

  const [isAccountDropdownOpen, setIsAccountDropdownOpen] = useState<boolean>(false);
  const [isTransferToDropdownOpen, setIsTransferToDropdownOpen] = useState<boolean>(false);
  const [isNewPayee, setIsNewPayee] = useState<boolean>(false); // Toggle between new/existing payee
  const [newPayeeName, setNewPayeeName] = useState<string>("");
  const [newPayeeBSB, setNewPayeeBSB] = useState<string>("");
  const [newPayeeAccountNumber, setNewPayeeAccountNumber] = useState<string>("");

  const handleAccountChange = (account: string) => {
    setSelectedAccount(account);
    setSelectedTransferTo(""); // Reset transfer to when a new account is selected
    setIsAccountDropdownOpen(false);
  };

  const handleTransferToChange = (payee: string) => {
    setSelectedTransferTo(payee);
    setIsTransferToDropdownOpen(false);
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

{/* Right Panel */}
<div className="flex-1 bg-native-milk rounded-[40px] p-space-4 relative">
          <div className="relative p-space-4">
            <div className="mb-16">
              <div className="text-black text-base font-normal font-['Poppins'] mb-space-4 mt-space-4">
                To:
              </div>
              {isNewPayee ? (
                // Fields for new payee
                <div>
                  <input
                    type="text"
                    className="w-full h-l bg-gray-200 rounded px-space-4 py-space-2 mb-4"
                    placeholder="Enter Account Name"
                    value={newPayeeName}
                    onChange={(e) => setNewPayeeName(e.target.value)}
                    disabled={!selectedAccount} // 禁用直到选择了账户
                  />
                  <input
                    type="text"
                    className="w-full h-l bg-gray-200 rounded px-space-4 py-space-2 mb-4"
                    placeholder="Enter BSB"
                    value={newPayeeBSB}
                    onChange={(e) => setNewPayeeBSB(e.target.value)}
                    disabled={!selectedAccount} // 禁用直到选择了账户
                  />
                  <input
                    type="text"
                    className="w-full h-l bg-gray-200 rounded px-space-4 py-space-2"
                    placeholder="Enter Account Number"
                    value={newPayeeAccountNumber}
                    onChange={(e) => setNewPayeeAccountNumber(e.target.value)}
                    disabled={!selectedAccount} // 禁用直到选择了账户
                  />
                </div>
              ) : (
                // Dropdown for existing payees
                <div className="w-full h-l bg-gray-200 flex items-center justify-between px-space-4 relative">
                  <button
                    className={`w-full text-left ${
                      selectedTransferTo ? "text-black" : "text-grey-800"
                    }`}
                    onClick={() =>
                      setIsTransferToDropdownOpen(!isTransferToDropdownOpen)
                    }
                    disabled={!selectedAccount} // 禁用按钮直到选择了账户
                  >
                    {selectedTransferTo || "Select Existing Payee"}
                  </button>
                  {isTransferToDropdownOpen && (
                    <div className="absolute top-full mt-space-2 w-full bg-white shadow-lg z-10">
                      {existingPayees.map((payee) => (
                        <button
                          key={payee}
                          className="w-full text-left px-space-4 py-space-2 hover:bg-gray-200 cursor-pointer"
                          onClick={() => handleTransferToChange(payee)}
                        >
                          {payee}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}
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
                disabled={!selectedAccount} // 禁用直到选择了账户
              />
            </div>

            <div className="flex justify-end space-x-4">
              <button
                className="bg-native-red text-white text-sm font-medium font-['Poppins'] py-space-2 px-space-6 rounded-full"
                onClick={() => setIsNewPayee(!isNewPayee)}
              >
                {isNewPayee ? "Pay existing payee?" : "Pay someone new?"}
              </button>

              <button className="bg-native-red text-white text-sm font-medium font-['Poppins'] py-space-2 px-space-6 rounded-full">
                Confirm payment
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
