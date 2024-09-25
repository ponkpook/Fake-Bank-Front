import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import GreetingSection from "./GreetingSection";
import { validateCredentials } from "./ValidateInfo";

export const ModalSignup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // 用于存储错误信息
  const [usernameError, setUsernameError] = useState(""); // 用户名错误信息
  const [passwordError, setPasswordError] = useState(""); // 密码错误信息
  const navigate = useNavigate(); // 使用 useNavigate 钩子

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    // 使用验证逻辑
    const validate = validateCredentials(username, password);

    if (validate.username !== "") {
      setUsernameError(validate.username);
      return;
    } else if (validate.password !== "") {
      setPasswordError(validate.password);
      return;
    } else {
      
    }

    axios
      .post("http://localhost:3001/auth/register", { username, password })
      .then((response) => {
        if (response.data.success) {
          console.log("Register success:", response.data);
          navigate("/accounts");
        } else {
          console.log("Register failed:", response.data);
          setError("Invalid username or password");
        }
      })
      .catch((error) => {
        console.error("Error logging in:", error);
        setError("An error occurred while logging in. Please try again.");
      });
  };

  return (
    <div className="flex flex-col md:flex-row w-[90%] mx-auto bg-native-milk shadow-lg my-10 rounded-m min-h-[80vh] items-center justify-center">
      <div className="flex-1 flex items-center justify-center p-4 md:p-10">
        <GreetingSection
          title="Let’s set up your bank account!"
          message="Your money is safe with us! Don’t worry it should take a couple of minutes."
          imgSrc="./assets/person-icon.png"
        />
      </div>

      <div className="flex-1 flex flex-col justify-center p-4 md:p-10">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-space-10 mx-auto w-full max-w-md"
        >
          <div className="flex justify-center mb-6">
            <p className="font-prosto text-xxl font-bold">
              Create an account
            </p>
          </div>
          <div className="flex flex-col gap-space-10">
            <div className="flex flex-col gap-space-3">
              <p className="text-start font-poppins font-[200] text-l">
                Enter your name
              </p>
              <input
                type="text"
                value={username}
                onChange={handleUsernameChange}
                className={`w-full rounded-s h-[35px] border-none focus:outline-none pl-space-4 ${usernameError ? "border-red-500 border-2" : ""}`}
              />
              {usernameError && <p className="text-red-500 text-sm mt-1">{usernameError}</p>}
            </div>
            <div className="flex flex-col gap-space-3">
              <p className="text-start font-poppins font-[200] text-l">
                Enter password
              </p>
              <input
                className={`w-full rounded-s h-[35px] border-none focus:outline-none pl-space-4 ${passwordError ? "border-red-500 border-2" : ""}`}
                type="password"
                value={password}
                onChange={handlePasswordChange}
              />
              <p className="font-poppins text-s text-black/50 text-center pt-space-2">
                Please create a password that is at least 8 characters long and includes a mix of uppercase and lowercase letters for added security
              </p>
              {passwordError && <p className="text-red-500 text-sm mt-1">{passwordError}</p>}
            </div>
            <div className="flex flex-col gap-space-5">
              <button className="bg-native-red rounded-full text-black font-poppins font-light px-[70px] py-space-4 shadow-lg hover:bg-orange-600 transition">
                Ready? Sign up now!
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};