import React, { useEffect, useState } from "react";
import { Container } from "../components/container";
import { ModalAccounts } from "../components/modal-accounts";
import { IAccount } from "../type";
import { ModalAdmin } from "../components/modal-admin";
import axios from "axios";

export const userID = "admin1"; // string

export const Viewaccount = () => {
  const [isAdmin, setIsAdmin] = useState(true);
  useEffect(() => {
    axios
      .get(`http://localhost:3001/user/${userID}/accounts`)
      .then((response) => {
        var accounts = [];
        for (var i = 0; i < Math.min(response.data.length, 5); i++) {
          accounts.push({
            name: response.data[i].accountName,
            bsb: response.data[i].BSB,
            accNo: response.data[i].accountNumber,
            image: `/assets/number${i + 1}.png`,
            balance: `$${response.data[i].balance}`,
          });
        }
        setAccounts(accounts);
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
    axios.patch(`http://localhost:3001/user/${userID}/deposit`, null, {
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
      .post(`http://localhost:3001/user/${userID}}/newAccount`, null, {
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
            {!isAdmin && (
              <ModalAccounts
                accounts={accounts}
                onAddAccount={addAccount}
                onTopUp={topUpAccount}
              />
            )}
            {/* admin */}
            {isAdmin && <ModalAdmin />}
          </div>
        </div>
      </div>
    </Container>
  );
};
