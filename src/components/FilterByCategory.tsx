import { Select } from "@mantine/core";
import { categories, type Category } from "../categories";
import { useMemo } from "react";
import { setSelectedCategory } from "../features/filterAndSearchExpenses/filterAndSearchSlice";
import { useAppDispatch, useAppSelector } from "../app/hooks";

const FilterByCategory = () => {
  const selectedCategory = useAppSelector(
    (state) => state.filterAndSearch.selectedCategory
  );
  const dispatch = useAppDispatch();
  const optionCategories: Category[] = useMemo(
    () => ["All", ...categories],
    []
  );

  return (
    <Select
      maw={200}
      label="Filter expenses by category"
      data={optionCategories}
      value={selectedCategory}
      onChange={(value) => dispatch(setSelectedCategory(value as Category))}
    />
  );
};

export default FilterByCategory;
