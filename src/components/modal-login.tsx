import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom"; // 引入 useNavigate
import axios from "axios";

export const ModalLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // 使用 useNavigate 钩子

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    axios
      .post("http://localhost:3001/auth/login", { username, password })
      .then((response) => {
        console.log(response);
        if (response.data.data.success) {
          console.log("Login successful:", response.data);
          navigate("/accounts");
        } else {
          console.log("Invalid username or password");
        }
      })
      .catch((error) => {
        console.error("Error logging in:", error);
      });
  };

  return (
    <div className="flex flex-row w-[90%] rounded-m mx-auto bg-native-milk shadow-lg">
      <div className="flex w-[40%] bg-light-green justify-center gap-space-10 flex-col rounded-l-m min-h-[800px]">
        <div className="pb-space-10 flex justify-center">
          <img
            src="./assets/person-icon.png"
            alt="person=icon"
            className="w-[155px] h-[155px]"
          />
        </div>
        <div className="flex flex-col justify-center">
          <p className="flex justify-center font-prosto text-xxl font-bold">
            Welcome Back!
          </p>
          <div className="flex justify-center pt-space-10">
            <p className="flex text-center font-poppins font-[200] text-l max-w-[350px]">
              Your money is safe with us! Don’t worry it should take a couple of
              minutes.
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-[1] flex-col rounded-l-m pt-[120px]">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-space-10 w-[70%] mx-auto"
        >
          <div className="p-space-10 flex justify-center">
            <p className="flex justify-center font-prosto text-xxl font-bold">
              Hello Again!{" "}
            </p>
          </div>
          <div className="flex flex-col gap-space-10 w-[70%] mx-auto">
            <div className="flex flex-col gap-space-3">
              <p className="flex text-start font-poppins font-[200] text-l">
                Enter your name
              </p>
              <input
                type="text"
                value={username}
                onChange={handleUsernameChange}
                className="w-full rounded-s h-[35px] border-none focus:outline-none pl-space-4 "
              />
            </div>
            <div className="flex flex-col gap-space-3">
              <p className="flex text-start font-poppins font-[200] text-l">
                Enter password
              </p>
              <input
                className="w-full rounded-s h-[35px] border-none focus:outline-none pl-space-4 "
                type="password"
                value={password}
                onChange={handlePasswordChange}
              />
              <p className="font-poppins text-s text-black/50 text-center pt-space-2">
                Please create a password that is at least 8 characters long and
                includes a mix of uppercase and lowercase letters for added
                security
              </p>
            </div>
            <div className="flex justify-between flex-row pt-space-5">
              <button className="bg-native-red rounded-full text-black font-poppins font-light px-[70px] py-space-4 shadow-lg hover:bg-orange-600 transition">
                Log in
              </button>
              <div className="flex flex-col gap-space-3 pt-space-2">
                <Link to="/" className="font-poppins text-s">
                  Forget password?
                </Link>
                <div className="flex gap-space-1">
                  <span className="font-poppins text-s">New to Fake Bank?</span>
                  <Link to="/signup" className="font-poppins text-s">
                    Register now!
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
