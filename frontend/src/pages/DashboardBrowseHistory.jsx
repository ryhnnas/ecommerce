import React from 'react';
// Impor ikon dari library lucide-react
import { 
  LayoutDashboard, Package, Truck, ShoppingCart, Heart, Store, CreditCard, Settings, LogOut, 
  Search, Calendar, Star 
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
      transition: background-color 0.2s, color 0.2s;
    }
    .sidebar-nav li a:hover { background-color: #f1f3f5; }
    .sidebar-nav li a.active { background-color: #0C5AA2; color: #ffffff; }
    .sidebar-nav li a.active svg { color: #ffffff; }
    .sidebar-hr { border: none; border-top: 1px solid #e9ecef; margin: 16px 0; }

    /* Browse History Specific Styles */
    .history-header h1 {
      font-size: 20px;
      font-weight: 600;
      color: #343a40;
      margin: 0 0 16px 0;
    }
    .filter-bar {
      display: flex;
      gap: 16px;
      margin-bottom: 24px;
    }
    .input-wrapper {
      position: relative;
      flex: 1;
    }
    .input-wrapper svg {
      position: absolute;
      left: 14px;
      top: 50%;
      transform: translateY(-50%);
      color: #adb5bd;
    }
    .filter-bar input {
      width: 100%;
      padding: 12px 12px 12px 40px;
      border: 1px solid #dee2e6;
      border-radius: 6px;
      font-size: 14px;
    }
    .filter-bar input::placeholder {
      color: #adb5bd;
    }

    .history-group {
      margin-bottom: 24px;
    }
    .history-date-title {
      font-size: 14px;
      font-weight: 600;
      color: #6c757d;
      margin-bottom: 16px;
    }

    /* Product Grid and Card (reused from dashboard.jsx) */
    .products-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px; }
    .product-card { border: 1px solid #e9ecef; border-radius: 8px; overflow: hidden; background-color: white; }
    .product-image { position: relative; }
    .product-image img { width: 100%; height: 200px; object-fit: cover; }
    .product-tag {
        position: absolute; top: 12px; left: 12px; color: white;
        padding: 4px 8px; font-size: 10px; font-weight: 600; border-radius: 4px;
    }
    .product-tag.hot { background-color: #dc3545; }
    .product-tag.best { background-color: #0d6efd; }
    .product-info { padding: 16px; }
    .product-rating { display: flex; align-items: center; gap: 4px; color: #ffc107; margin-bottom: 8px; }
    .product-rating .review-count { font-size: 12px; color: #6c757d; }
    .product-name { font-size: 14px; font-weight: 500; color: #343a40; margin-bottom: 8px; height: 40px; }
    .product-price { font-size: 16px; font-weight: 600; }
    
    @media (max-width: 1200px) {
        .products-grid { grid-template-columns: repeat(3, 1fr); }
    }
    @media (max-width: 992px) {
        .dashboard-layout { flex-direction: column; }
        .sidebar { flex: 0 0 auto; width: 100%; }
        .products-grid { grid-template-columns: repeat(2, 1fr); }
    }
    @media (max-width: 768px) {
        .filter-bar { flex-direction: column; }
    }
  `}</style>
);

// =================================================================================
// 2. DATA DUMMY (Sesuai gambar)
// =================================================================================
const historyData = [
    {
        date: '17 OCT, 2020',
        products: [
            { img: 'https://i.imgur.com/vT6V0aw.png', tag: 'HOT', tagType: 'hot', rating: 4, reviews: 236, name: 'TCL T6 True Wireless Earbuds Bluetooth Headph...', price: '$70' },
            { img: 'https://i.imgur.com/kSj4d1c.png', tag: null, rating: 5, reviews: 536, name: 'Samsung Electronics Samrtung Galaxy S21 5G...', price: '$2,300' },
            { img: 'https://i.imgur.com/bDjV83w.png', tag: 'BEST DEALS', tagType: 'best', rating: 4, reviews: 423, name: 'Amazon Basics High Speed HDMI Cable For Ultra, 4K/Vs...', price: '$360' },
            { img: 'https://i.imgur.com/Hl51cI5.png', tag: null, rating: 5, reviews: 911, name: 'Portable Miding Machine, 11lbs capacity Model 18NMF...', price: '$80' },
        ]
    },
    {
        date: '17 OCT, 2020', // Note: The image has two groups with the same date.
        products: [
            { img: 'https://i.imgur.com/vHLELMy.png', tag: 'BEST DEALS', tagType: 'best', rating: 4, reviews: 104, name: 'Amazon Basics High-Speed HDMI Cable For Ultra, 4K/Vs...', price: '$360' },
            { img: 'https://i.imgur.com/N5QZzEw.png', tag: null, rating: 5, reviews: 756, name: 'Portable Miding Machine, 11lbs capacity Model 18NMF...', price: '$80' },
            { img: 'https://i.imgur.com/CqA4z0T.png', tag: 'HOT', tagType: 'hot', rating: 4, reviews: 833, name: 'TCL T6 True Wireless Earbuds Bluetooth Headph...', price: '$70' },
        ]
    },
    {
        date: '24 MAY, 2020',
        products: [
            { img: 'https://i.imgur.com/vHLELMy.png', tag: 'BEST DEALS', tagType: 'best', rating: 4, reviews: 444, name: 'Amazon Basics High-Speed HDMI Cable For Ultra, 4K/Vs...', price: '$360' },
            { img: 'https://i.imgur.com/N5QZzEw.png', tag: 'HOT', tagType: 'hot', rating: 5, reviews: 786, name: 'Portable Miding Machine, 11lbs capacity Model 18NMF...', price: '$80' },
            { img: 'https://i.imgur.com/CqA4z0T.png', tag: 'HOT', tagType: 'hot', rating: 4, reviews: 943, name: 'TCL T6 True Wireless Earbuds Bluetooth Headph...', price: '$70' },
            { img: 'https://i.imgur.com/2sA2m4A.png', tag: null, rating: 4, reviews: 402, name: 'Dell Optiplex 7020/N7480 All-in-one Computer Monitor', price: '$250' },
        ]
    }
];

// =================================================================================
// 3. KOMPONEN-KOMPONEN
// =================================================================================
const Header = () => (
  <header>
    <nav className="breadcrumb"><a href="#">Home</a> / <a href="#">User Account</a> / <span style={{color: '#343a40', fontWeight: '500'}}>Riwayat Pencarian</span></nav>
  </header>
);

const Footer = () => (<footer className="footer"><p>&copy; {new Date().getFullYear()} Your Company Name. All rights reserved.</p></footer>);

const Sidebar = () => {
    const navItems = [
      { icon: <LayoutDashboard size={20} />, label: 'Dashboard' },
      { icon: <Package size={20} />, label: 'Riwayat Pemesanan' },
      { icon: <Truck size={20} />, label: 'Lacak Pesanan' },
      { icon: <ShoppingCart size={20} />, label: 'Keranjang Belanja' },
      { icon: <Heart size={20} />, label: 'Wishlist' },
      { icon: <Store size={20} />, label: 'Buka Toko' },
      { icon: <CreditCard size={20} />, label: 'Kartu & Alamat' },
      { icon: <Settings size={20} />, label: 'Riwayat Pencarian', active: true },
      { icon: <LogOut size={20} />, label: 'Log-out' },
    ];
    // Note: The icon for Riwayat Pencarian might be different. I'm using Settings icon as a placeholder.
    return (
      <aside className="sidebar">
        <nav className="sidebar-nav">
          <ul>{navItems.map(item => (<li key={item.label}><a href="#" className={item.active ? 'active' : ''}>{item.icon}<span>{item.label}</span></a></li>))}</ul>
        </nav>
      </aside>
    );
};

const ProductCard = ({ product }) => (
    <div className="product-card">
        <div className="product-image">
            <img src={product.img} alt={product.name} />
            {product.tag && <span className={`product-tag ${product.tagType}`}>{product.tag}</span>}
        </div>
        <div className="product-info">
            <div className="product-rating">
                {[...Array(5)].map((_, j) => <Star key={j} size={16} fill={j < product.rating ? '#ffc107' : 'none'} stroke={j < product.rating ? '#ffc107' : '#adb5bd'} />)}
                <span className="review-count">({product.reviews})</span>
            </div>
            <p className="product-name">{product.name}</p>
            <p className="product-price">{product.price}</p>
        </div>
    </div>
);

// =================================================================================
// 4. KOMPONEN UTAMA
// =================================================================================
const DashboardBrowseHistory = () => {
    return (
      <>
        <Styles />
        <div className="dashboard-page">
          <Header />
          <div className="dashboard-layout">
            <Sidebar />
            <div className="main-content">
              <div className="card">
                <div className="history-header">
                  <h1>Riwayat Pencarian</h1>
                  <div className="filter-bar">
                    <div className="input-wrapper">
                      <Search size={18} />
                      <input type="text" placeholder="Search in Browse history" />
                    </div>
                    <div className="input-wrapper">
                      <Calendar size={18} />
                      <input type="text" placeholder="DD/MM/YYYY" onFocus={(e) => (e.target.type = "date")} onBlur={(e) => (e.target.type = "text")}/>
                    </div>
                  </div>
                </div>

                {historyData.map((group, index) => (
                  <div className="history-group" key={index}>
                    <h2 className="history-date-title">{group.date}</h2>
                    <div className="products-grid">
                      {group.products.map((product, pIndex) => (
                        <ProductCard product={product} key={pIndex} />
                      ))}
                    </div>
                  </div>
                ))}

              </div>
              <Footer />
            </div>
          </div>
        </div>
      </>
    );
};
  
export default DashboardBrowseHistory;