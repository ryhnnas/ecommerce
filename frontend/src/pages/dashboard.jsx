import React, { useEffect, useState } from 'react';
// Impor ikon dari library lucide-react
import {
  LayoutDashboard, Package, Truck, ShoppingCart, Heart, Store, CreditCard, Settings, LogOut,
  User, Mail, Phone, Edit2, MapPin, Box, Clock, CheckCircle, Plus, MoreVertical, Star, ArrowRight,
  ArrowLeftCircle, ArrowRightCircle,
  Search
} from 'lucide-react';
import fetchProfile from '../services/user/getprofile';
import '../style/dashboard.css'
import { useNavigate } from 'react-router-dom';
import CartPageComponent from '../components/cart';
import DashboardLihatToko from './DashboardLihatToko';
import DashboardLogout from './DashboardLogout';
import ModalReview from '../components/reviewmodal';

// =================================================================================
// 1. KOMPONEN CSS (Disimpan dalam satu file sesuai permintaan)
// =================================================================================

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
    <nav className="breadcrumb"><a href="#">Home</a> / <a href="#">User Account</a> / <span className="active" style={{ color: '#343a40', fontWeight: '500' }}>Dashboard</span></nav>
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

export async function getUser() {
  try {
    const token = localStorage.getItem('authToken');
    const res = await fetch(`http://localhost:8080/api/users/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      if (res.status === 401) {
        throw new Error('Unauthorized: Please log in again.');
      }
      throw new Error('Failed to fetch profile');
    }

    const data = await res.json();
    return data;
  } catch (err) {
    console.error('Error fetching profile:', err);
    throw err;
  }
}



const Dashboard = () => {
  const [name, setName] = useState(null);
  const [username, setUsername] = useState(null);
  const [email, setEmail] = useState(null);
  const [storeName, setStoreName] = useState('');
  const [storeUsername, setStoreUsername] = useState('');
  const [address, setAddress] = useState('');
  const [description, setDescription] = useState('');
  const [getOrder, setGetOrders] = useState([]);
  const [getStore, setGetStore] = useState([]);
  const [storeFound, setStoreFound] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reviewProduct, setReviewProduct] = useState([]);
  const [reviewProductDetails, setReviewProductDetails] = useState({
    ids: [], 
    orderIds: [],
    names: [],
  });
  const [productName, setProductName] = useState('');
  const [reviews, setReviews] = useState([]);

  const handleOpenModal = (orderItems) => {
    const productIds = orderItems.map(item => item.productId);
    const orderId = orderItems.map(item => item.id);
    const productNames = orderItems.map(item => item.productName);

    // Pass the product IDs and Names to the modal
    setReviewProductDetails({ ids: productIds, names: productNames, orderIds: orderId });
    // console.log(order)
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleReviewSubmit = (newReviews) => {
    // newReviews adalah objek dengan produk ID sebagai key dan rating serta review text sebagai value
    setReviews([...reviews, newReviews]);
    console.log("Reviews submitted:", newReviews);
  };

  useEffect(() => {
    fetchProfile(setName, setUsername, setEmail);
    console.log(name)
    getOrders();
    getStores();
  }, [])

  useEffect(() => {
    const store = getStore.find(
      (store) => store.ownerUsername === username && store.ownerName === name
    );
    setStoreFound(store ? true : false);
  }, [getStore, username, name])

  const links = document.querySelectorAll('.sidebar-menu a');
  const sections = document.querySelectorAll('.page-section');
  const breadcrumb = document.getElementById('breadcrumb');

  links.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();

      // Remove active class from all links
      links.forEach(l => l.classList.remove('active'));
      link.classList.add('active');

      // Hide all sections
      sections.forEach(section => section.classList.remove('active'));

      // Show target section
      const target = link.getAttribute('data-target');
      document.getElementById(target).classList.add('active');

      // Update breadcrumb text
      breadcrumb.innerHTML = `Home &gt; User Account &gt; <span>${link.textContent}</span>`;
    });
  });
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      name: storeName,
      username: storeUsername,
      address: address,
      description: description,
    };

    try {
      const token = localStorage.getItem('authToken');
      const response = await fetch('http://localhost:8080/api/stores', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Gagal menyimpan toko: ${response.statusText}`);
      }

      const result = await response.json();
      console.log('Toko berhasil dibuat:', result);

      // Optional: Reset form or redirect
      // resetForm();

      navigate("/addProduct");
    } catch (error) {
      console.error('Error saat submit toko:', error.message);
      alert('Terjadi kesalahan saat menyimpan data toko.' + JSON.stringify(payload));
    }
  };

  const loadMore = () => {
    // TODO: Add your load more logic here
    console.log('Load more clicked');
  };

  const getOrders = async () => {
    const token = localStorage.getItem('authToken');
    const response = await fetch('http://localhost:8080/api/orders/my-orders', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();
    setGetOrders(data)
  }

  const getStores = async () => {
    try {
      const token = localStorage.getItem('authToken');
      const response = await fetch('http://localhost:8080/api/stores', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      setGetStore(data)

    } catch (e) {
      console.log(e)
    }


  }

  const acceptOrder = async (id) => {
    try {
      const token = localStorage.getItem('authToken')
      const response = await fetch(`http://localhost:8080/api/orders/${id}/accept-delivery`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        }
      })

      const res = await response.json()
      console.log(res)
      getOrders()

    } catch (e) {
      console.log(e)
    }
  }

  const userStore = getStore.find((store) => store.ownerUsername === username && store.ownerName === name);

  const orderslength = getOrder.length
  const pendingLength = getOrder.filter(order => order.status === 'PENDING').length;
  const deliveredLength = getOrder.filter(order => order.status === 'ACCEPTED').length;
  return (
    <div className='inibody'>
      <nav className="sidebar">
        <div className="sidebar-logo">
          {/* <im src="logo belanjain.png" alt=""> */}
        </div>
        <ul className="sidebar-menu">
          <li><a href="#" data-target="dashboard" className="active"> <LayoutDashboard /> Dashboard</a></li>
          <li><a href="#" data-target="order-history"><Package /> Riwayat Pemesanan</a></li>
          {/* <li><a href="#" data-target="track-order"><Truck /> Lacak Pesanan</a></li> */}
          <li><a href="#" data-target="shopping-cart"><ShoppingCart /> Keranjang Belanja</a></li>
          <li><a href="#" data-target="open-store"><Store /> {storeFound ? 'Lihat Toko' : 'Buka Toko'}</a></li>
          {/* <li><a href="#" data-target="cards-address"><CreditCard /> Kartu & Alamat</a></li> */}
          {/* <li><a href="#" data-target="search-history"><Search /> Riwayat Pencarian</a></li> */}
          {/* <li><a href="#" data-target="settings"><Settings /> Pengaturan</a></li> */}
          <li><a href="#" data-target="logout"><LogOut /> Log-out</a></li>
        </ul>
      </nav>
      <main className="main-content">
        <div className="breadcrumb" id="breadcrumb">
          Home &gt; User Account &gt; <span>Dashboard</span>
        </div>

        {/* <!-- Dashboard --> */}
        <section id="dashboard" className="page-section active dashboard-overview">
          <h1>Hello, {name}</h1>
          <p className="welcome-text">
            From your account dashboard, you can easily check & view your
            <a href="#">Recent Orders</a>, manage your
            <a href="#">Shipping and Billing Addresses</a> and edit your
            <a href="#">Password</a> and Account Details.
          </p>

          <div className="info-cards">
            <div className="card account-info">
              <h2>ACCOUNT INFO</h2>
              <div className="account-profile">
                <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="Daniandra" />
                <div >
                  <p><strong>{name}</strong></p>
                  <p>Dhaka - 1207, Bangladesh</p>
                  <p>Email: {email}</p>
                  <p>Sec Email: {email}</p>
                  <p>Phone: +62-820-5555-0118</p>
                </div>
              </div>
              <button className="btn btn-primary">EDIT ACCOUNT</button>
            </div>

            <div className="card billing-address">
              <h2>BILLING ADDRESS</h2>
              <p><strong>{name}</strong></p>
              <p>East Tejturi Bazar, Word No. 04, Road No. 13/x, House no. 1320/C, Flat No. 5D, Dhaka -1200,
                Bangladesh</p>
              <p>Phone Number: +62-820-5555-0118</p>
              <p>Email: {email}</p>
              <button className="btn btn-primary">EDIT ADDRESS</button>
            </div>

            <div className="card stats-card">
              <div className="stat-item total-orders">
                <p className="stat-num">{orderslength}</p>
                <p>Total Pesanan</p>
              </div>
              <div className="stat-item pending-orders">
                <p className="stat-num">{pendingLength}</p>
                <p>Pesanan Menunggu</p>
              </div>
              <div className="stat-item completed-orders">
                <p className="stat-num">{deliveredLength}</p>
                <p>Pesanan Selesai</p>
              </div>
            </div>
          </div>

          {/* <!-- Payment Cards --> */}
          {/* <div className="payment-section">
            <h2>PAYMENT OPTION</h2>
            <div className="payment-cards">
              <div className="payment-card blue-card">
                <div className="card-number">**** **** **** 3814</div>
                <div className="card-holder">Daniandra</div>
                <div className="card-balance">Rp 745.000.000</div>
                <div className="card-type">VISA</div>
                <div className="card-actions">
                  <button>...</button>
                  <div className="card-menu">
                    <button>Edit Card</button>
                    <button>Delete Card</button>
                  </div>
                </div>
              </div>
              <div className="payment-card green-card">
                <div className="card-number">**** **** **** 1761</div>
                <div className="card-holder">Daniandra</div>
                <div className="card-balance">Rp 99.000.000</div>
                <div className="card-type">MasterCard</div>
                <div className="card-actions">
                  <button>...</button>
                  <div className="card-menu">
                    <button>Edit Card</button>
                    <button>Delete Card</button>
                  </div>
                </div>
              </div>
              <div className="payment-card add-card">
                <button>+Tambahkan Kartu</button>
              </div>
            </div>
          </div> */}

          {/* <!-- Recent Orders Table --> */}
          {/* <div className="orders-section">
            <h2>PESANAN TERBARU</h2>
            <table className="orders-table">
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
                <tr>
                  <td>#96459761</td>
                  <td className="status pending">SEDANG BERLANGSUNG</td>
                  <td>Dec 30, 2019 05:18</td>
                  <td>$1,500 (5 Products)</td>
                  <td><a href="#">Lihat Detail →</a></td>
                </tr>
                <tr>
                  <td>#71667167</td>
                  <td className="status delivered">SELESAI</td>
                  <td>Feb 2, 2019 19:28</td>
                  <td>$80 (11 Products)</td>
                  <td><a href="#">Lihat Detail →</a></td>
                </tr>
                <tr>
                  <td>#95214362</td>
                  <td className="status canceled">DIBATALKAN</td>
                  <td>Mar 20, 2019 23:14</td>
                  <td>$160 (3 Products)</td>
                  <td><a href="#">Lihat Detail →</a></td>
                </tr>
              </tbody>
            </table>
            <a href="#" className="btn-view-all">View All →</a>
          </div> */}

          {/* <div className="browsing-history-section">
            <h2>RIWAYAT PENCARIAN</h2>
            <div className="search-history-bar">
              <input type="text" placeholder="Search in browsing history" />
              <input type="date" />
            </div>
            <div className="product-carousel">
              <div className="product-card">
                <div className="label hot">HOT</div>
                <img src="https://via.placeholder.com/120x120?text=Earbuds" alt="Earbuds" />
                <p>TOZO T6 True Wireless Earbuds Bluetooth Headphones</p>
                <p className="rating">★★★★☆ (736)</p>
                <p className="price">$70</p>
              </div>
              <div className="product-card">
                <div className="label best">BEST DEALS</div>
                <img src="https://via.placeholder.com/120x120?text=Samsung+S21" alt="Samsung Galaxy S21" />
                <p>Samsung Electronics Samsung Galaxy S21 5G</p>
                <p className="rating">★★★★★ (536)</p>
                <p className="price">$2,300</p>
              </div>
            </div>
            <button className="btn-load-more">LOAD MORE</button>
          </div> */}

        </section>

        {/* <!-- Order History --> */}
        <section id="order-history" className="page-section">
          {isModalOpen && (
            <ModalReview
              productDetails={reviewProductDetails}
              onClose={handleCloseModal}
              onSubmit={handleReviewSubmit}
            />
          )}
          <h1>Riwayat Pemesanan</h1>
          <table className="orders-table">
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
              {getOrder.map((order) => (
                <tr key={order.id}>
                  <td>#{order.id}</td>
                  <td className={`status ${order.status.toLowerCase()}`}>{order.status}</td>
                  <td>{new Date(order.orderDate).toLocaleString("id-ID")}</td>
                  <td>Rp {order.totalAmount.toLocaleString("id-ID")} ({order.orderItems.length} Produk)</td>

                  <td>
                  {order.status === "ACCEPTED" ? (
                      // If the order is ACCEPTED, show the "REVIEW" button
                      <button className='edit-button' onClick={() => handleOpenModal(order.orderItems)}>
                        REVIEW
                      </button>
                    ) : order.status === "PENDING" ? (
                      // If the order is PENDING, show the "TERIMA" button
                      null
                    ) : (
                      // If the order status is neither ACCEPTED nor PENDING, show a different button or message
                      <button className='edit-button' onClick={() => acceptOrder(order.id)}>
                        TERIMA
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* <!-- Track Order --> */}
        <section id="track-order" className="page-section">

          <main className="lp-main-container">
            {/* <!-- Header --> */}
            <div className="lp-header">
              <a href="#" className="lp-back-btn">ORDER DETAILS</a>
              <button className="lp-rating-btn">Leave a Rating +</button>
            </div>

            {/* <!-- Order Summary --> */}
            <div className="lp-order-summary">
              <div>
                <div className="lp-order-number">#96459761</div>
                <div className="lp-order-details">4 Products • Order Placed in 17 Jan, 2021 at 7:32 PM</div>
              </div>
              <div className="lp-order-total">$1199.00</div>
            </div>

            {/* <!-- Progress Section --> */}
            <div className="lp-progress-section">
              <div className="lp-expected-date">Order expected arrival 23 Jan, 2021</div>

              <div className="lp-progress-bar">
                <div className="lp-progress-line">
                  <div className="lp-progress-fill"></div>
                </div>

                <div className="lp-progress-step">
                  <div className="lp-step-icon completed">✓</div>
                  <div className="lp-step-label">Order Placed</div>
                </div>

                <div className="lp-progress-step">
                  <div className="lp-step-icon active">📦</div>
                  <div className="lp-step-label">Packaging</div>
                </div>

                <div className="lp-progress-step">
                  <div className="lp-step-icon pending">🚛</div>
                  <div className="lp-step-label">On The Road</div>
                </div>

                <div className="lp-progress-step">
                  <div className="lp-step-icon pending">✓</div>
                  <div className="lp-step-label">Delivered</div>
                </div>
              </div>
            </div>

            {/* <!-- Order Activity --> */}
            <div className="lp-activity-section">
              <h2 className="lp-section-title">Order Activity</h2>

              <div className="lp-activity-item success">
                <div className="lp-activity-icon success">✓</div>
                <div className="lp-activity-content">
                  <div className="lp-activity-text">Your order has been delivered. Thank you for shopping at Glicon!</div>
                  <div className="lp-activity-time">23 Jan, 2021 at 7:32 PM</div>
                </div>
              </div>

              <div className="lp-activity-item info">
                <div className="lp-activity-icon info">👤</div>
                <div className="lp-activity-content">
                  <div className="lp-activity-text">Our delivery man (John Wick) Has picked up your order for delivery.</div>
                  <div className="lp-activity-time">23 Jan, 2021 at 2:00 PM</div>
                </div>
              </div>

              <div className="lp-activity-item info">
                <div className="lp-activity-icon info">📍</div>
                <div className="lp-activity-content">
                  <div className="lp-activity-text">Your order has reached at last mile hub.</div>
                  <div className="lp-activity-time">22 Jan, 2021 at 8:00 AM</div>
                </div>
              </div>

              <div className="lp-activity-item info">
                <div className="lp-activity-icon info">🚛</div>
                <div className="lp-activity-content">
                  <div className="lp-activity-text">Your order on the way to last mile hub.</div>
                  <div className="lp-activity-time">21, 2021 at 5:32 AM</div>
                </div>
              </div>

              <div className="lp-activity-item success">
                <div className="lp-activity-icon success">✓</div>
                <div className="lp-activity-content">
                  <div className="lp-activity-text">Your order is successfully verified.</div>
                  <div className="lp-activity-time">20 Jan, 2021 at 7:32 PM</div>
                </div>
              </div>

              <div className="lp-activity-item info">
                <div className="lp-activity-icon info">📋</div>
                <div className="lp-activity-content">
                  <div className="lp-activity-text">Your order has been confirmed.</div>
                  <div className="lp-activity-time">19 Jan, 2021 at 2:01 PM</div>
                </div>
              </div>
            </div>

            {/* <!-- Products Section --> */}
            <div className="lp-products-section">
              <div className="lp-products-header">
                <h2 className="lp-section-title">Product <span className="lp-products-count">(02)</span></h2>
              </div>

              <table className="lp-products-table">
                <thead className="lp-table-header">
                  <tr>
                    <th>PRODUCTS</th>
                    <th>PRICE</th>
                    <th>QUANTITY</th>
                    <th>SUB TOTAL</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="lp-product-row">
                    <td>
                      <div className="lp-product-info">
                        {/* <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='50' height='50' viewBox='0 0 50 50'%3E%3Crect width='50' height='50' fill='%23f8f9fa'/%3E%3Ctext x='25' y='30' text-anchor='middle' fill='%236c757d' font-size='20'%3E📱%3C/text%3E%3C/svg%3E" alt="Smartphone" className="lp-product-image"> */}
                        <div className="lp-product-details">
                          <div className="lp-product-category">SMARTPHONE</div>
                          <div className="lp-product-name">Google Pixel 6 Pro - 5G Android Phone - Unlocked Smartphone with Advanced Pixel C...</div>
                        </div>
                      </div>
                    </td>
                    <td className="lp-product-price">$899</td>
                    <td className="lp-product-quantity">x1</td>
                    <td className="lp-product-subtotal">$899</td>
                  </tr>
                  <tr className="lp-product-row">
                    <td>
                      <div className="lp-product-info">
                        {/* <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='50' height='50' viewBox='0 0 50 50'%3E%3Crect width='50' height='50' fill='%23f8f9fa'/%3E%3Ctext x='25' y='30' text-anchor='middle' fill='%236c757d' font-size='20'%3E📱%3C/text%3E%3C/svg%3E" alt="Phone Case" className="lp-product-image"> */}
                        <div className="lp-product-details">
                          <div className="lp-product-category">ACCESSORIES</div>
                          <div className="lp-product-name">Tech21 Evo Clear for Google Pixel 6 Pro - Crystal Clear Phone Case with 12ft Multi-Dr...</div>
                        </div>
                      </div>
                    </td>
                    <td className="lp-product-price">$39</td>
                    <td className="lp-product-quantity">x1</td>
                    <td className="lp-product-subtotal">$39</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* <!-- Addresses Section --> */}
            <div className="lp-addresses-section">
              <div className="lp-address-card">
                <h3 className="lp-address-title">Billing Address</h3>
                <div className="lp-address-name">Kevin Gilbert</div>
                <div className="lp-address-text">East Tejturi Bazar, Ward No. 04, Road No. 13/x, House no. 1320/C, Flat No. 5D, Dhaka - 1200, Bangladesh</div>
                <div class="lp-contact-info">Phone Number: +1 202-555-0118</div>
                <div class="lp-contact-info">Email: kevin.gilbert@gmail.com</div>
              </div>

              <div class="lp-address-card">
                <h3 class="lp-address-title">Shipping Address</h3>
                <div class="lp-address-name">Kevin Gilbert</div>
                <div class="lp-address-text">East Tejturi Bazar, Ward No. 04, Road No. 13/x, House no. 1320/C, Flat No. 5D, Dhaka - 1200, Bangladesh</div>
                <div class="lp-contact-info">Phone Number: +1 202-555-0118</div>
                <div class="lp-contact-info">Email: kevin.gilbert@gmail.com</div>
              </div>

              <div class="lp-address-card">
                <h3 class="lp-address-title">Order Notes</h3>
                <div class="lp-notes-text">Donec ac vehicula turpis. Aenean sagittis elit ut arcu ornare, sed venenatis purus lobortis. Aliquam erat volutpat. Aliquam magna odio.</div>
              </div>
            </div>
          </main>
        </section>

        {/* <!-- Shopping Cart --> */}
        <section id="shopping-cart" class="page-section">
          <h1>Keranjang Belanja</h1>
          <CartPageComponent />
        </section>

        {/* <!-- Open Store --> */}
        <section
          id="open-store"
          className="page-section"
          style={{
            border: '1px solid rgb(206, 205, 205)',
            borderRadius: '6px',
            padding: '15px',
          }}
        >
          {storeFound ? (
            <>
              <DashboardLihatToko key={userStore.id} toko={userStore}
                owner={{ name: name, email: email, username: username }} />
            </>
          ) : (
            <>
              <h1
                style={{
                  color: 'black',
                  fontSize: '20px',
                  fontWeight: 'lighter',
                }}
              >
                BUKA TOKO
              </h1>
              <hr />
              <div className="content-card" style={{ marginTop: '24px' }}>
                <div className="open-store-layout-flex">
                  <div className="open-store-avatar-preview-area">
                    <div className="open-store-avatar-circle">
                      <span className="store-icon-placeholder">🏪</span>
                    </div>
                    <button className="btn btn-primary">Upload Logo Toko</button>
                  </div>
                  <form className="open-store-form-fields" onSubmit={handleSubmit}>
                    <div className="open-store-form-row">
                      <div className="open-store-form-group">
                        <label htmlFor="open-store-nama-toko">Nama Toko</label>
                        <input
                          type="text"
                          id="open-store-nama-toko"
                          value={storeName}
                          onChange={(e) => setStoreName(e.target.value)}
                          required
                        />
                      </div>
                      <div className="open-store-form-group">
                        <label htmlFor="open-store-username">Username Toko</label>
                        <input
                          type="text"
                          id="open-store-username"
                          value={storeUsername}
                          onChange={(e) => setStoreUsername(e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div className="open-store-form-row">
                      <div className="open-store-form-group">
                        <label htmlFor="open-store-email">Email</label>
                        <input
                          type="email"
                          id="open-store-email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                      </div>
                      <div className="open-store-form-group">
                        <label htmlFor="open-store-alamat">Alamat Toko</label>
                        <input
                          type="text"
                          id="open-store-alamat"
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div className="open-store-form-group">
                      <label htmlFor="open-store-deskripsi">Deskripsi Toko</label>
                      <textarea
                        id="open-store-deskripsi"
                        placeholder="Jelaskan tentang toko Anda..."
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                      ></textarea>
                    </div>

                    <div className="open-store-form-actions">
                      <button
                        type="submit"
                        className="btn styled-btn-primary"
                        style={{ backgroundColor: '#0C5AA2', color: 'white' }}
                      >
                        SIMPAN
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </>
          )}

        </section>

        {/* <!-- Cards & Address --> */}
        <section id="cards-address" className="page-section">
          <h1>Kartu & Alamat</h1>
          <div className="container mt-5">
            <h2>Payment Option</h2>
            <div className="card-container">
              {/* Card 1 */}
              <div className="card bg-primary text-white">
                <div className="card-info">
                  <span className="card-type">VISA</span>
                  <span>Kevin Gilbert</span>
                </div>
                <div className="card-number">**** **** **** 3814</div>
                <div className="text-right">
                  <button className="btn btn-light btn-sm">Edit Card</button>
                  <button className="btn btn-danger btn-sm">Delete Card</button>
                </div>
              </div>

              {/* Card 2 */}
              <div className="card bg-success text-white">
                <div className="card-info">
                  <span className="card-type">MasterCard</span>
                  <span>Kevin Gilbert</span>
                </div>
                <div className="card-number">**** **** **** 1761</div>
                <div className="text-right">
                  <button className="btn btn-light btn-sm">Edit Card</button>
                  <button className="btn btn-danger btn-sm">Delete Card</button>
                </div>
              </div>
            </div>

            <h3>Billing Address</h3>
            <div className="address-card">
              <div className="address-title">Kevin Gilbert</div>
              <div className="address-info">
                <strong>Address:</strong> East Tejturi Bazar, Word No. 04, Road No. 13/x, House no. 1320/C, Flat No. 5D,
                Dhaka - 1200, Bangladesh
              </div>
              <div className="address-info">
                <strong>Phone Number:</strong> +1-202-555-0118
              </div>
              <div className="address-info">
                <strong>Email:</strong> kevin.gilbert@gmail.com
              </div>
              <div className="address-buttons">
                <button className="btn btn-primary btn-sm">Edit Address</button>
              </div>
            </div>

            <h3>Shipping Address</h3>
            <div className="address-card">
              <div className="address-title">Kevin Gilbert</div>
              <div className="address-info">
                <strong>Address:</strong> East Tejturi Bazar, Word No. 04, Road No. 13/x, House no. 1320/C, Flat No. 5D,
                Dhaka - 1200, Bangladesh
              </div>
              <div className="address-info">
                <strong>Phone Number:</strong> +1-202-555-0118
              </div>
              <div className="address-info">
                <strong>Email:</strong> kevin.gilbert@gmail.com
              </div>
              <div className="address-buttons">
                <button className="btn btn-primary btn-sm">Edit Address</button>
              </div>
            </div>
          </div>
        </section>

        {/* <!-- Search History --> */}
        <section id="search-history" className="page-section">
          <div className="main-content">
            <h1>Riwayat Pencarian</h1>

            <input type="text" className="custom-search" placeholder="Search in browsing" />
            <input type="date" className="custom-date" placeholder="DD/MM/YYYY" />

            {/* Date Section */}
            <div className="date-section">
              <div className="date-header">17 OCT 2020</div>
              <div className="product-grid">
                <div className="product-card">
                  <div className="product-badge badge-hot">HOT</div>
                  <img
                    src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=200&fit=crop"
                    alt="TOZO T6 True Wireless Earbuds"
                    className="product-image"
                  />
                  <div className="product-rating">
                    <span className="stars">★★★★★</span>
                    <span className="rating-count">(738)</span>
                  </div>
                  <div className="product-title">TOZO T6 True Wireless Earbuds Bluetooth Headphones</div>
                  <div className="product-price">$70</div>
                </div>

                <div className="product-card">
                  <img
                    src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300&h=200&fit=crop"
                    alt="Samsung Galaxy S21 5G"
                    className="product-image"
                  />
                  <div className="product-rating">
                    <span className="stars">★★★★★</span>
                    <span className="rating-count">(536)</span>
                  </div>
                  <div className="product-title">Samsung Electronics Samsung Galaxy S21 5G</div>
                  <div className="product-price">$2,300</div>
                </div>

                <div className="product-card">
                  <div className="product-badge badge-best-deals">BEST DEALS</div>
                  <img
                    src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=200&fit=crop"
                    alt="Amazon Basics HDMI Cable"
                    className="product-image"
                  />
                  <div className="product-rating">
                    <span className="stars">★★★★★</span>
                    <span className="rating-count">(423)</span>
                  </div>
                  <div className="product-title">Amazon Basics High-Speed HDMI Cable (18 Gbps, 4K/6K)</div>
                  <div className="product-price">$360</div>
                </div>

                <div className="product-card">
                  <img
                    src="https://images.unsplash.com/photo-1484704849700-f032a568e944?w=300&h=200&fit=crop"
                    alt="Portable Washing Machine"
                    className="product-image"
                  />
                  <div className="product-rating">
                    <span className="stars">★★★★☆</span>
                    <span className="rating-count">(816)</span>
                  </div>
                  <div className="product-title">Portable Washing Machine, 11lbs capacity Model 18NMF</div>
                  <div className="product-price">$80</div>
                </div>
              </div>
            </div>

            {/* Load More Button */}
            <div className="load-more">
              <button onClick={loadMore}>LOAD MORE</button>
            </div>
          </div>
        </section>

        {/* <!-- Settings --> */}
        <section id="settings" className="page-section">
          <h1>Pengaturan</h1>
          <p>Halaman pengaturan diisi nanti.</p>
        </section>


        {/* <!-- Logout --> */}
        <section id="logout" className="page-section">
          <DashboardLogout />
        </section>

      </main>
    </div>
  );
};

export default Dashboard;