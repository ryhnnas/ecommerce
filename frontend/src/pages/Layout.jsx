import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import HeaderLoggedIn from '../components/HeaderLoggedIn';
import HeaderLoggedOut from '../components/HeaderLoggedOut';
import Footer from '../components/footer';

const Layout = () => {
    // State untuk menyimpan status login
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // Hook untuk mendeteksi perubahan URL
    const location = useLocation();

    // useEffect akan berjalan setiap kali URL berubah (pengguna pindah halaman)
    // Ini memastikan header selalu update
    useEffect(() => {
        const token = localStorage.getItem('authToken');
        setIsAuthenticated(token !== null);
    }, [location.pathname]); // <-- Kunci: Dijalankan ulang saat path URL berubah

    return (
        <>
            {/* Logika utama: Jika isAuthenticated true, tampilkan HeaderLoggedIn. Jika false, tampilkan HeaderLoggedOut. */}
            {isAuthenticated ? <HeaderLoggedIn /> : <HeaderLoggedOut />}
            
            <main>
                {/* Outlet adalah tempat konten halaman (seperti Homepage) akan ditampilkan */}
                <Outlet /> 
            </main>
            
            <Footer />
        </>
    );
};

export default Layout;