import { ActionIcon, Group, Title, Tooltip, useMantineColorScheme } from "@mantine/core";
import { IconMoonStars, IconSun } from "@tabler/icons-react";
import { useIntl } from "react-intl";

const AppHeader = () => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  const { formatMessage } = useIntl();

  return (
    <Group h="100%" px="md">
      <Title order={4}>Johan-Ping</Title>
      <Tooltip
        label={
          colorScheme === "dark"
            ? formatMessage({ id: "common.button.styling.light-mode" })
            : formatMessage({ id: "common.button.styling.dark-mode" })
        }
      >
        <ActionIcon variant="default" onClick={() => toggleColorScheme()} size={30}>
          {colorScheme === "dark" ? <IconSun color="yellow" size={16} /> : <IconMoonStars size={16} />}
        </ActionIcon>
      </Tooltip>
    </Group>
  );
};

export default AppHeader;
