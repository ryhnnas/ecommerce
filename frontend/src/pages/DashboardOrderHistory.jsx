import React from 'react';
// Impor ikon dari library lucide-react
import { LayoutDashboard, Package, Truck, ShoppingCart, Heart, Store, CreditCard, Settings, LogOut, ChevronLeft, ChevronRight } from 'lucide-react';

// =================================================================================
// 1. KOMPONEN CSS (Disimpan dalam satu file sesuai permintaan)
// =================================================================================
const Styles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

    .dashboard-page {
      font-family: 'Inter', sans-serif;
      background-color: #f8f9fa;
      min-height: 100vh;
      padding: 24px;
    }

    /* Header & Breadcrumb */
    .breadcrumb {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 14px;
      color: #6c757d;
      margin-bottom: 24px;
    }
    .breadcrumb a {
      color: #6c757d;
      text-decoration: none;
    }
    .breadcrumb a:hover {
      text-decoration: underline;
    }
    .breadcrumb span.active {
      color: #343a40;
      font-weight: 500;
    }

    /* Main Layout */
    .dashboard-layout {
      display: flex;
      gap: 24px;
      align-items: flex-start;
    }

    /* Sidebar */
    .sidebar {
      flex: 0 0 260px;
      background-color: #ffffff;
      border-radius: 8px;
      padding: 16px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
    }
    .sidebar-nav ul {
      list-style: none;
      padding: 0;
      margin: 0;
    }
    .sidebar-nav li a {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 12px 16px;
      text-decoration: none;
      color: #495057;
      border-radius: 6px;
      font-weight: 500;
      transition: background-color 0.2s, color 0.2s;
    }
    .sidebar-nav li a:hover {
      background-color: #f1f3f5;
    }
    .sidebar-nav li a.active {
      background-color: #0d6efd;
      color: #ffffff;
    }
    .sidebar-nav li a.active svg {
      color: #ffffff;
    }
    .sidebar-hr {
      border: none;
      border-top: 1px solid #e9ecef;
      margin: 16px 0;
    }

    /* Main Content */
    .main-content {
      flex: 1;
      background-color: #ffffff;
      border-radius: 8px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
      overflow: hidden; /* Important for table responsiveness */
    }
    .content-header {
      padding: 24px;
      border-bottom: 1px solid #e9ecef;
    }
    .content-header h1 {
      font-size: 18px;
      font-weight: 700;
      color: #343a40;
      margin: 0;
    }

    /* Table Styling */
    .table-container {
      overflow-x: auto;
    }
    .order-table {
      width: 100%;
      border-collapse: collapse;
    }
    .order-table th, .order-table td {
      padding: 16px 24px;
      text-align: left;
      font-size: 14px;
      border-bottom: 1px solid #e9ecef;
    }
    .order-table th {
      color: #868e96;
      font-weight: 600;
      text-transform: uppercase;
      font-size: 12px;
      background-color: #f8f9fa;
    }
    .order-table td {
      color: #495057;
      vertical-align: middle;
    }
    .order-table tr:last-child td {
      border-bottom: none;
    }

    /* Status Pills */
    .status {
      font-weight: 600;
      font-size: 12px;
    }
    .status-completed { color: #198754; }
    .status-canceled { color: #dc3545; }
    .status-in-progress { color: #ffc107; }

    /* Action Link */
    .action-link {
      color: #0d6efd;
      font-weight: 600;
      text-decoration: none;
      display: flex;
      align-items: center;
      gap: 4px;
    }

    /* Pagination */
    .pagination {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 24px;
      border-top: 1px solid #e9ecef;
      gap: 8px;
    }
    .pagination button {
      display: flex;
      justify-content: center;
      align-items: center;
      border: 1px solid #dee2e6;
      background-color: #ffffff;
      color: #495057;
      border-radius: 6px;
      cursor: pointer;
      font-weight: 500;
      transition: background-color 0.2s;
    }
    .pagination button:disabled {
      cursor: not-allowed;
      opacity: 0.5;
    }
    .pagination button.page-arrow {
      width: 38px;
      height: 38px;
    }
    .pagination button.page-number {
      width: 38px;
      height: 38px;
    }
    .pagination button.active, .pagination button:hover {
      background-color: #0d6efd;
      color: #ffffff;
      border-color: #0d6efd;
    }

    /* Footer */
    .footer {
      text-align: center;
      margin-top: 24px;
      font-size: 14px;
      color: #6c757d;
    }
  `}</style>
);

// =================================================================================
// 2. DATA DUMMY (Sesuai gambar)
// =================================================================================
const orderData = [
  { id: '#98459761', status: 'IN PROGRESS', date: 'Dec 30, 2019 07:52', total: '$80 (5 Products)' },
  { id: '#711667167', status: 'COMPLETED', date: 'Dec 7, 2019 23:26', total: '$70 (4 Products)' },
  { id: '#95214362', status: 'CANCELED', date: 'Dec 7, 2019 23:26', total: '$2,300 (2 Products)' },
  { id: '#711667167', status: 'COMPLETED', date: 'Feb 2, 2019 19:28', total: '$250 (1 Products)' },
  { id: '#51746385', status: 'COMPLETED', date: 'Dec 30, 2019 07:52', total: '$860 (2 Products)' },
  { id: '#51746385', status: 'CANCELED', date: 'Dec 4, 2019 21:42', total: '$220 (7 Products)' },
  { id: '#6738717743', status: 'COMPLETED', date: 'Feb 2, 2019 19:28', total: '$60 (1 Products)' },
  { id: '#6738717743', status: 'COMPLETED', date: 'Mar 20, 2019 23:14', total: '$180 (1 Products)' },
  { id: '#6738717743', status: 'COMPLETED', date: 'Dec 4, 2019 21:42', total: '$1,550 (3 Products)' },
  { id: '#6738717743', status: 'COMPLETED', date: 'Dec 30, 2019 07:52', total: '$1,200 (19 Products)' },
  { id: '#6738717743', status: 'CANCELED', date: 'Dec 30, 2019 05:18', total: '$1,500 (1 Products)' },
  { id: '#6738717743', status: 'COMPLETED', date: 'Dec 30, 2019 07:52', total: '$80 (1 Products)' },
];

const getStatusClass = (status) => {
  switch (status) {
    case 'COMPLETED': return 'status-completed';
    case 'CANCELED': return 'status-canceled';
    case 'IN PROGRESS': return 'status-in-progress';
    default: return '';
  }
};

// =================================================================================
// 3. KOMPONEN HEADER, SIDEBAR, FOOTER
// =================================================================================

// Header Component (src/components/header.jsx)
const Header = () => (
  <header>
    <nav className="breadcrumb">
      <a href="#">Home</a>
      <span>/</span>
      <a href="#">User Account</a>
      <span>/</span>
      <span className="active">Riwayat Pemesanan</span>
    </nav>
  </header>
);

// Footer Component (src/components/footer.jsx)
const Footer = () => (
  <footer className="footer">
    <p>&copy; {new Date().getFullYear()} Your Company Name. All rights reserved.</p>
  </footer>
);

// Sidebar Component
const Sidebar = () => {
  const navItems = [
    { icon: <LayoutDashboard size={20} />, label: 'Dashboard' },
    { icon: <Package size={20} />, label: 'Riwayat Pemesanan', active: true },
    { icon: <Truck size={20} />, label: 'Lacak Pesanan' },
    { icon: <ShoppingCart size={20} />, label: 'Keranjang Belanja' },
    { icon: <Heart size={20} />, label: 'Wishlist' },
    { icon: <Store size={20} />, label: 'Buka Toko' },
    { icon: <CreditCard size={20} />, label: 'Kartu & Alamat' },
    { icon: <Settings size={20} />, label: 'Pengaturan' },
  ];

  return (
    <aside className="sidebar">
      <nav className="sidebar-nav">
        <ul>
          {navItems.map(item => (
            <li key={item.label}>
              <a href="#" className={item.active ? 'active' : ''}>
                {item.icon}
                <span>{item.label}</span>
              </a>
            </li>
          ))}
        </ul>
        <hr className="sidebar-hr" />
        <ul>
          <li>
            <a href="#">
              <LogOut size={20} />
              <span>Log-out</span>
            </a>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

// =================================================================================
// 4. KOMPONEN UTAMA
// =================================================================================
const DashboardOrderHistory = () => {
  return (
    <>
      <Styles /> {/* Ini akan memasukkan semua CSS di atas */}
      <div className="dashboard-page">
        <Header />
        <div className="dashboard-layout">
          <Sidebar />
          <main className="main-content">
            <div className="content-header">
              <h1>ORDER HISTORY</h1>
            </div>
            <div className="table-container">
              <table className="order-table">
                <thead>
                  <tr>
                    <th>ORDER ID</th>
                    <th>STATUS</th>
                    <th>DATE</th>
                    <th>TOTAL</th>
                    <th>ACTION</th>
                  </tr>
                </thead>
                <tbody>
                  {orderData.map((order, index) => (
                    <tr key={index}>
                      <td>{order.id}</td>
                      <td>
                        <span className={`status ${getStatusClass(order.status)}`}>
                          {order.status}
                        </span>
                      </td>
                      <td>{order.date}</td>
                      <td>{order.total}</td>
                      <td>
                        <a href="#" className="action-link">
                          View Details
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="pagination">
              <button className="page-arrow" disabled><ChevronLeft size={18} /></button>
              <button className="page-number active">01</button>
              <button className="page-number">02</button>
              <button className="page-number">03</button>
              <button className="page-number">04</button>
              <button className="page-number">05</button>
              <button className="page-number">06</button>
              <button className="page-arrow"><ChevronRight size={18} /></button>
            </div>
          </main>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default DashboardOrderHistory;