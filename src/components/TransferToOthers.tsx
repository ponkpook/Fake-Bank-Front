import React, { useState, useEffect } from "react";
import { NewPayeePopup } from "./NewPayeePopup";
import { IAccount } from "../type";
import TransferConfirmationModal from "./TransferConfirmationModal";
import TransferResultModal from "./TransferResultModal";
import { useNavigate } from "react-router-dom";

interface TransferToOthersProps {
  accounts: IAccount[];
}

export const TransferToOthers: React.FC<TransferToOthersProps> = ({
  accounts,
}) => {
  //const accounts = ["Smart Access", "NetBank Saver"];
  const existingPayees = ["Payee1", "Payee2"];
  const [selectedAccount, setSelectedAccount] = useState<string>("");
  const [selectedTransferTo, setSelectedTransferTo] = useState<string>("");
  const [transferAmount, setTransferAmount] = useState<string>("");
  const [isAccountDropdownOpen, setIsAccountDropdownOpen] =
    useState<boolean>(false);
  const [isTransferToDropdownOpen, setIsTransferToDropdownOpen] =
    useState<boolean>(false);
  const [isNewPayee, setIsNewPayee] = useState<boolean>(false); // State to control modal visibility
  const [isPopupVisible, setIsPopupVisible] = useState<boolean>(false);

  // State for result modal
  const [isResultVisible, setIsResultVisible] = useState<boolean>(false);
  const [transferStatus, setTransferStatus] = useState<"success" | "fail">(
    "success"
  );

  const navigate = useNavigate();

  const handleAccountChange = (account: string) => {
    setSelectedAccount(account);
    setSelectedTransferTo(""); // Reset transfer to when a new account is selected
    setIsAccountDropdownOpen(false);
  };

  const handleTransferToChange = (payee: string) => {
    setSelectedTransferTo(payee);
    setIsTransferToDropdownOpen(false);
  };

  const handleConfirm = () => {
    if (selectedAccount && selectedTransferTo && transferAmount) {
      setIsPopupVisible(true); // 显示确认弹窗
    } else {
      alert("Please fill in all fields.");
    }
  };

  // Define handleTransfer to process the transfer
  const handleTransfer = () => {
    // Simulate transfer success or failure
    const isSuccess = 0; // success popup =1, failure popup = 0
    setIsPopupVisible(false); // Close confirmation modal
    setTransferStatus(isSuccess ? "success" : "fail");
    setIsResultVisible(true); // Show result modal
  };

  // Close modal and navigate to "View Accounts" after 10 seconds
  useEffect(() => {
    if (isResultVisible) {
      const timeout = setTimeout(() => {
        setIsResultVisible(false);
        navigate("/accounts"); // Redirect to "View Accounts" page
      }, 3000); // 10 seconds
      return () => clearTimeout(timeout); // Clear timeout if component unmounts
    }
  }, [isResultVisible, navigate]);

  // Handle manual closing of the result modal
  const handleClose = () => {
    setIsResultVisible(false);
    navigate("/accounts"); // Redirect when user manually closes the modal
  };

  return (
    <div className="flex justify-center p-space-8 bg-light-green shadow-lg mb-10 min-h-[80vh]">
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-8 w-full mt-space-4 mb-space-8">
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
            <div className="mb-16">
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
                disabled={!selectedAccount} // Disable until an account is selected
              />
            </div>
            <div className="flex justify-end space-x-4">
              <button
                className="bg-native-red text-white text-sm font-medium font-['Poppins'] py-space-2 px-space-6 rounded-full hover:bg-orange-600"
                onClick={() => setIsNewPayee(true)} // Show the popup
                disabled={!selectedAccount}
              >
                {isNewPayee ? "Pay existing payee?" : "Pay someone new?"}
              </button>
              <button
                className="bg-native-red text-white text-sm font-medium font-['Poppins'] py-space-2 px-space-6 rounded-full hover:bg-orange-600"
                onClick={handleConfirm}
              >
                Confirm payment
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Popup for new payee */}
      <NewPayeePopup isOpen={isNewPayee} onClose={() => setIsNewPayee(false)}>
        <h2 className="text-xl font-semibold font-['Poppins'] mb-4">
          Enter New Payee Information
        </h2>
        <form>
          <div className="mb-4">
            <label className="block text-sm font-medium font-['Poppins'] mb-2">Name:</label>
            <input
              type="text"
              className="w-full h-l bg-gray-200 rounded px-space-4 py-space-2"
              placeholder="Enter payee name"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium font-['Poppins'] mb-2">BSB:</label>
            <input
              type="text"
              className="w-full h-l bg-gray-200 rounded px-space-4 py-space-2"
              placeholder="Enter BSB number"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium font-['Poppins'] mb-2">
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
            className="bg-native-red text-white my-2 py-2 px-4 rounded-full font-medium font-['Poppins'] hover:bg-orange-600 "
          >
            Save Payee
          </button>
        </form>
      </NewPayeePopup>

      {isPopupVisible && (
        <TransferConfirmationModal
          show={isPopupVisible}
          handleClose={() => setIsPopupVisible(false)}
          amount={transferAmount}
          recipient={selectedTransferTo}
          fromAccount={selectedAccount} // Pass the selected "from" account
          onConfirm={handleTransfer}
        />
      )}

      {/* Transfer result modal */}
      <TransferResultModal
        show={isResultVisible}
        status={transferStatus}
        handleClose={handleClose}
      />
    </div>
  );
};
