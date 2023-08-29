import { Text, Button, Flex } from "@mantine/core";
import { useErrorBoundary } from "react-error-boundary";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import { SerializedError } from "@reduxjs/toolkit";

interface Props {
  error: Error | FetchBaseQueryError | SerializedError;
}

const ErrorFallback = ({ error }: Props) => {
  const { resetBoundary } = useErrorBoundary();

  let errorMsg: string | undefined = undefined;

  if ("status" in error) {
    errorMsg =
      "error" in error ? error.error : `An error ${error.status} occured`;
  } else {
    errorMsg = error.message;
  }

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
      <Text size="lg">{errorMsg}</Text>
      <Button mt="xl" color="grape" onClick={resetBoundary}>
        Try again
      </Button>
    </Flex>
  );
};

export default ErrorFallback;
