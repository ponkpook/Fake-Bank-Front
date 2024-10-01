import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { TransactionSelect } from "../transactionSelect";
import { BrowserRouter } from "react-router-dom";
import React from "react";
import { IAccount } from "../../type";

// Mock the useNavigate hook
const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

const mockAccounts: IAccount[] = [
  {
    name: "Everyday Account",
    bsb: "010-010",
    accNo: "1234 5678",
    image: "/assets/number1.png",
    balance: "$100.00",
  },
  {
    name: "NetBank Saving",
    bsb: "010-010",
    accNo: "1234 5679",
    image: "/assets/number2.png",
    balance: "$1000.00",
  },
  {
    name: "Saving2",
    bsb: "010-010",
    accNo: "1234 5680",
    image: "/assets/number3.png",
    balance: "$500.00",
  },
]; // 模拟的 accounts 列表

jest.mock("jspdf", () => ({
  __esModule: true,
  default: jest.fn(() => ({
    text: jest.fn(),
    save: jest.fn(),
  })),
}));

jest.mock("jspdf-autotable");

describe("TransactionSelect", () => {
  test("renders account selection dropdown", () => {
    render(
      <BrowserRouter>
        <TransactionSelect accounts={mockAccounts} /> {/* 传递 accounts 属性 */}
      </BrowserRouter>
    );
    expect(screen.getByText(/Select your account/i)).toBeInTheDocument();
    // Simulate clicking the dropdown
    fireEvent.click(screen.getByText(/Select Account/i));

    // Verify that all accounts in mockAccounts are displayed in the dropdown
    mockAccounts.forEach((account) => {
      expect(
        screen.getByText(new RegExp(account.name, "i"))
      ).toBeInTheDocument();
    });
  });

  test("selects an account and navigates to transaction history", async () => {
    render(
      <BrowserRouter>
        <TransactionSelect accounts={mockAccounts} /> {/* 传递 accounts 属性 */}
      </BrowserRouter>
    );

    // Open dropdown
    fireEvent.click(screen.getByText(/Select Account/i));

    // Select an account
    fireEvent.click(screen.getByText(/Everyday Account/i));

    // Click show button
    fireEvent.click(screen.getByText(/Show/i));

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith("/transaction-history", {
        state: { selectedAccount: "Everyday Account" },
      });
    });
  });
});
