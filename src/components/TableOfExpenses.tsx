import { Table, Center, Text } from "@mantine/core";
import EditableRow from "./EditableRow";
import ReadOnlyRow from "./ReadOnlyRow";
import { useVisibleExpenses } from "../hooks/useVisibleExpenses";
import { useAppSelector } from "../app/hooks";

const TableOfExpenses = () => {
  const visibleExpenses = useVisibleExpenses();
  const editedExpenseId = useAppSelector((state) => state.editedExpense.id);

  if (visibleExpenses?.length === 0)
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
          Number of expenses: {visibleExpenses?.length}
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
        {visibleExpenses?.map((expense) => (
          <tr key={expense.id}>
            {editedExpenseId === expense.id ? (
              <EditableRow />
            ) : (
              <ReadOnlyRow expense={expense} />
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
              {visibleExpenses
                ?.reduce((acc, expense) => acc + expense.amount, 0)
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
