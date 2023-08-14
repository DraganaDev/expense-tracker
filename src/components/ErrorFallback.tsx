import { Text, Button, Flex } from "@mantine/core";
import { useErrorBoundary } from "react-error-boundary";

interface Props {
  error: Error;
}
const ErrorFallback = ({ error }: Props) => {
  const { resetBoundary } = useErrorBoundary();

  return (
    <Flex
      direction="column"
      mx="auto"
      align="center"
      justify="center"
      h={400}
      w={400}
    >
      <Text size="lg">Something went wrong:</Text>
      <Text size="lg">{error.message}</Text>
      <Button mt="xl" color="grape" onClick={resetBoundary}>
        Try again
      </Button>
    </Flex>
  );
};

export default ErrorFallback;
