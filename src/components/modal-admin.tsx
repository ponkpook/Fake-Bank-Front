import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import GreetingSection from "./GreetingSection";
import { validateCredentials } from "./ValidateInfo";

export const ModalAdmin = () => {
  const [users, setUsers] = useState(
    new Array(256).fill(null).map((_, index) => ({
      id: index + 1,
      username: `User ${index + 1}`,
      password: `Password${index + 1}`,
      date: "23/08/2024",
    }))
  );

  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 8;

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  // total page count
  const totalPages = Math.ceil(users.length / usersPerPage);

  const deleteUser = async (id: number) => {
    try {
      // Make API request to delete the user from the backend
      await fetch(`/api/users/${id}`, {
        method: "DELETE",
      });

      // Filter out the deleted user from the local state
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const buttonClass = "px-3 py-1 rounded";

    // First Page Button
    pageNumbers.push(
      <button
        key={1}
        onClick={() => setCurrentPage(1)}
        className={`${buttonClass} ${
          currentPage === 1 ? "bg-teal-green text-white" : "bg-gray-200"
        }`}
      >
        1
      </button>
    );

    // Ellipsis and previous pages
    if (currentPage > 3) pageNumbers.push(<span key="left-ellipsis">...</span>);

    if (currentPage > 2)
      pageNumbers.push(
        <button
          key={currentPage - 1}
          onClick={() => setCurrentPage(currentPage - 1)}
          className={`${buttonClass} bg-gray-200`}
        >
          {currentPage - 1}
        </button>
      );

    // Current Page Button
    if (currentPage !== 1 && currentPage !== totalPages) {
      pageNumbers.push(
        <button
          key={currentPage}
          onClick={() => setCurrentPage(currentPage)}
          className={`${buttonClass} bg-teal-green text-white`}
        >
          {currentPage}
        </button>
      );
    }

    // Next pages and ellipsis
    if (currentPage < totalPages - 1)
      pageNumbers.push(
        <button
          key={currentPage + 1}
          onClick={() => setCurrentPage(currentPage + 1)}
          className={`${buttonClass} bg-gray-200`}
        >
          {currentPage + 1}
        </button>
      );

    if (currentPage < totalPages - 2)
      pageNumbers.push(<span key="right-ellipsis">...</span>);

    // Last Page Button
    pageNumbers.push(
      <button
        key={totalPages}
        onClick={() => setCurrentPage(totalPages)}
        className={`${buttonClass} ${
          currentPage === totalPages ? "bg-teal-green text-white" : "bg-gray-200"
        }`}
      >
        {totalPages}
      </button>
    );

    return pageNumbers;
  };

  return (
    <div className="container mx-auto p-6">
      <h5 className="font-prosto mt-2">Manage the user accounts</h5>
      <div className="flex flex-col md:flex-row mx-auto bg-native-milk shadow-lg my-4 min-h-[80vh]">
        <table className="w-full text-sm text-left text-gray-600 font-prosto">
          <thead className="text-xs text-gray-700 font-prosto uppercase shadow-md">
            <tr>
              <th className="w-1/5 py-3 text-center">ID</th>
              <th className="w-1/5 py-3 text-center">Username</th>
              <th className="w-1/5 py-3 text-center">Password</th>
              <th className="w-1/5 py-3 text-center">Account Creation Date</th>
              <th className="w-1/5 py-3 text-center">Delete</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.map((user, index) => (
              <tr key={index} className="border-b hover:shadow-lg ">
                <td className="w-1/5 py-3 text-center">{user.id}</td>
                <td className="w-1/5 py-3 text-center">{user.username}</td>
                <td className="w-1/5 py-3 text-center">{user.password}</td>
                <td className="w-1/5 py-3 text-center">{user.date}</td>
                <td className="flex py-3 justify-center">
                  <button
                    className=" border-2 border-solid border-red-200 shadow-md text-gray-700 px-3 py-2 rounded-m duration-200 bg-native-red/50 hover:bg-native-red/90"
                    onClick={() => deleteUser(user.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center mt-4">
        <span className="text-sm text-gray-700 font-prosto">
          Showing data {indexOfFirstUser + 1} to {indexOfLastUser} of {users.length} entries
        </span>
        <div className="inline-flex space-x-1">{renderPageNumbers()}</div>
      </div>
    </div>
  );
};
