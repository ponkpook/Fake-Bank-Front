import React, { useState, useEffect } from "react";
import { NewPayeePopup } from "./NewPayeePopup";
import { IAccount } from "../type";
import TransferConfirmationModal from "./TransferConfirmationModal";
import TransferResultModal from "./TransferResultModal";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { backEndUserAccount } from "../type";
import { backEndPayee } from "../type";
import config from "../config";

var username = sessionStorage.getItem("username");

interface TransferToOthersProps {
  accounts: IAccount[];
}

export const TransferToOthers: React.FC<TransferToOthersProps> = (
  {
    //accounts,
  }
) => {
  const [existingPayees, setExistingPayees] = useState<backEndPayee[]>([]);
  const [selectedAccount, setSelectedAccount] = useState<string>("");
  const [selectedTransferTo, setSelectedTransferTo] = useState<string>("");
  const [selectedAccountNumber, setSelectedAccountNumber] =
    useState<string>("");
  const [selectedTransferToNumber, setSelectedTransferToNumber] =
    useState<string>("");
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

  const fetchPayees = async () => {
    while (username == null) {
      username = sessionStorage.getItem("username");
    }
    const response = await axios.get(
      `${config.API_BASE_URL}/user/${username}/getPayees`,
      { params: { username: username } }
    );
    var payees = [];
    for (var i = 0; i < response.data.length; i++) {
      payees.push(response.data[i]);
    }
    setExistingPayees(payees);
    console.log("Payees fetched successfully");
  };

  // Fetch existing payees from the backend
  useEffect(() => {
    fetchPayees();
  }, []);

  const handleAccountChange = (account: string) => {
    setSelectedAccount(account);
    setSelectedTransferTo(""); // Reset transfer to when a new account is selected
    setIsAccountDropdownOpen(false);
  };

  const handleTransferToChange = (payee: string) => {
    setSelectedTransferTo(payee);
    setIsTransferToDropdownOpen(false);
  };

  const handleAccountChangeNumber = (account: string) => {
    setSelectedAccountNumber(account);
    setSelectedTransferTo(""); // Reset transfer to when a new account is selected
  };

  const handleTransferToChangeNumber = (payee: string) => {
    setSelectedTransferToNumber(payee);
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
    while (username == null) {
      username = sessionStorage.getItem("username");
    }
    console.log("fromAccount: ", selectedAccountNumber);
    console.log("toAccount: ", selectedTransferToNumber);
    axios
      .post(`${config.API_BASE_URL}/user/${username}/transferToOthers`, {
        fromAccount: selectedAccountNumber,
        toAccount: selectedTransferToNumber,
        amount: Number(transferAmount),
      })
      .then((response) => {
        console.log(response);
      });
    const isSuccess = 1; // success popup =1, failure popup = 0
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

  const [payeeName, setPayeeName] = useState("");
  const [BSB, setBsb] = useState("");
  const [accountNumber, setAccountNumber] = useState("");

  const handleAddPayee = async (e: React.FormEvent) => {
    e.preventDefault();
    while (username == null) {
      username = sessionStorage.getItem("username");
    }
    const response = await axios.post(
      `${config.API_BASE_URL}/user/${username}/addPayee`,
      {
        username: username,
        payeeName: payeeName,
        BSB: BSB,
        accountNumber: accountNumber,
      }
    );
    if (response.data.success) {
      console.log("Payee added successfully");
    } else {
      console.log(response.data.message);
    }
    setIsNewPayee(false); // Close the popup
    fetchPayees();
  };

  // Fetch accounts from the backend ---------------------------

  const [accounts] = useState<IAccount[]>([]);

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        while (username === null) {
          username = sessionStorage.getItem("username");
        }
        const response = await axios.get<backEndUserAccount[]>(
          `${config.API_BASE_URL}/user/${username}/accounts`
        );
        for (var i = 0; i < Math.min(response.data.length, 5); i++) {
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
                      onClick={() => {
                        handleAccountChange(account.name);
                        handleAccountChangeNumber(account.accNo);
                        console.log("accountNumber: ", account.accNo);
                      }}
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
                        key={payee.accountNumber}
                        className="w-full text-left px-space-4 py-space-2 hover:bg-gray-200 cursor-pointer"
                        onClick={() => {
                          handleTransferToChange(payee.payeeName);
                          handleTransferToChangeNumber(payee.accountNumber);
                          console.log("payeeNumber: ", payee.accountNumber);
                        }}
                      >
                        {payee.payeeName}
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
            <label className="block text-sm font-medium font-['Poppins'] mb-2">
              Name:
            </label>
            <input
              type="text"
              className="w-full h-l bg-gray-200 rounded px-space-4 py-space-2"
              placeholder="Enter payee name"
              value={payeeName}
              onChange={(e) => setPayeeName(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium font-['Poppins'] mb-2">
              BSB:
            </label>
            <input
              type="text"
              className="w-full h-l bg-gray-200 rounded px-space-4 py-space-2"
              placeholder="Enter BSB number"
              value={BSB}
              onChange={(e) => setBsb(e.target.value)}
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
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="bg-native-red text-white my-2 py-2 px-4 rounded-full font-medium font-['Poppins'] hover:bg-orange-600 "
            onClick={handleAddPayee}
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
