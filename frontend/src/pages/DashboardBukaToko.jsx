import React from 'react';
// Impor ikon dari library lucide-react
import { 
  LayoutDashboard, Package, Truck, ShoppingCart, Heart, Store, CreditCard, Settings, LogOut
} from 'lucide-react';

// =================================================================================
// 1. KOMPONEN CSS
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

    /* Sidebar */
    .sidebar-nav ul { list-style: none; padding: 0; margin: 0; }
    .sidebar-nav li a {
      display: flex; align-items: center; gap: 12px; padding: 12px 16px;
      text-decoration: none; color: #495057; border-radius: 6px; font-weight: 500;
      transition: background-color 0.2s, color 0.2s;
    }
    .sidebar-nav li a:hover { background-color: #f1f3f5; }
    .sidebar-nav li a.active { background-color: #0C5AA2; color: #ffffff; }
    .sidebar-nav li a.active svg { color: #ffffff; }

    /* Buka Toko Page Specific Styles */
    .buka-toko-card-title {
      font-size: 16px; font-weight: 600; color: #343a40; margin: 0 0 24px 0;
      padding-bottom: 16px; border-bottom: 1px solid #e9ecef;
    }
    .buka-toko-layout {
      display: flex;
      align-items: center;
      gap: 48px;
    }
    .illustration-container {
      flex: 1;
      text-align: center;
    }
    .illustration-container img {
      max-width: 100%;
      height: auto;
    }
    .form-container {
      flex: 2;
    }
    .form-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px 24px;
    }
    .form-group {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    .form-group.full-width {
      grid-column: 1 / -1;
    }
    .form-group label {
      font-size: 14px;
      font-weight: 500;
      color: #495057;
    }
    .form-group input, .form-group textarea {
      width: 100%;
      padding: 10px 12px;
      border: 1px solid #dee2e6;
      border-radius: 6px;
      font-size: 14px;
      font-family: 'Inter', sans-serif;
    }
    .form-group textarea {
        min-height: 120px;
        resize: vertical;
    }
    .save-button {
      margin-top: 16px;
      padding: 12px 32px;
      border: none;
      background-color: #0C5AA2;
      color: white;
      font-weight: 600;
      border-radius: 6px;
      cursor: pointer;
    }

    @media (max-width: 992px) {
      .dashboard-layout { flex-direction: column; }
      .sidebar { flex: 0 0 auto; width: 100%; }
      .buka-toko-layout { flex-direction: column; gap: 24px; }
    }
     @media (max-width: 768px) {
        .form-grid { grid-template-columns: 1fr; }
     }
  `}</style>
);

// =================================================================================
// 2. KOMPONEN-KOMPONEN
// =================================================================================

const Header = () => (
  <header>
    <nav className="breadcrumb"><a href="#">Home</a> / <a href="#">User Account</a> / <span style={{color: '#343a40', fontWeight: '500'}}>Buka Toko</span></nav>
  </header>
);

const Sidebar = () => {
    // List menu disesuaikan dengan konteks gambar
    const navItems = [
      { icon: <LayoutDashboard size={20} />, label: 'Dashboard' },
      { icon: <Package size={20} />, label: 'Riwayat Pemesanan' },
      { icon: <Truck size={20} />, label: 'Lacak Pesanan' },
      { icon: <ShoppingCart size={20} />, label: 'Keranjang Belanja' },
      { icon: <Heart size={20} />, label: 'Wishlist' },
      { icon: <Store size={20} />, label: 'Buka Toko', active: true },
      { icon: <CreditCard size={20} />, label: 'Kartu & Alamat' },
      { icon: <Settings size={20} />, label: 'Riwayat Pencarian' }, // Icon might differ
      { icon: <Settings size={20} />, label: 'Pengaturan' },
      { icon: <LogOut size={20} />, label: 'Log-out' },
    ];
    
    return (
      <aside className="sidebar">
        <nav className="sidebar-nav">
          <ul>{navItems.map(item => (
            <li key={item.label}>
              <a href="#" className={item.active ? 'active' : ''}>
                {item.icon}<span>{item.label}</span>
              </a>
            </li>
          ))}</ul>
        </nav>
      </aside>
    );
};

// =================================================================================
// 3. KOMPONEN UTAMA
// =================================================================================
const DashboardBukaToko = () => {
    return (
      <>
        <Styles />
        <div className="dashboard-page">
          <Header />
          <div className="dashboard-layout">
            <Sidebar />
            <div className="main-content">
              <div className="card">
                <h2 className="buka-toko-card-title">BUKA TOKO</h2>
                <div className="buka-toko-layout">
                    <div className="illustration-container">
                        {/* Ilustrasi diambil dari Storyset by Freepik, bisa diganti dengan milik Anda */}
                        <img src="https://i.imgur.com/uV206r5.png" alt="Buka Toko Illustration" />
                    </div>
                    <div className="form-container">
                        <div className="form-grid">
                            <div className="form-group">
                                <label htmlFor="nama-toko">Nama Toko</label>
                                <input type="text" id="nama-toko" defaultValue="warung92" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="username-toko">Username Toko</label>
                                <input type="text" id="username-toko" defaultValue="@warung92bandung" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email-toko">Email</label>
                                <input type="email" id="email-toko" defaultValue="warung92@gmail.com" />
                            </div>
                             <div className="form-group">
                                <label htmlFor="alamat-toko">Alamat Toko</label>
                                <input type="text" id="alamat-toko" defaultValue="Jl. Buah Batu II, No. 51, Kecamatan Bojongsoang" />
                            </div>
                            <div className="form-group full-width">
                                <label htmlFor="deskripsi-toko">Deskripsi Toko</label>
                                <textarea id="deskripsi-toko" placeholder="Masukkan Deskripsi..."></textarea>
                            </div>
                        </div>
                        <button className="save-button">SIMPAN</button>
                    </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
};
  
export default DashboardBukaToko;