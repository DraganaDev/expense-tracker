import { TextInput, NumberInput, Select, Button, Center } from "@mantine/core";
import { categories } from "../categories";
import { Expense } from "../layouts/ExpensesLayout";

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
  const amountErrorMsg =
    editedExpense.amount < 0.05
      ? "Amount must be at least 0.05"
      : editedExpense.amount > 100000
      ? "Amount must be less than 100000"
      : "";

  const descriptionErrorMsg =
    editedExpense.description.length < 3
      ? "Description must be at least 3 characters"
      : editedExpense.description.length > 50
      ? "Description must be less than 50 characters"
      : "";
  return (
    <>
      <td>
        <TextInput
          aria-label="edit description"
          value={editedExpense.description}
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
          value={editedExpense.amount}
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
          value={editedExpense.category}
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
          <Button mr="xs" variant="light" onClick={() => onSave(editedExpense)}>
            Save
          </Button>
          <Button variant="light" color="gray" onClick={onCancel}>
            Cancel
          </Button>
        </Center>
      </td>
    </>
  );
};

export default EditableRow;
