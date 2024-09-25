import React, { useEffect, useState } from "react";
import { Container } from "../components/container";
const transactionData = [
  {
    id: 1,
    From: "Everyday",
    To: "Abc123",
    Amount: 100,
    Date: "12/12/1212",
  },
  {
    id: 2,
    From: "Saving1",
    To: "Xyz456",
    Amount: 150,
    Date: "15/12/1212",
  },
  {
    id: 3,
    From: "Saving2",
    To: "Xyz456",
    Amount: 150,
    Date: "15/12/1212",
  },
];
export const Transaction = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 8;

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = transactionData.slice(indexOfFirstUser, indexOfLastUser);

  // total page count
  const totalPages = Math.ceil(transactionData.length / usersPerPage);

  const renderPageNumbers = () => {
    const pageNumbers = [];

    // If there's only one page, render just one button
    if (totalPages === 1) {
      return (
        <button
          key={1}
          onClick={() => setCurrentPage(1)}
          className={`px-3 py-1 rounded ${
            currentPage === 1 ? "bg-teal-green text-white" : "bg-gray-200"
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
        className={`px-3 py-1 rounded ${
          currentPage === 1 ? "bg-teal-green text-white" : "bg-gray-200"
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
          className="px-3 py-1 rounded bg-gray-200"
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
          className="px-3 py-1 rounded bg-teal-green text-white"
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
          className="px-3 py-1 rounded bg-gray-200"
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
          currentPage === totalPages ? "bg-teal-green text-white" : "bg-gray-200"
        }`}
      >
        {totalPages}
      </button>
    );

    return pageNumbers;
  };

  return (
    <Container>
      <div className="container mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4">Transaction History</h1>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th className="w-1/5 py-3 text-center">ID</th>
                <th className="w-1/5 py-3 text-center">FROM</th>
                <th className="w-1/5 py-3 text-center">TO</th>
                <th className="w-1/5 py-3 text-center">AMOUNT</th>
                <th className="w-1/5 py-3 text-center">DATE</th>
              </tr>
            </thead>
            <tbody>
              {currentUsers.map((user, index) => (
                <tr key={index} className="bg-white border-b hover:bg-gray-50">
                  <td className="w-1/5 py-3 text-center">{user.id}</td>
                  <td className="w-1/5 py-3 text-center">{user.From}</td>
                  <td className="w-1/5 py-3 text-center">{user.To}</td>
                  <td className="w-1/5 py-3 text-center">${user.Amount}</td>
                  <td className="w-1/5 py-3 text-center">{user.Date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-between items-center mt-4">
          <span className="text-sm text-gray-600">
            Showing data {indexOfFirstUser + 1} to {indexOfLastUser} of{" "}
            {transactionData.length} entries
          </span>
          <div className="inline-flex space-x-1">{renderPageNumbers()}</div>
        </div>
      </div>
      );
    </Container>
  );
};
