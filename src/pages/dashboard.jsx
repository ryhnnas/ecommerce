// src/dashboard.jsx

import React from 'react';
import styled from 'styled-components';
import Sidebar from './components/Sidebar'; // Impor Sidebar yang sudah dipisah

import {
  MdNotifications, MdHourglassEmpty, MdCheckBox
} from 'react-icons/md';
import { FaEllipsisV } from 'react-icons/fa';

// Styled-component Wrapper - Semua CSS ada di sini
const DashboardWrapper = styled.div`
  /* General Setup */
  --primary-color: #2a41e8;
  --text-color: #6a737c;
  --heading-color: #1c2733;
  --background-color: #f8f9fa;
  --white-color: #ffffff;
  --border-color: #e0e0e0;
  --green-status: #28a745;
  --red-status: #dc3545;
  --yellow-status: #ffc107;

  font-family: 'Helvetica', 'Arial', sans-serif;
  color: var(--text-color);
  display: flex;
  min-height: 100vh;
  
  a {
    color: var(--primary-color);
    text-decoration: none;
  }

  /* Sidebar Styles */
  .sidebar {
    width: 280px;
    background-color: var(--white-color);
    padding: 30px 20px;
    box-shadow: 2px 0 5px rgba(0,0,0,0.05);
    flex-shrink: 0;

    nav ul {
      list-style: none;
      padding: 0;
      margin: 0;
    }

    nav li {
      padding: 15px 20px;
      margin-bottom: 5px;
      border-radius: 8px;
      display: flex;
      align-items: center;
      gap: 15px;
      cursor: pointer;
      color: var(--heading-color);
      font-weight: 500;
      transition: background-color 0.3s, color 0.3s;
      
      &:hover {
        background-color: #f0f2ff;
      }
      &.active {
        background-color: var(--primary-color);
        color: var(--white-color);
      }
      svg {
        font-size: 20px;
      }
    }
  }

  /* Main Content Styles */
  .main-content {
    flex-grow: 1;
    background-color: var(--background-color);
    padding: 20px 40px;
  }

  .breadcrumbs p {
    font-size: 14px;
    color: var(--text-color);
  }

  .welcome-header {
    margin-bottom: 30px;
    h2 {
      color: var(--heading-color);
      margin-bottom: 10px;
    }
    p {
      line-height: 1.6;
    }
  }

  .card {
    background-color: var(--white-color);
    padding: 25px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.05);
    border: 1px solid var(--border-color);
    h3 {
      color: var(--heading-color);
      margin-top: 0;
      margin-bottom: 20px;
    }
    p, strong {
      font-size: 14px;
      margin: 4px 0;
    }
  }

  .info-cards-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 30px;
    margin-bottom: 30px;
  }

  .account-info .user-details {
    display: flex;
    align-items: center;
    gap: 20px;
  }
  .account-info .avatar {
    width: 60px;
    height: 60px;
    border-radius: 50%;
  }

  .edit-btn {
    margin-top: 20px;
    background-color: transparent;
    border: 1px solid var(--primary-color);
    color: var(--primary-color);
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    font-weight: bold;
  }

  .summary-cards-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 30px;
    margin-bottom: 30px;
  }

  .summary-card {
    padding: 20px;
    border-radius: 8px;
    text-align: center;
    svg { margin-bottom: 10px; }
    p { font-size: 36px; font-weight: bold; margin: 0; }
    span { font-size: 14px; }
    &.blue-bg { background-color: #e0f0ff; color: #007bff; }
    &.orange-bg { background-color: #fff4e5; color: #ff9800; }
    &.green-bg { background-color: #e5f7ed; color: #28a745; }
  }

  .dashboard-section {
    margin-bottom: 40px;
  }
  .section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    h3 {
      margin: 0;
      color: var(--heading-color);
      font-size: 18px;
    }
  }

  .payment-cards-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 30px;
  }
  .payment-card {
    border-radius: 15px;
    padding: 20px;
    color: white;
    position: relative;
    height: 180px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    &.visa { background: linear-gradient(45deg, #1e3c72, #2a5298); }
    &.mastercard { background: linear-gradient(45deg, #16A085, #F4D03F); }
    .card-actions {
      position: absolute;
      top: 20px;
      right: 20px;
      cursor: pointer;
      .actions-dropdown {
        display: none;
        position: absolute;
        right: 0;
        top: 25px;
        background-color: white;
        color: black;
        border-radius: 5px;
        box-shadow: 0 2px 10px rgba(0,0,0,0.2);
        padding: 5px 0;
        font-size: 14px;
        width: 100px;
        z-index: 10;
        div {
            padding: 8px 15px;
            &:hover { background-color: #f0f0f0; }
        }
      }
      &:hover .actions-dropdown {
        display: block;
      }
    }
    .card-balance { font-size: 24px; margin: 0; }
    .card-label { font-size: 12px; opacity: 0.8; margin: 20px 0 5px; }
    .card-number { font-size: 18px; letter-spacing: 2px; margin: 0; }
    .card-footer { display: flex; justify-content: space-between; align-items: center; font-weight: bold; }
    .card-logo { width: 40px; }
  }

  .add-card {
    border: 2px dashed var(--border-color);
    border-radius: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--text-color);
    font-weight: 500;
    cursor: pointer;
    min-height: 180px;
  }

  .orders-table {
    background-color: var(--white-color);
    border-radius: 8px;
    padding: 10px 25px;
    border: 1px solid var(--border-color);
  }
  .table-header, .table-row {
    display: grid;
    grid-template-columns: 1.5fr 2fr 2fr 2fr 1.5fr;
    align-items: center;
    padding: 15px 0;
    font-size: 14px;
  }
  .table-header {
    color: var(--text-color);
    font-weight: bold;
    border-bottom: 1px solid var(--border-color);
  }
  .table-row {
    color: var(--heading-color);
    border-bottom: 1px solid #f5f5f5;
    &:last-child {
      border-bottom: none;
    }
  }
  .order-id { font-weight: bold; }
  .status-pill {
    padding: 5px 12px;
    border-radius: 15px;
    font-size: 12px;
    font-weight: bold;
    text-align: center;
    display: inline-block;
  }
  .status-completed { background-color: #e5f7ed; color: var(--green-status); }
  .status-pending { background-color: #fff8e1; color: var(--yellow-status); }
  .status-cancelled { background-color: #fbe9e7; color: var(--red-status); }
  .view-details { font-weight: bold; }
  
  .products-carousel {
    display: flex;
    align-items: center;
    gap: 15px;
  }
  .carousel-arrow {
    background-color: white;
    border: 1px solid var(--border-color);
    border-radius: 50%;
    width: 40px;
    height: 40px;
    font-size: 20px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }
  .products-grid {
    flex-grow: 1;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;
  }
  .product-card {
    background-color: var(--white-color);
    border: 1px solid var(--border-color);
    border-radius: 8px;
    padding: 15px;
    text-align: center;
    position: relative;
    img {
      max-width: 100%;
      height: 150px;
      object-fit: contain;
      margin-bottom: 10px;
    }
  }
  .product-tag {
    position: absolute;
    top: 10px;
    left: 10px;
    padding: 3px 8px;
    font-size: 10px;
    color: white;
    border-radius: 3px;
    font-weight: bold;
    &.hot { background-color: var(--red-status); }
    &.best-deal { background-color: var(--primary-color); }
  }
  .product-rating {
    color: #ffc107;
    font-size: 14px;
    span {
      color: var(--text-color);
      font-size: 12px;
      margin-left: 5px;
    }
  }
  .product-name {
    font-size: 14px;
    color: var(--heading-color);
    height: 40px; /* fixed height for alignment */
    overflow: hidden;
  }
  .product-price {
    font-size: 16px;
    font-weight: bold;
    color: var(--heading-color);
  }

  .carousel-dots {
    display: flex;
    justify-content: center;
    margin-top: 20px;
    .dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background-color: #ccc;
      margin: 0 5px;
      cursor: pointer;
      &.active {
        background-color: var(--primary-color);
      }
    }
  }
`;

