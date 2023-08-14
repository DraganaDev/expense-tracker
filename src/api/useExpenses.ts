import API_URL from "./apiClient";
import { type Expense } from "../layouts/ExpensesLayout";
import { useErrorBoundary } from "react-error-boundary";

export const useExpenses = () => {
  const { showBoundary } = useErrorBoundary();

  const createExpense = async (newExpense: Expense) => {
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newExpense),
      });
      if (!response.ok) throw new Error("Expense not added");
    } catch (error) {
      showBoundary(error);
    }
  };

  const updateExpense = async (updatedExpense: Expense) => {
    try {
      const response = await fetch(`${API_URL}/${updatedExpense.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedExpense),
      });
      if (!response.ok) throw new Error("Saving changes failed");
    } catch (error) {
      showBoundary(error);
    }
  };

  const deleteExpense = async (id: number) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Deleting expense failed");
    } catch (error) {
      showBoundary(error);
    }
  };
  return { createExpense, updateExpense, deleteExpense };
};
