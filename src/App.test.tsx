import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom"; // 使用 MemoryRouter 来控制路径
import { App } from "./App";

test("renders homepage by default", () => {
  render(
    <MemoryRouter initialEntries={["/"]}>
      {" "}
      {/* 明确指定路径为 "/" */}
      <App />
    </MemoryRouter>
  );
  expect(
    screen.getByText("Benefits of Fake-Bank Internet Banking")
  ).toBeInTheDocument(); // 测试首页内容
});

test("renders Login page on /login route", () => {
  render(
    <MemoryRouter initialEntries={["/login"]}>
      {" "}
      {/* 模拟 "/login" 路径 */}
      <App />
    </MemoryRouter>
  );
  expect(screen.getByText("Log in")).toBeInTheDocument(); // 测试登录页面
});

test("renders Signup page on /signup route", () => {
  render(
    <MemoryRouter initialEntries={["/signup"]}>
      <App />
    </MemoryRouter>
  );
  expect(screen.getByText("Ready? Sign up now!")).toBeInTheDocument();
});

test("renders Transfer page on /transfer route", () => {
  render(
    <MemoryRouter initialEntries={["/transfer"]}>
      <App />
    </MemoryRouter>
  );
  expect(screen.getByText("Select your account:")).toBeInTheDocument();
});

test("renders Transaction page on /transaction route", () => {
  render(
    <MemoryRouter initialEntries={["/transaction"]}>
      <App />
    </MemoryRouter>
  );
  expect(screen.getByText("Transaction History")).toBeInTheDocument();
});