// Data Mock
const userData = {
  name: 'Daniandra',
  avatar: 'https://i.pravatar.cc/150?u=daniandra',
  location: 'Dhaka - 1212, Bangladesh',
  email: 'daniandra@gmail.com',
  secondaryEmail: 'creativelayers088@gmail.com',
  phone: '+02-820-5555-0118',
  billingAddress: {
    line1: 'East Pachalum, Wariha Rd, House no. 1523/C,',
    line2: 'Dhaka - 1293, Bangladesh',
    phone: '+02-820-8885-0118',
    email: 'billing@gmail.com'
  }
};
const recentOrders = [
  { id: '#964597E1', status: 'SEDANG BERLANGSUNG', date: 'Dec 30, 2019 05:10', total: '$1,500 (5 Products)' },
  { id: '#718971E7', status: 'SELESAI', date: 'Feb 2, 2019 19:28', total: '$90 (1 Product)' },
  { id: '#952143E2', status: 'DIBATALKAN', date: 'Mar 20, 2019 23:14', total: '$160 (3 Products)' },
  { id: '#718971E7', status: 'SELESAI', date: 'Feb 2, 2019 19:28', total: '$90 (1 Product)' },
  { id: '#517462E5', status: 'DIBATALKAN', date: 'Dec 30, 2019 07:52', total: '$2,300 (2 Products)' },
  { id: '#873971742', status: 'SELESAI', date: 'Dec 2, 2019 22:39', total: '$200 (1 Product)' },
];
const recommendedProducts = [
    { id: 1, name: 'TOZO T6 True Wireless Earbuds Bluetooth Headphon...', price: '$70', image: 'https://i.imgur.com/3ZkY4Yt.png', tag: 'HOT', rating: 5, reviews: 738 },
    { id: 2, name: 'Samsung Electronics Samsung Galaxy S21 5G', price: '$2,300', image: 'https://i.imgur.com/7gC28eJ.png', rating: 5, reviews: 599 },
    { id: 3, name: 'Amazon Basics High-Speed HDMI Cable (18 Gbps, 4K/6...', price: '$360', image: 'https://i.imgur.com/o1L4B3z.png', tag: 'BEST DEAL', rating: 5, reviews: 423 },
    { id: 4, name: 'Portable Wriling Mschine, max capacity Model 181MF...', price: '$60', image: 'https://i.imgur.com/T0C4Yf1.png', rating: 5, reviews: 889 },
];

