import { Select } from "@mantine/core";
import { useGetExpensesQuery } from "../features/api/apiSlice";
import { useMemo } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { setSearchValue } from "../features/filterAndSearchExpenses/filterAndSearchSlice";

const SearchByDescription = () => {
  const { data: expenses } = useGetExpensesQuery();
  const dispatch = useAppDispatch();
  const searchValue = useAppSelector(
    (state) => state.filterAndSearch.searchValue
  );
  const expensesDescriptions = useMemo(
    () => [
      ...new Set(
        expenses?.map((expense) => expense.description.toLowerCase()).sort()
      ),
    ],
    [expenses]
  );

  return (
    <Select
      label="Search expense by description"
      placeholder=""
      searchable
      clearable
      data={expensesDescriptions}
      searchValue={searchValue}
      onSearchChange={(value) => dispatch(setSearchValue(value))}
      nothingFound="No such expense"
    />
  );
};

export default SearchByDescription;
