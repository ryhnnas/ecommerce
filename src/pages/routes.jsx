import { createBrowserRouter } from "react-router-dom";
import Layout from "./Layout";
import RegisterForm from "./register"; // Asumsi path
import LoginForm from "./login";       // Asumsi path
import Homepage from "./homepage";         // Impor komponen Homepage
import AddProduct from "./addProduct";
import Dashboard from "./dashboard";
import DashboardOrderHistory from "./dashboardOrderHistory";
import ProductDetails from "./ProductDetails"; // Pastikan path ini benar
import DashboardOrderDetail from "./DashboardOrderDetail";
import DashboardBrowseHistory from "./DashboardBrowseHistory";
import DashboardSetting from "./DashboardSetting";
import DashboardWishlist from "./DashboardWishlist";
import DashboardBukaToko from "./DashboardBukaToko";
import DashboardLihatToko from "./DashboardLihatToko";
import Checkout from "./checkout";
import Cart from "./cart";

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
        path: "/addProduct",
        element: <AddProduct />
    },
    {
        path: "/cart",
        element: <Cart />
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
            {
                path: "/dashboardorderhistory",
                element: <DashboardOrderHistory/> // Gunakan komponen dengan PascalCase
            },
            {
                path: "/dashboardorderdetail",
                element: <DashboardOrderDetail/> // Gunakan komponen dengan PascalCase
            },
            {
                path: "/dashboardbrowsehistory",
                element: <DashboardBrowseHistory/> // Gunakan komponen dengan PascalCase
            },
            {
                path: "/dashboardsetting",
                element: <DashboardSetting/> // Gunakan komponen dengan PascalCase
            },
            {
                path: "/dashboardwishlist",
                element: <DashboardWishlist/> // Gunakan komponen dengan PascalCase
            },
            {
                path: "/dashboardbukatoko",
                element: <DashboardBukaToko/> // Gunakan komponen dengan PascalCase
            },
            {
                path: "/dashboardlihattoko",
                element: <DashboardLihatToko/> // Gunakan komponen dengan PascalCase
            },
            {
                path: "/productdetails",
                element: <ProductDetails />
            },
            {
                path: "/checkout",
                element: <Checkout/>
            },
            // rute anak lainnya bisa ditambahkan di sini
        ]
    },
]);