// Komponen Dashboard Utama
const Dashboard = () => {
  const getStatusClass = (status) => {
    switch (status) {
      case 'SELESAI': return 'status-completed';
      case 'SEDANG BERLANGSUNG': return 'status-pending';
      case 'DIBATALKAN': return 'status-cancelled';
      default: return '';
    }
  };

  return (
    <DashboardWrapper>
      <Sidebar />
      <main className="main-content">
        <div className="breadcrumbs">
          <p>Home > User Account > <strong>Dashboard</strong></p>
        </div>

        <div className="welcome-header">
          <h2>Hello, {userData.name}</h2>
          <p>From your account dashboard, you can easily check & view your <a href="#">Recent Orders</a>, manage your <a href="#">Shipping and Billing Addresses</a> and <br/> edit your <a href="#">Password and Account Details</a>.</p>
        </div>

        <div className="info-cards-grid">
          <div className="card account-info">
            <h3>ACCOUNT INFO</h3>
            <div className="user-details">
              <img src={userData.avatar} alt="User Avatar" className="avatar"/>
              <div>
                <strong>{userData.name}</strong>
                <p>{userData.location}</p>
                <p>Email: {userData.email}</p>
                <p>Sec Email: {userData.secondaryEmail}</p>
                <p>Phone: {userData.phone}</p>
              </div>
            </div>
            <button className="edit-btn">EDIT ACCOUNT</button>
          </div>
          <div className="card billing-address">
            <h3>BILLING ADDRESS</h3>
            <strong>{userData.name}</strong>
            <p>{userData.billingAddress.line1}<br/>{userData.billingAddress.line2}</p>
            <p>Phone Number: {userData.billingAddress.phone}</p>
            <p>Email: {userData.billingAddress.email}</p>
            <button className="edit-btn">EDIT ADDRESS</button>
          </div>
        </div>

        <div className="summary-cards-grid">
          <div className="summary-card blue-bg">
            <MdNotifications size={30} />
            <p>154</p>
            <span>Total Pesanan</span>
          </div>
          <div className="summary-card orange-bg">
            <MdHourglassEmpty size={30} />
            <p>05</p>
            <span>Pesanan Menunggu</span>
          </div>
          <div className="summary-card green-bg">
            <MdCheckBox size={30} />
            <p>149</p>
            <span>Pesanan Selesai</span>
          </div>
        </div>

        <section className="dashboard-section">
            <div className="section-header">
                <h3>PAYMENT OPTION</h3>
                <a href="#">Semua Kartu →</a>
            </div>
            <div className="payment-cards-grid">
                <div className="payment-card visa">
                    <div className="card-actions">
                        <FaEllipsisV />
                        <div className="actions-dropdown">
                            <div>Edit Card</div>
                            <div>Delete Card</div>
                        </div>
                    </div>
                    <p className="card-balance">Rp 745.000.000</p>
                    <p className="card-label">CARD NUMBER</p>
                    <p className="card-number">**** **** **** 3814</p>
                    <div className="card-footer">
                        <span>VISA</span>
                        <span>{userData.name}</span>
                    </div>
                </div>
                <div className="payment-card mastercard">
                     <div className="card-actions">
                        <FaEllipsisV />
                    </div>
                    <p className="card-balance">Rp 98.000.000</p>
                    <p className="card-label">CARD NUMBER</p>
                    <p className="card-number">**** **** **** 1761</p>
                     <div className="card-footer">
                        <img src="https://i.imgur.com/28Zk2z6.png" alt="Mastercard Logo" className="card-logo"/>
                        <span>{userData.name}</span>
                    </div>
                </div>
                <div className="add-card">
                    + Tambahkan Kartu
                </div>
            </div>
        </section>

        <section className="dashboard-section">
          <div className="section-header">
            <h3>PESANAN TERBARU</h3>
            <a href="#">View All →</a>
          </div>
          <div className="orders-table">
            <div className="table-header">
              <span>ORDER ID</span>
              <span>STATUS</span>
              <span>DATE</span>
              <span>TOTAL</span>
              <span>ACTION</span>
            </div>
            {recentOrders.map((order, index) => (
              <div className="table-row" key={index}>
                <span className="order-id">{order.id}</span>
                <span><div className={`status-pill ${getStatusClass(order.status)}`}>{order.status}</div></span>
                <span>{order.date}</span>
                <span>{order.total}</span>
                <span><a href="#" className="view-details">Lihat Detail →</a></span>
              </div>
            ))}
          </div>
        </section>

        <section className="dashboard-section">
          <div className="section-header">
            <h3>RIWAYAT PENCARIAN</h3>
            <a href="#">Lihat Semua →</a>
          </div>
          <div className="products-carousel">
            <button className="carousel-arrow prev">←</button>
            <div className="products-grid">
                {recommendedProducts.map(product => (
                    <div className="product-card" key={product.id}>
                        {product.tag && <span className={`product-tag ${product.tag === 'HOT' ? 'hot' : 'best-deal'}`}>{product.tag}</span>}
                        <img src={product.image} alt={product.name} />
                        <div className="product-rating">
                            {'★'.repeat(product.rating)}{'☆'.repeat(5 - product.rating)}
                            <span>({product.reviews})</span>
                        </div>
                        <p className="product-name">{product.name}</p>
                        <p className="product-price">{product.price}</p>
                    </div>
                ))}
            </div>
            <button className="carousel-arrow next">→</button>
          </div>
           <div className="carousel-dots">
              <span className="dot"></span>
              <span className="dot active"></span>
              <span className="dot"></span>
              <span className="dot"></span>
            </div>
        </section>
      </main>
    </DashboardWrapper>
  );
};

export default Dashboard;