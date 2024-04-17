import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import SendForm from "./routes/sendForm/SendForm.tsx";
import Result from "./routes/result/Result.tsx";
import Login from "./routes/login/Login.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/form",
    element: <SendForm />,
  },
  {
    path: "/result",
    element: <Result />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />
);
