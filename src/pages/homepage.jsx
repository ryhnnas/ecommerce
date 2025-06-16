import React, { useState, useEffect } from 'react';

// Impor KEDUA komponen header di sini
import HeaderLoggedIn from '../components/HeaderLoggedIn';
import HeaderLoggedOut from '../components/HeaderLoggedOut';
import { Link, useNavigate } from 'react-router-dom';

// --- Kumpulan Komponen Ikon (SVG) ---
const HeartIcon = (props) => (<svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16"> <path fillRule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z" /> </svg>);
const CartIcon = (props) => (<svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16"> <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" /> </svg>);
const StarIcon = (props) => (<svg {...props} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"> <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" /> </svg>);

// --- Data Contoh ---
// const trendingProducts = [{ id: 1, name: 'Kaos biru polos', price: 75000, rating: 4, image: '#' }, { id: 2, name: 'Kaos putih polos', price: 75000, rating: 5, image: '#' }, { id: 3, name: 'Polo coklat', price: 100000, rating: 5, image: '#' }, { id: 4, name: 'Kemeja biru langit', price: 250000, rating: 5, image: '#' }, { id: 5, name: 'Polo abu', price: 100000, rating: 5, image: '#' },];
// const discountedProducts = [{ id: 6, name: 'Kaos hitam polos', discountedPrice: 60000, originalPrice: 75000, discount: 20, rating: 5, image: '#' }, { id: 7, name: 'Kemeja batik coklat', discountedPrice: 135000, originalPrice: 150000, discount: 10, rating: 5, image: '#' }, { id: 8, name: 'Kemeja batik gold', discountedPrice: 127500, originalPrice: 150000, discount: 15, rating: 5, image: '#' }, { id: 9, name: 'Kemeja salur putih hijau', discountedPrice: 87500, originalPrice: 135000, discount: 35, rating: 5, image: '#' }, { id: 10, name: 'Kaos polos orange', discountedPrice: 60000, originalPrice: 75000, discount: 20, rating: 5, image: '#' },];

const formatCurrency = (amount) => `Rp ${new Intl.NumberFormat('id-ID').format(amount)}`;

