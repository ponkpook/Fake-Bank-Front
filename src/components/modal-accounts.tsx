import React from "react";

type Account = {
  name?: string;
  bsb?: string;
  accNo?: string;
  image?: string;
  balance?: string;
};

type IAccount = {
  accounts: Account[];
};

export const ModalAccounts: React.FC<IAccount> = ({ accounts }) => {
  return (
    <div className="flex flex-col gap-space-10">
      {accounts.map((account, index) => (
        <div className="flex w-full bg-light-white justify-between">
          <div className="flex flex-row justify-start gap-space-10">
            <div>
              <img
                src={`${account.image}`}
                alt="account representative"
                className="w-[60px] h-[75px]"
              />
            </div>
            <div className="flex flex-col">
              <span>{account.name}</span>
              <div className="flex flex-row gap-space-3">
                <span>{account.bsb}</span>
                <span>{account.accNo}</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col px-space-10">
            <span>Balance</span>
            <span>{account.balance}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

// <div
//   className="flex flex-col justify-between rounded-s p-space-2 h-[292px] bg-cover bg-centere"
//   key={index}
//   style={{
//     backgroundImage: `
//         url(${marketplace.image}),
//         linear-gradient(180deg, #BCC3DA 0%, #EEF7FB 100%),
//         linear-gradient(0deg, rgba(46, 46, 46, 0.3) 0%, rgba(46, 46, 46, 0.6) 100%),
//         linear-gradient(180deg, rgba(46, 46, 46, 0.3) 0%, rgba(46, 46, 46, 0.6) 100%)
//       `,
//     backgroundSize: "cover", // Cover the entire element
//     backgroundPosition: "center", // Center the image/gradient
//   }}
// >
//   <div className="flex flex-col">
//     <div className="flex justify-start">
//       <span className="text-xxl font-[500] blender-medium text-grey-100">
//         {marketplace.name}
//       </span>
//       <img
//         src="/assets/v4/separate-icon.png"
//         alt="separate icon"
//         className="w-[2px] h-[22px] mt-space-1 mx-space-2"
//       />
//       <span className="text-xxl font-[500] blender-medium text-grey-100">
//         Workshop
//       </span>
//     </div>
//     <div className="flex flex-row justify-start gap-space-2 items-center">
//       <div className="w-space-2 h-space-2 bg-native-red rounded-full"></div>
//       <span className="text-s text-grey-200 font-[500] blender-medium">
//         {marketplace.level}
//       </span>
//     </div>
//   </div>
//   <div className="flex items-center justify-center">
//     <button className="flex text-center justify-center bg-black-400 border-[1px] border-grey-800 px-xl py-space-3 rounded-xs gap-sapce-2 text-l blender-medium font-[900] text-grey-200 w-full">
//       SELL
//       <span className="text-native-green pl-space-1">
//         {marketplace.price}
//       </span>
//       <img
//         src="/assets/v4/sell-icon.png"
//         alt="sell icon"
//         className="w-[16px] h-[16px] mt-space-1 ml-space-2"
//       />
//     </button>
//   </div>
// </div>
