import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import GreetingSection from "./GreetingSection";
import { validateCredentials } from "./ValidateInfo";

const usersData = new Array(256).fill(null).map((_, index) => ({
  id: index + 1,
  username: `User ${index + 1}`,
  password: `Password${index + 1}`,
  date: "23/08/2024",
}));

export const ModalAdmin = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 8;

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = usersData.slice(indexOfFirstUser, indexOfLastUser);

  // total page count
  const totalPages = Math.ceil(usersData.length / usersPerPage);

  const renderPageNumbers = () => {
    const pageNumbers = [];

    pageNumbers.push(
      <button
        key={1}
        onClick={() => setCurrentPage(1)}
        className={`px-3 py-1 rounded ${
          currentPage === 1 ? "bg-blue-500 text-white" : "bg-gray-200"
        }`}
      >
        1
      </button>
    );

    if (currentPage > 3) {
      pageNumbers.push(<span key="left-ellipsis">...</span>);
    }

    if (currentPage > 2) {
      pageNumbers.push(
        <button
          key={currentPage - 1}
          onClick={() => setCurrentPage(currentPage - 1)}
          className={`px-3 py-1 rounded bg-gray-200`}
        >
          {currentPage - 1}
        </button>
      );
    }

    if (currentPage !== 1 && currentPage !== totalPages) {
      pageNumbers.push(
        <button
          key={currentPage}
          onClick={() => setCurrentPage(currentPage)}
          className="px-3 py-1 rounded bg-blue-500 text-white"
        >
          {currentPage}
        </button>
      );
    }

    if (currentPage < totalPages - 1) {
      pageNumbers.push(
        <button
          key={currentPage + 1}
          onClick={() => setCurrentPage(currentPage + 1)}
          className={`px-3 py-1 rounded bg-gray-200`}
        >
          {currentPage + 1}
        </button>
      );
    }

    if (currentPage < totalPages - 2) {
      pageNumbers.push(<span key="right-ellipsis">...</span>);
    }

    pageNumbers.push(
      <button
        key={totalPages}
        onClick={() => setCurrentPage(totalPages)}
        className={`px-3 py-1 rounded ${
          currentPage === totalPages ? "bg-blue-500 text-white" : "bg-gray-200"
        }`}
      >
        {totalPages}
      </button>
    );

    return pageNumbers;
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">All User</h1>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
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
              <tr key={index} className="bg-white border-b hover:bg-gray-50">
                <td className="w-1/5 py-3 text-center">{user.id}</td>
                <td className="w-1/5 py-3 text-center">{user.username}</td>
                <td className="w-1/5 py-3 text-center">{user.password}</td>
                <td className="w-1/5 py-3 text-center">{user.date}</td>
                <td className="flex py-3 justify-center">
                  <button className="border border-solid border-native-red bg-native-red/40 text-native-red px-3 py-2 rounded-m">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center mt-4">
        <span className="text-sm text-gray-600">
          Showing data {indexOfFirstUser + 1} to {indexOfLastUser} of{" "}
          {usersData.length} entries
        </span>
        <div className="inline-flex space-x-1">{renderPageNumbers()}</div>
      </div>
    </div>
  );
};
