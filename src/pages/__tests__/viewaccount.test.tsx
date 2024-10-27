import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Viewaccount } from "../viewaccount";
import { BrowserRouter as Router } from "react-router-dom";
import axios from "axios";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

// Mock the ModalAccounts component (保持不变)
jest.mock("../../components/modal-accounts", () => ({
  ModalAccounts: ({
    accounts,
    onAddAccount,
    onTopUp,
  }: {
    accounts: { name: string; bsb: string; accNo: string; balance: string }[];
    onAddAccount: () => void;
    onTopUp: (index: number, amount: number) => void;
  }) => (
    <div data-testid="modal-accounts">
      <button onClick={onAddAccount}>Add Account</button>
      {accounts.map((account, index) => (
        <div key={index} data-testid={`account-${index}`}>
          <span data-testid={`account-${index}-name`}>{account.name}</span>
          <span>{account.bsb}</span>
          <span>{account.accNo}</span>
          <span data-testid={`account-${index}-balance`}>
            {account.balance}
          </span>
          <button onClick={() => onTopUp(index, 100)}>Top Up $100</button>
        </div>
      ))}
    </div>
  ),
}));

const renderWithRouter = (ui: React.ReactElement) => {
  return render(<Router>{ui}</Router>);
};

describe("Viewaccount", () => {
  beforeEach(() => {
    // Mock the initial API call for getting default accounts
    mockedAxios.get.mockResolvedValueOnce({
      data: [
        {
          accountName: "Everyday",
          BSB: "000-001",
          accountNumber: "1234567",
          balance: 100.0,
        },
        {
          accountName: "Savings",
          BSB: "000-002",
          accountNumber: "2345678",
          balance: 1000.0,
        },
      ],
    });
  });

  test("renders ModalAccounts with initial accounts", async () => {
    renderWithRouter(<Viewaccount />);

    await waitFor(() => {
      expect(screen.getByTestId("modal-accounts")).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByTestId("account-0-name")).toHaveTextContent(
        "Everyday"
      );
      expect(screen.getByTestId("account-1-name")).toHaveTextContent("Savings");
      expect(screen.getByTestId("account-0-balance")).toHaveTextContent("$100");
      expect(screen.getByTestId("account-1-balance")).toHaveTextContent(
        "$1000"
      );
    });
  });

  test("adds a new account when 'Add Account' button is clicked", async () => {
    mockedAxios.post.mockResolvedValueOnce({
      data: {
        accountName: "NetBank Saving 2",
        BSB: "000-003",
        accountNumber: "3456789",
        balance: 1000.0,
      },
    });

    renderWithRouter(<Viewaccount />);

    await waitFor(() => {
      expect(screen.getByTestId("modal-accounts")).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText("Add Account"));

    await waitFor(() => {
      expect(screen.getByTestId("account-2-name")).toHaveTextContent(
        "NetBank Saving 2"
      );
      expect(screen.getByTestId("account-2-balance")).toHaveTextContent(
        "$1000"
      );
    });
  });

  test("tops up account balance when 'Top Up $100' button is clicked", async () => {
    mockedAxios.patch.mockResolvedValueOnce({});

    renderWithRouter(<Viewaccount />);

    await waitFor(() => {
      expect(screen.getByTestId("modal-accounts")).toBeInTheDocument();
    });

    fireEvent.click(screen.getAllByText("Top Up $100")[0]);

    await waitFor(() => {
      expect(screen.getByTestId("account-0-balance")).toHaveTextContent("$200");
    });

    expect(mockedAxios.patch).toHaveBeenCalledWith(
      "http://localhost:3001/user/user1/deposit",
      null,
      expect.any(Object)
    );
  });

  test("limits the number of accounts to 5", async () => {
    // Mock initial API call with 5 accounts
    mockedAxios.get.mockReset();
    mockedAxios.get.mockResolvedValueOnce({
      data: Array(5)
        .fill(null)
        .map((_, index) => ({
          accountName: `Account ${index + 1}`,
          BSB: `000-00${index + 1}`,
          accountNumber: `${1234567 + index}`,
          balance: 100.0 * (index + 1),
        })),
    });

    renderWithRouter(<Viewaccount />);

    await waitFor(() => {
      expect(screen.getByTestId("modal-accounts")).toBeInTheDocument();
    });

    // Verify that 5 accounts are rendered
    for (let i = 0; i < 5; i++) {
      expect(screen.getByTestId(`account-${i}-name`)).toBeInTheDocument();
    }

    // Mock the API call for adding a new account
    mockedAxios.post.mockResolvedValueOnce({
      data: {
        accountName: "Extra Account",
        BSB: "000-006",
        accountNumber: "1234573",
        balance: 600.0,
      },
    });

    // Try to add a 6th account
    fireEvent.click(screen.getByText("Add Account"));

    // Wait for any potential updates
    await waitFor(() => {});

    // Verify that no 6th account is added
    expect(screen.queryByTestId("account-5-name")).not.toBeInTheDocument();
  });
});
