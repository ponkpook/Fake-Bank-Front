import React from "react";
import "./App.css";
import { LoginSection } from "./components/login-section";
import { Container } from "./components/container";

function App() {
  return (
    <div>
      <Container>
        <div className="flex flex-row justify-center pt-[80px] gap-[100px]">
          {/* Left half: Login Section */}
          <div className="flex justify-center">
            <LoginSection />
          </div>
          {/* Right half: Image */}
          <div className="flex justify-center">
            <img
              src="./assets/homepage-img.png"
              alt="homepage"
              className="w-[500px] h-[500px] z-1"
            />
          </div>
        </div>
        <div className="flex items-center justify-center">
          <img
            src="./assets/ellipsis.png"
            alt="ellipsis background"
            className="z-2 fixed bottom-0"
          />
          <h2 className="relative z-3 font-prosto text-xxxl">
            Benefits of Fake-Bank Internet Banking
          </h2>
        </div>
        <div className="flex items-center justify-center">
          <div className="grid justify-center grid-cols-3 z-3 gap-[250px] pt-[60px]">
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
    </div>
  );
}

export default App;
