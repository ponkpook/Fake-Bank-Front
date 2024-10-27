import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BPay } from "../BPay";
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

describe("BPay Component", () => {
  beforeEach(() => {
    jest.spyOn(window, "alert").mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  const renderComponent = () =>
    render(
      <MemoryRouter>
        <BPay accounts={mockAccounts} />
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

    // Fill in biller details
    const billerNameInput = screen.getByPlaceholderText("Enter biller Name");
    fireEvent.change(billerNameInput, { target: { value: "Test Biller" } });

    const billerCodeInput = screen.getByPlaceholderText("Enter biller code");
    fireEvent.change(billerCodeInput, { target: { value: "123456" } });

    const referenceInput = screen.getByPlaceholderText("Enter reference No.");
    fireEvent.change(referenceInput, { target: { value: "REF001" } });

    // Enter amount
    const amountInput = screen.getByPlaceholderText("Enter amount");
    fireEvent.change(amountInput, { target: { value: "100.50" } });

    // Click confirm
    const confirmButton = screen.getByText("Confirm");
    fireEvent.click(confirmButton);

    // Check if confirmation modal appears
    await waitFor(() => {
      expect(screen.getByTestId("confirmation-modal")).toBeInTheDocument();
    });
  });

  test("Disable Biller Name Input etc. Without Account Selection", () => {
    renderComponent();
    const billerNameInput = screen.getByPlaceholderText("Enter biller Name");
    const billerCodeInput = screen.getByPlaceholderText("Enter biller code");
    const referenceInput = screen.getByPlaceholderText("Enter reference No.");
    const amountInput = screen.getByPlaceholderText("Enter amount");

    expect(billerNameInput).toBeDisabled();
    expect(billerCodeInput).toBeDisabled();
    expect(referenceInput).toBeDisabled();
    expect(amountInput).toBeDisabled();
  });

  test("Entering a biller name, biller code, ref num updates the state", async () => {
    renderComponent();
    // First, select an account
    const accountDropdown = screen.getByText("Select Account");
    fireEvent.click(accountDropdown);
    await waitFor(() => {
      fireEvent.click(
        screen.getByText("Account 1 (BSB: 123-456, Account: 12345678)")
      );
    });

    const billerNameInput = screen.getByPlaceholderText("Enter biller Name");
    fireEvent.change(billerNameInput, { target: { value: "Test Biller" } });

    const billerCodeInput = screen.getByPlaceholderText("Enter biller code");
    fireEvent.change(billerCodeInput, { target: { value: "123456" } });

    const referenceInput = screen.getByPlaceholderText("Enter reference No.");
    fireEvent.change(referenceInput, { target: { value: "REF001" } });

    expect(billerNameInput).toHaveValue("Test Biller");
    expect(billerCodeInput).toHaveValue("123456");
    expect(referenceInput).toHaveValue("REF001");
  });
});
