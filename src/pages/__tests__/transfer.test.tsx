import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Transfer } from "../transfer";
import { BrowserRouter as Router } from "react-router-dom";

describe("Transfer Page", () => {
  beforeEach(() => {
    localStorage.setItem(
      "userID",
      JSON.stringify([
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
          accNo: "1234 5678",
          image: "/assets/number2.png",
          balance: "$1000.00",
        },
      ])
    );
  });

  afterEach(() => {
    localStorage.clear();
  });

  test("renders Transfer Between Own Accounts component", () => {
    render(
      <Router>
        <Transfer />
      </Router>
    );

    const button = screen.getByText("Transfer Between Own Accounts");
    fireEvent.click(button);

    expect(screen.getByText("Select your account:")).toBeInTheDocument();
  });

  test("renders Pay to Others component", () => {
    render(
      <Router>
        <Transfer />
      </Router>
    );

    const button = screen.getByText("Pay to Others");
    fireEvent.click(button);

    expect(screen.getByText("Pay someone new?")).toBeInTheDocument();
  });

  test("renders BPay component", () => {
    render(
      <Router>
        <Transfer />
      </Router>
    );

    const button = screen.getByText("BPay");
    fireEvent.click(button);

    expect(screen.getByText("Biller Name:")).toBeInTheDocument();
  });

  test("renders Recurring Payments component", () => {
    render(
      <Router>
        <Transfer />
      </Router>
    );

    const button = screen.getByText("Recurring Payments");
    fireEvent.click(button);

    expect(screen.getByText("Frequency:")).toBeInTheDocument();
  });
});
