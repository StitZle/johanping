import dayjs from "dayjs";
import LocalizedFormat from "dayjs/plugin/localizedFormat";
import "dayjs/locale/en";
import "dayjs/locale/de";

dayjs.extend(LocalizedFormat);

export { dayjs };

export const setDayjsLocale = (locale: string) => {
  dayjs.locale(locale);
};

export const customTableDateTimeFormat = (date: string | null) => {
  return date ? dayjs(date).format("ll - LT") : "-";
};
