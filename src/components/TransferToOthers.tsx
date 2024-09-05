import React, { useState } from "react";
import NewPayeePopup from './NewPayeePopup';

export const TransferToOthers: React.FC = () => {
  const accounts = ["Smart Access", "NetBank Saver"];
  const existingPayees = ["Payee1", "Payee2"];
  const [selectedAccount, setSelectedAccount] = useState<string>("");
  const [selectedTransferTo, setSelectedTransferTo] = useState<string>("");
  const [transferAmount, setTransferAmount] = useState<string>("");
  const [isAccountDropdownOpen, setIsAccountDropdownOpen] = useState<boolean>(false);
  const [isTransferToDropdownOpen, setIsTransferToDropdownOpen] = useState<boolean>(false);
  const [isNewPayee, setIsNewPayee] = useState<boolean>(false); // State to control modal visibility


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
                Transfer to:
              </div>
              <div className="w-full h-l bg-gray-200 rounded flex items-center justify-between px-space-4 relative">
                <button
                  className={`w-full text-left ${selectedTransferTo ? "text-black" : "text-grey-800"}`}
                  onClick={() => setIsTransferToDropdownOpen(!isTransferToDropdownOpen)}
                  disabled={!selectedAccount} // Disable button until an account is selected
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
            </div>
            <div className="mb-10">
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
                disabled={!selectedAccount} // Disable until an account is selected
              />
            </div>
            <div className="flex justify-end space-x-4 ">
              <button
                className="bg-native-red text-white text-sm font-medium font-['Poppins'] py-space-2 px-space-6 rounded-full"
                onClick={() => setIsNewPayee(true)} // Show the popup
                disabled={!selectedAccount}
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

      {/* Popup for new payee */}
      <NewPayeePopup isOpen={isNewPayee} onClose={() => setIsNewPayee(false)}>
        <h2 className="text-xl font-semibold mb-4">Enter New Payee Information</h2>
        <form>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Name:</label>
            <input type="text" className="w-full h-l bg-gray-200 rounded px-space-4 py-space-2" placeholder="Enter payee name" />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">BSB:</label>
            <input type="text" className="w-full h-l bg-gray-200 rounded px-space-4 py-space-2" placeholder="Enter BSB number" />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Account Number:</label>
            <input type="text" className="w-full h-l bg-gray-200 rounded px-space-4 py-space-2" placeholder="Enter account number" />
          </div>
          <button type="submit" className="bg-native-red text-white py-2 px-4 rounded-full">
            Save Payee
          </button>
        </form>
      </NewPayeePopup>
    </div>
  );
};