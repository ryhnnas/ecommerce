import { createBrowserRouter, useNavigate } from "react-router-dom";
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
import DashboardLogout from "./DashboardLogout";
import CheckoutSuccess from "../components/checkoutBerhasil";
import CheckoutGagal from "../components/checkoutGagal";
import ProductReviews from "../components/ProductReview";
import { useEffect, useState } from "react";
import SearchPage from "./searchPage";
// import PrivateRoute from "../middleware/middleware";

const PrivateRoute = ({ element, ...rest }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  
  useEffect(() => {
    const authToken = localStorage.getItem('authToken'); // Ambil token dari localStorage
    if (!authToken) {
      // Jika tidak ada token, redirect ke halaman login
      navigate('/login');
    } else {
      setIsAuthenticated(true); // Jika ada token, tandai sebagai authenticated
    }
  }, [navigate]);

  // Jika user sudah authenticated, tampilkan elemen, jika tidak redirect ke login
  return isAuthenticated ? element : null;
};

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
                element: <PrivateRoute element={<Dashboard />} /> // Gunakan komponen dengan PascalCase
            },
            {
                path: "/dashboardorderhistory",
                element: <DashboardOrderHistory /> // Gunakan komponen dengan PascalCase
            },
            {
                path: "/dashboardorderdetail",
                element: <DashboardOrderDetail /> // Gunakan komponen dengan PascalCase
            },
            {
                path: "/dashboardbrowsehistory",
                element: <DashboardBrowseHistory /> // Gunakan komponen dengan PascalCase
            },
            {
                path: "/dashboardsetting",
                element: <DashboardSetting /> // Gunakan komponen dengan PascalCase
            },
            {
                path: "/dashboardwishlist",
                element: <DashboardWishlist /> // Gunakan komponen dengan PascalCase
            },
            {
                path: "/dashboardbukatoko",
                element: <DashboardBukaToko /> // Gunakan komponen dengan PascalCase
            },
            {
                path: "/dashboardlihattoko",
                element: <DashboardLihatToko /> // Gunakan komponen dengan PascalCase
            },
            {
                path: "/productdetails/:id",
                element: <ProductDetails />
            },
            {
                path: "/checkout",
                element: <Checkout />
            },
            {
                path: "/checkout-success",
                element: <CheckoutSuccess />
            },
            {
                path: "/checkout-gagal",
                element: <CheckoutGagal />
            },
            {
                path: "/dashboardlogout",
                element: <DashboardLogout />
            },
            {
                path: "/search/:name",
                element: <SearchPage />
            }
            // rute anak lainnya bisa ditambahkan di sini
        ]
    },
]);