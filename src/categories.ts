export const categories = [
  "Groceries",
  "Utilities",
  "Entertainment",
  "Clothes",
  "Shoes",
  "Cosmetics",
  "Hygiene",
  "Household",
] as const;

export type Category =
  | "All"
  | "Groceries"
  | "Utilities"
  | "Entertainment"
  | "Clothes"
  | "Shoes"
  | "Cosmetics"
  | "Hygiene"
  | "Household";
