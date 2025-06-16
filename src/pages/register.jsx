import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import backgroundAsset from '../assets/background.png';
import saleImage from '../assets/sale.png';

const RegisterForm = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ name: '', username: '', email: '', password: '' });
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    // ================== SOLUSI DIMULAI DI SINI ==================

    // 1. Definisikan semua style yang tidak bergantung pada style lain
    const styles = {
        containerBackground: {
            display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh',
            backgroundColor: '#0052cc', backgroundImage: `url(${backgroundAsset})`, backgroundSize: 'cover',
            padding: '2rem', fontFamily: "'Inter', sans-serif",
        },
        card: {
            display: 'flex', backgroundColor: 'white', borderRadius: '20px',
            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)', overflow: 'hidden',
            maxWidth: '900px', width: '100%',
        },
        formSection: { padding: '3rem', flex: 1 },
        signUpText: { fontSize: '0.8rem', fontWeight: '600', color: '#0C5AA2', letterSpacing: '1px', marginBottom: '0.5rem', marginTop: 0 },
        h2: { fontSize: '2rem', fontWeight: '700', color: '#0C5AA2', margin: '0 0 0.5rem 0' },
        loginPrompt: { marginBottom: '2rem', color: '#ACACAC' },
        loginLink: { color: '#0C5AA2', textDecoration: 'none', fontWeight: '600' },
        formGroup: { marginBottom: '1.5rem' },
        label: { display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: '#555', fontWeight: '600' },
        input: { width: '100%', padding: '0.75rem 1rem', border: '1px solid #ccc', borderRadius: '8px', backgroundColor: '#f8f9fa', boxSizing: 'border-box' },
        registerButton: {
            width: '100%', padding: '0.85rem', border: 'none', borderRadius: '8px', backgroundColor: '#0C5AA2',
            color: 'white', fontSize: '1rem', fontWeight: '700', cursor: 'pointer', transition: 'background-color 0.3s ease, opacity 0.3s ease',
        },
        registerButtonHover: { backgroundColor: '#0041a3' },
        imageSection: { flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '2rem' },
        image: { maxWidth: '100%', height: 'auto', backgroundColor: '#e9ecef', borderRadius: '8px', minHeight: '250px' },
        message: { marginTop: '1rem', padding: '10px', borderRadius: '5px', textAlign: 'center' },
        buttonDisabled: { opacity: 0.6, cursor: 'not-allowed' },
    };

    // 2. Tambahkan style yang bergantung pada `styles.message` SETELAH `styles` selesai dibuat
    styles.successMessage = { ...styles.message, backgroundColor: '#d4edda', color: '#155724' };
    styles.errorMessage = { ...styles.message, backgroundColor: '#f8d7da', color: '#721c24' };
    
    // ================== SOLUSI BERAKHIR DI SINI ==================

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');
        try {
            const response = await fetch('http://localhost:8080/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            if (response.ok) {
                alert('Registrasi berhasil! Anda akan diarahkan ke halaman login.');
                navigate('/login');
            } else {
                const responseMessage = await response.text();
                setMessage({ text: responseMessage, type: 'error' });
            }
        } catch (error) {
            console.error('Network error:', error);
            setMessage({ text: 'Tidak dapat terhubung ke server.', type: 'error' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={styles.containerBackground}>
            <div style={styles.card}>
                <div style={styles.formSection}>
                    <p style={styles.signUpText}>SIGN UP NOW</p>
                    <h2 style={styles.h2}>Register For Free.</h2>
                    <p style={styles.loginPrompt}>
                        Already have an account? 
                        <Link to="/login" style={styles.loginLink}>Log in.</Link>
                    </p>
                    <form onSubmit={handleSubmit}>
                        <div style={styles.formGroup}>
                            <label htmlFor="name" style={styles.label}>Name</label>
                            <input type="text" id="name" style={styles.input} value={formData.name} onChange={handleChange} required disabled={loading} />
                        </div>
                        <div style={styles.formGroup}>
                            <label htmlFor="username" style={styles.label}>Username</label>
                            <input type="text" id="username" style={styles.input} value={formData.username} onChange={handleChange} required disabled={loading} />
                        </div>
                        <div style={styles.formGroup}>
                            <label htmlFor="email" style={styles.label}>Email address</label>
                            <input type="email" id="email" style={styles.input} value={formData.email} onChange={handleChange} required disabled={loading} />
                        </div>
                        <div style={styles.formGroup}>
                            <label htmlFor="password" style={styles.label}>Password</label>
                            <input type="password" id="password" style={styles.input} value={formData.password} onChange={handleChange} required disabled={loading} />
                        </div>
                        <button 
                            type="submit" 
                            style={{
                                ...styles.registerButton, 
                                ...(isHovered && !loading ? styles.registerButtonHover : null),
                                ...(loading ? styles.buttonDisabled : null)
                            }}
                            onMouseEnter={() => setIsHovered(true)}
                            onMouseLeave={() => setIsHovered(false)}
                            disabled={loading}
                        >
                            {loading ? 'Mendaftarkan...' : 'Register'}
                        </button>
                        {message && (
                            <div style={message.type === 'success' ? styles.successMessage : styles.errorMessage}>
                                {message.text}
                            </div>
                        )}
                    </form>
                </div>
                <div style={styles.imageSection}>
                    <img src={saleImage} alt="Illustration of people shopping" style={styles.image} />
                </div>
            </div>
        </div>
    );
};

export default RegisterForm;