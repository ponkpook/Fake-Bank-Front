import React, { useEffect, useState } from "react";
import { Container } from "../components/container";
import { useLocation, useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { backEndTransactionHistory, transactionHistory, IAccount } from "../type";
import axios from "axios";
import config from "../config";
// export const transactionData = [
//   {
//     id: 1,
//     From: "Everyday Account",
//     To: "Abc123",
//     Amount: 100,
//     Date: "12/12/1212",
//   },
//   {
//     id: 2,
//     From: "NetBank Saving",
//     To: "Xyz456",
//     Amount: 150,
//     Date: "15/12/1212",
//   },
//   {
//     id: 3,
//     From: "Saving2",
//     To: "Xyz456",
//     Amount: 150,
//     Date: "15/12/1212",
//   },
//   //test
//   {
//     id: 1,
//     From: "Everyday Account",
//     To: "Abc123",
//     Amount: 100,
//     Date: "12/12/1212",
//   },
//   {
//     id: 2,
//     From: "NetBank Saving",
//     To: "Xyz456",
//     Amount: 150,
//     Date: "15/12/1212",
//   },
//   {
//     id: 3,
//     From: "Saving2",
//     To: "Xyz456",
//     Amount: 150,
//     Date: "15/12/1212",
//   },
//   {
//     id: 1,
//     From: "Everyday Account",
//     To: "Abc123",
//     Amount: 100,
//     Date: "12/12/1212",
//   },
//   {
//     id: 2,
//     From: "NetBank Saving",
//     To: "Xyz456",
//     Amount: 150,
//     Date: "15/12/1212",
//   },
//   {
//     id: 3,
//     From: "Saving2",
//     To: "Xyz456",
//     Amount: 150,
//     Date: "15/12/1212",
//   },
//   {
//     id: 1,
//     From: "Everyday Account",
//     To: "Abc123",
//     Amount: 100,
//     Date: "12/12/1212",
//   },
//   {
//     id: 2,
//     From: "NetBank Saving",
//     To: "Xyz456",
//     Amount: 150,
//     Date: "15/12/1212",
//   },
//   {
//     id: 3,
//     From: "Saving2",
//     To: "Xyz456",
//     Amount: 150,
//     Date: "15/12/1212",
//   },
//   {
//     id: 1,
//     From: "Everyday Account",
//     To: "Abc123",
//     Amount: 100,
//     Date: "12/12/1212",
//   },
//   {
//     id: 2,
//     From: "NetBank Saving",
//     To: "Xyz456",
//     Amount: 150,
//     Date: "15/12/1212",
//   },
//];
var username = sessionStorage.getItem("username");

export const TransactionHistory = () => {
  const [transactionData, setTransactionData] = useState<transactionHistory[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 8;
  const navigate = useNavigate();
  const location = useLocation(); // 获取传递的 state

  const selectedAccount = location.state?.selectedAccount || "All"; // 获取传递的账户或默认显示 "All"
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        while (username === null) {
          username = sessionStorage.getItem("username");
        }
        const response = await axios.get(`${config.API_BASE_URL}/user/${username}/transactions`, {
          params: {username}
        });
        const data = response.data.map((transaction: any, index: number) => ({
          id: index + 1,
          from: transaction.fromAccount,
          to: transaction.toAccount,
          amount: transaction.amount,
          date: new Date(transaction.date).toLocaleDateString(),
        }));
        setTransactionData(data);
        console.log('Transaction data:', data);
      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
    };
    fetchTransactions();
  }, [username]);


  // 过滤交易数据
  const filteredTransactions =
    selectedAccount === "All"
      ? transactionData // 显示所有交易
      : transactionData.filter(
          (transaction) => transaction.from === selectedAccount
        ); // 过滤特定账户的交易

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredTransactions.slice(
    indexOfFirstUser,
    indexOfLastUser
  );

  // total page count
  const totalPages = Math.ceil(filteredTransactions.length / usersPerPage);

  const renderPageNumbers = () => {
    const pageNumbers: (JSX.Element | string)[] = [];

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

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.text(
      `Transaction History - ${
        selectedAccount === "All" ? "All Accounts" : selectedAccount
      }`,
      14,
      15
    );

    const tableColumn = ["ID", "From", "To", "Amount", "Date"];
    const tableRows = filteredTransactions.map((transaction) => [
      transaction.id,
      transaction.from,
      transaction.to,
      `$${transaction.amount}`,
      transaction.date,
    ]);

    (doc as any).autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 20,
    });

    doc.save("transaction_history.pdf");
  };

  return (
    <Container>
      <div className="container mx-auto p-6 ">
        <h5 className="font-prosto mt-2 ">
          Transaction History -{" "}
          {selectedAccount === "All" ? "All Accounts" : selectedAccount}
        </h5>
        <div className="flex flex-col md:flex-row  mx-auto bg-native-milk shadow-lg my-4 min-h-[80vh] ">
          <table className="w-full text-sm text-left text-gray-600 font-prosto">
            <thead className="text-xs text-gray-700 font-prosto uppercase shadow-md">
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
                <tr key={index} className=" border-b hover:shadow-lg">
                  <td className="w-1/5 py-3 text-center">{user.id}</td>
                  <td className="w-1/5 py-3 text-center">{user.from}</td>
                  <td className="w-1/5 py-3 text-center">{user.to}</td>
                  <td className="w-1/5 py-3 text-center">${user.amount}</td>
                  <td className="w-1/5 py-3 text-center">{user.date}</td>
                </tr>
              ))}
              {/* Placeholder for additional rows to maintain consistent height */}
              {currentUsers.length < 8 &&
                Array.from({ length: 8 - currentUsers.length }).map(
                  (_, idx) => (
                    <tr key={`placeholder-${idx}`} className="border-b ">
                      <td className="w-1/5 py-3 text-center "></td>
                      <td className="w-1/5 py-3 text-center "></td>
                      <td className="w-1/5 py-3 text-center"></td>
                      <td className="w-1/5 py-3 text-center "></td>
                      <td className="w-1/5 py-3 text-center "></td>
                    </tr>
                  )
                )}
            </tbody>
          </table>
        </div>

        <div className="flex justify-between items-center mt-4">
          <span className="text-sm text-gray-700 font-prosto">
            Showing data {indexOfFirstUser + 1} to {indexOfLastUser} of{" "}
            {filteredTransactions.length} entries
          </span>
          <div className="inline-flex space-x-1">{renderPageNumbers()}</div>
          <button
            className="bg-native-red text-white text-sm font-medium font-['Poppins'] py-2 px-6 rounded-full hover:bg-orange-600"
            onClick={() => navigate(-1)} // 返回账户选择页面
          >
            Back
          </button>
        </div>

        {/* 悬浮圆形按钮 */}
        <button
          className="fixed mt-16 top-10 right-5 bg-[rgba(255, 255, 255, 0.8)] text-native-red text-lg font-bold underline rounded-full p-4 shadow-lg hover:bg-native-milk"
          onClick={downloadPDF}
        >
          Download PDF
        </button>
      </div>
    </Container>
  );
};
