import React, { useState, useEffect } from "react";
import { IAccount } from "../type";
import TransferConfirmationModal from "./TransferConfirmationModal";
import TransferResultModal from "./TransferResultModal";
import { useNavigate } from "react-router-dom";

interface BPayProps {
  accounts: IAccount[];
}

export const BPay: React.FC<BPayProps> = ({ accounts }) => {
  //const accounts = ["Smart Access", "NetBank Saver"];
  const [selectedAccount, setSelectedAccount] = useState<string>("");
  const [billerName, setBillerName] = useState<string>(""); // 追踪biller name
  const [billerCode, setBillerCode] = useState<string>(""); // 追踪biller code
  const [referenceNumber, setReferenceNumber] = useState<string>(""); // 追踪reference number
  const [transferAmount, setTransferAmount] = useState<string>(""); // Separate state for transfer amount
  const [isAccountDropdownOpen, setIsAccountDropdownOpen] =
    useState<boolean>(false);

  const [isConfirmationVisible, setIsConfirmationVisible] =
    useState<boolean>(false);

  // State for result modal
  const [isResultVisible, setIsResultVisible] = useState<boolean>(false);
  const [transferStatus, setTransferStatus] = useState<"success" | "fail">(
    "success"
  );

  const navigate = useNavigate();

  const handleAccountChange = (account: string) => {
    setSelectedAccount(account);
    setIsAccountDropdownOpen(false);
  };

  const handleConfirm = () => {
    if (
      selectedAccount &&
      billerName &&
      billerCode &&
      referenceNumber &&
      transferAmount
    ) {
      setIsConfirmationVisible(true); // 显示模态框
    } else {
      alert("Please fill in all fields.");
    }
  };

  // Simulate the transfer process and show result modal
  const handleTransfer = () => {
    const isSuccess = 1; // Randomly simulate success or failure
    setIsConfirmationVisible(false); // Close confirmation modal
    setTransferStatus(isSuccess ? "success" : "fail");
    setIsResultVisible(true); // Show result modal
  };

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
                onChange={(e) => setBillerName(e.target.value)}
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
                  onChange={(e) => setBillerCode(e.target.value)}
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
                  onChange={(e) => setReferenceNumber(e.target.value)}
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
            <button
              className="absolute bottom-space-4 right-space-4 bg-native-red text-white text-sm font-medium font-['Poppins'] py-space-2 px-space-6 rounded-full"
              onClick={handleConfirm}
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
      <TransferConfirmationModal
        show={isConfirmationVisible}
        handleClose={() => setIsConfirmationVisible(false)}
        amount={transferAmount}
        recipient={billerName} // 使用billerName作为接收人
        fromAccount={selectedAccount}
        onConfirm={handleTransfer}
      />

      {/* Result Modal */}
      <TransferResultModal
        show={isResultVisible}
        status={transferStatus}
        handleClose={handleClose}
      />
    </div>
  );
};
