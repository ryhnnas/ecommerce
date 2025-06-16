import React from 'react';
// Impor ikon dari library lucide-react
import { 
  LayoutDashboard, Package, Truck, ShoppingCart, Heart, Store, CreditCard, Settings, LogOut, 
  ArrowLeft, Star, FileText, MapPin, PackageCheck, CheckCircle 
} from 'lucide-react';

// =================================================================================
// 1. KOMPONEN CSS (Disimpan dalam satu file sesuai permintaan)
// =================================================================================
const Styles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

    /* General Styles from previous component */
    .dashboard-page {
      font-family: 'Inter', sans-serif;
      background-color: #f8f9fa;
      min-height: 100vh;
      padding: 24px;
    }
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
    .dashboard-layout {
      display: flex;
      gap: 24px;
      align-items: flex-start;
    }
    .sidebar {
      flex: 0 0 260px;
      background-color: #ffffff;
      border-radius: 8px;
      padding: 16px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
    }
    .sidebar-nav ul { list-style: none; padding: 0; margin: 0; }
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
    .sidebar-nav li a:hover { background-color: #f1f3f5; }
    .sidebar-nav li a.active { background-color: #0d6efd; color: #ffffff; }
    .sidebar-nav li a.active svg { color: #ffffff; }
    .sidebar-hr { border: none; border-top: 1px solid #e9ecef; margin: 16px 0; }
    .footer { text-align: center; margin-top: 24px; font-size: 14px; color: #6c757d; }

    /* New Styles for Order Detail */
    .order-detail-content {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 24px;
    }

    .card {
      background-color: #ffffff;
      border-radius: 8px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
      padding: 24px;
    }

    .detail-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 24px;
    }
    .back-link {
      display: flex;
      align-items: center;
      gap: 12px;
      font-size: 20px;
      font-weight: 600;
      color: #343a40;
      text-decoration: none;
    }
    .rating-button {
      background: none;
      border: 1px solid #0d6efd;
      color: #0d6efd;
      padding: 8px 16px;
      border-radius: 6px;
      font-weight: 600;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .summary-box {
      background-color: #fff9e6;
      border: 1px solid #ffedd5;
      border-radius: 8px;
      padding: 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .summary-box .order-info h3 {
      font-size: 18px;
      font-weight: 600;
      margin: 0 0 4px 0;
    }
    .summary-box .order-info p {
      margin: 0;
      color: #6c757d;
      font-size: 14px;
    }
    .summary-box .price {
      font-size: 24px;
      font-weight: 700;
      color: #0d6efd;
    }

    /* Progress Tracker */
    .progress-tracker-card .card-title {
      font-size: 14px;
      margin: 0 0 24px 0;
    }
    .progress-bar-container {
      display: flex;
      justify-content: space-between;
      position: relative;
    }
    .progress-bar-line {
      position: absolute;
      top: 18px;
      left: 10%;
      right: 10%;
      height: 2px;
      background-color: #e9ecef;
      z-index: 1;
    }
    .progress-bar-line-active {
      position: absolute;
      top: 18px;
      left: 10%;
      width: 40%; /* (2/4 steps) - adjust as needed */
      height: 2px;
      background-color: #0d6efd;
      z-index: 2;
      transition: width 0.5s ease;
    }
    .progress-step {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 12px;
      z-index: 3;
      text-align: center;
      width: 80px;
    }
    .step-icon {
      width: 38px;
      height: 38px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #f8f9fa;
      border: 2px solid #e9ecef;
      color: #adb5bd;
    }
    .progress-step.completed .step-icon {
      background-color: #e7f5ff;
      border-color: #0d6efd;
      color: #0d6efd;
    }
    .progress-step .step-label {
      font-size: 12px;
      font-weight: 500;
      color: #6c757d;
    }
    .progress-step.completed .step-label {
      color: #343a40;
    }

    /* Order Activity Timeline */
    .activity-timeline {
      display: flex;
      flex-direction: column;
      gap: 20px;
      position: relative;
    }
    .timeline-item {
      display: flex;
      gap: 16px;
      position: relative;
      padding-left: 30px; /* Space for line */
    }
    .timeline-item::before {
      content: '';
      position: absolute;
      left: 7px;
      top: 2px;
      bottom: -20px;
      width: 2px;
      background-color: #e9ecef;
    }
    .timeline-item:last-child::before {
      display: none;
    }
    .timeline-icon {
      position: absolute;
      left: 0;
      top: 0;
      width: 16px;
      height: 16px;
      border-radius: 50%;
      background-color: #0d6efd;
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1;
    }
    .timeline-icon svg { width: 10px; height: 10px; }
    .timeline-content p { margin: 0; font-size: 14px; }
    .timeline-content .date { font-size: 12px; color: #6c757d; margin-top: 4px; }
    
    /* Product List */
    .product-table { width: 100%; border-collapse: collapse; }
    .product-table th {
      text-align: left;
      font-size: 12px;
      text-transform: uppercase;
      color: #868e96;
      font-weight: 600;
      padding-bottom: 12px;
    }
    .product-table td { padding: 16px 0; border-bottom: 1px solid #e9ecef; }
    .product-table tr:last-child td { border-bottom: none; }
    .product-item { display: flex; align-items: center; gap: 16px; }
    .product-item img { width: 60px; height: 60px; object-fit: cover; border-radius: 6px; }
    .product-info h4 { font-size: 14px; font-weight: 600; margin: 0; }
    .product-info p { font-size: 12px; color: #6c757d; margin: 4px 0 0 0; }
    .product-price { font-size: 14px; font-weight: 500; }

    /* Address & Notes */
    .address-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 24px;
    }
    .address-col h4 {
      font-size: 14px;
      font-weight: 600;
      margin: 0 0 8px 0;
      border-bottom: 1px solid #e9ecef;
      padding-bottom: 8px;
    }
    .address-col p {
      font-size: 14px;
      line-height: 1.6;
      color: #495057;
      margin: 0;
    }
    
    @media (max-width: 1200px) {
      .address-grid { grid-template-columns: 1fr; }
    }
    @media (max-width: 992px) {
      .dashboard-layout { flex-direction: column; }
      .sidebar { flex: 0 0 auto; width: 100%; }
    }

  `}</style>
);

// =================================================================================
// 2. DATA DUMMY (Sesuai gambar)
// =================================================================================
const products = [
  { 
    img: 'https://i.imgur.com/u1sJ2rA.png', 
    name: 'Google Pixel 6 Pro - 5G Android Phone - Unlocked Smartphone with Advanced Pixel C...', 
    type: 'SMARTPHONE', 
    price: 899 
  },
  { 
    img: 'https://i.imgur.com/QuG5R25.png', 
    name: 'Toshil Sun Clear for Google Pixel 6 Pro - Crystal Clear Phone Case with 12ft/Mil-Gr D...',
    type: 'ACCESSORIES', 
    price: 39 
  },
];

const activityTimeline = [
    { icon: <PackageCheck size={10} />, text: 'Your order has been delivered. Thank you for shopping at Cilicon!', date: '23 Jan, 2021 at 7:32 PM' },
    { icon: <Truck size={10} />, text: 'Our delivery rider (Ricky M) has picked up your order for delivery.', date: '23 Jan, 2021 at 2:03 PM' },
    { icon: <MapPin size={10} />, text: 'Your order has reached at last mile hub.', date: '22 Jan, 2021 at 8:00 AM' },
    { icon: <MapPin size={10} />, text: 'Your order on the way to last mile hub.', date: '21, 2021 at 5:32 AM' },
    { icon: <CheckCircle size={10} />, text: 'Your order is successfully verified.', date: '18 Jan, 2021 at 2:03 PM' },
    { icon: <FileText size={10} />, text: 'Your order has been confirmed.', date: '18 Jan, 2021 at 2:03 PM' },
];

// =================================================================================
// 3. KOMPONEN HEADER, SIDEBAR, FOOTER
// =================================================================================
const Header = () => (
  <header>
    <nav className="breadcrumb">
      <a href="#">Home</a> / <a href="#">User Account</a> / <span className="active">Order History</span>
    </nav>
  </header>
);

const Footer = () => (
    <footer className="footer">
      <p>&copy; {new Date().getFullYear()} Your Company Name. All rights reserved.</p>
    </footer>
  );
  
const Sidebar = () => {
    const navItems = [
      { icon: <LayoutDashboard size={20} />, label: 'Dashboard' },
      { icon: <Package size={20} />, label: 'Riwayat Pemesanan' },
      { icon: <Truck size={20} />, label: 'Lacak Pesanan', active: true },
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
            <li><a href="#"><LogOut size={20} /><span>Log-out</span></a></li>
          </ul>
        </nav>
      </aside>
    );
};
  
// =================================================================================
// 4. KOMPONEN UTAMA
// =================================================================================
const DashboardOrderDetail = () => {
    return (
      <>
        <Styles />
        <div className="dashboard-page">
          <Header />
          <div className="dashboard-layout">
            <Sidebar />
            <div className="order-detail-content">
              
              <div className="detail-header">
                <a href="#" className="back-link">
                  <ArrowLeft size={22} /> ORDER DETAILS
                </a>
                <button className="rating-button">Leave a Rating <Star size={16} /></button>
              </div>

              <div className="summary-box">
                <div className="order-info">
                  <h3>#96459761</h3>
                  <p>4 Products - Order Placed in 17 Jan, 2021 at 7:32 PM</p>
                </div>
                <div className="price">$1199.00</div>
              </div>

              <div className="card progress-tracker-card">
                <p className="card-title">Order expected arrival: <strong>23 Jan, 2021</strong></p>
                <div className="progress-bar-container">
                    <div className="progress-bar-line"></div>
                    <div className="progress-bar-line-active"></div>
                    <div className="progress-step completed"><div className="step-icon"><FileText size={18}/></div><span className="step-label">Order Placed</span></div>
                    <div className="progress-step completed"><div className="step-icon"><Package size={18}/></div><span className="step-label">Packaging</span></div>
                    <div className="progress-step"><div className="step-icon"><Truck size={18}/></div><span className="step-label">On The Road</span></div>
                    <div className="progress-step"><div className="step-icon"><CheckCircle size={18}/></div><span className="step-label">Delivered</span></div>
                </div>
              </div>

              <div className="card">
                <div className="activity-timeline">
                    {activityTimeline.map((item, index) => (
                        <div className="timeline-item" key={index}>
                            <div className="timeline-icon">{item.icon}</div>
                            <div className="timeline-content">
                                <p>{item.text}</p>
                                <p className="date">{item.date}</p>
                            </div>
                        </div>
                    ))}
                </div>
              </div>

              <div className="card">
                <h3 style={{marginBottom: '16px', fontSize: '16px'}}>Product (02)</h3>
                <table className="product-table">
                    <thead>
                        <tr><th>PRODUCTS</th><th>PRICE</th><th>QUANTITY</th><th>SUB-TOTAL</th></tr>
                    </thead>
                    <tbody>
                        {products.map((p, i) => (
                            <tr key={i}>
                                <td>
                                    <div className="product-item">
                                        <img src={p.img} alt={p.name} />
                                        <div className="product-info">
                                            <h4>{p.type}</h4>
                                            <p>{p.name}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="product-price">${p.price}</td>
                                <td className="product-price">x1</td>
                                <td className="product-price">${p.price}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
              </div>
              
              <div className="card">
                <div className="address-grid">
                  <div className="address-col">
                    <h4>Billing Address</h4>
                    <p>
                        Kevin Gilbert<br/>
                        East Te-piur, Besut, Word No. 04, Road No. 13/x, House no. 1320/C, Flat No. 5D, Dhaka-1206, Bangladesh<br/>
                        <strong>Phone Number:</strong> +1-202-555-0118<br/>
                        <strong>Email:</strong> kevin.g@riovagmail.com
                    </p>
                  </div>
                  <div className="address-col">
                    <h4>Shipping Address</h4>
                    <p>
                        Kevin Gilbert<br/>
                        East Te-piur, Besut, Word No. 04, Road No. 13/x, House no. 1320/C, Flat No. 5D, Dhaka-1206, Bangladesh<br/>
                        <strong>Phone Number:</strong> +1-202-555-0118<br/>
                        <strong>Email:</strong> kevin.g@riovagmail.com
                    </p>
                  </div>
                  <div className="address-col">
                    <h4>Order Notes</h4>
                    <p>
                        Lorem ex valendria, korgii, dolmenian toughto est suo amto amara, kigal vonidial et pium agria. Valendio est suo amto amara, kigal vonidial et pium agria.
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </div>
          <Footer/>
        </div>
      </>
    );
  };
  
  export default DashboardOrderDetail;