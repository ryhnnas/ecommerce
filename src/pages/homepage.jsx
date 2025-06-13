import React from 'react';

// --- Kumpulan Komponen Ikon (SVG) ---
const HeartIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
    <path fillRule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
  </svg>
);
const CartIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
    <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
  </svg>
);
const StarIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
  </svg>
);

// --- Data Contoh ---
const trendingProducts = [
  { id: 1, name: 'Kaos biru polos', price: 75000, rating: 4, image: '#' },
  { id: 2, name: 'Kaos putih polos', price: 75000, rating: 5, image: '#' },
  { id: 3, name: 'Polo coklat', price: 100000, rating: 5, image: '#' },
  { id: 4, name: 'Kemeja biru langit', price: 250000, rating: 5, image: '#' },
  { id: 5, name: 'Polo abu', price: 100000, rating: 5, image: '#' },
];
const discountedProducts = [
  { id: 6, name: 'Kaos hitam polos', discountedPrice: 60000, originalPrice: 75000, discount: 20, rating: 5, image: '#' },
  { id: 7, name: 'Kemeja batik coklat', discountedPrice: 135000, originalPrice: 150000, discount: 10, rating: 5, image: '#' },
  { id: 8, name: 'Kemeja batik gold', discountedPrice: 127500, originalPrice: 150000, discount: 15, rating: 5, image: '#' },
  { id: 9, name: 'Kemeja salur putih hijau', discountedPrice: 87500, originalPrice: 135000, discount: 35, rating: 5, image: '#' },
  { id: 10, name: 'Kaos polos orange', discountedPrice: 60000, originalPrice: 75000, discount: 20, rating: 5, image: '#' },
];
const formatCurrency = (amount) => `Rp ${new Intl.NumberFormat('id-ID').format(amount)}`;

// --- Komponen Pembantu ---
const Rating = ({ count }) => (
  <div style={{ display: 'flex', gap: '2px', color: '#ffc107' }}>
    {Array.from({ length: 5 }, (_, i) => (
      <StarIcon key={i} style={{ opacity: i < count ? 1 : 0.3 }} />
    ))}
  </div>
);

const ProductCard = ({ product }) => {
    // Style dipisah di dalam komponen agar lebih rapi
    const cardStyles = {
        card: {
            border: '1px solid #e0e0e0',
            borderRadius: '12px',
            padding: '1rem',
            minWidth: '220px',
            fontFamily: "'Inter', sans-serif",
            backgroundColor: 'white',
        },
        imageContainer: {
            position: 'relative',
            backgroundColor: '#f8f9fa',
            borderRadius: '8px',
            marginBottom: '1rem',
            aspectRatio: '1 / 1',
        },
        wishlistIcon: {
            position: 'absolute',
            top: '10px',
            right: '10px',
            color: '#adb5bd',
            cursor: 'pointer',
        },
        discountBadge: {
            position: 'absolute',
            top: '10px',
            left: '10px',
            backgroundColor: '#e0f3ff',
            color: '#007bff',
            borderRadius: '50%',
            width: '32px',
            height: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 'bold',
            fontSize: '14px',
        },
        name: {
            fontWeight: '600',
            marginBottom: '0.5rem',
            color: '#212529',
        },
        priceSection: {
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            marginBottom: '0.5rem',
        },
        currentPrice: {
            fontWeight: 'bold',
            color: '#212529',
        },
        originalPrice: {
            fontSize: '0.875rem',
            color: '#6c757d',
            textDecoration: 'line-through',
        },
        discountInfo: {
            fontSize: '0.875rem',
            color: 'red',
            fontWeight: 'bold',
        },
        footer: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: '1rem',
        },
        cartButton: {
            background: 'none',
            border: 'none',
            color: '#007bff',
            cursor: 'pointer',
        }
    };

  return (
    <div style={cardStyles.card}>
      <div style={cardStyles.imageContainer}>
        {/* <img src={product.image} alt={product.name} /> */}
        <div style={cardStyles.wishlistIcon}><HeartIcon fill="none" stroke="currentColor" strokeWidth="1" /></div>
        {product.discount && <div style={cardStyles.discountBadge}>%</div>}
      </div>
      <div style={cardStyles.name}>{product.name}</div>

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
        <Rating count={product.rating} />
        <button style={cardStyles.cartButton}><CartIcon/></button>
      </div>
    </div>
  );
};


// --- Komponen Utama Homepage ---
const Homepage = () => {
    const styles = {
        container: {
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '2rem',
            fontFamily: "'Inter', sans-serif",
        },
        welcomeHeader: {
            marginBottom: '2rem',
        },
        userName: {
            fontSize: '1.5rem',
            fontWeight: '600',
        },
        prompt: {
            color: '#6c757d',
        },
        heroBanner: {
            height: '200px',
            backgroundColor: '#0052cc',
            borderRadius: '16px',
            marginBottom: '3rem',
        },
        section: {
            marginBottom: '3rem',
        },
        sectionHeader: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '1.5rem',
        },
        sectionTitle: {
            fontSize: '1.5rem',
            fontWeight: 'bold',
        },
        seeAllLink: {
            color: '#007bff',
            textDecoration: 'none',
            fontWeight: '600',
        },
        productList: {
            display: 'flex',
            gap: '1.5rem',
            overflowX: 'auto',
            paddingBottom: '1rem', // Ruang untuk scrollbar agar tidak menempel
            // Sembunyikan scrollbar
            scrollbarWidth: 'none', // Firefox
            'msOverflowStyle': 'none', // IE and Edge
        },
        // CSS untuk menyembunyikan scrollbar di Webkit browsers (Chrome, Safari)
        productListWebkit: `
            .product-list::-webkit-scrollbar {
                display: none;
            }
        `
    };

    return (
        <div style={styles.container}>
            {/* Style tag untuk inject CSS spesifik (seperti menyembunyikan scrollbar) */}
            <style>{styles.productListWebkit}</style>

            <div style={styles.welcomeHeader}>
                <div style={styles.userName}>Halo, Daniandraaa 👋</div>
                <div style={styles.prompt}>Mau belanja apa hari ini?</div>
            </div>

            <div style={styles.heroBanner}></div>

            {/* --- Section: Sedang Tren --- */}
            <section style={styles.section}>
                <div style={styles.sectionHeader}>
                    <h2 style={styles.sectionTitle}>Sedang tren saat ini</h2>
                    <a href="#" style={styles.seeAllLink}>Lihat Semua</a>
                </div>
                <div style={styles.productList} className="product-list">
                    {trendingProducts.map(product => <ProductCard key={product.id} product={product} />)}
                </div>
            </section>

            {/* --- Section: Diskon --- */}
            <section style={styles.section}>
                <div style={styles.sectionHeader}>
                    <h2 style={styles.sectionTitle}>Diskon hanya untuk kamu</h2>
                    <a href="#" style={styles.seeAllLink}>Lihat Semua</a>
                </div>
                <div style={styles.productList} className="product-list">
                    {discountedProducts.map(product => <ProductCard key={product.id} product={product} />)}
                </div>
            </section>
        </div>
    );
};

export default Homepage;