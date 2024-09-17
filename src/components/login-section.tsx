import React, { useState, useEffect } from "react";

import SignUpAndInButtonsReverse from './SignUpAndInButtonsReverse';
import SignOffButton from './SignOffButton';

export function LoginSection() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    // 假设 checkLoginStatus 是一个函数，用于检查用户的登录状态
    const checkLoginStatus = async () => {
      try {
        // 这里可以是调用 API 或从 localStorage/sessionStorage 获取状态
        const response = await fetch("/api/check-login-status");
        const data = await response.json();
        setIsLoggedIn(data.isLoggedIn);
      } catch (error) {
        console.error("Error checking login status:", error);
      }
    };

    checkLoginStatus();
  }, []);

  return (
    <div className="bg-native-milk w-[520px] h-[280px] rounded-[40px] flex flex-col items-center justify-center shadow-lg">
      <div className="text-left">
        <h2 className="text-black text-[32px] font-prosto mx-space-10">
          Experience Banking, Simplified.
        </h2>
        <p className="text-black font-poppins font-light mx-space-8 max-w-[480px] pt-space-2">
          Learn the essentials of online banking with confidence — our simple
          and guided platform is here to help you every step of the way.
        </p>
      </div>
      {isLoggedIn ? <SignOffButton /> : <SignUpAndInButtonsReverse />}
    </div>
  );
}