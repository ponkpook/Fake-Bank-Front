export interface IAccount {
  name: string;
  bsb: string;
  accNo: string;
  image: string;
  balance: string;
}

export interface User {
  username: string;
  password: string;
  isAdmin: boolean;
  date: Date;
}

export interface UserDisplay {
  id: number;
  username: string;
  password: string;
  date: string;
}

export interface backEndUserAccount {
  username: string;
  accountName: string;
  accountNumber: string;
  BSB: string;
  balance: number;
}

export interface backEndPayee {
  username: string;
  payeeName: string;
  accountNumber: string;
  payeeBSB: string;
}