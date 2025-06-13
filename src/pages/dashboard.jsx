import React from 'react';
// Impor ikon dari library lucide-react
import { 
  LayoutDashboard, Package, Truck, ShoppingCart, Heart, Store, CreditCard, Settings, LogOut, 
  User, Mail, Phone, Edit2, MapPin, Box, Clock, CheckCircle, Plus, MoreVertical, Star, ArrowRight,
  ArrowLeftCircle, ArrowRightCircle
} from 'lucide-react';

// =================================================================================
// 1. KOMPONEN CSS (Disimpan dalam satu file sesuai permintaan)
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
    .main-content-grid {
        flex: 1; display: flex; flex-direction: column; gap: 24px;
    }
    .card {
      background-color: #ffffff; border-radius: 8px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05); padding: 24px;
    }
    .card-header {
        display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;
    }
    .card-title { font-size: 16px; font-weight: 600; margin: 0; color: #343a40; }
    .view-all-link {
        font-size: 14px; font-weight: 500; color: #0d6efd; text-decoration: none; display: flex; align-items: center; gap: 4px;
    }
    .footer { text-align: center; margin-top: 24px; font-size: 14px; color: #6c757d; }

    /* Sidebar */
    .sidebar-nav ul { list-style: none; padding: 0; margin: 0; }
    .sidebar-nav li a {
      display: flex; align-items: center; gap: 12px; padding: 12px 16px;
      text-decoration: none; color: #495057; border-radius: 6px; font-weight: 500;
      transition: background-color 0.2s, color 0.2s;
    }
    .sidebar-nav li a:hover { background-color: #f1f3f5; }
    .sidebar-nav li a.active { background-color: #0d6efd; color: #ffffff; }
    .sidebar-nav li a.active svg { color: #ffffff; }
    .sidebar-hr { border: none; border-top: 1px solid #e9ecef; margin: 16px 0; }
    
    /* Welcome & Top Section */
    .welcome-text h2 { margin: 0 0 4px 0; font-size: 24px; }
    .welcome-text p { margin: 0; color: #6c757d; }
    .top-section { display: flex; gap: 24px; align-items: flex-start; }
    .info-grid { flex: 1; display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
    .info-box { display: flex; flex-direction: column; }
    .info-box h3 { font-size: 14px; font-weight: 600; text-transform: uppercase; color: #6c757d; margin: 0 0 16px 0; }
    .user-profile { display: flex; align-items: center; gap: 16px; margin-bottom: 16px; }
    .user-profile img { width: 48px; height: 48px; border-radius: 50%; }
    .user-profile h4 { font-size: 16px; font-weight: 600; margin: 0; }
    .user-profile p { font-size: 14px; color: #6c757d; margin: 2px 0 0 0; }
    .info-line { display: flex; gap: 8px; align-items: center; font-size: 14px; margin-bottom: 8px; }
    .info-line svg { color: #868e96; }
    .edit-button {
        width: 100%; padding: 10px; margin-top: 16px; border-radius: 6px;
        background-color: #e7f5ff; color: #0d6efd; border: none;
        font-weight: 600; cursor: pointer; text-align: center;
    }

    /* Order Summary Boxes */
    .order-summary-container { display: flex; flex-direction: column; gap: 16px; width: 220px; }
    .summary-box {
        display: flex; align-items: center; gap: 16px; padding: 16px;
        border-radius: 8px; color: white;
    }
    .summary-box .icon { width: 36px; height: 36px; border-radius: 50%; display: flex; align-items: center; justify-content: center; }
    .summary-box .text strong { font-size: 20px; display: block; }
    .summary-box .text span { font-size: 12px; opacity: 0.9; }
    .summary-box.blue { background-color: #0d6efd; }
    .summary-box.blue .icon { background-color: rgba(255,255,255,0.2); }
    .summary-box.orange { background-color: #fd7e14; }
    .summary-box.orange .icon { background-color: rgba(255,255,255,0.2); }
    .summary-box.green { background-color: #198754; }
    .summary-box.green .icon { background-color: rgba(255,255,255,0.2); }
    
    /* Payment Options */
    .payment-cards-container { display: flex; gap: 24px; align-items: center; }
    .credit-card-visual {
        width: 280px; height: 160px; border-radius: 12px; padding: 20px; color: white;
        display: flex; flex-direction: column; justify-content: space-between; position: relative;
    }
    .credit-card-visual.blue-card { background: linear-gradient(45deg, #0d6efd, #0d6efd); }
    .credit-card-visual.green-card { background: linear-gradient(45deg, #198754, #28a745); }
    .card-header-line { display: flex; justify-content: space-between; align-items: center; }
    .card-header-line span { font-size: 12px; font-weight: 500; }
    .card-number { font-family: 'monospace'; font-size: 20px; letter-spacing: 2px; margin: auto 0; }
    .card-footer-line { display: flex; justify-content: space-between; font-size: 14px; font-weight: 500; }
    .add-card-button {
        width: 280px; height: 160px; border-radius: 12px;
        border: 2px dashed #adb5bd; background-color: #f8f9fa;
        display: flex; flex-direction: column; align-items: center; justify-content: center;
        gap: 8px; color: #495057; font-weight: 600; cursor: pointer;
    }

    /* Recent Orders Table */
    .orders-table { width: 100%; border-collapse: collapse; }
    .orders-table th, .orders-table td {
        padding: 12px 0; text-align: left; font-size: 14px; border-bottom: 1px solid #e9ecef;
    }
    .orders-table th { color: #868e96; font-weight: 600; text-transform: uppercase; font-size: 12px; }
    .orders-table td { color: #495057; }
    .orders-table tr:last-child td { border-bottom: none; }
    .status-badge { padding: 4px 8px; border-radius: 4px; font-weight: 600; font-size: 12px; }
    .status-selesai { background-color: #d1e7dd; color: #0f5132; }
    .status-dibatalkan { background-color: #f8d7da; color: #842029; }
    .status-proses { background-color: #fff3cd; color: #664d03; }
    
    /* Search History */
    .products-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px; }
    .product-card { border: 1px solid #e9ecef; border-radius: 8px; overflow: hidden; }
    .product-image { position: relative; }
    .product-image img { width: 100%; height: 200px; object-fit: cover; }
    .product-tag {
        position: absolute; top: 12px; left: 12px; background-color: #dc3545; color: white;
        padding: 4px 8px; font-size: 10px; font-weight: 600; border-radius: 4px;
    }
    .product-tag.best { background-color: #0d6efd; }
    .product-info { padding: 16px; }
    .product-rating { display: flex; gap: 2px; color: #ffc107; margin-bottom: 8px; }
    .product-name { font-size: 14px; font-weight: 500; color: #343a40; margin-bottom: 8px; }
    .product-price { font-size: 16px; font-weight: 600; }
    .carousel-nav { display: flex; justify-content: center; align-items: center; gap: 16px; margin-top: 24px; }
    .carousel-nav svg { color: #0d6efd; cursor: pointer; }
    .carousel-dots { display: flex; gap: 8px; }
    .dot { width: 8px; height: 8px; border-radius: 50%; background-color: #dee2e6; }
    .dot.active { background-color: #0d6efd; }
    
    @media (max-width: 1200px) {
      .top-section { flex-direction: column; }
      .order-summary-container { flex-direction: row; width: 100%; }
      .summary-box { flex: 1; }
      .products-grid { grid-template-columns: 1fr 1fr; }
    }
    @media (max-width: 992px) {
      .dashboard-layout { flex-direction: column; }
      .sidebar { flex: 0 0 auto; width: 100%; }
      .info-grid { grid-template-columns: 1fr; }
    }
  `}</style>
);

// =================================================================================
// 2. DATA DUMMY (Sesuai gambar)
// =================================================================================
const recentOrders = [
    { id: '#95459761', status: 'SEDANG DIPROSES', date: 'Dec 30, 2019 05:18', total: '$1,500 (3 Products)' },
    { id: '#71667167', status: 'SELESAI', date: 'Feb 2, 2019 19:28', total: '$80 (1 Products)' },
    { id: '#95214362', status: 'DIBATALKAN', date: 'Mar 20, 2019 23:14', total: '$80 (1 Products)' },
    { id: '#71667167', status: 'SELESAI', date: 'Feb 2, 2019 19:28', total: '$80 (1 Products)' },
    { id: '#51746385', status: 'DIBATALKAN', date: 'Dec 30, 2019 07:52', total: '$2,300 (2 Products)' },
    { id: '#673871743', status: 'SELESAI', date: 'Dec 7, 2019 23:26', total: '$220 (1 Products)' },
];
const products = [
    { img: 'https://i.imgur.com/vT6V0aw.png', tag: 'HOT', rating: 4, name: 'TCL T6 True Wireless Earbuds Bluetooth Headph...', price: '$46', tagColor: '#dc3545' },
    { img: 'https://i.imgur.com/kSj4d1c.png', tag: null, rating: 5, name: 'Samsung Electronics Samrtung Galaxy S21 5G...', price: '$265' },
    { img: 'https://i.imgur.com/bDjV83w.png', tag: 'BEST DEALS', rating: 4, name: 'Amazon Basics High Speed HDMI Cable For Ultra, 4K/Vs...', price: '$8', tagColor: '#0d6efd' },
    { img: 'https://i.imgur.com/Hl51cI5.png', tag: null, rating: 5, name: 'Portable Miding Machine, 11lbs capacity Model 18NMF...', price: '$124' },
];
const getStatusClass = (status) => {
    switch (status) {
        case 'SELESAI': return 'status-selesai';
        case 'DIBATALKAN': return 'status-dibatalkan';
        case 'SEDANG DIPROSES': return 'status-proses';
        default: return '';
    }
};

// =================================================================================
// 3. KOMPONEN HEADER, SIDEBAR, FOOTER
// =================================================================================
const Header = () => (
  <header>
    <nav className="breadcrumb"><a href="#">Home</a> / <a href="#">User Account</a> / <span className="active" style={{color: '#343a40', fontWeight: '500'}}>Dashboard</span></nav>
  </header>
);
const Footer = () => (<footer className="footer"><p>&copy; {new Date().getFullYear()} Your Company Name. All rights reserved.</p></footer>);
const Sidebar = () => {
    const navItems = [
      { icon: <LayoutDashboard size={20} />, label: 'Dashboard', active: true },
      { icon: <Package size={20} />, label: 'Riwayat Pemesanan' },
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
          <ul>{navItems.map(item => (<li key={item.label}><a href="#" className={item.active ? 'active' : ''}>{item.icon}<span>{item.label}</span></a></li>))}</ul>
          <hr className="sidebar-hr" />
          <ul><li><a href="#"><LogOut size={20} /><span>Log-out</span></a></li></ul>
        </nav>
      </aside>
    );
};
  
// =================================================================================
// 4. KOMPONEN UTAMA
// =================================================================================
const Dashboard = () => {
    return (
      <>
        <Styles />
        <div className="dashboard-page">
          <Header />
          <div className="dashboard-layout">
            <Sidebar />
            <div className="main-content-grid">
                
                <div className="welcome-text">
                    <h2>Hello, Daniandra</h2>
                    <p>From your account dashboard, you can easily check & view your <a href="#">Recent Orders</a>, manage your <a href="#">Shipping and Billing Addresses</a> and <a href="#">edit your password and account details.</a></p>
                </div>

                <div className="top-section">
                    <div className="card info-grid">
                        <div className="info-box">
                            <h3>ACCOUNT INFO</h3>
                            <div className="user-profile">
                                <img src="https://i.imgur.com/zQZ7M49.png" alt="Daniandra" />
                                <div><h4>Daniandra</h4><p>Dhaka-1217, Bangladesh</p></div>
                            </div>
                            <div className="info-line"><Mail size={16}/><p>daniandra@gmail.com</p></div>
                            <div className="info-line"><Phone size={16}/><p>+62-820-5555-8181</p></div>
                            <button className="edit-button">EDIT ACCOUNT</button>
                        </div>
                        <div className="info-box">
                            <h3>BILLING ADDRESS</h3>
                            <p className="info-line">Daniandra</p>
                            <p className="info-line" style={{alignItems: 'start'}}>
                                <MapPin size={16} style={{marginTop: '4px', flexShrink: 0}} />
                                <span>East Tejturi Bazar, Word No. 04, Road No. 13/x, House No 1320/C, Flat No. 5D, Dhaka-1206, Bangladesh</span>
                            </p>
                            <div className="info-line"><Phone size={16}/><p>+62-820-5555-8181</p></div>
                            <div className="info-line"><Mail size={16}/><p>kevin.gilbert@riovamail.com</p></div>
                            <button className="edit-button">EDIT ADDRESS</button>
                        </div>
                    </div>
                    <div className="order-summary-container">
                        <div className="summary-box blue"><div className="icon"><Box size={20}/></div><div className="text"><strong>154</strong><span>Total Pesanan</span></div></div>
                        <div className="summary-box orange"><div className="icon"><Clock size={20}/></div><div className="text"><strong>05</strong><span>Pesanan Menunggu</span></div></div>
                        <div className="summary-box green"><div className="icon"><CheckCircle size={20}/></div><div className="text"><strong>149</strong><span>Pesanan Selesai</span></div></div>
                    </div>
                </div>

                <div className="card">
                    <div className="card-header"><h3 className="card-title">PAYMENT OPTION</h3></div>
                    <div className="payment-cards-container">
                        <div className="credit-card-visual blue-card">
                            <div className="card-header-line"><span>Rp 745.000.000</span><button style={{background: 'rgba(255,255,255,0.2)', border: 'none', color: 'white', padding: '4px 8px', borderRadius: '4px', cursor: 'pointer', fontSize: '10px'}}>Edit Card</button></div>
                            <div className="card-number">**** **** **** 3814</div>
                            <div className="card-footer-line"><span>Dian</span><span>VISA</span></div>
                        </div>
                        <div className="credit-card-visual green-card">
                           <div className="card-header-line"><span>Rp 89.000.000</span><button style={{background: 'rgba(255,255,255,0.2)', border: 'none', color: 'white', padding: '4px 8px', borderRadius: '4px', cursor: 'pointer', fontSize: '10px'}}>Edit Card</button></div>
                            <div className="card-number">**** **** **** 1781</div>
                            <div className="card-footer-line"><span>Daniandra</span><span>VISA</span></div>
                        </div>
                        <button className="add-card-button"><Plus size={24}/><p>Tambahkan Kartu</p></button>
                    </div>
                </div>

                <div className="card">
                    <div className="card-header"><h3 className="card-title">PESANAN TERBARU</h3><a href="#" className="view-all-link">View All <ArrowRight size={16}/></a></div>
                    <table className="orders-table">
                        <thead><tr><th>ORDER ID</th><th>STATUS</th><th>DATE</th><th>TOTAL</th><th>ACTION</th></tr></thead>
                        <tbody>{recentOrders.map((o,i)=>(<tr key={i}><td>{o.id}</td><td><span className={`status-badge ${getStatusClass(o.status)}`}>{o.status}</span></td><td>{o.date}</td><td>{o.total}</td><td><a href="#" className="view-all-link">Lihat Detail <ArrowRight size={16}/></a></td></tr>))}</tbody>
                    </table>
                </div>

                <div className="card">
                    <div className="card-header"><h3 className="card-title">RIWAYAT PENCARIAN</h3><a href="#" className="view-all-link">Lihat Semua <ArrowRight size={16}/></a></div>
                    <div className="products-grid">
                        {products.map((p,i) => (<div className="product-card" key={i}>
                            <div className="product-image"><img src={p.img} alt={p.name}/>{p.tag && <span className="product-tag" style={{backgroundColor: p.tagColor}}>{p.tag}</span>}</div>
                            <div className="product-info">
                                <div className="product-rating">{[...Array(5)].map((_,j) => <Star key={j} size={16} fill={j < p.rating ? '#ffc107' : 'none'}/>)}</div>
                                <p className="product-name">{p.name}</p>
                                <p className="product-price">{p.price}</p>
                            </div>
                        </div>))}
                    </div>
                    <div className="carousel-nav"><ArrowLeftCircle size={28}/><div className="carousel-dots"><div className="dot active"></div><div className="dot"></div><div className="dot"></div><div className="dot"></div></div><ArrowRightCircle size={28}/></div>
                </div>

                <Footer/>
            </div>
          </div>
        </div>
      </>
    );
};
  
export default Dashboard;