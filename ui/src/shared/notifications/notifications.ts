import { notifications } from "@mantine/notifications";
import { formatMessage, TranslationKey, TranslationValues } from "../intl/languageInitializer";

type NotificationsProps = {
  titleId: TranslationKey;
  messageId: TranslationKey;
  values?: TranslationValues;
};

export const showSuccessNotification = ({ titleId, messageId, values }: NotificationsProps) => {
  notifications.show({
    title: formatMessage({ id: titleId }),
    message: formatMessage({ id: messageId }, values),
    autoClose: 3000,
    color: "green",
  });
};

export const showErrorNotification = ({ titleId, messageId, values }: NotificationsProps) => {
  notifications.show({
    title: formatMessage({ id: titleId }),
    message: formatMessage({ id: messageId }, values),
    autoClose: 3000,
    color: "red",
  });
};
