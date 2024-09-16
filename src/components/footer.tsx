import React from "react";

export const Footer: React.FC = () => {
  return (
    <div className="w-full h-space-10 relative bg-teal-green mt-space-5">
      <div className="flex items-center justify-center h-full text-white text-xs font-normal font-poppins">
        Please note: Fake-Bank is a online banking simulator. Transactions are simulations
        only. © 2024 Fake Bank
      </div>
    </div>
  );
};
