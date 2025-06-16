import React from 'react';

// --- Kumpulan Komponen Ikon (SVG) ---
// Ukuran ikon disesuaikan agar lebih pas dengan desain footer yang compact
const EmailIcon = (props) => ( <svg {...props} xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16"><path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2zm13 2.383-4.758 2.855L15 11.114V6.383zM1 6.383l4.758 2.855L1 11.114V6.383zM1.5 12.5l5.5-3.3L8 9.8l1-1.6 5.5 3.3H1.5z"/></svg> );
const InstagramIcon = (props) => ( <svg {...props} xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16"><path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.282.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.231 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.275-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.843-.038 1.096-.047 3.232-.047h.001zm-1.801 6.436c0 1.223 1.006 2.229 2.229 2.229s2.229-1.006 2.229-2.229c0-1.224-1.006-2.229-2.229-2.229S6.48 7.025 6.48 8.249zm2.229-1.001a1.229 1.229 0 1 0 0 2.458 1.229 1.229 0 0 0 0-2.458zM12 4.11a1.11 1.11 0 1 1-2.22 0 1.11 1.11 0 0 1 2.22 0z"/></svg> );
const FacebookIcon = (props) => ( <svg {...props} xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16"><path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.375h-1.864v5.625C13.074 15.396 16 12.067 16 8.049z"/></svg> );

const Footer = () => {
  const styles = {
    footer: {
      backgroundColor: '#0d47a1',
      color: 'white',
      fontFamily: "'Roboto', sans-serif",
    },
    mainContent: {
      display: 'flex',
      maxWidth: '1200px',
      margin: '0 auto',
      // FIX 3: Ukuran padding diperkecil agar footer lebih compact
      padding: '3rem 1rem', 
    },
    column: {
      flex: 1,
      padding: '0 2rem', // Padding di dalam kolom untuk memberi jarak dari garis
    },
    // FIX 2: Style untuk kolom yang memiliki garis pemisah di kirinya
    columnWithDivider: {
      borderLeft: '1px solid rgba(255, 255, 255, 0.2)',
    },
    navColumn: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem', // Jarak antar link diperkecil
    },
    navLink: {
      color: 'white',
      textDecoration: 'none',
      fontSize: '1rem', // FIX 3: Ukuran font diperkecil
      fontWeight: 'bold',
    },
    updatesColumn: {
      textAlign: 'center',
    },
    monospaceFont: {
      fontFamily: "'Courier New', Courier, monospace",
    },
    sectionTitle: {
      fontSize: '1.75rem', // FIX 3: Ukuran font diperkecil
      fontWeight: 'bold',
      marginBottom: '0.75rem',
    },
    subTitle: {
      fontSize: '0.8rem', // FIX 3: Ukuran font diperkecil
      color: '#e0e0e0',
      marginBottom: '1.5rem',
      maxWidth: '300px',
      margin: '0 auto 1.5rem auto',
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      gap: '0.75rem',
    },
    input: {
      backgroundColor: 'transparent',
      border: '1px solid white',
      borderRadius: '6px',
      padding: '0.6rem 1rem', // FIX 3: Padding input diperkecil
      color: 'white',
      fontSize: '0.9rem',
    },
    submitButton: {
      backgroundColor: 'white',
      color: '#0d47a1',
      border: 'none',
      borderRadius: '6px',
      padding: '0.6rem', // FIX 3: Padding tombol diperkecil
      fontWeight: 'bold',
      fontSize: '0.9rem',
      cursor: 'pointer',
      letterSpacing: '1px',
      alignSelf: 'flex-end',
      width: '100px',
    },
    formRow: {
      display: 'flex',
      gap: '0.75rem'
    },
    contactColumn: {
      textAlign: 'right',
    },
    contactLink: {
      color: 'white',
      textDecoration: 'none',
      fontSize: '1rem', // FIX 3: Ukuran font diperkecil
      fontWeight: 'bold',
    },
    contactInfo: {
      marginTop: '1.5rem',
      fontSize: '0.8rem', // FIX 3: Ukuran font diperkecil
      lineHeight: 1.5,
      color: '#e0e0e0',
    },
    subFooter: {
      backgroundColor: '#002171',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      maxWidth: '1200px',
      margin: '0 auto',
      // FIX 3: Sub-footer dibuat lebih tipis
      padding: '0.75rem 2rem',
    },
    copyright: {
      fontSize: '0.75rem', // FIX 3: Font copyright sangat kecil
      color: '#bdbdbd',
    },
    socialIcons: {
      display: 'flex',
      gap: '0.5rem',
    },
    socialIconLink: {
      display: 'flex',
      color: 'white',
      border: '1px solid rgba(255, 255, 255, 0.5)',
      borderRadius: '6px',
      padding: '5px',
    },
  };

  const titleStyle = { ...styles.sectionTitle, ...styles.monospaceFont };
  const contactLinkStyle = { ...styles.contactLink, ...styles.monospaceFont };
  const submitButtonStyle = { ...styles.submitButton, ...styles.monospaceFont };

  return (
    <footer style={styles.footer}>
      <div style={styles.mainContent}>
        {/* Kolom 1: Navigasi */}
        <div style={styles.column}>
          <nav style={styles.navColumn}>
            <a href="#" style={styles.navLink}>About Us</a>
            <a href="#" style={styles.navLink}>Programs</a>
            <a href="#" style={styles.navLink}>Events</a>
            <a href="#" style={styles.navLink}>Blog</a>
            <a href="#" style={styles.navLink}>Join Our Team</a>
          </nav>
        </div>

        {/* Kolom 2: Get Updates (dengan garis di kiri) */}
        <div style={{...styles.column, ...styles.updatesColumn, ...styles.columnWithDivider}}>
          <h2 style={titleStyle}>Get Updates</h2>
          <p style={styles.subTitle}>Register your account to receive updates and special offers.</p>
          <form style={styles.form}>
            <input type="email" placeholder="*Email" style={styles.input} />
            <div style={styles.formRow}>
              <input type="text" placeholder="*First Name" style={{...styles.input, flex: 1}} />
              <button type="submit" style={submitButtonStyle}>SUBMIT</button>
            </div>
          </form>
        </div>

        {/* Kolom 3: Kontak (dengan garis di kiri) */}
        <div style={{...styles.column, ...styles.contactColumn, ...styles.columnWithDivider}}>
          <a href="#" style={contactLinkStyle}>Send Us A Message →</a>
          <div style={styles.contactInfo}>
            <p>+62 902-193-256</p>
            <p>
              Bandung, Jl. Telekomunikasi<br />
              No. 1, Bandung Terusan Buahbatu,<br />
              Bojongsoang, Sukapura,<br />
              Kec. Dayeuhkolot,<br />
              Kabupaten Bandung,<br />
              Jawa Barat 40197
            </p>
          </div>
        </div>
      </div>

      <div style={styles.subFooter}>
        <p style={styles.copyright}>©2025 archived by Kelompok1. All right reserved.</p>
        <div style={styles.socialIcons}>
          <a href="#" style={styles.socialIconLink} aria-label="Email"><EmailIcon /></a>
          <a href="#" style={styles.socialIconLink} aria-label="Instagram"><InstagramIcon /></a>
          <a href="#" style={styles.socialIconLink} aria-label="Facebook"><FacebookIcon /></a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;