import { Button, Center } from "@mantine/core";
import { type Expense } from "../layouts/ExpensesLayout";

interface Props {
  expense: Expense;
  onEdit: (expense: Expense) => void;
  onDelete: (id: number) => void;
}
const ReadOnlyRow = ({ expense, onEdit, onDelete }: Props) => {
  return (
    <>
      <td>{expense.description}</td>
      <td>{expense.amount.toFixed(2)}</td>
      <td>{expense.category}</td>
      <td>
        <Center>
          <Button
            variant="light"
            color="grape"
            mr="sm"
            onClick={() => onEdit(expense)}
          >
            Edit
          </Button>
          <Button
            variant="light"
            color="gray"
            c="red.9"
            onClick={() => onDelete(expense.id)}
          >
            Delete
          </Button>
        </Center>
      </td>
    </>
  );
};

export default ReadOnlyRow;
