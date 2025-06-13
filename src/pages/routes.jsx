import { createBrowserRouter } from "react-router-dom";
import Layout from "./Layout";
import RegisterForm from "./register";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                index: true,
                element: <RegisterForm/>
            },
        ]
    }
])
