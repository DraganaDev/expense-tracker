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

export type Category = (typeof categories)[number] | "All";
