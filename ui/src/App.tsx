import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RawIntlProvider } from "react-intl";
import { intl } from "./shared/intl/languageInitializer";
import { MantineProvider } from "@mantine/core";
import { RouterProvider } from "react-router-dom";
import router from "./AppRouter";
import { Notifications } from "@mantine/notifications";
import { theme } from "./theme";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";

//Mantine Hook Form: https://github.com/aranlucas/react-hook-form-mantine/blob/master/example/src/App.tsx
const App = () => {
  const client = new QueryClient();

  return (
    <QueryClientProvider client={client}>
      <RawIntlProvider value={intl}>
        <MantineProvider theme={theme} defaultColorScheme="dark">
          <RouterProvider router={router} />
          <Notifications position="top-right" />
        </MantineProvider>
      </RawIntlProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default App;
