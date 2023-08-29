import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Category } from "../../categories";

interface FilterAndSearchExpenses {
  selectedCategory: Category;
  searchValue: string;
}

const initialState: FilterAndSearchExpenses = {
  selectedCategory: "All",
  searchValue: "",
};

const filterAndSearchSlice = createSlice({
  name: "filterAndSearch",
  initialState,
  reducers: {
    setSelectedCategory: (state, action: PayloadAction<Category>) => {
      state.selectedCategory = action.payload;
    },
    setSearchValue: (state, action: PayloadAction<string>) => {
      state.searchValue = action.payload;
    },
  },
});

export const { setSearchValue, setSelectedCategory } =
  filterAndSearchSlice.actions;
export default filterAndSearchSlice.reducer;
