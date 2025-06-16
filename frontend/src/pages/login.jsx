import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

// Pastikan path ke aset Anda sudah benar
import backgroundAsset from '../assets/background.png';
import logoImage from '../assets/logo.png';


const LoginForm = () => {
    const navigate = useNavigate();

    // State untuk menyimpan data input dari form
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    // State untuk menangani proses loading & pesan error
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // State untuk hover
    const [isRegisterHovered, setIsRegisterHovered] = useState(false);
    const [isLoginHovered, setIsLoginHovered] = useState(false);

    // Style object dari kode Anda
    const styles = {
        container: { display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundColor: '#0d6efd', backgroundImage: `url(${backgroundAsset})`, backgroundSize: 'cover', fontFamily: "'Inter', sans-serif", },
        loginCard: { backgroundColor: 'white', padding: '2.5rem 3rem', borderRadius: '15px', boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)', textAlign: 'center', width: '100%', maxWidth: '400px', },
        logoContainer: { display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '2.5rem', },
        logoImage: { height: '50px', width: 'auto', },
        formGroup: { marginBottom: '1.5rem', textAlign: 'left', },
        label: { display: 'block', marginBottom: '0.5rem', fontWeight: '600' },
        input: { width: '100%', padding: '0.8rem 1rem', border: '1px solid #ced4da', borderRadius: '8px', backgroundColor: '#f8f9fa', boxSizing: 'border-box', fontSize: '1rem', },
        buttonContainer: { display: 'flex', gap: '1rem', marginTop: '2rem', },
        button: { flex: 1, padding: '0.75rem', borderRadius: '8px', fontSize: '1rem', fontWeight: '600', cursor: 'pointer', transition: 'background-color 0.2s ease, color 0.2s ease, opacity 0.2s ease', borderWidth: '2px', borderStyle: 'solid', borderColor: '#0C5AA2', },
        registerButton: { backgroundColor: 'white', color: '#0C5AA2', },
        registerButtonHover: { backgroundColor: '#f0f0f0', },
        loginButton: { backgroundColor: '#0C5AA2', color: 'white', },
        loginButtonHover: { backgroundColor: '#0041a3', borderColor: '#0041a3', },
        buttonDisabled: { opacity: 0.6, cursor: 'not-allowed', }
    };

    // Fungsi untuk mengupdate state saat user mengetik
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    // Fungsi yang dijalankan saat form disubmit
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        const requestBody = {
            usernameOrEmail: formData.email,
            password: formData.password
        };

        try {
            const response = await fetch('http://localhost:8080/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(requestBody),
            });

            if (response.ok) {
                const data = await response.json();
                const decodedToken = jwtDecode(data.accessToken);
                
              console.log('Isi Token JWT:', decodedToken);

                // Menyimpan "KTP" (token) dan "Nama" ke dompet (localStorage)
                localStorage.setItem('authToken', data.accessToken);
                localStorage.setItem('userName', decodedToken.sub);
                
                // Pindah ke halaman utama
                navigate('/');
            } else {
                const errorText = await response.text();
                setError(errorText || 'Invalid credentials. Please try again.');
            }
        } catch (err) {
            console.error('Connection Error:', err);
            setError('Connection failed. Please check the server.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.loginCard}>
                <div style={styles.logoContainer}>
                    <img src={logoImage} alt="Logo Perusahaan" style={styles.logoImage} />
                </div>
                <form onSubmit={handleSubmit}>
                    <div style={styles.formGroup}>
                        <label htmlFor="email" style={styles.label}>Email or Username</label>
                        <input type="text" id="email" value={formData.email} onChange={handleChange} required disabled={loading} style={styles.input} />
                    </div>
                    <div style={styles.formGroup}>
                        <label htmlFor="password" style={styles.label}>Password</label>
                        <input type="password" id="password" value={formData.password} onChange={handleChange} required disabled={loading} style={styles.input} />
                    </div>
                    {error && <p style={{ color: 'red', textAlign: 'center', marginBottom: '1rem' }}>{error}</p>}
                    <div style={styles.buttonContainer}>
                        <button
                            type="button"
                            onClick={() => navigate('/register')}
                            style={{ ...styles.button, ...styles.registerButton, ...(isRegisterHovered ? styles.registerButtonHover : null) }}
                            onMouseEnter={() => setIsRegisterHovered(true)}
                            onMouseLeave={() => setIsRegisterHovered(false)}
                        >
                            Register
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            style={{ ...styles.button, ...styles.loginButton, ...(isLoginHovered && !loading ? styles.loginButtonHover : null), ...(loading ? styles.buttonDisabled : null) }}
                            onMouseEnter={() => setIsLoginHovered(true)}
                            onMouseLeave={() => setIsLoginHovered(false)}
                        >
                            {loading ? 'Logging in...' : 'Login'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginForm;