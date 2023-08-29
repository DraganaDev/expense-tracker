import { useMemo } from "react";
import { useAppSelector } from "../app/hooks";
import { useGetExpensesQuery } from "../features/api/apiSlice";

export const useVisibleExpenses = () => {
  const { data: expenses } = useGetExpensesQuery();
  const selectedCategory = useAppSelector(
    (state) => state.filterAndSearch.selectedCategory
  );
  const searchValue = useAppSelector(
    (state) => state.filterAndSearch.searchValue
  );

  const filteredExpenses = useMemo(
    () =>
      expenses?.filter((expense) =>
        selectedCategory !== "All"
          ? expense.category === selectedCategory
          : expenses
      ),
    [selectedCategory, expenses]
  );

  const visibleExpenses = useMemo(
    () =>
      filteredExpenses?.filter((expense) =>
        searchValue !== ""
          ? expense.description
              .toLowerCase()
              .includes(searchValue.toLowerCase())
          : filteredExpenses
      ),
    [searchValue, filteredExpenses]
  );

  return visibleExpenses;
};
