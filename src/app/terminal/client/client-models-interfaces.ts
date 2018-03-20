export interface User {
    uid: string;
    firstName: string;
    lastName: string;
    dateOfBirth: any;
    gender: string;
    address: string;
    phoneNumber: string;
    roleID: string;
}

export interface Account {
  accountNumber: number;
  cardNumber: number;
  cardProviderID: string;
  categoryID: string;
  currencyID: string;
}

export interface CardsProvider {
    name: string;
    description: string;
}

export interface AccountCategory {
    name: string;
    description: string;
}

export interface Role {
    name: string;
}

export interface Currency {
    name: string;
    rate: number;
}

export interface Transaction {
    createdAt: any;
    description: string;
    amount: number;
}

export interface ATMTransaction {
  createdAt: any;
  udatedAt: any;
  validatedAt: any;
  uid: string;
  transactionToken: string;
  transactionAmount: number;
  transactionStatus: string;
  validationStatus: string;
}

export interface ConfirmationMessage {
    createdAt: any;
    uid: string;
    transactionID: string;
    message: string;
    status: boolean;
}
