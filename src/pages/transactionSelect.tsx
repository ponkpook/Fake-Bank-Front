import React, { useState } from "react";
import { Container } from "../components/container";
import GreetingSection from "../components/GreetingSection";
import { IAccount } from "../type";

interface TransactionSelectProps {
    accounts: IAccount[];
}

export const TransactionSelect: React.FC<TransactionSelectProps> = ({ accounts }) => {
    const [selectedAccount, setSelectedAccount] = useState<string>(""); // State for selected account
    const [isAccountDropdownOpen, setIsAccountDropdownOpen] = useState<boolean>(false);


  // Handle account selection from dropdown
    const handleAccountChange = (account: string) => {
    setSelectedAccount(account);
    setIsAccountDropdownOpen(false); // Close dropdown after selection
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
                        className={`w-full text-left ${
                            selectedAccount ? "text-black" : "text-grey-800"
                        }`}
                        onClick={() =>
                            setIsAccountDropdownOpen(!isAccountDropdownOpen)
                        }
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
                    className="bg-native-red text-white text-sm font-medium font-['Poppins'] py-space-2 px-space-6 rounded-full hover:bg-orange-600"
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