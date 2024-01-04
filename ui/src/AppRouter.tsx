import { createBrowserRouter } from "react-router-dom";
import BasicLayout from "./components/shared/layout/BasicLayout";
import DeviceCreateDrawer from "./components/devices/DeviceCreateDrawer.tsx";
import DeviceViewDrawer from "./components/devices/DeviceViewDrawer.tsx";

export const HOME_ROUTE = "/";
export const DEVICES_ROUTE = "devices";

const router = createBrowserRouter([
  {
    path: HOME_ROUTE,
    element: <BasicLayout />,
    children: [
      {
        path: "create",
        element: <DeviceCreateDrawer />,
      },
      {
        path: "view/:deviceId",
        element: <DeviceViewDrawer />,
      },
    ],
  },
]);

export default router;
