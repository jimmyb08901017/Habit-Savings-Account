import { useState, useEffect } from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { Habit, nativeHabit } from "@/utils/types";

export default function useHabits() {
  const [habits, setHabits] = useState<Habit[]>([]);

  useEffect(() => {
    // Retrieve original value
    const RetrieveVal = async () => {
      const updateVal = await getHabit();
      if (!updateVal) return;
      setHabits(updateVal);
      if (updateVal !== habits) setHabits(updateVal);
    };
    RetrieveVal();
  }, []);

  const addHabit = async (newHabit: nativeHabit) => {
    const newId = Math.floor(Math.random() * Date.now()).toString(32); // should be random
    const newH = { id: newId, ...newHabit };
    setHabits([...habits, newH]); // frontend
    await storeHabit([...habits, newH]); // backend
  };

  // This function is a little ugly. Can be changed if I
  // use realm.js instead.
  const updateHabit = async (updateH: Habit) => {
    // const oldHabit = habits.filter((h)=>{h.id === updateH.id})[0];
    // if(!oldHabit) return;
    const newHabits = habits.map((habit) =>
      habit.id === updateH.id ? updateH : habit,
    );
    setHabits(newHabits); // frontend
    await storeHabit(newHabits); // backend
  };

  const removeHabit = async (removeId: string) => {
    const newHabits = habits.filter((habit) => habit.id !== removeId);
    setHabits(newHabits); // frontend
    await storeHabit(newHabits); // backend
  };

  const getHabit = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("habits");
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

  const storeHabit = async (habits: Habit[]) => {
    try {
      const jsonValue = JSON.stringify(habits);
      await AsyncStorage.setItem("habits", jsonValue);
      return true;
    } catch (error) {
      // saving error
      console.log(error);
      return false;
    }
  };

  return {
    habits,
    addHabit,
    removeHabit,
  };
}
