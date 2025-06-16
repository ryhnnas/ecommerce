import React from 'react';
import { Link } from 'react-router-dom';

// 1. Impor gambar ceklis dari folder assets Anda
import xCircleImage from '../assets/XCircle.png';

// --- Komponen Ikon SVG untuk Tombol ---
const HomeIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
    <path d="M6.5 14.5v-3.505c0-.245.25-.495.5-.495h2c.25 0 .5.25.5.5v3.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5z"/>
  </svg>
);

const ArrowRightIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
    <path fillRule="evenodd" d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8z"/>
  </svg>
);


// --- Komponen Utama Halaman ---
const CheckoutGagal = () => {

  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '80vh', // Menggunakan 80vh agar tidak terlalu menempel ke footer
      textAlign: 'center',
      fontFamily: "'Inter', sans-serif",
      padding: '2rem',
    },
    checkmarkImage: {
      width: '120px',
      height: '120px',
      marginBottom: '2rem',
    },
    title: {
      fontSize: '2rem',
      fontWeight: 'bold',
      color: '#212529',
      margin: '0 0 0.5rem 0',
    },
    subtitle: {
      fontSize: '1.1rem',
      color: '#6c757d',
      marginBottom: '2.5rem',
    },
    buttonContainer: {
      display: 'flex',
      gap: '1rem',
    },
    button: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '8px',
      padding: '0.8rem 1.8rem',
      fontSize: '1rem',
      fontWeight: 600,
      borderRadius: '8px',
      border: '2px solid transparent',
      cursor: 'pointer',
      textDecoration: 'none',
      transition: 'all 0.2s ease',
    },
    primaryButton: {
      backgroundColor: '#0d6efd',
      color: 'white',
    },
    secondaryButton: {
      backgroundColor: 'white',
      color: '#0d6efd',
      borderColor: '#0d6efd',
    },
  };

  return (
    <div style={styles.container}>
      {/* 2. Gunakan gambar ceklis yang sudah diimpor */}
      <img 
        src={xCircleImage} 
        alt="Checkout Berhasil" 
        style={styles.checkmarkImage} 
      />

      <h1 style={styles.title}>Pesanan anda gagal dilakukan</h1>
      <p style={styles.subtitle}>Terjadi kesalahan. Lakukan Pembayaran Ulang</p>

      <div style={styles.buttonContainer}>
        <Link to="/" style={{ ...styles.button, ...styles.secondaryButton }}>
          <HomeIcon />
          <span>KEMBALI KE LAMAN UTAMA</span>
        </Link>
        <Link to="/orders" style={{ ...styles.button, ...styles.primaryButton }}>
          <span>LIHAT PESANAN</span>
          <ArrowRightIcon />
        </Link>
      </div>
    </div>
  );
};

export default CheckoutGagal;