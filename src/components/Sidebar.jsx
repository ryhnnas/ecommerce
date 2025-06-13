import React from 'react';
import styled from 'styled-components'; // 1. Impor styled-components
import {
  MdDashboard, MdHistory, MdLocationOn, MdShoppingCart, MdFavoriteBorder, 
  MdStore, MdCreditCard, MdSearch, MdSettings, MdExitToApp
} from 'react-icons/md';

// 2. Definisikan gaya untuk sidebar DI DALAM file ini
const SidebarWrapper = styled.aside`
  width: 280px;
  background-color: #ffffff;
  padding: 30px 20px;
  box-shadow: 2px 0 5px rgba(0,0,0,0.05);
  flex-shrink: 0; // Mencegah sidebar menyusut

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
    color: #1c2733; // Warna teks default
    font-weight: 500;
    transition: background-color 0.3s, color 0.3s;
    
    &:hover {
      background-color: #f0f2ff;
    }

    // Ini adalah gaya untuk item yang sedang aktif
    &.active {
      background-color: #2a41e8; // Warna primer
      color: #ffffff; // Teks putih
    }

    svg {
      font-size: 20px;
    }
  }
`;

// 3. Gunakan SidebarWrapper sebagai elemen utama
const Sidebar = () => {
  return (
    <SidebarWrapper> 
      <nav>
        <ul>
          <li className="active">
            <MdDashboard /> 
            <span>Dashboard</span>
          </li>
          <li><MdHistory /><span>Riwayat Pemesanan</span></li>
          <li><MdLocationOn /><span>Lacak Pesanan</span></li>
          <li><MdShoppingCart /><span>Keranjang Belanja</span></li>
          <li><MdFavoriteBorder /><span>Wishlist</span></li>
          <li><MdStore /><span>Buka Toko</span></li>
          <li><MdCreditCard /><span>Kartu & Alamat</span></li>
          <li><MdSearch /><span>Riwayat Pencarian</span></li>
          <li><MdSettings /><span>Pengaturan</span></li>
          <li><MdExitToApp /><span>Log-out</span></li>
        </ul>
      </nav>
    </SidebarWrapper>
  );
};

export default Sidebar;