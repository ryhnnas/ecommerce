import React, { useState, useMemo } from 'react';

// --- Kumpulan Komponen Ikon (SVG) ---
const ShoppingCartIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
    <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
  </svg>
);
const SearchIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
  </svg>
);
const BellIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
    <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zM8 1.918l-.797.161A4.002 4.002 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4.002 4.002 0 0 0-3.203-3.92L8 1.917zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5.002 5.002 0 0 1 13 6c0 .88.32 4.2 1.22 6z"/>
  </svg>
);
const UserIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
    <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"/>
  </svg>
);
const CloseIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
    </svg>
);

// --- Data Contoh untuk Keranjang ---
const dummyCartItems = [
  { id: 1, image: '#', name: 'Boneka Teddy Bear', details: 'Light Blue / 250 gram / x1', price: 250000 },
  { id: 2, image: '#', name: 'Controller XBOX', details: 'Navy Blue / 287 gram / x1', price: 859000 },
  { id: 3, image: '#', name: 'Sepatu Pria', details: 'Baby Blue / 650 gram / x1', price: 3599000 },
];

// --- Fungsi untuk Format Mata Uang ---
const formatCurrency = (amount) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount).replace('Rp', 'Rp ').trim();
};


// --- Komponen Utama ---
const Header = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);

  const subtotal = useMemo(() => {
    return dummyCartItems.reduce((total, item) => total + item.price, 0);
  }, [dummyCartItems]);

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  const styles = {
    // Container utama
    headerWrapper: {
        padding: '1rem',
        fontFamily: "'Inter', sans-serif",
        position: 'relative', // Diperlukan agar popup bisa diposisikan
    },
    headerBar: {
        display: 'flex',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: '999px',
        padding: '8px 16px',
        boxShadow: '0 10px 30px rgba(0, 123, 255, 0.2)',
        width: '100%',
        maxWidth: '1200px',
        margin: '0 auto',
    },
    // Bagian Kiri: Logo
    logo: {
        display: 'flex',
        alignItems: 'center',
        color: '#0d6efd',
        textDecoration: 'none',
        marginRight: '2rem',
    },
    logoText: {
        fontWeight: '600',
        fontSize: '1.25rem',
        marginLeft: '0.5rem',
    },
    // Bagian Tengah: Search
    searchContainer: {
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        border: '1px solid #ced4da',
        borderRadius: '8px',
        overflow: 'hidden',
    },
    searchInput: {
        border: 'none',
        flex: 1,
        padding: '10px 16px',
        fontSize: '1rem',
        outline: 'none',
    },
    searchButton: {
        display: 'flex',
        alignItems: 'center',
        padding: '0 16px',
        border: 'none',
        backgroundColor: '#0d6efd',
        color: 'white',
        cursor: 'pointer',
        height: '44px',
    },
    searchButtonText: {
        marginLeft: '8px',
        fontWeight: '500',
    },
    // Bagian Kanan: Ikon Aksi
    actionsContainer: {
        display: 'flex',
        alignItems: 'center',
        gap: '1.5rem',
        marginLeft: '2rem',
    },
    iconButton: {
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        color: '#495057',
        position: 'relative',
    },
    userIconWrapper: {
        backgroundColor: '#f1f3f5',
        borderRadius: '50%',
        padding: '6px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },

    // --- Styles untuk Cart Popup ---
    cartPopup: {
      position: 'absolute',
      top: 'calc(100% - 10px)', // Posisi di bawah header
      right: '0',
      width: '380px',
      backgroundColor: 'white',
      borderRadius: '12px',
      boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
      padding: '1.5rem',
      zIndex: 1000,
      border: '1px solid #e9ecef',
    },
    cartHeader: {
        fontSize: '1.25rem',
        fontWeight: '600',
        color: '#212529',
        marginBottom: '1.5rem',
    },
    cartItemList: {
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem',
        maxHeight: '40vh',
        overflowY: 'auto',
        paddingRight: '10px',
        marginRight: '-10px',
    },
    cartItem: {
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
    },
    itemImage: {
        width: '64px',
        height: '64px',
        borderRadius: '8px',
        backgroundColor: '#f1f3f5', // Placeholder
        objectFit: 'cover',
    },
    itemInfo: {
        flex: 1,
    },
    itemName: {
        fontWeight: '600',
        color: '#212529',
        marginBottom: '4px',
    },
    itemDetails: {
        fontSize: '0.875rem',
        color: '#6c757d',
        marginBottom: '4px',
    },
    itemPrice: {
        fontWeight: 'bold',
        fontSize: '1rem',
        color: '#212529',
    },
    removeItemButton: {
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        color: '#adb5bd',
    },
    cartFooter: {
        marginTop: '1.5rem',
        borderTop: '1px solid #e9ecef',
        paddingTop: '1.5rem',
    },
    subtotal: {
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '1.5rem',
        fontSize: '1rem',
        fontWeight: '600',
    },
    cartButtons: {
        display: 'flex',
        flexDirection: 'column',
        gap: '0.75rem',
    },
    primaryButton: {
        backgroundColor: '#0d6efd',
        color: 'white',
        border: 'none',
        padding: '12px',
        borderRadius: '8px',
        fontWeight: '600',
        cursor: 'pointer',
        textAlign: 'center',
    },
    secondaryButton: {
        backgroundColor: 'white',
        color: '#0d6efd',
        border: '1px solid #0d6efd',
        padding: '12px',
        borderRadius: '8px',
        fontWeight: '600',
        cursor: 'pointer',
        textAlign: 'center',
    }
  };

  return (
    <div style={styles.headerWrapper}>
      {/* --- HEADER BAR --- */}
      <header style={styles.headerBar}>
        <a href="#" style={styles.logo}>
          <ShoppingCartIcon style={{ color: '#0d6efd' }} />
          <span style={styles.logoText}>Belanja.in</span>
        </a>

        <div style={styles.searchContainer}>
          <input type="text" placeholder="Mau cari apa?" style={styles.searchInput} />
          <button style={styles.searchButton}>
            <SearchIcon />
            <span style={styles.searchButtonText}>Cari</span>
          </button>
        </div>

        <div style={styles.actionsContainer}>
          <button style={styles.iconButton}><BellIcon /></button>
          <button style={styles.iconButton} onClick={toggleCart}><ShoppingCartIcon /></button>
          <button style={styles.iconButton}>
            <div style={styles.userIconWrapper}>
                <UserIcon style={{color: '#495057'}}/>
            </div>
          </button>
        </div>
      </header>
      
      {/* --- CART POPUP (Muncul jika isCartOpen true) --- */}
      {isCartOpen && (
        <div style={styles.cartPopup}>
          <h3 style={styles.cartHeader}>Shopping Cart ({String(dummyCartItems.length).padStart(2, '0')})</h3>
          
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
            <div style={styles.subtotal}>
              <span>Subtotal:</span>
              <span>{formatCurrency(subtotal)}</span>
            </div>
            <div style={styles.cartButtons}>
              <a href="#" style={styles.primaryButton}>BELI SEKARANG →</a>
              <a href="#" style={styles.secondaryButton}>LIHAT KERANJANG</a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;