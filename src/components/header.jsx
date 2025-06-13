import React, { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom'; // PENTING: Gunakan Link untuk navigasi internal
import logoImage from '../assets/logo.png';
import productImage from '../assets/baju1.jpeg'; // Menggunakan nama yang lebih spesifik

// --- Kumpulan Komponen Ikon (SVG) ---
const ShoppingCartIcon = (props) => ( <svg {...props} xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" viewBox="0 0 16 16"><path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/></svg> );
const SearchIcon = (props) => ( <svg {...props} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/></svg> );
const BellIcon = (props) => ( <svg {...props} xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" viewBox="0 0 16 16"><path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zM8 1.918l-.797.161A4.002 4.002 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4.002 4.002 0 0 0-3.203-3.92L8 1.917zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5.002 5.002 0 0 1 13 6c0 .88.32 4.2 1.22 6z"/></svg> );
const UserIcon = (props) => ( <svg {...props} xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" viewBox="0 0 16 16"><path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"/></svg> );
const CloseIcon = (props) => ( <svg {...props} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/></svg> );

// --- Data & Fungsi untuk Cart Popup ---
const dummyCartItems = [
  { id: 1, name: 'Baju Keren Kekinian', details: 'Biru / Ukuran M / x1', price: 150000, image: productImage },
  { id: 2, name: 'Boneka Teddy Bear', details: 'Coklat / 250 gram / x1', price: 250000, image: '#' },
];
const formatCurrency = (amount) => {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(amount).replace('Rp', 'Rp ').trim();
};

const Header = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const subtotal = useMemo(() => {
    return dummyCartItems.reduce((total, item) => total + item.price, 0);
  }, [dummyCartItems]);

  // FIX 4: Menggunakan warna biru baru yang lebih cerah
  const vibrantBlue = '#0055FF';

  const styles = {
    headerWrapper: { height: '100px', fontFamily: "'Inter', sans-serif" },
    headerBar: { position: 'fixed', top: '16px', left: '24px', right: '24px', zIndex: 1100, display: 'flex', alignItems: 'center', transition: 'top 0.3s ease-in-out' },
    headerBarScrolled: { top: '0px' },
    headerContent: { display: 'flex', alignItems: 'center', gap: '24px', width: '100%', maxWidth: '1200px', margin: '0 auto', backgroundColor: 'white', borderRadius: '999px', padding: '12px 24px', boxShadow: `0 8px 30px rgba(0, 85, 255, 0.3)`, transition: 'box-shadow 0.3s ease' },
    headerContentScrolled: { boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)' },
    logoImage: { height: '40px' },
    // FIX 3: borderRadius diubah menjadi 999px agar oval
    searchContainer: { flex: 1, display: 'flex', border: '1px solid #dee2e6', borderRadius: '999px', overflow: 'hidden' },
    searchInput: { flex: 1, border: 'none', outline: 'none', padding: '10px 20px', fontSize: '16px', backgroundColor: 'transparent' },
    searchButton: { display: 'flex', alignItems: 'center', gap: '6px', padding: '0 24px', border: 'none', backgroundColor: '#0C5AA2', color: 'white', cursor: 'pointer', fontWeight: '500' },
    actionsContainer: { display: 'flex', alignItems: 'center', gap: '16px' },
    iconButton: { background: 'none', border: 'none', cursor: 'pointer', color: '#343a40', padding: '0', display: 'flex' },
    userIconWrapper: { backgroundColor: '#f1f3f5', borderRadius: '50%', padding: '8px', display: 'flex' },
    // FIX 2: Container baru untuk handle hover pada cart
    cartContainer: { position: 'relative' },
    cartPopup: { position: 'absolute', top: 'calc(100% + 15px)', right: 0, width: '380px', backgroundColor: 'white', borderRadius: '12px', boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)', zIndex: -1, border: '1px solid #e9ecef', opacity: isCartOpen ? 1 : 0, transform: isCartOpen ? 'translateY(0)' : 'translateY(10px)', pointerEvents: isCartOpen ? 'auto' : 'none', transition: 'opacity 0.2s ease, transform 0.2s ease' },
    cartHeader: { fontSize: '1.25rem', fontWeight: '600', color: '#212529', marginBottom: '1.5rem', padding: '1.5rem 1.5rem 0 1.5rem' },
    cartItemList: { display: 'flex', flexDirection: 'column', gap: '1.5rem', maxHeight: '40vh', overflowY: 'auto', padding: '0 1.5rem' },
    cartItem: { display: 'flex', alignItems: 'center', gap: '1rem' },
    itemImage: { width: '64px', height: '64px', borderRadius: '8px', backgroundColor: '#f1f3f5', objectFit: 'cover' },
    itemInfo: { flex: 1 },
    itemName: { fontWeight: '600', color: '#212529', marginBottom: '4px' },
    itemDetails: { fontSize: '0.875rem', color: '#6c757d', marginBottom: '4px' },
    itemPrice: { fontWeight: 'bold', fontSize: '1rem', color: '#212529' },
    removeItemButton: { background: 'none', border: 'none', cursor: 'pointer', color: '#adb5bd' },
    cartFooter: { marginTop: '1.5rem', borderTop: '1px solid #e9ecef', padding: '1.5rem' },
    subtotal: { display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem', fontSize: '1rem', fontWeight: '600' },
    cartButtons: { display: 'flex', flexDirection: 'column', gap: '0.75rem' },
    primaryButton: { textDecoration: 'none', backgroundColor: vibrantBlue, color: 'white', border: 'none', padding: '12px', borderRadius: '8px', fontWeight: '600', cursor: 'pointer', textAlign: 'center' },
    secondaryButton: { textDecoration: 'none', backgroundColor: 'white', color: vibrantBlue, border: `1px solid ${vibrantBlue}`, padding: '12px', borderRadius: '8px', fontWeight: '600', cursor: 'pointer', textAlign: 'center' },
  };

  return (
    <div style={styles.headerWrapper}>
      <div style={{ ...styles.headerBar, ...(isScrolled ? styles.headerBarScrolled : {}) }}>
        <div style={{ ...styles.headerContent, ...(isScrolled ? styles.headerContentScrolled : {}) }}>
          {/* FIX 1: Menggunakan Link dari react-router-dom dan logoImage */}
          <Link to="/">
            <img src={logoImage} alt="Logo Perusahaan" style={styles.logoImage} />
          </Link>
          <div style={styles.searchContainer}>
            <input type="text" placeholder="Mau cari apa?" style={styles.searchInput} />
            <button style={styles.searchButton}><SearchIcon /><span>Cari</span></button>
          </div>
          <div style={styles.actionsContainer}>
            <button style={styles.iconButton} aria-label="Notifikasi"><BellIcon /></button>
            <div style={styles.cartContainer} onMouseEnter={() => setIsCartOpen(true)} onMouseLeave={() => setIsCartOpen(false)}>
              <button style={styles.iconButton} aria-label="Keranjang Belanja"><ShoppingCartIcon /></button>
              <div style={styles.cartPopup}>
                <h3 style={styles.cartHeader}>Keranjang Belanja ({String(dummyCartItems.length).padStart(2, '0')})</h3>
                <div style={styles.cartItemList}>
                  {dummyCartItems.map(item => (
                    <div key={item.id} style={styles.cartItem}>
                      <img src={item.image} alt={item.name} style={styles.itemImage} />
                      <div style={styles.itemInfo}>
                        <div style={styles.itemName}>{item.name}</div>
                        <div style={styles.itemDetails}>{item.details}</div>
                        <div style={styles.itemPrice}>{formatCurrency(item.price)}</div>
                      </div>
                      <button style={styles.removeItemButton}><CloseIcon /></button>
                    </div>
                  ))}
                </div>
                <div style={styles.cartFooter}>
                  <div style={styles.subtotal}><span>Subtotal:</span><span>{formatCurrency(subtotal)}</span></div>
                  <div style={styles.cartButtons}>
                    <Link to="#" style={styles.primaryButton}>BELI SEKARANG →</Link>
                    <Link to="#" style={styles.secondaryButton}>LIHAT KERANJANG</Link>
                  </div>
                </div>
              </div>
            </div>
            <Link to="/login" style={styles.iconButton} aria-label="Profil Pengguna">
              <div style={styles.userIconWrapper}><UserIcon /></div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;