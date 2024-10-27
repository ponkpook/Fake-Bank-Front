import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { TransferToOthers } from "../TransferToOthers";
import { MemoryRouter } from "react-router-dom";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => jest.fn(),
}));

const mockAccounts = [
  {
    name: "Account 1",
    bsb: "123-456",
    accNo: "12345678",
    image: "account1.png",
    balance: "1000",
  },
  {
    name: "Account 2",
    bsb: "234-567",
    accNo: "23456789",
    image: "account2.png",
    balance: "2000",
  },
];

describe("TransferToOthers Component", () => {
  beforeEach(() => {
    jest.spyOn(window, "alert").mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  const renderComponent = () =>
    render(
      <MemoryRouter>
        <TransferToOthers accounts={mockAccounts} />
      </MemoryRouter>
    );

  test("Clicking the account dropdown button toggles the dropdown", async () => {
    renderComponent();
    const accountDropdown = screen.getByText("Select Account");
    fireEvent.click(accountDropdown);
    await waitFor(() => {
      expect(
        screen.getByText("Account 1 (BSB: 123-456, Account: 12345678)")
      ).toBeInTheDocument();
    });
    fireEvent.click(accountDropdown);
    await waitFor(() => {
      expect(
        screen.queryByText("Account 1 (BSB: 123-456, Account: 12345678)")
      ).not.toBeInTheDocument();
    });
  });

  test("Selecting an account from the dropdown updates selectedAccount", async () => {
    renderComponent();
    const accountDropdown = screen.getByText("Select Account");
    fireEvent.click(accountDropdown);
    await waitFor(() => {
      fireEvent.click(
        screen.getByText("Account 1 (BSB: 123-456, Account: 12345678)")
      );
    });
    expect(screen.getByText("Account 1")).toBeInTheDocument();
  });

  test('Disable "Transfer to" dropdown without account selection', () => {
    renderComponent();
    const transferToDropdown = screen.getByText("Select Existing Payee");
    expect(transferToDropdown).toBeDisabled();
  });

  test('Clicking the "Transfer to" dropdown toggles the dropdown', async () => {
    renderComponent();
    // First, select an account
    const accountDropdown = screen.getByText("Select Account");
    fireEvent.click(accountDropdown);
    await waitFor(() => {
      fireEvent.click(
        screen.getByText("Account 1 (BSB: 123-456, Account: 12345678)")
      );
    });

    const transferToDropdown = screen.getByText("Select Existing Payee");
    fireEvent.click(transferToDropdown);
    await waitFor(() => {
      expect(screen.getByText("Payee1")).toBeInTheDocument();
    });
    fireEvent.click(transferToDropdown);
    await waitFor(() => {
      expect(screen.queryByText("Payee1")).not.toBeInTheDocument();
    });
  });

  test("Enter Transfer Amount", async () => {
    renderComponent();
    // First, select an account
    const accountDropdown = screen.getByText("Select Account");
    fireEvent.click(accountDropdown);
    await waitFor(() => {
      fireEvent.click(
        screen.getByText("Account 1 (BSB: 123-456, Account: 12345678)")
      );
    });

    const amountInput = screen.getByPlaceholderText("Enter amount");
    fireEvent.change(amountInput, { target: { value: "100.50" } });
    expect(amountInput).toHaveValue(100.5);
  });

  test('Clicking the "Confirm" button with all fields filled shows the confirmation modal', async () => {
    renderComponent();
    // Select an account
    const accountDropdown = screen.getByText("Select Account");
    fireEvent.click(accountDropdown);
    await waitFor(() => {
      fireEvent.click(
        screen.getByText("Account 1 (BSB: 123-456, Account: 12345678)")
      );
    });

    // Select a payee
    const transferToDropdown = screen.getByText("Select Existing Payee");
    fireEvent.click(transferToDropdown);
    await waitFor(() => {
      fireEvent.click(screen.getByText("Payee1"));
    });

    // Enter amount
    const amountInput = screen.getByPlaceholderText("Enter amount");
    fireEvent.change(amountInput, { target: { value: "100.50" } });

    // Click confirm
    const confirmButton = screen.getByText("Confirm payment");
    fireEvent.click(confirmButton);

    // Check if confirmation modal appears
    await waitFor(() => {
      expect(screen.getByTestId("confirmation-modal")).toBeInTheDocument();
    });
  });

  test("Selecting a payee from the 'Transfer to' dropdown updates the selectedTransferTo state", async () => {
    renderComponent();
    // First, select an account
    const accountDropdown = screen.getByText("Select Account");
    fireEvent.click(accountDropdown);
    await waitFor(() => {
      fireEvent.click(
        screen.getByText("Account 1 (BSB: 123-456, Account: 12345678)")
      );
    });

    const transferToDropdown = screen.getByText("Select Existing Payee");
    fireEvent.click(transferToDropdown);
    await waitFor(() => {
      fireEvent.click(screen.getByText("Payee1"));
    });
    expect(screen.getByText("Payee1")).toBeInTheDocument();
  });

  test('Clicking "Pay someone new?" toggles the visibility of the new payee popup', async () => {
    renderComponent();
    // First, select an account
    const accountDropdown = screen.getByText("Select Account");
    fireEvent.click(accountDropdown);
    await waitFor(() => {
      fireEvent.click(
        screen.getByText("Account 1 (BSB: 123-456, Account: 12345678)")
      );
    });

    const newPayeeButton = screen.getByText("Pay someone new?");
    fireEvent.click(newPayeeButton);
    await waitFor(() => {
      expect(
        screen.getByText("Enter New Payee Information")
      ).toBeInTheDocument();
    });

    // Close the popup
    const closeButton = screen.getByText("×");
    fireEvent.click(closeButton);
    await waitFor(() => {
      expect(
        screen.queryByText("Enter New Payee Information")
      ).not.toBeInTheDocument();
    });
  });
});
