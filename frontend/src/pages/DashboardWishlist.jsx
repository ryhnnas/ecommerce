import React from 'react';
// Impor ikon dari library lucide-react
import { 
  LayoutDashboard, Package, Truck, ShoppingCart, Heart, Store, CreditCard, Settings, LogOut,
  Search, Bell, User, XCircle
} from 'lucide-react';

// =================================================================================
// 1. KOMPONEN CSS
// =================================================================================
const Styles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

    /* General & Layout Styles */
    body {
        margin: 0;
        font-family: 'Inter', sans-serif;
        background-color: #f8f9fa;
    }
    .page-container {
        font-family: 'Inter', sans-serif;
    }
    .dashboard-page-content {
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
    
    /* Sidebar */
    .sidebar-nav ul { list-style: none; padding: 0; margin: 0; }
    .sidebar-nav li a {
      display: flex; align-items: center; gap: 12px; padding: 12px 16px;
      text-decoration: none; color: #495057; border-radius: 6px; font-weight: 500;
    }
    .sidebar-nav li a:hover { background-color: #f1f3f5; }
    .sidebar-nav li a.active { background-color: #0d6efd; color: #ffffff; }
    .sidebar-nav li a.active svg { color: #ffffff; }

    /* Wishlist Table */
    .wishlist-table {
        width: 100%;
        border-collapse: collapse;
    }
    .wishlist-table th, .wishlist-table td {
        padding: 16px 8px;
        text-align: left;
        border-bottom: 1px solid #e9ecef;
    }
    .wishlist-table th {
        font-size: 12px;
        font-weight: 600;
        text-transform: uppercase;
        color: #6c757d;
    }
    .wishlist-table tr:last-child td {
        border-bottom: none;
    }
    .product-cell { display: flex; align-items: center; gap: 16px; }
    .product-cell img { width: 60px; height: 60px; object-fit: cover; border-radius: 6px; }
    .product-cell .product-name { font-size: 14px; font-weight: 500; color: #343a40; }
    .price-cell { font-size: 14px; font-weight: 600; color: #343a40; }
    .price-cell .old-price { font-weight: 400; text-decoration: line-through; color: #adb5bd; margin-right: 8px; }
    .stock-status.in-stock { color: #198754; font-weight: 600; }
    .stock-status.out-of-stock { color: #dc3545; font-weight: 600; }
    .actions-cell { display: flex; align-items: center; gap: 16px; }
    .add-to-cart-btn {
        background-color: #0d6efd;
        color: white;
        border: none;
        padding: 10px 16px;
        border-radius: 6px;
        font-weight: 600;
        cursor: pointer;
    }
    .add-to-cart-btn:disabled {
        background-color: #e9ecef;
        color: #adb5bd;
        cursor: not-allowed;
    }
    .remove-btn { color: #6c757d; cursor: pointer; }
    .remove-btn:hover { color: #dc3545; }

    @media (max-width: 992px) {
      .app-header { flex-direction: column; padding: 16px; }
      .dashboard-layout { flex-direction: column; }
      .sidebar { flex: 0 0 auto; width: 100%; }
    }
  `}</style>
);

// =================================================================================
// 2. DATA DUMMY
// =================================================================================
const wishlistItems = [
    {
        img: 'https://i.imgur.com/rS2Gj5i.png',
        name: 'Bose Sport Earbuds - Wireless Earphones - Bluetooth In Ear Headphones for Workouts and Running, Triple Black',
        oldPrice: '$12.99',
        price: '$9.99',
        inStock: true,
    },
    {
        img: 'https://i.imgur.com/N5QZzEw.png',
        name: 'Simple Mobile 5G LTE Galaxy 12 Mini 512GB Gaming Phone',
        price: '$2,300.00',
        inStock: true,
    },
    {
        img: 'https://i.imgur.com/Hl51cI5.png',
        name: 'Portable Miding Machine, 11lbs capacity Model 18NMF...',
        price: '$70.00',
        inStock: true,
    },
    {
        img: 'https://i.imgur.com/vT6V0aw.png',
        name: 'TCL T6 True Wireless Earbuds Bluetooth Headphones Touch Control with Wireless Charging Case IPX8 Waterproof Stereo Earphones in-Ear',
        oldPrice: '$350.00',
        price: '$200.00',
        inStock: false,
    },
    {
        img: 'https://i.imgur.com/5lDiyx1.png',
        name: 'Wyze Cam Pan v2 1080p Pan/Tilt/Zoom Wi-Fi Indoor Smart Home Camera with Color Night Vision, 2-Way Audio',
        price: '$1,499.99',
        inStock: true,
    },
];

// =================================================================================
// 3. KOMPONEN-KOMPONEN
// =================================================================================

const AppHeader = () => (
    <header className="app-header">
        <div className="header-actions">
        </div>
    </header>
);

const BreadcrumbHeader = () => (
  <header>
    <nav className="breadcrumb"><a href="#">Home</a> / <a href="#">User Account</a> / <span style={{color: '#343a40', fontWeight: '500'}}>Wishlist</span></nav>
  </header>
);

const Sidebar = () => {
    const navItems = [
      { icon: <LayoutDashboard size={20} />, label: 'Dashboard' },
      { icon: <Package size={20} />, label: 'Track Order' },
      { icon: <ShoppingCart size={20} />, label: 'Shopping Cart' },
      { icon: <Heart size={20} />, label: 'Wishlist', active: true },
      { icon: <Store size={20} />, label: 'Buka Toko' },
      { icon: <CreditCard size={20} />, label: 'Cards & Address' },
      { icon: <Settings size={20} />, label: 'Browse History' },
      { icon: <Settings size={20} />, label: 'Setting' },
      { icon: <LogOut size={20} />, label: 'Log-out' },
    ];
    // Simplified list based on image context
    return (
      <aside className="sidebar">
        <nav className="sidebar-nav">
          <ul>{navItems.map(item => (<li key={item.label}><a href="#" className={item.active ? 'active' : ''}>{item.icon}<span>{item.label}</span></a></li>))}</ul>
        </nav>
      </aside>
    );
};

// =================================================================================
// 4. KOMPONEN UTAMA
// =================================================================================
const DashboardWishlist = () => {
    return (
      <>
        <Styles />
        <div className="page-container">
            <AppHeader />
            <div className="dashboard-page-content">
                <BreadcrumbHeader />
                <div className="dashboard-layout">
                    <Sidebar />
                    <div className="main-content">
                        <div className="card">
                            <h1 style={{fontSize: '20px', fontWeight: 600, margin: '0 0 24px 0'}}>Wishlist</h1>
                            <table className="wishlist-table">
                                <thead>
                                    <tr>
                                        <th style={{width: '50%'}}>PRODUCTS</th>
                                        <th>PRICE</th>
                                        <th>STOCK STATUS</th>
                                        <th>ACTIONS</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {wishlistItems.map((item, index) => (
                                        <tr key={index}>
                                            <td>
                                                <div className="product-cell">
                                                    <img src={item.img} alt={item.name} />
                                                    <span className="product-name">{item.name}</span>
                                                </div>
                                            </td>
                                            <td className="price-cell">
                                                {item.oldPrice && <span className="old-price">{item.oldPrice}</span>}
                                                <span>{item.price}</span>
                                            </td>
                                            <td>
                                                <span className={`stock-status ${item.inStock ? 'in-stock' : 'out-of-stock'}`}>
                                                    {item.inStock ? 'IN STOCK' : 'OUT OF STOCK'}
                                                </span>
                                            </td>
                                            <td>
                                                <div className="actions-cell">
                                                    <button className="add-to-cart-btn" disabled={!item.inStock}>
                                                        ADD TO CART
                                                    </button>
                                                    <XCircle size={22} className="remove-btn" />
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </>
    );
};
  
export default DashboardWishlist;