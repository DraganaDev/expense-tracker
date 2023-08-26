import { TextInput, NumberInput, Select, Button, Center } from "@mantine/core";
import { categories } from "../categories";
import { Expense } from "../layouts/ExpensesLayout";
import { useMediaQuery } from "@mantine/hooks";
import { IconCheck, IconX } from "@tabler/icons-react";

interface Props {
  editedExpense: Expense;
  setEditedExpense: (expense: Expense) => void;
  onSave: (expense: Expense) => void;
  onCancel: () => void;
}

const EditableRow = ({
  editedExpense,
  setEditedExpense,
  onSave,
  onCancel,
}: Props) => {
  const widthLessThan576 = useMediaQuery("(max-width: 576px)");
  const paddingX = widthLessThan576 ? "xs" : "lg";

  const { description, amount, category } = editedExpense;

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
  return (
    <>
      <td>
        <TextInput
          aria-label="edit description"
          value={description}
          onChange={(event) =>
            setEditedExpense({
              ...editedExpense,
              description: event.currentTarget.value,
            })
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
          onChange={(value) =>
            setEditedExpense({
              ...editedExpense,
              amount: Number(value),
            })
          }
          error={amountErrorMsg}
        />
      </td>
      <td>
        <Select
          aria-label="edit category"
          data={[...categories]}
          value={category}
          onChange={(value) =>
            setEditedExpense({
              ...editedExpense,
              category: value!,
            })
          }
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
          <Button variant="light" color="gray" px={paddingX} onClick={onCancel}>
            {widthLessThan576 ? <IconX /> : "Cancel"}
          </Button>
        </Center>
      </td>
    </>
  );
};

export default EditableRow;
