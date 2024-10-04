import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { RecurringPayments } from "../RecurringPayments";
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

describe("RecurringPayments Component", () => {
  beforeEach(() => {
    jest.spyOn(window, "alert").mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  const renderComponent = () =>
    render(
      <MemoryRouter>
        <RecurringPayments accounts={mockAccounts} />
      </MemoryRouter>
    );

  test("Clicking the account dropdown button toggles the dropdown", async () => {
    renderComponent();
    const accountDropdown = screen.getByText("Select Account");
    fireEvent.click(accountDropdown);
    await screen.findByText("Account 1 (BSB: 123-456, Account: 12345678)");
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
    const account1Option = await screen.findByText(
      "Account 1 (BSB: 123-456, Account: 12345678)"
    );
    fireEvent.click(account1Option);
    expect(screen.getByText("Account 1")).toBeInTheDocument();
  });

  test('Disable "Transfer to" dropdown without account selection', () => {
    renderComponent();
    const transferToDropdown = screen.getByText("Select Existing Payee");
    expect(transferToDropdown).toBeDisabled();
  });

  test('Clicking the "Transfer to" dropdown toggles the dropdown', async () => {
    renderComponent();
    const accountDropdown = screen.getByText("Select Account");
    fireEvent.click(accountDropdown);
    const account1Option = await screen.findByText(
      "Account 1 (BSB: 123-456, Account: 12345678)"
    );
    fireEvent.click(account1Option);

    const transferToDropdown = screen.getByText("Select Existing Payee");
    fireEvent.click(transferToDropdown);
    await screen.findByText("Payee1");
    fireEvent.click(transferToDropdown);
    await waitFor(() => {
      expect(screen.queryByText("Payee1")).not.toBeInTheDocument();
    });
  });

  test("Enter Transfer Amount", async () => {
    renderComponent();
    const accountDropdown = screen.getByText("Select Account");
    fireEvent.click(accountDropdown);
    const account1Option = await screen.findByText(
      "Account 1 (BSB: 123-456, Account: 12345678)"
    );
    fireEvent.click(account1Option);

    const amountInput = screen.getByPlaceholderText("Enter amount");
    fireEvent.change(amountInput, { target: { value: "100.50" } });
    expect(amountInput).toHaveValue(100.5);
  });

  test('Clicking the "Confirm" button with all fields filled shows the confirmation modal', async () => {
    renderComponent();
    const accountDropdown = screen.getByText("Select Account");
    fireEvent.click(accountDropdown);
    const account1Option = await screen.findByText(
      "Account 1 (BSB: 123-456, Account: 12345678)"
    );
    fireEvent.click(account1Option);

    const transferToDropdown = screen.getByText("Select Existing Payee");
    fireEvent.click(transferToDropdown);
    const payee1Option = await screen.findByText("Payee1");
    fireEvent.click(payee1Option);

    const amountInput = screen.getByPlaceholderText("Enter amount");
    fireEvent.change(amountInput, { target: { value: "100.50" } });

    const startDateInput = screen.getByPlaceholderText("Select start date");
    fireEvent.change(startDateInput, { target: { value: "2023-05-01" } });

    const endDateInput = screen.getByPlaceholderText("Select end date");
    fireEvent.change(endDateInput, { target: { value: "2023-12-31" } });

    const frequencyDropdown = screen.getByText("Select Recurring Frequency");
    fireEvent.click(frequencyDropdown);
    const weeklyOption = await screen.findByText("Every week");
    fireEvent.click(weeklyOption);

    const confirmButton = screen.getByText("Confirm");
    fireEvent.click(confirmButton);

    await screen.findByTestId("confirmation-modal");
  });

  test('Selecting a payee from the "Transfer to" dropdown updates the selectedTransferTo state', async () => {
    renderComponent();
    const accountDropdown = screen.getByText("Select Account");
    fireEvent.click(accountDropdown);
    const account1Option = await screen.findByText(
      "Account 1 (BSB: 123-456, Account: 12345678)"
    );
    fireEvent.click(account1Option);

    const transferToDropdown = screen.getByText("Select Existing Payee");
    fireEvent.click(transferToDropdown);
    const payee1Option = await screen.findByText("Payee1");
    fireEvent.click(payee1Option);

    expect(screen.getByText("Payee1")).toBeInTheDocument();
  });

  test('Clicking "Pay someone new?" toggles the visibility of the new payee popup', async () => {
    renderComponent();
    const accountDropdown = screen.getByText("Select Account");
    fireEvent.click(accountDropdown);
    const account1Option = await screen.findByText(
      "Account 1 (BSB: 123-456, Account: 12345678)"
    );
    fireEvent.click(account1Option);

    const newPayeeButton = screen.getByText("Pay someone new?");
    fireEvent.click(newPayeeButton);

    await screen.findByText("Enter New Payee Information");

    const closeButton = screen.getByText("×");
    fireEvent.click(closeButton);

    await waitFor(() => {
      expect(
        screen.queryByText("Enter New Payee Information")
      ).not.toBeInTheDocument();
    });
  });

  test("Enter Dates (Start Date and End Date)", async () => {
    renderComponent();
    const accountDropdown = screen.getByText("Select Account");
    fireEvent.click(accountDropdown);
    const account1Option = await screen.findByText(
      "Account 1 (BSB: 123-456, Account: 12345678)"
    );
    fireEvent.click(account1Option);

    const startDateInput = screen.getByPlaceholderText("Select start date");
    fireEvent.change(startDateInput, { target: { value: "01/05/2023" } });

    const endDateInput = screen.getByPlaceholderText("Select end date");
    fireEvent.change(endDateInput, { target: { value: "31/12/2023" } });

    expect(startDateInput).toHaveValue("01/05/2023");
    expect(endDateInput).toHaveValue("31/12/2023");
  });

  test("Select Recurring Frequency", async () => {
    renderComponent();
    const accountDropdown = screen.getByText("Select Account");
    fireEvent.click(accountDropdown);
    const account1Option = await screen.findByText(
      "Account 1 (BSB: 123-456, Account: 12345678)"
    );
    fireEvent.click(account1Option);

    const frequencyDropdown = screen.getByText("Select Recurring Frequency");
    fireEvent.click(frequencyDropdown);
    const weeklyOption = await screen.findByText("Every week");
    fireEvent.click(weeklyOption);

    // Use a more specific query to avoid ambiguity
    expect(
      screen.getByText("Every week", {
        selector: "button.w-full.text-left.text-black",
      })
    ).toBeInTheDocument();
  });
});
