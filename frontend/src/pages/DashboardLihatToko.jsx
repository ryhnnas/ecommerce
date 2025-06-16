import React, { useEffect, useState } from 'react';
// Impor ikon dari library lucide-react
import {
  LayoutDashboard, Package, Truck, ShoppingCart, Heart, Store, CreditCard, Settings, LogOut,
  Mail, Phone, Instagram, Users, Eye, ArrowRight, Star
} from 'lucide-react';
import { ProductCard } from './homepage';

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
    .breadcrumb a { color: #0C5AA2; text-decoration: none; }
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
        font-size: 14px; font-weight: 500; color: #0C5AA2; text-decoration: none; display: flex; align-items: center; gap: 4px;
    }

    /* Sidebar */
    .sidebar-nav ul { list-style: none; padding: 0; margin: 0; }
    .sidebar-nav li a {
      display: flex; align-items: center; gap: 12px; padding: 12px 16px;
      text-decoration: none; color: #495057; border-radius: 6px; font-weight: 500;
    }
    .sidebar-nav li a.active { background-color: #0C5AA2; color: #ffffff; }
    .sidebar-nav li a.active svg { color: #ffffff; }
    .sidebar-hr { border: none; border-top: 1px solid #e9ecef; margin: 16px 0; }
    
    /* Welcome & Top Section */
    .welcome-text h2 { margin: 0 0 4px 0; font-size: 24px; }
    .welcome-text p { margin: 0; color: #6c757d; }
    .welcome-text p a { color: #0C5AA2; text-decoration: none; font-weight: 500;}
    .top-section { display: flex; gap: 24px; align-items: flex-start; }
    .info-grid { flex: 1; display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
    .info-box { display: flex; flex-direction: column; }
    .info-box h3 { font-size: 14px; font-weight: 600; text-transform: uppercase; color: #6c757d; margin: 0 0 16px 0; }
    .user-profile { display: flex; align-items: center; gap: 16px; margin-bottom: 16px; }
    .user-profile img { width: 48px; height: 48px; border-radius: 50%; }
    .user-profile h4 { font-size: 16px; font-weight: 600; margin: 0; }
    .user-profile p { font-size: 14px; color: #6c757d; margin: 2px 0 0 0; }
    .info-line { display: flex; gap: 8px; align-items: center; font-size: 14px; margin-bottom: 8px; }
    .info-line svg { color: #868e96; flex-shrink: 0; }
    .edit-button {
        width: 100%; padding: 10px; margin-top: 16px; border-radius: 6px;
        background-color: #ffffff; color: #0C5AA2; border: 1px solid #0C5AA2;
        font-weight: 600; cursor: pointer; text-align: center;
    }

    /* Store Stats Boxes */
    .store-stats-container { display: flex; flex-direction: column; gap: 16px; width: 220px; }
    .stat-box {
        display: flex; flex-direction: column; gap: 8px; padding: 16px;
        border-radius: 8px; border: 1px solid;
    }
    .stat-box-header { display: flex; justify-content: space-between; align-items: center; }
    .stat-box-value { font-size: 24px; font-weight: 700; }
    .stat-box-label { font-size: 12px; }
    .stat-box.blue { border-color: #bde0fe; background-color: #eef7ff; color: #0C5AA2; }
    .stat-box.orange { border-color: #fedec5; background-color: #fff8e8; color: #fd7e14; }
    .stat-box.green { border-color: #b7e4c7; background-color: #f0fff6; color: #198754; }
    
    /* Recent Orders Table */
    .orders-table { width: 100%; border-collapse: collapse; }
    .orders-table th, .orders-table td {
        padding: 12px 0; text-align: left; font-size: 14px; border-bottom: 1px solid #e9ecef;
    }
    .orders-table th { color: #868e96; font-weight: 600; text-transform: uppercase; font-size: 12px; }
    .orders-table td { color: #495057; }
    .status-badge { padding: 4px 8px; border-radius: 4px; font-weight: 600; font-size: 12px; }
    .status-selesai { background-color: #d1e7dd; color: #0f5132; }
    .status-dibatalkan { background-color: #f8d7da; color: #842029; }
    .status-berlangsung { background-color: #fff3cd; color: #664d03; }
    
    /* Search Summary Products */
    .products-grid { display: grid; grid-template-columns: repeat(5, 1fr); gap: 24px; }
    .store-product-card { border: 1px solid #e9ecef; border-radius: 8px; text-align:center; }
    .store-product-img-container { position: relative; background-color: #f8f9fa; padding: 16px; border-top-left-radius: 8px; border-top-right-radius: 8px; }
    .store-product-img-container img { width: 100%; height: 120px; object-fit: contain; }
    .store-product-fav-btn { position: absolute; top: 8px; right: 8px; color: #adb5bd; cursor: pointer; }
    .store-product-info { padding: 12px; }
    .store-product-name { font-size: 12px; color: #495057; margin: 0 0 4px 0; height: 32px; }
    .store-product-price { font-weight: 600; margin: 0 0 8px 0; }
    .store-product-footer { display: flex; justify-content: space-between; align-items: center; }
    .store-product-rating { display: flex; gap: 2px; color: #ffc107; }
    .store-product-add-btn { width: 24px; height: 24px; border-radius: 50%; background-color: #0C5AA2; color: white; display:flex; align-items:center; justify-content:center; cursor:pointer;}
    .carousel-nav { display: flex; justify-content: center; align-items: center; gap: 16px; margin-top: 24px; }
    
    @media (max-width: 1200px) { .products-grid { grid-template-columns: repeat(3, 1fr); } }
  `}</style>
);

// =================================================================================
// 2. DATA DUMMY
// =================================================================================
const recentOrders = [
  // { id: '#95459761', status: 'SEDANG BERLANGSUNG', date: 'Dec 30, 2019 05:18', total: '$1,500 (3 Products)' },
  // { id: '#71667167', status: 'SELESAI', date: 'Feb 2, 2019 19:28', total: '$80 (1 Products)' },
  // { id: '#95214362', status: 'DIBATALKAN', date: 'Mar 20, 2019 23:14', total: '$160 (3 Products)' },
  // { id: '#71667167', status: 'SELESAI', date: 'Feb 2, 2019 19:28', total: '$80 (1 Products)' },
  // { id: '#51746385', status: 'SELESAI', date: 'Feb 2, 2019 19:28', total: '$2,300 (2 Products)' },
  // { id: '#51746385', status: 'SELESAI', date: 'Dec 7, 2019 23:20', total: '$70 (1 Products)' },
  // { id: '#673871743', status: 'SELESAI', date: 'Dec 7, 2019 23:20', total: '$220 (1 Products)' },
];
const products = [
  { img: 'https://i.imgur.com/G5g06kE.png', name: 'Kemeja Polos', price: 'Rp 100.000', rating: 5 },
  { img: 'https://i.imgur.com/vHqgJ5y.png', name: 'Polo cokelat', price: 'Rp 100.000', rating: 5 },
  { img: 'https://i.imgur.com/2sXB9zD.png', name: 'Kemeja Wanita', price: 'Rp 75.000', rating: 5 },
  { img: 'https://i.imgur.com/Kxa80yM.png', name: 'Kaos polo pria', price: 'Rp 75.000', rating: 5 },
  { img: 'https://i.imgur.com/5u0wL7k.png', name: 'kemeja lengan', price: 'Rp 283.000', rating: 5 },
];
const getStatusClass = (status) => {
  switch (status) {
    case 'SELESAI': return 'status-selesai';
    case 'DIBATALKAN': return 'status-dibatalkan';
    case 'SEDANG BERLANGSUNG': return 'status-berlangsung';
    default: return '';
  }
};

// =================================================================================
// 3. KOMPONEN-KOMPONEN
// =================================================================================
const Header = () => (
  <header>
    <nav className="breadcrumb"><a href="#">Home</a> / <a href="#">User Account</a> / <span style={{ color: '#0d6efd', fontWeight: '500' }}>Dashboard</span></nav>
  </header>
);

const Sidebar = () => {
  const navItems = [
    { icon: <LayoutDashboard size={20} />, label: 'Dashboard', active: true },
    { icon: <Package size={20} />, label: 'Riwayat Pemesanan' },
    { icon: <Truck size={20} />, label: 'Lacak Pesanan' },
    { icon: <ShoppingCart size={20} />, label: 'Keranjang Belanja' },
    { icon: <Heart size={20} />, label: 'Wishlist' },
    { icon: <Store size={20} />, label: 'Buka Toko' },
    { icon: <CreditCard size={20} />, label: 'Kartu & Alamat' },
    { icon: <Settings size={20} />, label: 'Riwayat Pencarian' },
    { icon: <Settings size={20} />, label: 'Pengaturan' },
    { icon: <LogOut size={20} />, label: 'Log-out' },
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
const DashboardLihatToko = ({ toko, owner }) => {
  const [products, setProducts] = useState([]);
  const [trendingProducts, setTrendingProducts] = useState([]);
  const [orders, setOrders] = useState([]);

  const acceptOrder = async (id) => {
    console.log("ini id ", id)
    try {
      const token = localStorage.getItem('authToken')
      const response = await fetch(`http://localhost:8080/api/orders/${id}/accept`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        }
      })

      const res = await response.json()
      console.log(res)

    } catch (e) {
      console.log(e)
    }
  }

  const getOrders = async () => {
    try {
      const token = localStorage.getItem('authToken');
      const response = await fetch(`http://localhost:8080/api/orders/my-store-orders`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      const data = await response.json();
      setOrders(data)

    } catch (e) {
      console.error("Error saat mengambil data : " + e)
    }

  }

  const getProducts = async () => {
    try {
      const token = localStorage.getItem('authToken');
      const response = await fetch(`http://localhost:8080/api/products/store/${toko.username}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      const data = await response.json();

      setTrendingProducts(data)

    } catch (e) {
      console.error("Error saat mengambil data : " + e)
    }
  }

  useEffect(() => {
    const fProducts = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/products')
        const data = await response.json();
        setProducts(data)
      } catch (e) {
        console.log(e)
      }
    }

    const fOrder = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/products')
        const data = await response.json();
        setProducts(data)
      } catch (e) {
      }
    }

    fProducts()
    getProducts()
    getOrders()
  }, [])

  const filteredProducts = products.filter((product) => product.storeId === toko.id);
  console.log(filteredProducts.map(e => e.id))

  const styles = {
    productList: { display: 'grid', gap: '1.5rem', overflowX: 'auto', paddingBottom: '1rem', scrollbarWidth: 'none', 'msOverflowStyle': 'none', gridTemplateColumns: 'repeat(2, 1fr)', },
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(amount).replace('Rp', 'Rp ').trim();
  };

  return (
    <>
      <Styles />
      <div className="dashboard-page">
        <div className="dashboard-layout">
          <div className="main-content-grid">

            <div className="welcome-text">
              <h2>Halo, {toko.name}</h2>
              <p>Dari dashboard akun kamu, kamu dapat dengan mudah memeriksa & melihat <a href="#">Total Penjualan</a>, manage your <a href="#">orders</a>, <a href="#">shipping addresses</a> and <a href="#">edit your password and account details.</a></p>
            </div>

            <div className="top-section">
              <div className="card info-grid">
                <div className="info-box">
                  <h3>INFORMASI TOKO</h3>
                  <div className="user-profile">
                    <img src="https://i.imgur.com/gO23a1e.png" alt="warung92" />
                    <div><h4>{toko.name}</h4><p>{toko.address}</p></div>
                  </div>
                  <div className="info-line"><Mail size={16} /><p>{owner.email}</p></div>
                  <div className="info-line"><Instagram size={16} /><p>@{toko.username}</p></div>
                  <div className="info-line"><Phone size={16} /><p>+62-820-5555-0118</p></div>
                  <button className="edit-button">EDIT INFO</button>
                </div>
                <div className="info-box">
                  <h3>ALAMAT TOKO</h3>
                  <p className="info-line" style={{ alignItems: 'start' }}>
                    {toko.address}
                  </p>
                  <button className="edit-button">EDIT ALAMAT</button>
                </div>
              </div>
              <div className="store-stats-container">
                <div className="stat-box blue"><div className="stat-box-header"><span className="stat-box-value">2.65k</span><Users size={20} /></div><span className="stat-box-label">Total Pelanggan</span></div>
                <div className="stat-box orange"><div className="stat-box-header"><span className="stat-box-value">10k</span><Eye size={20} /></div><span className="stat-box-label">Total Pengunjung</span></div>
                <div className="stat-box green"><div className="stat-box-header"><span className="stat-box-value">1.5k</span><ShoppingCart size={20} /></div><span className="stat-box-label">Total Penjualan</span></div>
              </div>
            </div>

            <div className="top-section">
              <div className="card">
                <a href="/addproduct" className='edit-button'>TAMBAH PRODUK</a>
                <h1>PRODUK SAYA</h1>
                <div style={styles.productList} className="product-list">
                  {trendingProducts.map(product => <ProductCard key={product.id} product={product} />)}
                </div>
              </div>

              <div className="card">
                <div className="card-header"><h3 className="card-title">PESANAN TERBARU</h3><a href="#" className="view-all-link">Lihat Semua <ArrowRight size={16} /></a></div>
                <table className="orders-table">
                  <thead><tr><th>ORDER ID</th><th>STATUS</th><th>DATE</th><th>TOTAL</th><th>ACTION</th></tr></thead>
                  <tbody>
                    {orders.map((o, i) => (<tr key={i}><td>{o.id}</td><td><span className={`status-badge ${getStatusClass(o.status)}`}>{o.status}</span></td><td>{o.orderDate}</td><td>{formatCurrency(o.totalAmount)}</td><td> {o.status === "PENDING" ? <button className='edit-button' onClick={() => acceptOrder(o.id)}>TERIMA</button> : null} </td></tr>))}
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

export default DashboardLihatToko;