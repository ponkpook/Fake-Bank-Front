import React from "react";
import { LoginSection } from "../components/login-section";
import { Container } from "../components/Container";
import CarouselsImage from "../components/CarouselsImage";

export const Homepage = () => {
  return (
    <Container>
      <div className="flex flex-col md:flex-row justify-center pt-[80px] gap-[100px]">
      {/* Left half: Login Section */}
      <div className="flex justify-center w-full md:w-auto">
          <LoginSection />
      </div>
      {/* Right half: Carousel Section */}
      <div className="flex justify-center w-full md:w-[550px]"> {/* Set a fixed width for carousel */}
          <CarouselsImage />
      </div>
    </div>

      {/* Lower Section: Slogan */}
      <div className="flex flex-col items-center justify-center bg-native-milk py-space-10 rounded-s mt-20">
        <div>
          <h2 className="relative z-3 font-prosto text-xxxl">
            Benefits of Fake-Bank Internet Banking
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-[50px] md:gap-[250px] pt-[30px] md:pt-[60px]">
          {/* Section 1 */}
          <div className="flex flex-col gap-space-10 justify-center items-center">
            <img
              src="./assets/section1.png"
              alt="section1"
              className="relative w-[50px] h-[65px]"
            />
            <p className="relative font-poppins text-m pt-space-5">
              Enjoy safe and secure banking!
            </p>
          </div>
          
          {/* Section 2 */}
          <div className="flex flex-col gap-space-10 justify-center items-center">
            <img
              src="./assets/section2.png"
              alt="section2"
              className="relative w-[50px] h-[65px]"
            />
            <p className="relative font-poppins text-m pt-space-5">
              Manage your accounts in one place!
            </p>
          </div>
          
          {/* Section 3 */}
          <div className="flex flex-col gap-space-10 justify-center items-center">
            <img
              src="./assets/section3.png"
              alt="section3"
              className="relative w-[50px] h-[65px]"
            />
            <p className="relative font-poppins text-m pt-space-5">
              Bank anywhere, anytime!
            </p>
          </div>
        </div>
      </div>
    </Container>
  );
};
