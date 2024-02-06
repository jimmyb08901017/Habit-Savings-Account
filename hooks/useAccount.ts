/**
 * [Important] This hook 'useAccount' is deprecated!
 * You should use 'useAccountProvider' instead, which is the
 * context version of useAccount.
 */
import { useEffect, useState } from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";

export default function useAccountLocal() {
  const [savings, setSavings] = useState(0);

  useEffect(() => {
    // Retrieve original value
    const RetrieveVal = async () => {
      const updateVal = await storeGetting();
      if (!updateVal) return;
      if (updateVal !== savings) setSavings(updateVal);
    };
    RetrieveVal();
  }, []);

  const updateSavings = (val: number) => {
    setSavings(val);
    storeSaving(val);
  };

  // async storage manipulation
  // For more info: https://react-native-async-storage.github.io/async-storage/docs/usage
  const storeSaving = async (val: number) => {
    try {
      const valStr = val.toString();
      await AsyncStorage.setItem("savings", valStr);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const storeGetting = async () => {
    try {
      const valStr = await AsyncStorage.getItem("savings");
      if (valStr !== null) {
        // value previously stored
        return Number(valStr);
      }
      return 0;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  return {
    savings,
    updateSavings,
  };

  // store string value
  const storeStrData = async (value: string) => {
    try {
      await AsyncStorage.setItem("my-key", value);
    } catch (e) {
      // saving error
    }
  };

  // store object value
  const storeObjData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem("my-key", jsonValue);
    } catch (e) {
      // saving error
    }
  };

  // get string value
  const getStrData = async () => {
    try {
      const value = await AsyncStorage.getItem("my-key");
      if (value !== null) {
        // value previously stored
      }
    } catch (e) {
      // error reading value
    }
  };

  // get object value
  const getObjData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("my-key");
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      // error reading value
    }
  };
}
