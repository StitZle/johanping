import { Button, Grid, Paper } from "@mantine/core";
import { Outlet, useNavigate } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import DeviceTable from "./DeviceTable.tsx";

const Devices = () => {
  const navigate = useNavigate();

  return (
    <>
      <Grid>
        <Grid.Col span={{ base: 12 }}>
          <Button mt="md" onClick={() => navigate("./create")}>
            <FormattedMessage id="device.button.create" />
          </Button>
        </Grid.Col>

        <Grid.Col span={12}>
          <Paper shadow="sm" p="sm" radius="md" withBorder mt="sm">
            <DeviceTable />
          </Paper>
        </Grid.Col>
      </Grid>
      <Outlet />
    </>
  );
};

export default Devices;
