import { Table, Center, Text } from "@mantine/core";
import { type Expense } from "../layouts/ExpensesLayout";
import EditableRow from "./EditableRow";
import ReadOnlyRow from "./ReadOnlyRow";

interface Props {
  expenses: Expense[];

  editedExpense: Expense;
  setEditedExpense: (expense: Expense) => void;
  onEdit: (expense: Expense) => void;
  onSave: (expense: Expense) => void;
  onDelete: (id: number) => void;
  onCancel: () => void;
}

const TableOfExpenses = ({
  expenses,
  editedExpense,
  setEditedExpense,
  onEdit,
  onSave,
  onDelete,
  onCancel,
}: Props) => {
  if (expenses.length === 0)
    return (
      <Center>
        <Text size="lg" c="grape.7">
          No expenses in this category, choose another one.
        </Text>
      </Center>
    );

  return (
    <Table
      captionSide="top"
      withBorder
      withColumnBorders
      maw={{ base: "40rem", md: "50rem", lg: "55rem" }}
      mx="auto"
      ta="center"
    >
      <caption>
        <Text italic size="md" fw={500} c="steelblue">
          Number of expenses: {expenses.length}
        </Text>
      </caption>
      <thead>
        <tr>
          <th>
            <Center>Description</Center>
          </th>
          <th>
            <Center>Amount</Center>
          </th>
          <th>
            <Center>Category</Center>
          </th>
          <th>
            <Center>Actions</Center>
          </th>
        </tr>
      </thead>
      <tbody>
        {expenses.map((expense) => (
          <tr key={expense.id}>
            {editedExpense.id === expense.id ? (
              <EditableRow
                editedExpense={editedExpense}
                setEditedExpense={setEditedExpense}
                onSave={onSave}
                onCancel={onCancel}
              />
            ) : (
              <ReadOnlyRow
                expense={expense}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            )}
          </tr>
        ))}
      </tbody>
      <tfoot>
        <tr>
          <th>
            <Center fz={17} fw={500} c="steelblue">
              Total
            </Center>
          </th>
          <th>
            <Center fz={17} fw={500} c="steelblue">
              $
              {expenses
                .reduce((acc, expense) => acc + expense.amount, 0)
                .toFixed(2)}
            </Center>
          </th>
          <th></th>
          <th></th>
        </tr>
      </tfoot>
    </Table>
  );
};

export default TableOfExpenses;
