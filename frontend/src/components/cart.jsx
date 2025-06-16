import React, { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/footer';
import { useNavigate } from 'react-router-dom';

// --- DATA CONTOH & FUNGSI BANTUAN ---
const initialCartItems = [
    // { id: 1, name: 'Controller XBOX', details: 'Navy Blue / 287 gram / x1', price: 859000, image: '#', quantity: 1 },
    // { id: 2, name: 'Boneka Teddy Bear', details: 'Light Blue / 250 gram / x1', price: 250000, image: '#', quantity: 1 },
    // { id: 3, name: 'Sepatu Pria', details: 'Baby Blue / 650 gram / x1', price: 3599000, image: '#', quantity: 1 },
];

const formatCurrency = (amount) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(amount).replace('Rp', 'Rp ').trim();
};


// --- KOMPONEN UTAMA ---
const CartPageComponent = () => {
    // --- STATE MANAGEMENT ---
    const [cartItems, setCartItems] = useState([]);
    const [selectedItems, setSelectedItems] = useState(new Set(cartItems.cartItemId));

    const getCartItems = async () => {

        try {
            const token = localStorage.getItem('authToken');
            const response = await fetch('http://localhost:8080/api/cart', {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })

            const data = await response.json()
            setCartItems(data.items)
            console.log("DATA", data.items)

        } catch (e) {
            console.log(e)
        }
    }

    const updateCart = async (itemId, newQuantity) => {
        const payload = {
            quantity: newQuantity,
        };
        try {
            const token = localStorage.getItem('authToken');
            const response = await fetch(`http://localhost:8080/api/cart/items/product/${itemId}`, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            const data = await response.json();
            console.log('Cart updated:', data);
        } catch (e) {
            console.error('Update error:', e);
        }
    };

    const deleteFromCart = async (itemId) => {
        try {
            const token = localStorage.getItem('authToken');
            const response = await fetch(`http://localhost:8080/api/cart/items/product/${itemId}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const data = await response.json();
            console.log('Cart updated:', data);
            getCartItems();
        } catch (e) {
            console.error('Update error:', e);
        }


    }

    const navigate = useNavigate();
    const toCheckOut = () => {
        navigate('/checkout');
    }

    useEffect(() => {
        getCartItems();
    }, []);

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
        if (newQuantity < 1) deleteFromCart(itemId);

        setCartItems(currentItems =>
            currentItems.map(item =>
                item.productId === itemId ? { ...item, quantity: newQuantity } : item
            )
        );

        // Update ke server
        updateCart(itemId, newQuantity);
    };

    // --- PENGHITUNGAN TOTAL HARGA (DINAMIS) ---
    const subtotal = useMemo(() => {
        return cartItems.reduce((total, item) => {
            if (selectedItems.has(item.cartItemId)) {
                return total + (item.price * item.quantity);
            }
            return total;
        }, 0);
    }, [cartItems, selectedItems]);

    const shippingCost = 2000;
    const serviceFee = 9000;
    const total = subtotal + shippingCost + serviceFee;

    // --- STYLES ---
    const styles = {
        footer: { padding: '2rem 4rem' },
        page: { fontFamily: "'Inter', sans-serif" },
        backLink: { color: '#0C5AA2', textDecoration: 'none', fontWeight: 600, display: 'inline-block', marginBottom: '1.5rem' },
        title: { color: '#0C5AA2', fontSize: '1.75rem', fontWeight: 'bold', marginBottom: '2rem' },
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

        // STYLE YANG DIPERBARUI
        quantityStepper: {
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
        },
        quantityButton: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '32px',
            height: '32px',
            border: '1px solid #e0e0e0',
            borderRadius: '50%',
            backgroundColor: 'white',
            boxShadow: '0 2px 4px rgba(0,0,0,0.07)',
            cursor: 'pointer',
            fontSize: '1.5rem',
            fontWeight: 'normal',
            color: '#343a40',
            padding: '0',
            paddingBottom: '4px'
        },
        quantityDisplay: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '32px',
            height: '32px',
            border: '1px solid #e0e0e0',
            borderRadius: '50%',
            backgroundColor: 'white',
            boxShadow: '0 2px 4px rgba(0,0,0,0.07)',
            fontSize: '1rem',
            fontWeight: 'bold',
            color: '#343a40',
        },

        itemPrice: { fontWeight: 'bold', fontSize: '1.1rem', marginLeft: 'auto' },
        // Summary
        summaryCard: { borderLeft: '2px solid #e9ecef', paddingLeft: '2rem' },
        summaryTitle: { fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1.5rem' },
        summaryRow: { display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', color: '#495057' },
        voucherRow: { borderTop: '1px solid #e9ecef', borderBottom: '1px solid #e9ecef', padding: '1rem 0', margin: '1rem 0' },
        pilihVoucher: { color: '#0C5AA2', fontWeight: 600, cursor: 'pointer' },
        totalRow: { fontWeight: 'bold', fontSize: '1.25rem', color: '#212529', marginTop: '1.5rem' },
        checkoutButton: { width: '100%', padding: '1rem', backgroundColor: '#0C5AA2', color: 'white', border: 'none', borderRadius: '8px', fontSize: '1rem', fontWeight: 600, cursor: 'pointer', marginBottom: '1rem' },
        continueButton: { width: '100%', padding: '1rem', backgroundColor: 'white', color: '#0C5AA2', border: '2px solid #0C5AA2', borderRadius: '8px', fontSize: '1rem', fontWeight: 600, cursor: 'pointer' },
    };

    return (
        <div style={styles.page}>
            <div style={styles.footer}>
                <div style={styles.mainLayout}>
                    {/* Kolom Kiri: Daftar Item */}
                    <div style={styles.itemsColumn}>
                        {cartItems.map(item => (
                            <div key={item.cartItemId} style={styles.cartItem}>
                                <input
                                    type="checkbox"
                                    style={styles.itemCheckbox}
                                    checked={selectedItems.has(item.cartItemId)}
                                    onChange={() => handleSelectionChange(item.cartItemId)}
                                />
                                <img src={item.productImageUrl} alt={item.name} style={styles.itemImage} />
                                <div style={styles.itemInfo}>
                                    <div style={styles.itemName}>{item.productName}</div>
                                    <div style={styles.itemDetails}>{item.details}</div>
                                </div>
                                <div style={styles.quantityStepper}>
                                    <button style={styles.quantityButton} onClick={() => handleQuantityChange(item.productId, item.quantity - 1)}>-</button>
                                    <span style={styles.quantityDisplay}>{item.quantity}</span>
                                    <button style={styles.quantityButton} onClick={() => handleQuantityChange(item.productId, item.quantity + 1)}>+</button>
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
                        <div style={{ ...styles.summaryRow, ...styles.voucherRow }}>
                            <span>Tambahkan Voucher</span>
                            <span style={styles.pilihVoucher}>Pilih Voucher</span>
                        </div>
                        <div style={{ ...styles.summaryRow, ...styles.totalRow }}>
                            <span>Total</span>
                            <span>{formatCurrency(total)}</span>
                        </div>
                        <button onClick={toCheckOut} style={styles.checkoutButton}>Lakukan Checkout</button>
                        <button style={styles.continueButton}>&larr; Lanjutkan Belanja</button>
                    </div>
                </div>
            </div>
        </div>
    );
};


export default CartPageComponent;