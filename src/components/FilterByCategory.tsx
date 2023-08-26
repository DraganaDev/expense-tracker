import { Select } from "@mantine/core";
import { categories, type Category } from "../categories";
import { useMemo } from "react";

interface Props {
  selectedCategory: Category;
  setSelectedCategory: (category: Category) => void;
}

const FilterByCategory = ({ selectedCategory, setSelectedCategory }: Props) => {
  const optionCategories = useMemo(() => ["All", ...categories], []);

  return (
    <Select
      maw={200}
      label="Filter expenses by category"
      data={optionCategories}
      value={selectedCategory}
      onChange={setSelectedCategory}
    />
  );
};

export default FilterByCategory;
