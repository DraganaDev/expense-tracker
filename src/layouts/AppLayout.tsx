import { Container, Group, Title } from "@mantine/core";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "../components/ErrorFallback";
import ThemeSwitch from "../components/ThemeSwitch";
import ExpensesLayout from "./ExpensesLayout";

const AppLayout = () => {
  return (
    <Container size={1000} mx="auto">
      <Group
        position="apart"
        my="xl"
        mx="auto"
        maw={{ base: "40rem", md: "50rem", lg: "55rem" }}
      >
        <Title c="grape.8">Expense tracker</Title>
        <ThemeSwitch />
      </Group>

      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <ExpensesLayout />
      </ErrorBoundary>
    </Container>
  );
};

export default AppLayout;
