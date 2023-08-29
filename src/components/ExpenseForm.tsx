import { TextInput, NumberInput, Select, Button, Box } from "@mantine/core";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { categories } from "../categories";
import { useCreateExpenseMutation } from "../features/api/apiSlice";
import { useErrorBoundary } from "react-error-boundary";

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

const ExpenseForm = () => {
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<ExpenseData>({
    resolver: zodResolver(expenseSchema),
    defaultValues: { description: "", amount: 0, category: "Groceries" },
  });
  const { showBoundary } = useErrorBoundary();
  const [createExpense] = useCreateExpenseMutation();

  const labelAndAsterisk = {
    label: { color: "steelblue" },
    required: { color: "violet" },
  };

  const addExpense = async (expense: ExpenseData) => {
    const newExpense = { ...expense, id: Math.floor(Math.random() * 100000) };
    try {
      await createExpense(newExpense).unwrap();
      reset();
    } catch (err) {
      showBoundary(err);
    }
  };

  return (
    <Box maw={350} mx="auto" pb="xl">
      <form onSubmit={handleSubmit((data) => addExpense(data))}>
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
              {...field}
              onChange={(value) => field.onChange(value)}
              label="Amount"
              withAsterisk
              styles={labelAndAsterisk}
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
              {...field}
              data={categories}
              label="Category"
              styles={{ label: { color: "steelblue" } }}
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
