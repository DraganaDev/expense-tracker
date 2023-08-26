import {
  MantineProvider,
  ColorSchemeProvider,
  type ColorScheme,
} from "@mantine/core";
import { useState } from "react";
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
        <AppLayout />
      </MantineProvider>
    </ColorSchemeProvider>
  );
}

export default App;
