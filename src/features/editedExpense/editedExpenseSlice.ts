import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Expense } from "../api/apiSlice";

const initialExpense: Expense = {
  description: "",
  amount: 0,
  category: "",
  id: 0,
};

const editedExpenseSlice = createSlice({
  name: "editedExpense",
  initialState: initialExpense,
  reducers: {
    setEditedExpense: (state, action: PayloadAction<Expense>) => {
      // return action.payload works fine here
      // but typescript is complaining that
      // variable state is declared but never used
      Object.assign(state, action.payload);
    },
    setDescription: (state, action: PayloadAction<string>) => {
      state.description = action.payload;
    },
    setAmount: (state, action: PayloadAction<number>) => {
      state.amount = action.payload;
    },
    setCategory: (state, action: PayloadAction<string>) => {
      state.category = action.payload;
    },
    resetInitialExpense: () => {
      return initialExpense;
    },
  },
});

export const {
  setEditedExpense,
  setDescription,
  setAmount,
  setCategory,
  resetInitialExpense,
} = editedExpenseSlice.actions;

export default editedExpenseSlice.reducer;
