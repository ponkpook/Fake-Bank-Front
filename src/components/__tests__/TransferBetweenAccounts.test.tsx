import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { TransferBetweenAccounts } from "../TransferBetweenAccounts";
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

describe("TransferBetweenAccounts Component", () => {
  beforeEach(() => {
    // Mock window.alert
    jest.spyOn(window, "alert").mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  const renderComponent = () =>
    render(
      <MemoryRouter>
        <TransferBetweenAccounts accounts={mockAccounts} />
      </MemoryRouter>
    );

  test("Clicking the account dropdown button toggles the dropdown", async () => {
    renderComponent();
    const fromAccountDropdown = screen.getByTestId("select-account-from");
    fireEvent.click(fromAccountDropdown);
    await waitFor(() => {
      expect(
        screen.getByText("Account 1 (BSB: 123-456, Account: 12345678)")
      ).toBeInTheDocument();
    });
    fireEvent.click(fromAccountDropdown);

    await waitFor(() => {
      expect(
        screen.queryByText("Account 1 (BSB: 123-456, Account: 12345678)")
      ).not.toBeInTheDocument();
    });
  });

  test("Selecting an account from the dropdown updates selectedAccount", async () => {
    renderComponent();
    const fromAccountDropdown = screen.getByTestId("select-account-from");
    fireEvent.click(fromAccountDropdown);
    await waitFor(() => {
      fireEvent.click(
        screen.getByText("Account 1 (BSB: 123-456, Account: 12345678)")
      );
    });
    expect(screen.getByText("Account 1")).toBeInTheDocument();
  });

  test('Disable "Transfer to" dropdown without account selection', () => {
    renderComponent();
    const toAccountDropdown = screen.getByTestId("select-account-to");
    fireEvent.click(toAccountDropdown);
    expect(toAccountDropdown).toBeDisabled();
  });

  test("Enter Transfer Amount in valid format", async () => {
    renderComponent();
    const fromAccountDropdown = screen.getByTestId("select-account-from");
    fireEvent.click(fromAccountDropdown);
    await waitFor(() => {
      fireEvent.click(
        screen.getByText("Account 1 (BSB: 123-456, Account: 12345678)")
      );
    });

    const amountInput = screen.getByPlaceholderText("Enter amount");
    fireEvent.change(amountInput, { target: { value: "100.50" } });
    expect(amountInput).toHaveValue(100.5);
  });

  test('Clicking the "Confirm" button with incomplete fields shows an alert', async () => {
    renderComponent();

    // Select the "from" account
    const fromAccountDropdown = screen.getByTestId("select-account-from");
    fireEvent.click(fromAccountDropdown);
    await waitFor(() => {
      fireEvent.click(
        screen.getByText("Account 1 (BSB: 123-456, Account: 12345678)")
      );
    });

    // Enter the transfer amount
    const amountInput = screen.getByPlaceholderText("Enter amount");
    fireEvent.change(amountInput, { target: { value: "100.50" } });

    // Click the "Confirm" button
    const confirmButton = screen.getByText("Confirm");
    fireEvent.click(confirmButton);

    // Check if the alert was called
    expect(window.alert).toHaveBeenCalledWith("Please fill in all fields.");
  });

  test('Clicking the "Confirm" button with all fields filled shows the confirmation modal', async () => {
    renderComponent();

    const fromAccountDropdown = screen.getByTestId("select-account-from");
    fireEvent.click(fromAccountDropdown);
    await waitFor(() => {
      fireEvent.click(
        screen.getByText("Account 1 (BSB: 123-456, Account: 12345678)")
      );
    });

    // Select the "to" account
    const toAccountDropdown = screen.getByTestId("select-account-to");
    await waitFor(() => {
      fireEvent.click(toAccountDropdown);
    });
    await waitFor(() => {
      fireEvent.click(
        screen.getByText("Account 2 (BSB: 234-567, Account: 23456789)")
      );
    });

    // Enter the transfer amount
    const amountInput = screen.getByPlaceholderText("Enter amount");
    fireEvent.change(amountInput, { target: { value: "100.50" } });

    // Click the "Confirm" button
    const confirmButton = screen.getByText("Confirm");
    fireEvent.click(confirmButton);

    // Check if the confirmation modal appears
    await waitFor(() => {
      expect(screen.getByTestId("confirmation-modal")).toBeInTheDocument();
    });
  });
});
