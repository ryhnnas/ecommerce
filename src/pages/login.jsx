import React, { useState } from 'react';

// Komentar untuk font:
// Pastikan Anda sudah menambahkan link font 'Inter' di file public/index.html Anda
// seperti pada contoh sebelumnya.

// Komponen Ikon Keranjang Belanja (SVG)
const ShoppingCartIcon = (props) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="28" 
    height="28" 
    fill="currentColor" 
    viewBox="0 0 16 16"
    {...props} // Memungkinkan penambahan style atau properti lain
  >
    <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
  </svg>
);


const LoginForm = () => {
  // State untuk menangani efek hover pada setiap tombol
  const [isRegisterHovered, setIsRegisterHovered] = useState(false);
  const [isLoginHovered, setIsLoginHovered] = useState(false);

  const styles = {
    container: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      backgroundColor: '#0d6efd', // Warna biru dari gambar
      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Cpath d='M12.5 0C5.596 0 0 5.596 0 12.5v75C0 94.404 5.596 100 12.5 100h75c6.904 0 12.5-5.596 12.5-12.5v-75C100 5.596 94.404 0 87.5 0h-75zm2.5 10h70c1.38 0 2.5 1.12 2.5 2.5v5h-75v-5C15 11.12 16.12 10 17.5 10zM15 27.5c0-1.38 1.12-2.5 2.5-2.5h70c1.38 0 2.5 1.12 2.5 2.5v45c0 1.38-1.12 2.5-2.5 2.5h-70c-1.38 0-2.5-1.12-2.5-2.5v-45zm22.5-10c1.38 0 2.5-1.12 2.5-2.5V10h-10v5c0 1.38 1.12 2.5 2.5 2.5h5zm20 0c1.38 0 2.5-1.12 2.5-2.5V10h-10v5c0 1.38 1.12 2.5 2.5 2.5h5z' fill='%23fff' fill-opacity='0.1'/%3E%3C/svg%3E")`,
      fontFamily: "'Inter', sans-serif",
    },
    loginCard: {
      backgroundColor: 'white',
      padding: '2.5rem 3rem',
      borderRadius: '15px',
      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
      textAlign: 'center',
      width: '100%',
      maxWidth: '400px',
    },
    logoContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: '2.5rem',
      color: '#343a40',
    },
    logoText: {
      fontSize: '24px',
      fontWeight: '600',
      marginLeft: '10px',
    },
    formGroup: {
      marginBottom: '1.5rem',
      textAlign: 'left',
    },
    label: {
      display: 'block',
      marginBottom: '0.5rem',
      color: '#6c757d',
      fontSize: '0.9rem',
    },
    input: {
      width: '100%',
      padding: '0.8rem 1rem',
      border: '1px solid #ced4da',
      borderRadius: '8px',
      backgroundColor: '#f8f9fa',
      boxSizing: 'border-box',
      fontSize: '1rem',
    },
    buttonContainer: {
      display: 'flex',
      gap: '1rem', // Memberi jarak antar tombol
      marginTop: '1rem',
    },
    button: { // Style dasar untuk kedua tombol
      flex: 1,
      padding: '0.75rem',
      borderRadius: '8px',
      fontSize: '1rem',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'background-color 0.2s ease, color 0.2s ease',
      border: '1px solid #0d6efd',
    },
    registerButton: {
      backgroundColor: 'white',
      color: '#0d6efd',
    },
    registerButtonHover: {
      backgroundColor: '#f8f9fa',
    },
    loginButton: {
      backgroundColor: '#0d6efd',
      color: 'white',
    },
    loginButtonHover: {
      backgroundColor: '#0b5ed7', // Warna biru sedikit lebih gelap
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.loginCard}>
        <div style={styles.logoContainer}>
          <ShoppingCartIcon style={{ color: '#0d6efd' }} />
          <span style={styles.logoText}>Belanja.in</span>
        </div>

        <form>
          <div style={styles.formGroup}>
            <label htmlFor="email" style={styles.label}>Email address</label>
            <input type="email" id="email" style={styles.input} />
          </div>

          <div style={styles.formGroup}>
            <label htmlFor="password" style={styles.label}>Password</label>
            <input type="password" id="password" style={styles.input} />
          </div>

          <div style={styles.buttonContainer}>
            <button 
              type="button"
              style={{
                ...styles.button, 
                ...styles.registerButton,
                ...(isRegisterHovered ? styles.registerButtonHover : null)
              }}
              onMouseEnter={() => setIsRegisterHovered(true)}
              onMouseLeave={() => setIsRegisterHovered(false)}
            >
              Register
            </button>
            <button 
              type="submit"
              style={{
                ...styles.button, 
                ...styles.loginButton,
                ...(isLoginHovered ? styles.loginButtonHover : null)
              }}
              onMouseEnter={() => setIsLoginHovered(true)}
              onMouseLeave={() => setIsLoginHovered(false)}
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;