import { Box, Center, Group, Loader, Text } from "@mantine/core";
import ExpenseForm from "../components/ExpenseForm";
import FilterByCategory from "../components/FilterByCategory";
import SearchByDescription from "../components/SearchByDescription";
import TableOfExpenses from "../components/TableOfExpenses";
import { useGetExpensesQuery } from "../features/api/apiSlice";

const ExpensesLayout = () => {
  const { data: expenses, isLoading, error } = useGetExpensesQuery();
  if (error) throw error;

  return (
    <>
      <ExpenseForm />
      {isLoading && (
        <Center mt={100}>
          <Loader size="lg" color="blue.8" />
        </Center>
      )}
      {!isLoading && (
        <Box my="xl">
          {expenses?.length !== 0 ? (
            <>
              <Group
                position="center"
                maw={{
                  base: "30rem",
                }}
                mx="auto"
                my="lg"
              >
                <FilterByCategory />
                <SearchByDescription />
              </Group>

              <TableOfExpenses />
            </>
          ) : (
            <Center>
              <Text size={18} c="grape.7">
                No expenses added yet.
              </Text>
            </Center>
          )}
        </Box>
      )}
    </>
  );
};

export default ExpensesLayout;
