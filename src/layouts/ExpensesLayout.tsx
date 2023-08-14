import { Box, Center, Group, Text, Loader } from "@mantine/core";
import { useMemo, useState, useEffect } from "react";
import { type Category } from "../categories";
import FilterByCategory from "../components/FilterByCategory";
import SearchByDescription from "../components/SearchByDescription";
import TableOfExpenses from "../components/TableOfExpenses";
import { useErrorBoundary } from "react-error-boundary";
import ExpenseForm from "../components/ExpenseForm";
import { ExpenseData } from "../components/ExpenseForm";
import { useExpenses } from "../api/useExpenses";
import API_URL from "../api/apiClient";

export interface Expense {
  description: string;
  amount: number;
  category: string;
  id: number;
}

const ExpensesLayout = () => {
  const initialExpense = {
    description: "",
    amount: 0,
    category: "",
    id: 0,
  };
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [editedExpense, setEditedExpense] = useState(initialExpense);
  const [selectedCategory, setSelectedCategory] = useState<Category>("All");
  const [searchValue, setSearchValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { createExpense, updateExpense, deleteExpense } = useExpenses();
  const { showBoundary } = useErrorBoundary();

  useEffect(() => {
    setIsLoading(true);
    const getExpenses = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error("Could not fetch expenses");
        } else {
          const result = await response.json();
          setExpenses([...result].reverse());
        }
      } catch (error) {
        showBoundary(error);
      } finally {
        setIsLoading(false);
      }
    };
    // To simulate slower connection
    setTimeout(getExpenses, 500);
  }, [showBoundary]);

  const addExpense = (expense: ExpenseData) => {
    const newExpense = { ...expense, id: Math.floor(Math.random() * 100000) };
    setExpenses([newExpense, ...expenses]);
    createExpense(newExpense);
  };

  const onEdit = (expense: Expense) => {
    setEditedExpense(expense);
  };

  const onCancel = () => {
    setEditedExpense(initialExpense);
  };

  const onDelete = (id: number) => {
    setExpenses(expenses.filter((expense) => expense.id !== id));
    deleteExpense(id);
  };

  const onSave = (updatedExpense: Expense) => {
    const descr = updatedExpense.description.length;
    const amount = updatedExpense.amount;
    const updatedExpensesWithEdited = expenses.map((expense) =>
      expense.id === updatedExpense.id ? updatedExpense : expense
    );

    if (descr > 2 && descr < 50 && amount >= 0.05 && amount < 100000) {
      setExpenses(updatedExpensesWithEdited);
      updateExpense(updatedExpense);
      setEditedExpense(initialExpense);
    }
  };

  const visibleExpenses = useMemo(
    () =>
      expenses?.filter((expense) =>
        selectedCategory !== "All"
          ? expense.category === selectedCategory
          : expenses
      ),
    [selectedCategory, expenses]
  );

  const searchedExpenses = useMemo(
    () =>
      visibleExpenses.filter((expense) =>
        searchValue !== ""
          ? expense.description
              .toLowerCase()
              .includes(searchValue.toLowerCase())
          : visibleExpenses
      ),
    [searchValue, visibleExpenses]
  );

  return (
    <>
      <ExpenseForm addExpense={addExpense} />
      {isLoading && (
        <Center mt={100}>
          <Loader size="lg" color="blue.8" />
        </Center>
      )}
      {!isLoading && (
        <Box my="xl">
          {expenses.length !== 0 ? (
            <>
              <Group
                position="center"
                maw={{
                  base: "30rem",
                }}
                mx="auto"
                my="lg"
              >
                <FilterByCategory
                  selectedCategory={selectedCategory}
                  setSelectedCategory={setSelectedCategory}
                />
                <SearchByDescription
                  expenses={expenses}
                  searchValue={searchValue}
                  setSearchValue={setSearchValue}
                />
              </Group>

              <TableOfExpenses
                expenses={searchedExpenses}
                editedExpense={editedExpense}
                setEditedExpense={setEditedExpense}
                onEdit={onEdit}
                onDelete={onDelete}
                onSave={onSave}
                onCancel={onCancel}
              />
            </>
          ) : (
            <Center>
              <Text size={18} c="grape.7">
                No expenses added yet.
              </Text>
            </Center>
          )}
        </Box>
      )}
    </>
  );
};

export default ExpensesLayout;
