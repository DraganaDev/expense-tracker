import { Button, Center } from "@mantine/core";
import { type Expense } from "../layouts/ExpensesLayout";
import { IconPencil, IconTrash } from "@tabler/icons-react";
import { useMediaQuery } from "@mantine/hooks";

interface Props {
  expense: Expense;
  onEdit: (expense: Expense) => void;
  onDelete: (id: number) => void;
}
const ReadOnlyRow = ({ expense, onEdit, onDelete }: Props) => {
  const widthLessThan576 = useMediaQuery("(max-width: 576px)");
  const paddingX = widthLessThan576 ? "xs" : "lg";
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
            px={paddingX}
            onClick={() => onEdit(expense)}
          >
            {widthLessThan576 ? <IconPencil stroke={1.2} /> : " Edit"}
          </Button>
          <Button
            variant="light"
            color="gray"
            c="red.9"
            px={paddingX}
            onClick={() => onDelete(expense.id)}
          >
            {widthLessThan576 ? <IconTrash stroke={1.2} /> : " Delete"}
          </Button>
        </Center>
      </td>
    </>
  );
};

export default ReadOnlyRow;
