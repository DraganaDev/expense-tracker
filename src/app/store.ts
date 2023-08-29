import { configureStore } from "@reduxjs/toolkit";
import editedExpenseReducer from "../features/editedExpense/editedExpenseSlice";
import filterAndSearchReducer from "../features/filterAndSearchExpenses/filterAndSearchSlice";
import { apiSlice } from "../features/api/apiSlice";

const store = configureStore({
  reducer: {
    editedExpense: editedExpenseReducer,
    filterAndSearch: filterAndSearchReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddlewere) =>
    getDefaultMiddlewere().concat(apiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
