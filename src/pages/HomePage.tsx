import React from "react";
import coinOnCan from "../assets/coinOnCan.jpg";

// BenefitItem Component
type BenefitItemProps = {
  number: number;
  text: string;
};

const BenefitItem: React.FC<BenefitItemProps> = ({ number, text }) => (
  <div className="flex flex-col items-center">
    <div className="bg-black text-white w-12 h-12 rounded-full flex items-center justify-center mb-4">
      {number}
    </div>
    <p className="text-gray-700 font-semibold">{text}</p>
  </div>
);

const HomePage = () => {
  return (
    <div className="bg-[#CBD6CC] min-h-screen">
      {/* Hero Section */}
      <div className="pt-24 pb-8 px-4">
        <div
          className="container mx-auto flex relative"
          style={{ left: "43px" }}
        >
          <div
            className="bg-[#F2EDE3] p-8 rounded-[35px] shadow-lg flex flex-col justify-center"
            style={{ width: "520px", height: "281px" }}
          >
            <h1 className="text-3xl font-bold mb-4">
              Experience Banking, Simplified.
            </h1>
            <p className="text-gray-700 mb-4">
              Learn the essentials of online banking with confidence—our simple
              and guided platform is here to help you every step of the way.
            </p>
            <div className="flex space-x-4">
              <a
                href="/login"
                className="bg-[#E3432B] hover:bg-red-700 text-white font-bold py-2 px-4 rounded-[35px]"
              >
                Log in
              </a>
              <a
                href="/signup"
                className="bg-white text-[#E3432B] font-bold py-2 px-4 rounded-[35px] border border-[#E3432B] hover:bg-[#F2EDE3]"
              >
                Sign up
              </a>
            </div>
          </div>
          <div className="absolute" style={{ left: "580px", top: "50%" }}>
            <img
              src={coinOnCan}
              alt="Banking illustration"
              className="w-40 h-60 object-cover rounded-lg transform -translate-y-1/2"
            />
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="bg-[#F2EDE3] py-8 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">
            Benefits of Fake-Bank Internet Banking
          </h2>
          <div className="flex justify-around mt-8">
            <BenefitItem number={1} text="Enjoy safe and secure banking!" />
            <BenefitItem number={2} text="Manage your accounts in one place!" />
            <BenefitItem number={3} text="Bank anywhere, anytime!" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