// --- Komponen Pembantu ---
const Rating = ({ count }) => (<div style={{ display: 'flex', gap: '2px', color: '#ffc107' }}> {Array.from({ length: 5 }, (_, i) => (<StarIcon key={i} style={{ opacity: i < count ? 1 : 0.3 }} />))} </div>);
export const ProductCard = ({ product }) => {
    const cardStyles = {
        card: {
            border: '1px solid #e0e0e0', borderRadius: '12px', padding: '1rem', minWidth: '220px', fontFamily: "'Inter', sans-serif", backgroundColor: 'white',
        },
        imageContainer: { position: 'relative', backgroundColor: '#f8f9fa', borderRadius: '8px', marginBottom: '1rem', aspectRatio: '1 / 1', },
        wishlistIcon: { position: 'absolute', top: '10px', right: '10px', color: '#adb5bd', cursor: 'pointer', }, 
        discountBadge: { position: 'absolute', top: '10px', left: '10px', backgroundColor: '#e0f3ff', color: '#007bff', borderRadius: '6px', padding: '2px 8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '12px', }, 
        name: { fontWeight: '600', marginBottom: '0.5rem', color: '#212529', }, priceSection: { display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', }, 
        currentPrice: { fontWeight: 'bold', color: '#212529', }, originalPrice: { fontSize: '0.875rem', color: '#6c757d', textDecoration: 'line-through', }, 
        discountInfo: { fontSize: '0.875rem', color: 'red', fontWeight: 'bold', }, footer: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem', }, 
        cartButton: { background: 'none', border: 'none', color: '#007bff', cursor: 'pointer', },
        image: {width: '200px'}
    };
    // const navigate = useNavigate();

    const handleCart = async () => {

        try {
            const token = localStorage.getItem('authToken');

            // Memeriksa apakah token ada di localStorage
            if (!token) {
                alert("Anda harus login terlebih dahulu!");
                window.location.href = "/login"; // Redirect ke halaman login jika belum login
                return;
            }

            const payload = {
                productId: product.id,
                quantity: 1
            };

            // Lanjutkan dengan POST ke API untuk menambahkan ke keranjang
            const response = await fetch("http://localhost:8080/api/cart/items", {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            const text = await response.text();
            let data = text ? JSON.parse(text) : {};

            // Cek apakah response berhasil
            if (!response.ok) {
                console.error("Response error:", data);
                throw new Error(`Gagal memasukkan barang ke keranjang!: ${response.statusText}`);
            }

            alert('Barang dimasukkan ke keranjang!');
        } catch (err) {
            alert('Terjadi kesalahan.\n' + err.message);
        }
    };



    return (
        <div style={cardStyles.card}>
            <div style={cardStyles.imageContainer}>
                {product.discount && <div style={cardStyles.discountBadge}>{product.discount}%</div>}
                <img style={cardStyles.image} src={product.imageUrl} alt="" />
            </div>
            <a href={`/productdetails/${product.id}`}>
                <div style={cardStyles.name}>{product.name}</div>
            </a>
            {product.discount ? (
                <>
                    <div style={cardStyles.currentPrice}>{formatCurrency(product.discountedPrice)}</div>
                    <div style={cardStyles.priceSection}>
                        <div style={cardStyles.originalPrice}>{formatCurrency(product.originalPrice)}</div>
                        <div style={cardStyles.discountInfo}>{product.discount}%</div>
                    </div>
                </>
            ) : (
                <div style={cardStyles.currentPrice}>{formatCurrency(product.price)}</div>
            )}
            <div style={cardStyles.footer}>
                {/* <Rating count={product.rating} /> */}
                <p>{product.reviewCount} Reviews</p>
                <button
                    type="button"
                    onClick={handleCart}
                    style={cardStyles.cartButton}
                >
                    <CartIcon />
                </button>
            </div>
        </div>
    );
};

// --- Komponen Utama Homepage ---
const Homepage = () => {
    // --- Bagian Logika Utama ---
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userName, setUserName] = useState('');
    const [trendingProducts, setTrendingProducts] = useState([]);



    // useEffect untuk mengecek localStorage saat halaman pertama kali dimuat
    useEffect(() => {
        const token = localStorage.getItem('authToken');
        const name = localStorage.getItem('userName');

        if (token) {
            setIsAuthenticated(true);
            setUserName(name || ''); // Fallback jika nama tidak ada
        } else {
            setIsAuthenticated(false);
            setUserName('');
        }

        getProducts();

    }, []); // Array dependensi kosong `[]` berarti ini hanya berjalan sekali

    const getProducts = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/products')
            const data = await response.json();

            setTrendingProducts(data)

        } catch (e) {
            console.error("Error saat mengambil data : " + e)
        }
    }

    // --- STYLES ---
    const styles = {
        pageContainer: { backgroundColor: '#f8f9fa', minHeight: '100vh' },
        container: { maxWidth: '1200px', margin: '0 auto', padding: '2rem', fontFamily: "'Inter', sans-serif" },

        userName: { fontSize: '1.5rem', fontWeight: '600' },
        prompt: { color: '#6c757d' },
        heroBanner: { padding: '3rem 2rem', backgroundColor: '#0052cc', borderRadius: '24px', marginBottom: '3rem', color: 'white', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' },
        heroTitle: { fontSize: '2.5rem', fontWeight: 'bold', margin: 0, textShadow: '0 2px 4px rgba(0,0,0,0.2)' },
        heroSubtitle: { fontSize: '1.1rem', maxWidth: '600px', opacity: 0.9, margin: 0 },
        heroButton: { marginTop: '1rem', padding: '12px 28px', fontSize: '1rem', fontWeight: '600', color: '#0052cc', backgroundColor: 'white', border: 'none', borderRadius: '999px', cursor: 'pointer', transform: 'scale(1)', transition: 'transform 0.2s ease' },
        heroButtonHover: { transform: 'scale(1.05)' },
        section: { marginBottom: '3rem' },
        sectionHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' },
        sectionTitle: { fontSize: '1.5rem', fontWeight: 'bold' },
        seeAllLink: { color: '#007bff', textDecoration: 'none', fontWeight: '600' },
        productList: { display: 'grid', gap: '1.5rem', overflowX: 'auto', paddingBottom: '1rem', scrollbarWidth: 'none', 'msOverflowStyle': 'none', gridTemplateColumns: 'repeat(4, 1fr)', },
        productListWebkit: ` .product-list::-webkit-scrollbar { display: none; } `
    };

    return (
        <div style={styles.pageContainer}>
            {/* Menampilkan Header secara dinamis */}
            {isAuthenticated ? <HeaderLoggedIn getProducts={getProducts} /> : <HeaderLoggedOut />}

            <main style={styles.container}>
                <style>{styles.productListWebkit}</style>
                {/* Menyapa pengguna secara dinamis */}
                <div style={styles.userName}>Halo, {userName || 'Tamu'} 👋</div>
                <div style={styles.prompt}>Mau belanja apa hari ini?</div>
                <div style={styles.heroBanner}>
                    <h1 style={styles.heroTitle}>Diskon Spesial Akhir Pekan!</h1>
                    <p style={styles.heroSubtitle}>Nikmati potongan harga hingga 50% untuk produk-produk pilihan terbaik kami. Jangan sampai ketinggalan!</p>
                </div>
                <section style={styles.section}>
                    <div style={styles.sectionHeader}>
                        <h2 style={styles.sectionTitle}>Sedang tren saat ini</h2>
                    </div>
                    <div style={styles.productList} className="product-list">
                        {trendingProducts.map(product => <ProductCard key={product.id} product={product} getProducts={getProducts}/>)}
                    </div>
                </section>
            </main>
        </div>
    );
};

export default Homepage;