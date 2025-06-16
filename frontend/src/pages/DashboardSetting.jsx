import React, { useState } from 'react';
// Impor ikon dari library lucide-react
import { 
  LayoutDashboard, Package, Truck, ShoppingCart, Heart, Store, CreditCard, Settings, LogOut, 
  Eye, EyeOff
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
    .sidebar-nav li a.active { background-color: #0d6efd; color: #ffffff; }
    .sidebar-nav li a.active svg { color: #ffffff; }

    /* Settings Page Specific Styles */
    .settings-card-title {
      font-size: 16px; font-weight: 600; color: #343a40; margin: 0 0 24px 0;
      padding-bottom: 16px; border-bottom: 1px solid #e9ecef;
    }

    /* Account Setting Card */
    .account-setting-layout {
      display: flex;
      gap: 24px;
      align-items: flex-start;
    }
    .avatar-container {
      flex-shrink: 0;
      text-align: center;
    }
    .avatar-container img {
      width: 120px;
      height: 120px;
      border-radius: 50%;
      object-fit: cover;
      border: 4px solid #e9ecef;
    }
    .form-grid {
      flex: 1;
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
    .form-group input, .form-group select {
      width: 100%;
      padding: 10px 12px;
      border: 1px solid #dee2e6;
      border-radius: 6px;
      font-size: 14px;
    }
    .save-button {
      padding: 12px;
      border: none;
      background-color: #0d6efd;
      color: white;
      font-weight: 600;
      border-radius: 6px;
      cursor: pointer;
      width: fit-content;
      justify-self: start;
    }
    .form-grid > .save-button {
      grid-column: 1;
    }

    /* Change Password Card */
    .password-input-wrapper {
        position: relative;
    }
    .password-input-wrapper input {
        padding-right: 40px;
    }
    .password-toggle-icon {
        position: absolute;
        right: 12px;
        top: 50%;
        transform: translateY(-50%);
        color: #6c757d;
        cursor: pointer;
    }
    .password-helper-text {
        font-size: 12px;
        color: #6c757d;
    }
    
    @media (max-width: 992px) {
      .dashboard-layout { flex-direction: column; }
      .sidebar { flex: 0 0 auto; width: 100%; }
      .account-setting-layout { flex-direction: column; align-items: center; }
      .form-grid { grid-template-columns: 1fr; }
      .form-grid > .save-button { grid-column: 1; }
    }
  `}</style>
);

// =================================================================================
// 2. KOMPONEN-KOMPONEN
// =================================================================================

const Header = () => (
  <header>
    <nav className="breadcrumb"><a href="#">Home</a> / <a href="#">User Account</a> / <span style={{color: '#343a40', fontWeight: '500'}}>Pengaturan</span></nav>
  </header>
);

const Sidebar = () => {
    const navItems = [
      { icon: <LayoutDashboard size={20} />, label: 'Dashboard' },
      { icon: <Package size={20} />, label: 'Order History' },
      { icon: <Truck size={20} />, label: 'Track Order' },
      { icon: <ShoppingCart size={20} />, label: 'Shopping Cart' },
      { icon: <Heart size={20} />, label: 'Wishlist' },
      { icon: <Store size={20} />, label: 'Buka Toko' },
      { icon: <CreditCard size={20} />, label: 'Card & Address' },
      { icon: <Settings size={20} />, label: 'Browse History' },
      { icon: <Settings size={20} />, label: 'Setting', active: true },
      { icon: <LogOut size={20} />, label: 'Log out' },
    ];
    // Note: Simplified the sidebar item list based on the image's context
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

const PasswordInput = ({ label, helperText }) => {
    const [isVisible, setIsVisible] = useState(false);
    return (
        <div className="form-group">
            <label>{label}</label>
            <div className="password-input-wrapper">
                <input type={isVisible ? 'text' : 'password'} />
                <div className="password-toggle-icon" onClick={() => setIsVisible(!isVisible)}>
                    {isVisible ? <EyeOff size={18} /> : <Eye size={18} />}
                </div>
            </div>
            {helperText && <p className="password-helper-text">{helperText}</p>}
        </div>
    );
}

// =================================================================================
// 3. KOMPONEN UTAMA
// =================================================================================
const DashboardSetting = () => {
    return (
      <>
        <Styles />
        <div className="dashboard-page">
          <Header />
          <div className="dashboard-layout">
            <Sidebar />
            <div className="main-content">
              
              {/* Account Setting Card */}
              <div className="card">
                <h2 className="settings-card-title">ACCOUNT SETTING</h2>
                <div className="account-setting-layout">
                  <div className="avatar-container">
                    <img src="https://i.imgur.com/zQZ7M49.png" alt="User Avatar" />
                  </div>
                  <div className="form-grid">
                    <div className="form-group"><label>Display name</label><input type="text" defaultValue="Kevin" /></div>
                    <div className="form-group"><label>Username</label><input type="text" defaultValue="Display name" disabled /></div>
                    <div className="form-group"><label>Full Name</label><input type="text" defaultValue="Kevin Gilbert" /></div>
                    <div className="form-group"><label>Email</label><input type="email" defaultValue="kevin.gilbert@gmail.com" /></div>
                    <div className="form-group"><label>Secondary Email</label><input type="email" defaultValue="kevin12345@gmail.com" /></div>
                    <div className="form-group"><label>Phone number</label><input type="text" defaultValue="+1-202-555-0118" /></div>
                    <div className="form-group"><label>Country/Region</label><select><option>Bangladesh</option></select></div>
                    <div className="form-group"><label>States</label><select><option>Dhaka</option></select></div>
                    <div className="form-group"><label>Zip Code</label><input type="text" defaultValue="1207" /></div>
                    <button className="save-button">SAVE CHANGES</button>
                  </div>
                </div>
              </div>

              {/* Billing and Shipping Address Card */}
              <div className="card">
                <div className="form-grid">
                  {/* Billing Address */}
                  <div className="form-group full-width">
                    <h2 className="settings-card-title" style={{borderBottom: 'none', paddingBottom: 0, marginBottom: 0}}>BILLING ADDRESS</h2>
                  </div>
                  <div className="form-group"><label>First Name</label><input type="text" defaultValue="Kevin" /></div>
                  <div className="form-group"><label>Last Name</label><input type="text" defaultValue="Gilbert" /></div>
                  <div className="form-group full-width"><label>Company Name <span style={{fontWeight: 400, color: '#6c757d'}}>(Optional)</span></label><input type="text" /></div>
                  <div className="form-group full-width"><label>Address</label><input type="text" defaultValue="Road No. 13/x, House no. 1320/C, Flat No. 5D" /></div>
                  <div className="form-group"><label>Country</label><select><option>Bangladesh</option></select></div>
                  <div className="form-group"><label>Region/State</label><select><option>Select...</option></select></div>
                  <div className="form-group"><label>City</label><select><option>Dhaka</option></select></div>
                  <div className="form-group"><label>Zip Code</label><input type="text" defaultValue="1207" /></div>
                  <div className="form-group"><label>Email</label><input type="email" defaultValue="kevin12345@gmail.com" /></div>
                  <div className="form-group"><label>Phone Number</label><input type="text" defaultValue="+1-202-555-0118" /></div>
                  <button className="save-button">SAVE CHANGES</button>

                  {/* Shipping Address */}
                  <div className="form-group full-width" style={{marginTop: '24px'}}>
                    <h2 className="settings-card-title" style={{borderBottom: 'none', paddingBottom: 0, marginBottom: 0}}>SHIPPING ADDRESS</h2>
                  </div>
                  <div className="form-group"><label>First Name</label><input type="text" defaultValue="Kevin" /></div>
                  <div className="form-group"><label>Last Name</label><input type="text" defaultValue="Gilbert" /></div>
                  <div className="form-group full-width"><label>Company Name <span style={{fontWeight: 400, color: '#6c757d'}}>(Optional)</span></label><input type="text" /></div>
                  <div className="form-group full-width"><label>Address</label><input type="text" defaultValue="Road No. 13/x, House no. 1320/C, Flat No. 5D" /></div>
                  <div className="form-group"><label>Country</label><select><option>Bangladesh</option></select></div>
                  <div className="form-group"><label>Region/State</label><select><option>Select...</option></select></div>
                  <div className="form-group"><label>City</label><select><option>Dhaka</option></select></div>
                  <div className="form-group"><label>Zip Code</label><input type="text" defaultValue="1207" /></div>
                  <div className="form-group"><label>Email</label><input type="email" defaultValue="kevin12345@gmail.com" /></div>
                  <div className="form-group"><label>Phone Number</label><input type="text" defaultValue="+1-202-555-0118" /></div>
                  <button className="save-button">SAVE CHANGES</button>
                </div>
              </div>

              {/* Change Password Card */}
              <div className="card">
                <h2 className="settings-card-title">CHANGE PASSWORD</h2>
                <div className="form-grid">
                  <PasswordInput label="Current Password" />
                  <PasswordInput label="New Password" helperText="8+ characters" />
                  <PasswordInput label="Confirm Password" />
                  <button className="save-button" style={{ gridRow: '2', gridColumn: '2 / 3', justifySelf: 'end' }}>CHANGE PASSWORD</button>
                </div>
              </div>

            </div>
          </div>
        </div>
      </>
    );
};
  
export default DashboardSetting;