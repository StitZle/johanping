import { Alert } from "@mantine/core";
import { IconExclamationCircle } from "@tabler/icons-react";
import { FormattedMessage, useIntl } from "react-intl";
import { TranslationKey, TranslationValues } from "../../../shared/intl/languageInitializer";

export enum InfoBoxType {
  INFO,
  SUCCESS,
  WARNING,
  ERROR,
}

export type InfoBoxProps = {
  type: InfoBoxType;
  titleId?: TranslationKey;
  titleValues?: TranslationValues;
  textId: TranslationKey;
};

const InfoBox = ({ type, titleId, titleValues, textId }: InfoBoxProps) => {
  const { formatMessage } = useIntl();

  const determineColor = () => {
    switch (type) {
      case InfoBoxType.INFO:
        return "blue";
      case InfoBoxType.SUCCESS:
        return "green";
      case InfoBoxType.WARNING:
        return "orange";
      case InfoBoxType.ERROR:
        return "red";
    }
  };

  return (
    <Alert
      variant="light"
      radius="md"
      color={determineColor()}
      title={titleId ? formatMessage({ id: titleId }, titleValues) : undefined}
      icon={<IconExclamationCircle />}
      my="md"
    >
      <FormattedMessage id={textId} />
    </Alert>
  );
};

export default InfoBox;
