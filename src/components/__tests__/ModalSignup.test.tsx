import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { ModalSignup } from "../modal-signup";
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

describe("ModalSignup", () => {
  const renderComponent = () =>
    render(
      <BrowserRouter>
        <ModalSignup />
      </BrowserRouter>
    );

  // Unit tests
  test("renders signup form", () => {
    renderComponent();
    expect(screen.getByText("Create an account")).toBeInTheDocument();
    expect(screen.getByText("Enter your name")).toBeInTheDocument();
    expect(screen.getByText("Enter password")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Ready? Sign up now!" })
    ).toBeInTheDocument();
  });

  test("validates empty username and password", async () => {
    renderComponent();
    fireEvent.click(
      screen.getByRole("button", { name: "Ready? Sign up now!" })
    );

    await waitFor(() => {
      expect(screen.getByText("Username is required.")).toBeInTheDocument();
      expect(
        screen.queryByText("Password is required.")
      ).not.toBeInTheDocument();
    });
  });

  test("validates empty password when username is provided", async () => {
    renderComponent();
    fireEvent.change(screen.getByPlaceholderText("Enter your name"), {
      target: { value: "testuser" },
    });
    fireEvent.click(
      screen.getByRole("button", { name: "Ready? Sign up now!" })
    );

    await waitFor(() => {
      expect(
        screen.queryByText("Username is required.")
      ).not.toBeInTheDocument();
      expect(screen.getByText("Password is required.")).toBeInTheDocument();
    });
  });

  test("validates invalid password", async () => {
    renderComponent();
    fireEvent.change(screen.getByPlaceholderText("Enter your name"), {
      target: { value: "testuser" },
    });
    fireEvent.change(screen.getByPlaceholderText("Enter password"), {
      target: { value: "weak" },
    });
    fireEvent.click(
      screen.getByRole("button", { name: "Ready? Sign up now!" })
    );

    await waitFor(() => {
      expect(
        screen.getByText("Invalid password! Please try again.")
      ).toBeInTheDocument();
    });
  });

  // Integration tests
  test("handles successful signup", async () => {
    renderComponent();
    mockedAxios.post.mockResolvedValueOnce({ data: { success: true } });

    fireEvent.change(screen.getByPlaceholderText("Enter your name"), {
      target: { value: "newuser" },
    });
    fireEvent.change(screen.getByPlaceholderText("Enter password"), {
      target: { value: "StrongPassword123" },
    });
    fireEvent.click(
      screen.getByRole("button", { name: "Ready? Sign up now!" })
    );

    await waitFor(() => {
      expect(mockedAxios.post).toHaveBeenCalledWith(
        "http://localhost:3001/auth/register",
        {
          username: "newuser",
          password: "StrongPassword123",
        }
      );
    });

    await waitFor(() => {
      expect(mockedUseNavigate).toHaveBeenCalledWith("/accounts");
    });
  });
});
