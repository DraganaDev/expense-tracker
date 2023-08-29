import { Button, Center } from "@mantine/core";
import { Expense, useDeleteExpenseMutation } from "../features/api/apiSlice";
import { IconPencil, IconTrash } from "@tabler/icons-react";
import { useMediaQuery } from "@mantine/hooks";
import { setEditedExpense } from "../features/editedExpense/editedExpenseSlice";
import { useAppDispatch } from "../app/hooks";
// import { useErrorBoundary } from "react-error-boundary";

interface Props {
  expense: Expense;
}
const ReadOnlyRow = ({ expense }: Props) => {
  const dispatch = useAppDispatch();
  const [deleteExpense, { error }] = useDeleteExpenseMutation();
  // const { showBoundary } = useErrorBoundary();

  const widthLessThan576 = useMediaQuery("(max-width: 576px)");
  const paddingX = widthLessThan576 ? "xs" : "lg";

  if (error) throw error;
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
            onClick={() => dispatch(setEditedExpense(expense))}
          >
            {widthLessThan576 ? <IconPencil stroke={1.2} /> : " Edit"}
          </Button>
          <Button
            variant="light"
            color="gray"
            c="red.9"
            px={paddingX}
            onClick={() => deleteExpense(expense.id)}
          >
            {widthLessThan576 ? <IconTrash stroke={1.2} /> : " Delete"}
          </Button>
        </Center>
      </td>
    </>
  );
};

export default ReadOnlyRow;
