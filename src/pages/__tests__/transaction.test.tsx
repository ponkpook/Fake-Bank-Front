import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { TransactionHistory } from "../transactionHistory";
import { BrowserRouter } from "react-router-dom";

import { transactionData } from "../transactionHistory"; // Import the actual transactionData

jest.mock("jspdf", () => ({
  __esModule: true,
  default: jest.fn(() => ({
    text: jest.fn(),
    autoTable: jest.fn(),
    save: jest.fn(),
  })),
}));

describe("TransactionHistory", () => {
  test("renders transaction history title", () => {
    render(
      <BrowserRouter>
        <TransactionHistory />
      </BrowserRouter>
    );
    expect(
      screen.getByText(/Transaction History - All Accounts/i)
    ).toBeInTheDocument();
  });

  test("renders correct number of transactions per page", () => {
    render(
      <BrowserRouter>
        <TransactionHistory />
      </BrowserRouter>
    );
    // Assert that the number of rows is no more than 9 (excluding the header row)
    const rows = screen.getAllByRole("row");
    const expectedRows = Math.min(transactionData.length, 8) + 1; // +1 for the header row
    expect(rows.length).toBe(expectedRows);
  });

  test("pagination changes page", () => {
    render(
      <BrowserRouter>
        <TransactionHistory />
      </BrowserRouter>
    );
    const nextPageButton = screen.getByRole("button", { name: "2" });
    fireEvent.click(nextPageButton);
    expect(screen.getByText(/Showing data 9 to/i)).toBeInTheDocument();
  });

  test("download PDF button exists", () => {
    render(
      <BrowserRouter>
        <TransactionHistory />
      </BrowserRouter>
    );
    expect(screen.getByText(/Download PDF/i)).toBeInTheDocument();
  });
});
