import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { ModalAccounts } from "../modal-accounts";
import { IAccount } from "../../type";

// Mock the child components
jest.mock("../AnimatedCounter", () => () => (
  <div data-testid="animated-counter">Mocked AnimatedCounter</div>
));
jest.mock("../BalanceChart", () => () => (
  <div data-testid="balance-chart">Mocked BalanceChart</div>
));
jest.mock("../totalBalanceBox", () => () => (
  <div data-testid="total-balance-box">Mocked TotalBalanceBox</div>
));

describe("ModalAccounts", () => {
  const mockAccounts: IAccount[] = [
    {
      name: "Account 1",
      bsb: "123-456",
      accNo: "12345678",
      image: "account1.png",
      balance: "$1000.00",
    },
    {
      name: "Account 2",
      bsb: "234-567",
      accNo: "23456789",
      image: "account2.png",
      balance: "$2000.00",
    },
  ];

  const mockOnAddAccount = jest.fn();
  const mockOnTopUp = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders with default accounts", () => {
    render(
      <ModalAccounts
        accounts={mockAccounts}
        onAddAccount={mockOnAddAccount}
        onTopUp={mockOnTopUp}
      />
    );

    expect(screen.getByText("Account 1")).toBeInTheDocument();
    expect(screen.getByText("Account 2")).toBeInTheDocument();
    expect(screen.getAllByText("Top Up $100")).toHaveLength(2);
  });

  test('calls onAddAccount when "Add One More Saving Account" button is clicked', () => {
    render(
      <ModalAccounts
        accounts={mockAccounts}
        onAddAccount={mockOnAddAccount}
        onTopUp={mockOnTopUp}
      />
    );

    const addAccountButton = screen.getByText("Add One More Saving Account");
    fireEvent.click(addAccountButton);

    expect(mockOnAddAccount).toHaveBeenCalledTimes(1);
  });

  test('calls onTopUp with correct parameters when "Top Up $100" button is clicked', () => {
    render(
      <ModalAccounts
        accounts={mockAccounts}
        onAddAccount={mockOnAddAccount}
        onTopUp={mockOnTopUp}
      />
    );

    const topUpButtons = screen.getAllByText("Top Up $100");
    fireEvent.click(topUpButtons[0]);

    expect(mockOnTopUp).toHaveBeenCalledWith(0, 100);
  });

  test("displays correct number of accounts", () => {
    render(
      <ModalAccounts
        accounts={mockAccounts}
        onAddAccount={mockOnAddAccount}
        onTopUp={mockOnTopUp}
      />
    );

    const accountElements = screen.getAllByText(/Account \d/);
    expect(accountElements).toHaveLength(2);
  });

  test("displays total number of accounts correctly", () => {
    render(
      <ModalAccounts
        accounts={mockAccounts}
        onAddAccount={mockOnAddAccount}
        onTopUp={mockOnTopUp}
      />
    );

    expect(
      screen.getByText(`Bank Accounts: ${mockAccounts.length}`)
    ).toBeInTheDocument();
  });

  test("renders AnimatedCounter component", () => {
    render(
      <ModalAccounts
        accounts={mockAccounts}
        onAddAccount={mockOnAddAccount}
        onTopUp={mockOnTopUp}
      />
    );

    expect(screen.getByTestId("animated-counter")).toBeInTheDocument();
  });

  test("renders BalanceChart component", () => {
    render(
      <ModalAccounts
        accounts={mockAccounts}
        onAddAccount={mockOnAddAccount}
        onTopUp={mockOnTopUp}
      />
    );

    expect(screen.getByTestId("balance-chart")).toBeInTheDocument();
  });

  test("renders TotalBalanceBox component for mobile view", () => {
    render(
      <ModalAccounts
        accounts={mockAccounts}
        onAddAccount={mockOnAddAccount}
        onTopUp={mockOnTopUp}
      />
    );

    expect(screen.getByTestId("total-balance-box")).toBeInTheDocument();
  });
});
