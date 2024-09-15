import React, { useState } from "react";
import { NewPayeePopup } from "./NewPayeePopup";

interface RecurringPaymentsProps {
  accounts: {
    name: string;
    bsb: string;
    accNo: string;
    balance: string;
  }[];
}

export const RecurringPayments: React.FC<RecurringPaymentsProps> = ({
  accounts,
}) => {
  const existingPayees = ["Payee1", "Payee2"];
  const frequencyOption = ["Every week", "Every fortnight", "Every 6 months"];
  const [selectedAccount, setSelectedAccount] = useState<string>("");
  const [selectedTransferTo, setSelectedTransferTo] = useState<string>("");
  const [transferAmount, setTransferAmount] = useState<string>("");
  const [isAccountDropdownOpen, setIsAccountDropdownOpen] =
    useState<boolean>(false);
  const [isTransferToDropdownOpen, setIsTransferToDropdownOpen] =
    useState<boolean>(false);
  const [isFrequencyToDropdownOpen, setIsFrequencyToDropdownOpen] =
    useState<boolean>(false);
  const [isNewPayee, setIsNewPayee] = useState<boolean>(false); // State to control modal visibility
  const [selectedFrequency, setSelectedFrequency] = useState<string>("");

  const handleAccountChange = (account: string) => {
    setSelectedAccount(account);
    setSelectedTransferTo(""); // Reset transfer to when a new account is selected
    setIsAccountDropdownOpen(false);
  };

  const handleTransferToChange = (payee: string) => {
    setSelectedTransferTo(payee);
    setIsTransferToDropdownOpen(false);
  };

  const handleFrequencyChange = (frequency: string) => {
    setSelectedFrequency(frequency);
  };

  return (
    <div className="flex max-w-[1328px] justify-center p-space-8 bg-light-green">
      <div className="flex space-x-8 w-full mt-space-4 mb-space-8">
        {/* Left Panel */}
        {/* Select Account */}
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
          {/* Select Existing Payee */}
          <div className="mb-16 relative p-space-4">
            <div className="text-black text-base font-normal font-['Poppins'] mb-space-4 mt-space-4">
              Transfer to:
            </div>
            <div className="w-full h-l bg-gray-200 rounded flex items-center justify-between px-space-4 relative">
              <button
                className={`w-full text-left ${
                  selectedTransferTo ? "text-black" : "text-grey-800"
                }`}
                onClick={() =>
                  setIsTransferToDropdownOpen(!isTransferToDropdownOpen)
                }
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
          <div className="mb-16 relative p-space-4">
            <button
              className="bg-native-red text-white text-sm font-medium font-['Poppins'] py-space-2 px-space-6 rounded-full"
              onClick={() => setIsNewPayee(true)} // Show the popup
              disabled={!selectedAccount}
            >
              {isNewPayee ? "Pay existing payee?" : "Pay someone new?"}
            </button>
          </div>

          {/* Popup for new payee */}
          <NewPayeePopup
            isOpen={isNewPayee}
            onClose={() => setIsNewPayee(false)}
          >
            <h2 className="text-xl font-semibold mb-4">
              Enter New Payee Information
            </h2>
            <form>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Name:</label>
                <input
                  type="text"
                  className="w-full h-l bg-gray-200 rounded px-space-4 py-space-2"
                  placeholder="Enter payee name"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">BSB:</label>
                <input
                  type="text"
                  className="w-full h-l bg-gray-200 rounded px-space-4 py-space-2"
                  placeholder="Enter BSB number"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">
                  Account Number:
                </label>
                <input
                  type="text"
                  className="w-full h-l bg-gray-200 rounded px-space-4 py-space-2"
                  placeholder="Enter account number"
                />
              </div>
              <button
                type="submit"
                className="bg-native-red text-white py-2 px-4 rounded-full"
              >
                Save Payee
              </button>
            </form>
          </NewPayeePopup>
        </div>

        {/* Right Panel */}
        <div className="flex-1 bg-native-milk rounded-[40px] p-space-4 relative">
          <div className="relative p-space-4">
            <div className="mb-4">
              <div className="text-black text-base font-normal font-['Poppins'] mb-space-4 mt-space-4">
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

            <div className="flex mb-8">
              <div className="flex-1">
                <div className="text-black text-base font-normal font-['Poppins'] mb-space-4 mt-space-4">
                  Start Date:
                </div>
                <input
                  type="text"
                  className="w-full h-l bg-gray-200 rounded px-space-4 py-space-2"
                  placeholder="Enter start date"
                  disabled={!selectedAccount}
                />
              </div>
              <div className="flex-1 ml-4">
                <div className="text-black text-base font-normal font-['Poppins'] mb-space-4 mt-space-4">
                  End Date:
                </div>
                <input
                  type="text"
                  className="w-full h-l bg-gray-200 rounded px-space-4 py-space-2"
                  placeholder="Enter end date"
                  disabled={!selectedAccount}
                />
              </div>
            </div>

            <div className="mb-20">
              <div className="text-black text-base font-normal font-['Poppins'] mb-space-4">
                Frequency:
              </div>
              <div className="w-full h-l bg-gray-200 rounded flex items-center justify-between px-space-4 relative">
                <button
                  className={`w-full text-left ${
                    selectedFrequency ? "text-black" : "text-grey-800"
                  }`}
                  onClick={() =>
                    setIsFrequencyToDropdownOpen(!isFrequencyToDropdownOpen)
                  }
                  disabled={!selectedAccount} // Disable button until an account is selected
                >
                  {selectedFrequency || "Select Recurring Frequency"}
                </button>
                {isFrequencyToDropdownOpen && (
                  <div className="absolute top-full mt-space-2 w-full bg-white shadow-lg z-10">
                    {frequencyOption.map((frequency) => (
                      <button
                        key={frequency}
                        className="w-full text-left px-space-4 py-space-2 hover:bg-gray-200 cursor-pointer"
                        onClick={() => handleFrequencyChange(frequency)}
                      >
                        {frequency}
                      </button>
                    ))}
                  </div>
                )}
              </div>
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
