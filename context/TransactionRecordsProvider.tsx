import React, { useContext, createContext } from "react";

import useTransRecords from "@/hooks/useTransRecords";
import type { TransactionRecord, nativeTransactionRecord } from "@/utils/types";

type TransRecordType = {
  records: TransactionRecord[];
  addRecord: (r: nativeTransactionRecord) => void;
  removeRecord: (id: string) => void;
};

const defaultRecord: TransRecordType = {
  records: [],
  addRecord: () => {},
  removeRecord: () => {},
};

const Records = createContext<TransRecordType>(defaultRecord);

type SearchStateProviderProps = {
  children: React.ReactNode;
};

export function TransactionRecordsProvider({
  children,
}: SearchStateProviderProps) {
  const { records, addRecord, removeRecord } = useTransRecords();

  return (
    <Records.Provider value={{ records, addRecord, removeRecord }}>
      {children}
    </Records.Provider>
  );
}

export function useTransactionRecords() {
  return useContext(Records);
}
