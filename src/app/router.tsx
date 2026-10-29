import { createBrowserRouter } from "react-router-dom";
import { WeatherWidgetScreen } from "../modules/weather-display/screens/WeatherWidgetScreen";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <WeatherWidgetScreen />,
  },
]);
