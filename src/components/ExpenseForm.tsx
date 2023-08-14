import { TextInput, NumberInput, Select, Button, Box } from "@mantine/core";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { categories } from "../categories";

const expenseSchema = z.object({
  description: z
    .string()
    .min(3, { message: "Description must be at least 3 characters" })
    .max(50, { message: "Description must be less than 50 characters" }),
  amount: z
    .number({
      required_error: "Amount is required",
    })
    .min(0.05, { message: "Amount must be at least 0.05" })
    .max(100_000, { message: "Amount must be less than 100 000" }),
  category: z.enum(categories),
});

export type ExpenseData = z.infer<typeof expenseSchema>;

interface Props {
  addExpense: (expense: ExpenseData) => void;
}

const ExpenseForm = ({ addExpense }: Props) => {
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<ExpenseData>({
    resolver: zodResolver(expenseSchema),
    defaultValues: { description: "", amount: 0, category: "Groceries" },
  });

  const labelAndAsterisk = {
    label: { color: "steelblue" },
    required: { color: "violet" },
  };

  return (
    <Box maw={350} mx="auto" pb="xl">
      <form
        onSubmit={handleSubmit((data) => {
          addExpense(data);
          reset();
        })}
      >
        <Controller
          name="description"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <TextInput
              {...field}
              label="Description"
              withAsterisk
              styles={labelAndAsterisk}
              error={errors.description?.message}
              mb="xs"
            />
          )}
        />

        <Controller
          name="amount"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <NumberInput
              withAsterisk
              styles={labelAndAsterisk}
              label="Amount"
              {...field}
              onChange={(value) => field.onChange(value)}
              precision={2}
              min={0}
              error={errors.amount?.message}
              mb="xs"
            />
          )}
        />

        <Controller
          name="category"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <Select
              label="Category"
              styles={{ label: { color: "steelblue" } }}
              {...field}
              data={[...categories]}
              mb="xl"
            />
          )}
        />

        <Button color="grape" type="submit">
          Add expense
        </Button>
      </form>
    </Box>
  );
};

export default ExpenseForm;
