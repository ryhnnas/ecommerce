import { createBrowserRouter } from "react-router-dom";
import Layout from "./Layout";
import RegisterForm from "./components/RegisterForm"; // Asumsi path
import LoginForm from "./components/LoginForm";       // Asumsi path
import Homepage from "./components/Homepage";         // Impor komponen Homepage

export const router = createBrowserRouter([
    {
        path: "/register",
        element: <RegisterForm />
    },
    {
        path: "/login",
        element: <LoginForm />
    },
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                index: true,
                element: <Homepage /> // Gunakan komponen dengan PascalCase
            },
            // rute anak lainnya bisa ditambahkan di sini
        ]
    }
]);