import { Navigate, createBrowserRouter } from "react-router-dom";
import App from "../app/App";
import { Login } from "../features/Login/Login";
import { Todos } from "../features/Todos/Todos";
import { ErrorPage } from "../common/components";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Navigate to="/404" />,
    children: [
      {
        index: true,
        element: <Navigate to="/todolists" />,
      },
      {
        path: "/todolists",
        element: <Todos />,
      },
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
  {
    path: "/404",
    element: <ErrorPage />,
  },
]);
