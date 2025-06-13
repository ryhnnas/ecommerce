import { createBrowserRouter } from "react-router-dom";
import Layout from "./Layout";
import RegisterForm from "./register"; // Asumsi path
import LoginForm from "./login";       // Asumsi path
import Homepage from "./homepage";         // Impor komponen Homepage
import Dashboard from "./dashboard";
import ProductDetails from "./ProductDetails"; // Pastikan path ini benar

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
            {
                path: "/dashboard",
                element: <Dashboard /> // Gunakan komponen dengan PascalCase
            },
            // rute anak lainnya bisa ditambahkan di sini
        ]
    },
    {
        path: "/productdetails",
        element: <ProductDetails />
    },
]);