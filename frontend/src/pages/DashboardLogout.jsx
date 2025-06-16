import React from 'react';
import { useNavigate } from 'react-router-dom';

// Impor ikon dari library lucide-react
import {
    LayoutDashboard, Package, Truck, ShoppingCart, Heart, Store, CreditCard, Settings, LogOut
} from 'lucide-react';

// =================================================================================
// 1. KOMPONEN CSS (Disimpan dalam satu file untuk konsistensi)
// =================================================================================
const Styles = () => (
    <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

        /* General & Layout Styles */
        .dashboard-page {
            font-family: 'Inter', sans-serif;
            background-color: #f8f9fa;
            min-height: 100vh;
            padding: 24px;
        }
        .breadcrumb {
            display: flex; align-items: center; gap: 8px; font-size: 14px;
            color: #6c757d; margin-bottom: 24px;
        }
        .breadcrumb a { color: #6c757d; text-decoration: none; }
        .dashboard-layout { display: flex; gap: 24px; align-items: flex-start; }
        .sidebar {
            flex: 0 0 260px; background-color: #ffffff; border-radius: 8px;
            padding: 16px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
        }
        .main-content {
            flex: 1; display: flex; flex-direction: column; gap: 24px;
        }
        .card {
            background-color: #ffffff; border-radius: 8px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05); padding: 24px;
        }
        .footer { text-align: center; margin-top: 24px; font-size: 14px; color: #6c757d; }

        /* Sidebar */
        .sidebar-nav ul { list-style: none; padding: 0; margin: 0; }
        .sidebar-nav li a {
            display: flex; align-items: center; gap: 12px; padding: 12px 16px;
            text-decoration: none; color: #495057; border-radius: 6px; font-weight: 500;
            transition: background-color 0.2s, color 0.2s; cursor: pointer;
        }
        .sidebar-nav li a:hover { background-color: #f1f3f5; }
        .sidebar-nav li a.active { background-color: #0C5AA2; color: #ffffff; } /* Merah untuk logout */
        .sidebar-nav li a.active svg { color: #ffffff; }
        .sidebar-hr { border: none; border-top: 1px solid #e9ecef; margin: 16px 0; }

        /* Logout Specific Styles */
        .logout-content {
            text-align: center;
            padding: 40px;
        }
        .logout-content h1 {
            font-size: 24px;
            font-weight: 600;
            color: #343a40;
            margin-bottom: 16px;
        }
        .logout-content p {
            font-size: 16px;
            color: #6c757d;
            margin-bottom: 32px;
        }
        .logout-button {
            background-color: #0C5AA2;
            color: white;
            border: none;
            padding: 12px 30px;
            font-size: 16px;
            font-weight: 600;
            border-radius: 8px;
            cursor: pointer;
            transition: background-color 0.2s ease;
        }
        .logout-button:hover {
            background-color: #0C5AA2;
        }
        
        @media (max-width: 992px) {
            .dashboard-layout { flex-direction: column; }
            .sidebar { flex: 0 0 auto; width: 100%; }
        }
    `}</style>
);

// =================================================================================
// 2. KOMPONEN-KOMPONEN
// =================================================================================
const Header = () => (
    <header>
        <nav className="breadcrumb"><a href="/">Home</a> / <a href="#">User Account</a> / <span style={{color: '#343a40', fontWeight: '500'}}>Log-out</span></nav>
    </header>
);

const Footer = () => (<footer className="footer"><p>&copy; {new Date().getFullYear()} Your Company Name. All rights reserved.</p></footer>);

const Sidebar = ({ onLogout }) => {
    const navigate = useNavigate();
    const navItems = [
        { icon: <LayoutDashboard size={20} />, label: 'Dashboard', path: '/dashboard' },
        { icon: <Package size={20} />, label: 'Riwayat Pemesanan', path: '/order-history' },
        { icon: <Truck size={20} />, label: 'Lacak Pesanan', path: '/track-order' },
        { icon: <ShoppingCart size={20} />, label: 'Keranjang Belanja', path: '/cart' },
        { icon: <Heart size={20} />, label: 'Wishlist', path: '/wishlist' },
        { icon: <Store size={20} />, label: 'Buka Toko', path: '/open-store' },
        { icon: <CreditCard size={20} />, label: 'Kartu & Alamat', path: '/addresses' },
        { icon: <Settings size={20} />, label: 'Riwayat Pencarian', path: '/browse-history' },
        { icon: <LogOut size={20} />, label: 'Log-out', active: true, action: onLogout },
    ];

    return (
        <aside className="sidebar">
            <nav className="sidebar-nav">
                <ul>
                    {navItems.map(item => (
                        <li key={item.label}>
                            <a
                                className={item.active ? 'active' : ''}
                                onClick={() => item.action ? item.action() : navigate(item.path)}
                            >
                                {item.icon}
                                <span>{item.label}</span>
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>
        </aside>
    );
};


// =================================================================================
// 3. KOMPONEN UTAMA
// =================================================================================
const DashboardLogout = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Membersihkan data dari localStorage
        localStorage.removeItem('authToken');
        localStorage.removeItem('userName');

        // Mengarahkan pengguna ke halaman login
        navigate('/login');
    };

    return (
        <>
            <Styles />
            <div className="dashboard-page">
                <Header />
                <div className="dashboard-layout">
                    {/* <Sidebar onLogout={handleLogout} /> */}
                    <div className="main-content">
                        <div className="card">
                            <div className="logout-content">
                                <LogOut size={48} color="#0C5AA2" style={{ marginBottom: '16px' }} />
                                <h1>Apakah Anda yakin ingin keluar?</h1>
                                <p>Anda akan diarahkan ke halaman login setelah keluar.</p>
                                <button className="logout-button" onClick={handleLogout}>
                                    Ya, Log-out Sekarang
                                </button>
                            </div>
                        </div>
                        {/* <Footer /> */}
                    </div>
                </div>
            </div>
        </>
    );
};

export default DashboardLogout;