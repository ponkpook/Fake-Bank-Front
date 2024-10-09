import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Admin } from "../admin";
import { ModalAdmin } from "../../components/modal-admin";
import axios from "axios";
import { BrowserRouter } from "react-router-dom";

jest.mock("axios");

const renderWithRouter = (ui: React.ReactElement, { route = "/" } = {}) => {
  window.history.pushState({}, "Test page", route);
  return render(ui, { wrapper: BrowserRouter });
};

describe("Admin Component", () => {
  // Unit tests
  it("renders without crashing", () => {
    renderWithRouter(<Admin />);
    expect(screen.getByText("Manage the user accounts")).toBeInTheDocument();
  });

  it("displays the ModalAdmin component when isAdmin is true", () => {
    renderWithRouter(<Admin />);
    expect(screen.getByText("Manage the user accounts")).toBeInTheDocument();
  });

  // Integration tests
  it("fetches and displays user data", async () => {
    const mockUsers = [
      { id: 1, username: "User 1", password: "Password1", date: "23/08/2024" },
      { id: 2, username: "User 2", password: "Password2", date: "24/08/2024" },
    ];

    (axios.get as jest.Mock).mockResolvedValue({ data: mockUsers });

    render(<ModalAdmin />);

    await waitFor(() => {
      expect(screen.getByText("User 1")).toBeInTheDocument();
      expect(screen.getByText("User 2")).toBeInTheDocument();
    });
  });

  it("deletes a user when delete button is clicked", async () => {
    const mockUsers = [
      {
        id: 1,
        username: "User 100",
        password: "Password1",
        date: "23/08/2024",
      },
      { id: 2, username: "User 2", password: "Password2", date: "24/08/2024" },
    ];

    (axios.get as jest.Mock).mockResolvedValue({ data: mockUsers });
    (axios.delete as jest.Mock).mockResolvedValue({ status: 200 });

    render(<ModalAdmin />);

    await waitFor(() => {
      expect(screen.getByText("User 1")).toBeInTheDocument();
    });

    const deleteButtons = screen.getAllByText("Delete");
    fireEvent.click(deleteButtons[0]);

    await waitFor(() => {
      expect(screen.queryByText("User 100")).not.toBeInTheDocument();
      expect(screen.getByText("User 2")).toBeInTheDocument();
    });
  });

  it("changes page when pagination buttons are clicked", async () => {
    const mockUsers = new Array(20).fill(null).map((_, index) => ({
      id: index + 1,
      username: `User ${index + 1}`,
      password: `Password${index + 1}`,
      date: "23/08/2024",
    }));

    (axios.get as jest.Mock).mockResolvedValue({ data: mockUsers });

    render(<ModalAdmin />);

    await waitFor(() => {
      expect(screen.getByText("User 1")).toBeInTheDocument();
    });

    // 改为更具体的查找分页按钮的方法，使用 `getByRole` 并通过 `name` 选择按钮
    const nextPageButton = screen.getByRole("button", { name: "2" });

    fireEvent.click(nextPageButton);

    await waitFor(() => {
      expect(screen.getByText("User 9")).toBeInTheDocument();
    });
    expect(screen.queryByText("User 1")).not.toBeInTheDocument();
  });
});
