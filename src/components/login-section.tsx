import React, { useState, useEffect } from "react";

import SignUpAndInButtonsReverse from './SignUpAndInButtonsReverse';
import SignOffButton from './SignOffButton';

export function LoginSection() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  return (
    <div className="bg-native-milk rounded-[40px] flex flex-col items-center justify-center shadow-lg">
      <div className="text-left mx-space-10 py-8">
      <h3 className="text-black font-prosto mx-space-10">
          Welcome to
      </h3>
      <h1 className="text-black font-prosto mx-space-10">
          FAKE BANK simulator
      </h1>

        <h4 className="text-black  font-prosto mt-10 mx-space-10">
          Experience Banking, Simplified.
        </h4>
        <p className="text-black font-poppins font-light mx-space-10 max-w-[480px] pt-space-2">
          Learn the essentials of online banking with confidence — our simple
          and guided simulating platform is here to help you every step of the way.
        </p>
        {isLoggedIn ? <SignOffButton /> : <SignUpAndInButtonsReverse />}
        </div>
      
      
    </div>
  );
}