import { useState, useEffect } from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";

import type { TransactionRecord, nativeTransactionRecord } from "@/utils/types";

export default function useTransRecords() {
  const [records, setRecords] = useState<TransactionRecord[]>([]);

  useEffect(() => {
    // Retrieve original value
    const RetrieveVal = async () => {
      const updateVal = await getRecords();
      if (!updateVal) return;
      setRecords(updateVal);
      if (updateVal !== records) setRecords(updateVal);
    };
    RetrieveVal();
  }, []);

  const addRecord = async (newRecord: nativeTransactionRecord) => {
    const newId = Math.floor(Math.random() * Date.now()).toString(32); // should be random
    const newR = { id: newId, ...newRecord };
    setRecords([...records, newR]); // frontend
    await storeRecords([...records, newR]); // backend
  };

  // This function is a little ugly. Can be changed if I
  // use realm.js instead.
  const updateRecord = async (updateH: TransactionRecord) => {
    // const oldHabit = habits.filter((h)=>{h.id === updateH.id})[0];
    // if(!oldHabit) return;
    const newRecords = records.map((record) =>
      record.id === updateH.id ? updateH : record,
    );
    setRecords(newRecords); // frontend
    await storeRecords(newRecords); // backend
  };

  const removeRecord = async (removeId: string) => {
    const newRecords = records.filter((record) => record.id !== removeId);
    setRecords(newRecords); // frontend
    await storeRecords(newRecords); // backend
  };

  const getRecords = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("TransRecords");
      if (jsonValue !== null) {
        const json = JSON.parse(jsonValue);
        // value previously stored
        return json;
      }
      return null;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  const storeRecords = async (habits: Habit[]) => {
    try {
      const jsonValue = JSON.stringify(habits);
      await AsyncStorage.setItem("TransRecord", jsonValue);
      return true;
    } catch (error) {
      // saving error
      console.log(error);
      return false;
    }
  };

  return {
    records,
    addRecord,
    removeRecord,
  };
}
