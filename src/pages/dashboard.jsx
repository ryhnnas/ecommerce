// src/pages/dashboard.jsx

import React from 'react';
import styled from 'styled-components';
import Sidebar from '../components/sidebar';

// Impor ikon yang akan digunakan
import { MdNotifications, MdHourglassEmpty, MdCheckBox } from 'react-icons/md';
import { FaEllipsisV } from 'react-icons/fa';

// Styled-component Wrapper
// PERBAIKAN: Seluruh blok CSS dimasukkan ke dalam backticks ``
const DashboardWrapper = styled.div`
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
      font-size: 16px;
      text-transform: uppercase;
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
    overflow-x: auto;
  }
  .table-container {
    min-width: 700px;
  }
  .table-header, .table-row {
    display: grid;
    grid-template-columns: 1fr 1.5fr 1fr 1fr 1fr;
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
`;

// Data Mock
const userData = {
  name: 'Daniandra',
  location: 'Dhaka-1207, Bangladesh',
  email: 'daniandra@gmail.com',
  phone: '+62 8282 8282 1212',
  avatar: 'https://i.pravatar.cc/60?u=daniandra',
  billingAddress: 'East Tejturi Bazar, Word No. 38, Road No. 3/A, House No. 13/4, Dhaka 1215'
};

const recentOrders = [
  { id: '#F994028763', customer: 'Daniandra', date: 'Dec 28, 2019', total: '$1,808.00', status: 'Completed' },
  { id: '#F74907107', customer: 'John Doe', date: 'Feb 02, 2020', total: '$80.00', status: 'Pending' },
  { id: '#E6214302', customer: 'Jane Smith', date: 'Mar 25, 2020', total: '$450.00', status: 'Cancelled' },
  { id: '#G12345678', customer: 'Daniandra', date: 'Apr 10, 2020', total: '$25.50', status: 'Completed' },
];


// Komponen Dashboard Utama
const Dashboard = () => {

  // Fungsi helper untuk status
  const getStatusClass = (status) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'status-completed';
      case 'pending':
        return 'status-pending';
      case 'cancelled':
        return 'status-cancelled';
      default:
        return '';
    }
  };

  return (
    <DashboardWrapper>
      <Sidebar />
      <main className="main-content">
        <div className="breadcrumbs">
          <p>Home &gt; User &gt; Dashboard</p>
        </div>
        
        <div className="welcome-header">
          <h2>Hello, {userData.name}</h2>
          <p>From your account dashboard, you can easily check & view your <a href="#">Recent Orders</a>, manage your <a href="#">Shipping and Billing Addresses</a> and <br/> edit your <a href="#">Password and Account Details</a>.</p>
        </div>
        
        <div className="info-cards-grid">
          <div className="card account-info">
            <h3>ACCOUNT INFO</h3>
            <div className="user-details">
              <img src={userData.avatar} alt="User Avatar" className="avatar" />
              <div>
                <strong>{userData.name}</strong>
                <p>{userData.location}</p>
                <p>Email: {userData.email}</p>
                <p>Phone: {userData.phone}</p>
              </div>
            </div>
            <button className="edit-btn">EDIT ACCOUNT</button>
          </div>
          <div className="card billing-address">
            <h3>BILLING ADDRESS</h3>
            <strong>{userData.name}</strong>
            <p>{userData.billingAddress}</p>
            <p>Email: {userData.email}</p>
            <p>Phone: {userData.phone}</p>
            <button className="edit-btn">EDIT ADDRESS</button>
          </div>
        </div>

        <div className="summary-cards-grid">
            <div className="summary-card blue-bg">
                <MdNotifications size={40} />
                <p>154</p>
                <span>Total Pesanan</span>
            </div>
             <div className="summary-card orange-bg">
                <MdHourglassEmpty size={40} />
                <p>95</p>
                <span>Pesanan Diproses</span>
            </div>
             <div className="summary-card green-bg">
                <MdCheckBox size={40} />
                <p>149</p>
                <span>Pesanan Selesai</span>
            </div>
        </div>
        
        <div className="dashboard-section">
            <div className="section-header">
                <h3>PAYMENT OPTION</h3>
                <a href="#">Semua Kartu →</a>
            </div>
            <div className="payment-cards-grid">
                <div className="payment-card visa">
                    <div className="card-actions">
                        <FaEllipsisV />
                        <div className="actions-dropdown">
                            <div>Edit</div>
                            <div>Hapus</div>
                        </div>
                    </div>
                    <div>
                        <p className="card-balance">Rp 145.000.000</p>
                    </div>
                    <div>
                        <p className="card-label">CARD NUMBER</p>
                        <p className="card-number">3814 **** **** ****</p>
                        <div className="card-footer">
                            <span>{userData.name}</span>
                            <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="card-logo" />
                        </div>
                    </div>
                </div>
                <div className="add-card">
                    + Tambah Kartu Baru
                </div>
            </div>
        </div>

        <div className="dashboard-section">
            <div className="section-header">
                <h3>PESANAN TERBARU</h3>
                <a href="#">Lihat Semua →</a>
            </div>
            <div className="orders-table">
              <div className="table-container">
                <div className="table-header">
                    <span>ORDER ID</span>
                    <span>CUSTOMER</span>
                    <span>DATE</span>
                    <span>TOTAL</span>
                    <span>STATUS</span>
                </div>
                {recentOrders.map(order => (
                    <div className="table-row" key={order.id}>
                        <span className="order-id">{order.id}</span>
                        <span>{order.customer}</span>
                        <span>{order.date}</span>
                        <span>{order.total}</span>
                        <span><div className={`status-pill ${getStatusClass(order.status)}`}>{order.status}</div></span>
                    </div>
                ))}
              </div>
            </div>
        </div>
      </main>
    </DashboardWrapper>
  );
};

export default Dashboard;