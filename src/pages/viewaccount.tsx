import React, { useEffect, useState } from "react";
import { Container } from "../components/container";
import { ModalAccounts } from "../components/modal-accounts";
import { IAccount } from "../type";
import { ModalAdmin } from "../components/modal-admin";
import axios from "axios";
import config from "../config";

export const Viewaccount = () => {
  var userID = sessionStorage.getItem("username");
  const [isAdmin, setIsAdmin] = useState(Boolean);
  useEffect(() => {
    console.log("userID:", userID);
    while (userID === null) {
      userID = sessionStorage.getItem("username");
    }
    if (userID === "admin1" || userID === "admin2" || userID === "admin3") {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
    axios
      .get(`${config.API_BASE_URL}/user/${userID}/accounts`)
      .then((response) => {
        const accountsData = response.data
          .slice(0, 5)
          .map((account: any, i: number) => ({
            name: account.accountName,
            bsb: account.BSB,
            accNo: account.accountNumber,
            image: `/assets/number${i + 1}.png`,
            balance: `$${account.balance}`,
          }));
        setAccounts(accountsData);
      })
      .catch((error) => {
        console.error("Error fetching accounts:", error);
      });
  }, []);

  const [accounts, setAccounts] = useState<IAccount[]>([]);

  // 充值函数，增加指定账户的余额
  const topUpAccount = (index: number, amount: number) => {
    const updatedAccounts = accounts.map((account, i) => {
      if (i === index) {
        // 更新账户余额
        const updatedBalance =
          parseFloat(account.balance.replace("$", "")) + amount;
        return { ...account, balance: `$${updatedBalance.toFixed(2)}` };
      }
      return account;
    });
    axios.patch(`${config.API_BASE_URL}/user/${userID}/deposit`, null, {
      params: {
        username: userID,
        accountNumber: accounts[index].accNo,
        amount: amount,
      },
    });
    setAccounts(updatedAccounts);
  };

  const addAccount = () => {
    if (accounts.length >= 5) return;
    axios
      .post(`${config.API_BASE_URL}/user/${userID}}/newAccount`, null, {
        params: {
          username: userID,
          accountName: `NetBank Saving ${accounts.length}`,
          balance: 1000,
        },
      })
      .then((response) => {
        const newAccount = {
          name: response.data.accountName,
          bsb: response.data.BSB,
          accNo: response.data.accountNumber,
          image: `/assets/number${accounts.length + 1}.png`,
          balance: `$${response.data.balance}`,
        };
        const newAccounts = [...accounts, newAccount];
        setAccounts(newAccounts);
      });
  };

  return (
    <Container>
      <div>
        <div className="flex flex-row">
          <div className="flex w-[100%]">
            {/* Conditional rendering based on admin status */}
            {!isAdmin ? (
              <ModalAccounts
                accounts={accounts}
                onAddAccount={addAccount}
                onTopUp={topUpAccount}
              />
            ) : (
              <ModalAdmin />
            )}
          </div>
        </div>
      </div>
    </Container>
  );
};
