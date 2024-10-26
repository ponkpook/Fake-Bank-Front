import React, { useState, useEffect } from "react";
import axios from "axios";
import { User, UserDisplay } from "../type";
import GreetingSection from "./GreetingSection";
import { validateCredentials } from "./ValidateInfo";
import config from "../config";

const fetchUserData = async (): Promise<UserDisplay[]> => {
  const response = await axios.get<User[]>(`${config.API_BASE_URL}/user`);
  return response.data
    .filter((user) => user.isAdmin === false)
    .map((user, index) => ({
      id: index + 1,
      username: user.username,
      password: user.password,
      date: String(user.date),
    }));
};

export const ModalAdmin = () => {
  const [usersData, setUsersData] = useState<UserDisplay[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 8;

  useEffect(() => {
    fetchUserData().then((data) => setUsersData(data));
  }, []);

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = usersData.slice(indexOfFirstUser, indexOfLastUser);

  // total page count
  const totalPages = Math.ceil(usersData.length / usersPerPage);

  const deleteUser = async (username: string) => {
    try {
      const prevUsers = [...usersData];
      // Make API request to delete the user from the backend
      await axios.delete(`${config.API_BASE_URL}/users/${username}`);
      // Filter out the deleted user from the local state
      setUsersData((prevUsers) =>
        prevUsers.filter((user) => user.username !== username)
      );
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const buttonClass = "px-3 py-1 rounded";

    // If there's only one page, render just one button
    if (totalPages === 1) {
      return (
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
    }

    // Otherwise, render the full pagination logic
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
          currentPage === totalPages
            ? "bg-teal-green text-white"
            : "bg-gray-200"
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
              <th className="w-1/5 py-3 text-center">
                Remaining Date on account
              </th>
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
                <td className="w-1/5 py-3 text-center">
                  <button
                    className="border border-solid border-native-red bg-native-red/40 text-native-red px-3 py-2 rounded-m"
                    onClick={() => deleteUser(user.username)}
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
          Showing data {indexOfFirstUser + 1} to {indexOfLastUser} of{" "}
          {usersData.length} entries
        </span>
        <div className="inline-flex space-x-1">{renderPageNumbers()}</div>
      </div>
    </div>
  );
};

export default ModalAdmin;
