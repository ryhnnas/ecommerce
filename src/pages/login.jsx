import React, { useState } from 'react';
import backgroundAsset from '../assets/background.png';
import logoImage from '../assets/logo.png';

// Komponen Ikon tidak digunakan di sini, bisa dihapus jika tidak perlu
// const ShoppingCartIcon = (props) => ( ... );


const LoginForm = () => {
  const [isRegisterHovered, setIsRegisterHovered] = useState(false);
  const [isLoginHovered, setIsLoginHovered] = useState(false);

  const styles = {
    container: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      backgroundColor: '#0d6efd',
      backgroundImage: `url(${backgroundAsset})`,
      backgroundSize: 'cover',
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
    },
    // 1. TAMBAHKAN STYLE UNTUK LOGO DI SINI
    logoImage: {
      height: '50px', // <-- Atur tinggi logo di sini (misalnya 50px)
      width: 'auto',  // Lebar akan menyesuaikan secara otomatis
    },
    // ... (sisa style lainnya)
    formGroup: {
      marginBottom: '1.5rem',
      textAlign: 'left',
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
      gap: '1rem',
      marginTop: '1rem',
    },
    button: {
      flex: 1,
      padding: '0.75rem',
      borderRadius: '8px',
      fontSize: '1rem',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'background-color 0.2s ease, color 0.2s ease',
      border: '2px solid #0C5AA2',
    },
    registerButton: {
      backgroundColor: 'white',
      color: '#0C5AA2',
    },
    registerButtonHover: {
      backgroundColor: '#f8f9fa',
    },
    loginButton: {
      backgroundColor: '#0C5AA2',
      color: 'white',
    },
    loginButtonHover: {
      backgroundColor: '#0C5AA2', //ini nnti ubah
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.loginCard}>
        <div style={styles.logoContainer}>
          {/* 2. GUNAKAN STYLE YANG BENAR DAN GANTI 'alt' TEXT */}
          <img 
            src={logoImage} 
            alt="Logo Perusahaan" 
            style={styles.logoImage} 
          />
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