import { Select } from "@mantine/core";
import { categories, type Category } from "../categories";

interface Props {
  selectedCategory: Category;
  setSelectedCategory: (category: Category) => void;
}

const FilterByCategory = ({ selectedCategory, setSelectedCategory }: Props) => {
  return (
    <Select
      maw={200}
      label="Filter expenses by category"
      data={["All", ...categories]}
      value={selectedCategory}
      onChange={setSelectedCategory}
    />
  );
};

export default FilterByCategory;
