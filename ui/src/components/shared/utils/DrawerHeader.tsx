import { TranslationKey } from "../../../shared/intl/languageInitializer";
import { Text } from "@mantine/core";
import { useIntl } from "react-intl";

type DrawerHeaderProps = {
  headerTranslationId: TranslationKey;
};

const DrawerHeader = ({ headerTranslationId }: DrawerHeaderProps) => {
  const { formatMessage } = useIntl();

  return <Text fw={700}>{formatMessage({ id: headerTranslationId })}</Text>;
};

export default DrawerHeader;
