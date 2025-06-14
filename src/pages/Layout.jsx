import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import HeaderLoggedIn from '../components/HeaderLoggedIn';
import HeaderLoggedOut from '../components/HeaderLoggedOut';
import Footer from '../components/footer';

const Layout = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        setIsAuthenticated(token !== null);
    }, [location.pathname]);

    return (
        <>
            {isAuthenticated ? <HeaderLoggedIn /> : <HeaderLoggedOut />}
            <main>
                <Outlet /> 
            </main>
            <Footer />
        </>
    );
};
export default Layout;