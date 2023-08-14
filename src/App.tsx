"use client";
import {
  MantineProvider,
  ColorSchemeProvider,
  type ColorScheme,
} from "@mantine/core";
// import ExpensesLayout from "./layouts/ExpensesLayout";
import { useState } from "react";

import { Text } from "@mantine/core";
import { Suspense } from "react";
import AppLayout from "./layouts/AppLayout";

function App() {
  const [themeValue, setThemeValue] = useState<ColorScheme>("dark");

  const toggleColorScheme = (value?: ColorScheme) => {
    const newTheme = themeValue === "dark" ? "light" : "dark";
    setThemeValue(value || newTheme);
  };

  return (
    <ColorSchemeProvider
      colorScheme={themeValue}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider
        theme={{ colorScheme: themeValue }}
        withGlobalStyles
        withNormalizeCSS
      >
        <Suspense fallback={<Text color="red">Loading...</Text>}>
          <AppLayout />
        </Suspense>
      </MantineProvider>
    </ColorSchemeProvider>
  );
}

export default App;
