import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';

// --- DATA CONTOH & FUNGSI BANTUAN ---
// Di aplikasi nyata, data ini akan datang dari state global (Context/Redux) atau props
const initialCartItems = [
  { id: 1, name: 'Controller XBOX', details: 'Navy Blue / 287 gram / x1', price: 859000, image: '#', quantity: 1 },
  { id: 2, name: 'Boneka Teddy Bear', details: 'Light Blue / 250 gram / x1', price: 250000, image: '#', quantity: 1 },
  { id: 3, name: 'Sepatu Pria', details: 'Baby Blue / 650 gram / x1', price: 3599000, image: '#', quantity: 1 },
];

const formatCurrency = (amount) => {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(amount).replace('Rp', 'Rp ').trim();
};


// --- KOMPONEN UTAMA ---
const CartPage = () => {
  // --- STATE MANAGEMENT ---
  const [cartItems, setCartItems] = useState(initialCartItems);
  
  // State untuk melacak ID produk yang dipilih.
  // Awalnya, semua produk dipilih. Kita menggunakan Set untuk performa yang lebih baik.
  const [selectedItems, setSelectedItems] = useState(new Set(cartItems.map(item => item.id)));

  // --- FUNGSI HANDLER UNTUK INTERAKSI ---
  const handleSelectionChange = (itemId) => {
    const newSelection = new Set(selectedItems);
    if (newSelection.has(itemId)) {
      newSelection.delete(itemId);
    } else {
      newSelection.add(itemId);
    }
    setSelectedItems(newSelection);
  };

  const handleQuantityChange = (itemId, newQuantity) => {
    // Kuantitas tidak boleh kurang dari 1
    if (newQuantity < 1) return;

    setCartItems(currentItems =>
      currentItems.map(item =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  // --- PENGHITUNGAN TOTAL HARGA (DINAMIS) ---
  const subtotal = useMemo(() => {
    return cartItems.reduce((total, item) => {
      // Hanya tambahkan harga jika item tersebut ada di dalam `selectedItems`
      if (selectedItems.has(item.id)) {
        return total + (item.price * item.quantity);
      }
      return total;
    }, 0);
  }, [cartItems, selectedItems]); // Dihitung ulang hanya jika cartItems atau selectedItems berubah

  // Biaya lain (bisa dibuat dinamis nanti)
  const shippingCost = 2000;
  const serviceFee = 9000;
  const total = subtotal + shippingCost + serviceFee;

  // --- STYLES ---
  const styles = {
    page: { padding: '2rem 4rem', fontFamily: "'Inter', sans-serif" },
    backLink: { color: '#343a40', textDecoration: 'none', fontWeight: 600, display: 'inline-block', marginBottom: '1.5rem' },
    title: { fontSize: '1.75rem', fontWeight: 'bold', marginBottom: '2rem' },
    mainLayout: { display: 'flex', gap: '3rem' },
    itemsColumn: { flex: '2' },
    summaryColumn: { flex: '1' },
    // Item di keranjang
    cartItem: { display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '1.5rem' },
    itemCheckbox: { transform: 'scale(1.2)' },
    itemImage: { width: '80px', height: '80px', borderRadius: '12px', backgroundColor: '#f1f3f5', objectFit: 'cover' },
    itemInfo: { flex: 1 },
    itemName: { fontWeight: '600', fontSize: '1.1rem' },
    itemDetails: { color: '#6c757d', fontSize: '0.9rem' },
    quantityStepper: { display: 'flex', alignItems: 'center', gap: '1rem', border: '1px solid #dee2e6', borderRadius: '8px', padding: '0.25rem 0.5rem', width: 'fit-content' },
    quantityButton: { background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.25rem', color: '#6c757d' },
    itemPrice: { fontWeight: 'bold', fontSize: '1.1rem', marginLeft: 'auto' },
    // Summary
    summaryCard: { borderLeft: '2px solid #e9ecef', paddingLeft: '2rem' },
    summaryTitle: { fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1.5rem' },
    summaryRow: { display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', color: '#495057' },
    voucherRow: { borderTop: '1px solid #e9ecef', borderBottom: '1px solid #e9ecef', padding: '1rem 0', margin: '1rem 0' },
    pilihVoucher: { color: '#007bff', fontWeight: 600, cursor: 'pointer' },
    totalRow: { fontWeight: 'bold', fontSize: '1.25rem', color: '#212529', marginTop: '1.5rem' },
    checkoutButton: { width: '100%', padding: '1rem', backgroundColor: '#0d6efd', color: 'white', border: 'none', borderRadius: '8px', fontSize: '1rem', fontWeight: 600, cursor: 'pointer', marginBottom: '1rem' },
    continueButton: { width: '100%', padding: '1rem', backgroundColor: 'white', color: '#0d6efd', border: '2px solid #0d6efd', borderRadius: '8px', fontSize: '1rem', fontWeight: 600, cursor: 'pointer' },
  };

  return (
    <div style={styles.page}>
      <Link to="/" style={styles.backLink}>&larr; Kembali</Link>
      <h1 style={styles.title}>KERANJANG KAMU</h1>
      <div style={styles.mainLayout}>
        {/* Kolom Kiri: Daftar Item */}
        <div style={styles.itemsColumn}>
          {cartItems.map(item => (
            <div key={item.id} style={styles.cartItem}>
              <input 
                type="checkbox"
                style={styles.itemCheckbox}
                checked={selectedItems.has(item.id)}
                onChange={() => handleSelectionChange(item.id)}
              />
              <img src={item.image} alt={item.name} style={styles.itemImage}/>
              <div style={styles.itemInfo}>
                <div style={styles.itemName}>{item.name}</div>
                <div style={styles.itemDetails}>{item.details}</div>
              </div>
              <div style={styles.quantityStepper}>
                <button style={styles.quantityButton} onClick={() => handleQuantityChange(item.id, item.quantity - 1)}>-</button>
                <span>{item.quantity}</span>
                <button style={styles.quantityButton} onClick={() => handleQuantityChange(item.id, item.quantity + 1)}>+</button>
              </div>
              <div style={styles.itemPrice}>{formatCurrency(item.price * item.quantity)}</div>
            </div>
          ))}
        </div>

        {/* Kolom Kanan: Total Keranjang */}
        <div style={styles.summaryCard}>
          <h2 style={styles.summaryTitle}>TOTAL KERANJANG</h2>
          <div style={styles.summaryRow}>
            <span>Subtotal untuk Produk</span>
            <span>{formatCurrency(subtotal)}</span>
          </div>
          <div style={styles.summaryRow}>
            <span>Biaya Pengiriman (2 - 3 hari)</span>
            <span>{formatCurrency(shippingCost)}</span>
          </div>
          <div style={styles.summaryRow}>
            <span>Biaya Layanan</span>
            <span>{formatCurrency(serviceFee)}</span>
          </div>
          <div style={{...styles.summaryRow, ...styles.voucherRow}}>
            <span>Tambahkan Voucher</span>
            <span style={styles.pilihVoucher}>Pilih Voucher</span>
          </div>
          <div style={{...styles.summaryRow, ...styles.totalRow}}>
            <span>Total</span>
            <span>{formatCurrency(total)}</span>
          </div>
          <button style={styles.checkoutButton}>Lakukan Checkout</button>
          <button style={styles.continueButton}>&larr; Lanjutkan Belanja</button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;