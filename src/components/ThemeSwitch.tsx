import { useMantineColorScheme, useMantineTheme, Switch } from "@mantine/core";
import { IconSunHigh, IconMoon } from "@tabler/icons-react";

const ThemeSwitch = () => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const theme = useMantineTheme();
  return (
    <Switch
      checked={colorScheme === "dark"}
      onChange={() => toggleColorScheme()}
      onLabel={
        <IconSunHigh size="1rem" stroke={2} color={theme.colors.yellow[4]} />
      }
      offLabel={
        <IconMoon size="1rem" stroke={2} color={theme.colors.blue[8]} />
      }
      color="grape"
      size="md"
    />
  );
};

export default ThemeSwitch;
