import { Select } from "@mantine/core";
import { Expense } from "../layouts/ExpensesLayout";
import { useMemo } from "react";

interface Props {
  expenses: Expense[];
  searchValue: string;
  setSearchValue: (searchValue: string) => void;
}

const SearchByDescription = ({
  expenses,
  searchValue,
  setSearchValue,
}: Props) => {
  const expensesDescriptions = useMemo(
    () => [
      ...new Set(
        expenses.map((expense) => expense.description.toLowerCase()).sort()
      ),
    ],
    [expenses]
  );

  return (
    <Select
      label="Search expense by description"
      data={["", ...expensesDescriptions]}
      searchable
      searchValue={searchValue}
      onSearchChange={setSearchValue}
      nothingFound="No such expense"
    />
  );
};

export default SearchByDescription;
