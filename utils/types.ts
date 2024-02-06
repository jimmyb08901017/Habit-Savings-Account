export type Habit = {
  id: string;
  name: string;
  description: string;
  difficulty: string;
  money: number;
};

export type nativeHabit = Omit<Habit, "id">;

export type Activity = {
  id: string;
  date: Date;
  habit: Habit;
};

export type Product = Omit<Habit, "difficulty">;
