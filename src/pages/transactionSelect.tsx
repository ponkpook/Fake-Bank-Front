import React, { useEffect, useState } from "react";
import { Container } from "../components/container";
import GreetingSection from "../components/GreetingSection";
import { IAccount } from "../type";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { userID } from "./viewaccount";

interface TransactionSelectProps {
    accounts: IAccount[];
}

export const TransactionSelect: React.FC<TransactionSelectProps> = () => {
    // State for storing accounts and other selections
    const [accounts, setAccounts] = useState<IAccount[]>([]);
    const [selectedAccount, setSelectedAccount] = useState<string>(""); // State for selected account
    const [isAccountDropdownOpen, setIsAccountDropdownOpen] = useState<boolean>(false);
    const navigate = useNavigate(); // Initialize useNavigate

    // useEffect to load accounts from localStorage
    useEffect(() => {
        let storageAccounts = localStorage.getItem(userID);
        if (storageAccounts) {
            setAccounts(JSON.parse(storageAccounts));
        } else {
            // Set default accounts if no accounts are found in localStorage
            setAccounts([
                {
                    name: "Everyday Account",
                    bsb: "010-010",
                    accNo: "1234 5678",
                    image: "/assets/number1.png",
                    balance: "$100.00",
                },
                {
                    name: "NetBank Saving",
                    bsb: "010-010",
                    accNo: "1234 5678",
                    image: "/assets/number2.png",
                    balance: "$1000.00",
                },
            ]);
        }
    }, []);

    // Handle account selection from dropdown
    const handleAccountChange = (account: string) => {
        setSelectedAccount(account);
        setIsAccountDropdownOpen(false); // Close dropdown after selection
    };

    // Handle navigation when the "Show" button is clicked
    const handleShowClick = () => {
        // Optionally, you could pass the selected account as state or through the URL
        navigate("/transaction-history"); // Navigate to the transaction-history page
    };

    return (
        <Container>
            <div className="flex flex-col md:flex-row w-[90%] mx-auto bg-native-milk shadow-lg my-10 rounded-m min-h-[80vh] items-center justify-center ">
                {/* Greeting section */}
                <div className="flex flex-col h-full w-full md:w-[50%] p-4">
                    <GreetingSection
                        title="Check your recent transaction history!"
                        message="Use internet banking to access your transaction history quickly, easily and safely."
                        imgSrc="./assets/wallet.png"
                    />
                </div>

                {/* Account selection section */}
                <div className="flex flex-col w-full md:w-[50%] p-4">
                    <div className="flex justify-center">
                        <p className="font-prosto text-xxl font-bold">Hello Again!</p>
                    </div>

                    <div className="flex-1 bg-native-milk rounded-[40px] p-4 relative">
                        <div className="relative p-4">
                            <div className="text-black text-l font-normal font-['Poppins'] mb-4 mt-4">
                                Select your account:
                            </div>
                            <div className="w-full h-l bg-gray-200 flex items-center justify-between px-4 relative">
                                <button
                                    className={`w-full text-left ${selectedAccount ? "text-black" : "text-grey-800"}`}
                                    onClick={() => setIsAccountDropdownOpen(!isAccountDropdownOpen)}
                                >
                                    {selectedAccount || "Select Account"}
                                </button>

                                {/* Dropdown for account selection */}
                                {isAccountDropdownOpen && (
                                    <div className="absolute top-full mt-2 w-full bg-white shadow-lg z-10">
                                        {accounts.map((account) => (
                                            <button
                                                key={account.accNo}
                                                className="w-full text-left px-4 py-2 hover:bg-gray-200 cursor-pointer"
                                                onClick={() => handleAccountChange(account.name)}
                                            >
                                                {account.name} (BSB: {account.bsb}, Account:{" "}
                                                {account.accNo})
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                            <div className="flex justify-end space-x-4 mt-10">
                                <button
                                    className="bg-native-red text-white text-sm font-medium font-['Poppins'] py-2 px-6 rounded-full hover:bg-orange-600"
                                    onClick={handleShowClick} // Add click handler for navigation
                                >
                                    Show
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    );
};
