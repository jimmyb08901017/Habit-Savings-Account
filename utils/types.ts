// export type genericIncome = {};

export type HabitGroups = "Reading" | "Exercise" | "Work";

export type Habit = {
  id: string;
  name: string; // TODO: change type to HabitGroups
  description: string;
  difficulty: string;
  money: number;
  isChecked: boolean;
};
export type nativeHabit = Omit<Habit, "id" | "isChecked">;

export type SpecialIncome = Omit<Habit, "isChecked">;
export type recordHabit = SpecialIncome; // for TransactionRecord

export type TransactionRecord = {
  id: string;
  date: Date;
  activity: recordHabit | Product;
};

export type Product = Omit<Habit, "difficulty" | "isChecked">;
