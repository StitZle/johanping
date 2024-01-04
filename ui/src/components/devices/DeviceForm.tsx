import { Control } from "react-hook-form";
import { Grid } from "@mantine/core";
import { TextInput } from "react-hook-form-mantine";
import { useIntl } from "react-intl";
import { Device } from "./deviceTypes.ts";

type OrganisationFormProps = {
  control: Control<Device>;
};

const DeviceForm = ({ control }: OrganisationFormProps) => {
  const { formatMessage } = useIntl();

  return (
    <form>
      <Grid>
        <Grid.Col span={12}>
          <TextInput name="name" control={control} withAsterisk label={formatMessage({ id: "device.label.name" })} />
        </Grid.Col>
        <Grid.Col span={12}>
          <TextInput
            name="address"
            control={control}
            withAsterisk
            label={formatMessage({ id: "device.label.address" })}
          />
        </Grid.Col>
      </Grid>
    </form>
  );
};

export default DeviceForm;
