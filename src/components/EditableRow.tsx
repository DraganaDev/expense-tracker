import { TextInput, NumberInput, Select, Button, Center } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { categories } from "../categories";
import { IconCheck, IconX } from "@tabler/icons-react";
import { Expense, useUpdateExpenseMutation } from "../features/api/apiSlice";
import { useErrorBoundary } from "react-error-boundary";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  setDescription,
  setAmount,
  setCategory,
  resetInitialExpense,
} from "../features/editedExpense/editedExpenseSlice";

const EditableRow = () => {
  const [updateExpense] = useUpdateExpenseMutation();
  const { showBoundary } = useErrorBoundary();
  const dispatch = useAppDispatch();

  const editedExpense = useAppSelector((state) => state.editedExpense);
  const { description, amount, category } = editedExpense;

  const widthLessThan576 = useMediaQuery("(max-width: 576px)");
  const paddingX = widthLessThan576 ? "xs" : "lg";

  const amountErrorMsg =
    amount < 0.05
      ? "Amount must be at least 0.05"
      : amount > 100000
      ? "Amount must be less than 100000"
      : "";

  const descriptionErrorMsg =
    description.length < 3
      ? "Description must be at least 3 characters"
      : description.length > 50
      ? "Description must be less than 50 characters"
      : "";

  const onSave = async (updatedExpense: Expense) => {
    const descr = updatedExpense.description.length;
    const amount = updatedExpense.amount;
    try {
      if (descr > 2 && descr < 50 && amount >= 0.05 && amount < 100000) {
        await updateExpense(updatedExpense).unwrap();
        dispatch(resetInitialExpense());
      }
    } catch (error) {
      showBoundary(error);
    }
  };

  return (
    <>
      <td>
        <TextInput
          aria-label="edit description"
          value={description}
          onChange={(event) =>
            dispatch(setDescription(event.currentTarget.value))
          }
          error={descriptionErrorMsg}
        />
      </td>
      <td>
        <NumberInput
          aria-label="edit amount"
          precision={2}
          min={0}
          value={amount}
          onChange={(value) => dispatch(setAmount(Number(value)))}
          error={amountErrorMsg}
        />
      </td>
      <td>
        <Select
          aria-label="edit category"
          data={categories}
          value={category}
          onChange={(value) => dispatch(setCategory(value!))}
        />
      </td>
      <td>
        <Center px="xs">
          <Button
            variant="light"
            mr="xs"
            px={paddingX}
            onClick={() => onSave(editedExpense)}
          >
            {widthLessThan576 ? <IconCheck /> : "Save"}
          </Button>
          <Button
            variant="light"
            color="gray"
            px={paddingX}
            onClick={() => dispatch(resetInitialExpense())}
          >
            {widthLessThan576 ? <IconX /> : "Cancel"}
          </Button>
        </Center>
      </td>
    </>
  );
};

export default EditableRow;
