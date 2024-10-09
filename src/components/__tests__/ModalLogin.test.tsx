import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { ModalLogin } from "../modal-login";
import axios from "axios";
import { BrowserRouter } from "react-router-dom";

// Mock axios
jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

// Mock useNavigate
const mockedUseNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedUseNavigate,
}));

describe("ModalLogin", () => {
  const renderComponent = () =>
    render(
      <BrowserRouter>
        <ModalLogin />
      </BrowserRouter>
    );

  test("renders login form", () => {
    renderComponent();
    expect(screen.getByText("Hello Again!")).toBeInTheDocument();
    expect(screen.getByText("Enter your name")).toBeInTheDocument();
    expect(screen.getByText("Enter password")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Log in" })).toBeInTheDocument();
  });

  test("validates empty fields", async () => {
    renderComponent();
    fireEvent.click(screen.getByRole("button", { name: "Log in" }));

    await waitFor(() => {
      expect(screen.getByText("Username is required.")).toBeInTheDocument();
    });
  });

  test("handles login failure", async () => {
    renderComponent();
    mockedAxios.post.mockRejectedValueOnce(new Error("Login failed"));

    const usernameInput = screen.getByTestId("username-input");
    const passwordInput = screen.getByTestId("password-input");
    fireEvent.change(usernameInput, {
      target: { value: "testuser" },
    });
    fireEvent.change(passwordInput, {
      target: { value: "wrongpassword" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Log in" }));

    // Check for the error message
    await waitFor(() => {
      expect(
        screen.getByText(/Invalid password! Please try again./i)
      ).toBeInTheDocument();
    });
  });
});
