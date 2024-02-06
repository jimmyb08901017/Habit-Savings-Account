import React, { useContext, createContext } from "react";

import useAccount from "@/hooks/useAccount";

type AccountType = {
  savings: number;
  updateSavings: (n: number) => void;
};

const defaultAccount: AccountType = {
  savings: 0,
  updateSavings: () => {},
};

const Account = createContext<AccountType>(defaultAccount);

type SearchStateProviderProps = {
  children: React.ReactNode;
};

export function AccountProvider({ children }: SearchStateProviderProps) {
  const { savings, updateSavings } = useAccount();

  return (
    <Account.Provider value={{ savings, updateSavings }}>
      {children}
    </Account.Provider>
  );
}

export function useAccountProvider() {
  return useContext(Account);
}
