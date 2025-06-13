import React, { useState } from 'react';

// Komentar untuk font:
// Untuk menggunakan font 'Inter', tambahkan link berikut di file public/index.html Anda:
// <link rel="preconnect" href="https://fonts.googleapis.com">
// <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
// <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet">

const RegisterForm = () => {
  // State untuk menangani efek hover pada tombol secara manual
  const [isHovered, setIsHovered] = useState(false);

  // Semua style didefinisikan sebagai objek JavaScript
  const styles = {
    containerBackground: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      backgroundColor: '#0052cc',
      padding: '2rem',
      fontFamily: "'Inter', sans-serif", // Menambahkan font family
    },
    card: {
      display: 'flex',
      backgroundColor: 'white',
      borderRadius: '20px',
      boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
      overflow: 'hidden',
      maxWidth: '900px',
      width: '100%',
    },
    formSection: {
      padding: '3rem',
      flex: 1,
    },
    signUpText: {
      fontSize: '0.8rem',
      fontWeight: '600',
      color: '#555',
      letterSpacing: '1px',
      marginBottom: '0.5rem',
      marginTop: 0,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: '700',
      color: '#333',
      margin: '0 0 0.5rem 0',
    },
    loginPrompt: {
      marginBottom: '2rem',
      color: '#666',
    },
    loginLink: {
      color: '#007bff',
      textDecoration: 'none',
      fontWeight: '600',
    },
    formGroup: {
      marginBottom: '1.5rem',
    },
    label: {
      display: 'block',
      marginBottom: '0.5rem',
      fontSize: '0.9rem',
      color: '#555',
      fontWeight: '600',
    },
    input: {
      width: '100%',
      padding: '0.75rem 1rem',
      border: '1px solid #ccc',
      borderRadius: '8px',
      backgroundColor: '#f8f9fa',
      boxSizing: 'border-box',
    },
    registerButton: {
      width: '100%',
      padding: '0.85rem',
      border: 'none',
      borderRadius: '8px',
      backgroundColor: '#0052cc',
      color: 'white',
      fontSize: '1rem',
      fontWeight: '700',
      cursor: 'pointer',
      transition: 'background-color 0.3s ease',
    },
    // Style tambahan untuk efek hover
    registerButtonHover: {
      backgroundColor: '#0041a3',
    },
    imageSection: {
      flex: 1,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '2rem',
    },
    image: {
      maxWidth: '100%',
      height: 'auto',
      backgroundColor: '#e9ecef',
      borderRadius: '8px',
      minHeight: '250px',
    }
  };

  return (
    <div style={styles.containerBackground}>
      <div style={styles.card}>
        <div style={styles.formSection}>
          <p style={styles.signUpText}>SIGN UP NOW</p>
          <h2 style={styles.h2}>Register For Free.</h2>
          <p style={styles.loginPrompt}>
            Already have an account? <a href="#" style={styles.loginLink}>Log in.</a>
          </p>

          <form>
            <div style={styles.formGroup}>
              <label htmlFor="username" style={styles.label}>Username</label>
              <input type="text" id="username" style={styles.input} />
            </div>

            <div style={styles.formGroup}>
              <label htmlFor="email" style={styles.label}>Email address</label>
              <input type="email" id="email" style={styles.input} />
            </div>

            <div style={styles.formGroup}>
              <label htmlFor="password" style={styles.label}>Password</label>
              <input type="password" id="password" style={styles.input} />
            </div>

            <button 
              type="submit" 
              style={{
                ...styles.registerButton, 
                ...(isHovered ? styles.registerButtonHover : null) // Terapkan style hover jika isHovered true
              }}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              Register
            </button>
          </form>
        </div>

        <div style={styles.imageSection}>
          <img src="#" alt="Illustration of people shopping with bags and a sale sign" style={styles.image} />
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;