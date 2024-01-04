import { AppShell } from "@mantine/core";
import AppHeader from "./AppHeader";
import Devices from "../../devices/Devices.tsx";

const BasicLayout = () => {
  return (
    <AppShell header={{ height: 60 }} padding="md">
      <AppShell.Header>
        <AppHeader />
      </AppShell.Header>

      <AppShell.Main>
        <Devices />
      </AppShell.Main>
    </AppShell>
  );
};

export default BasicLayout;
