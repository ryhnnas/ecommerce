import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// =================================================================================
// 1. KOMPONEN SVG UNTUK IKON PEMBAYARAN
// =================================================================================
const IconCash = () => (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 14.5C13.3807 14.5 14.5 13.3807 14.5 12C14.5 10.6193 13.3807 9.5 12 9.5C10.6193 9.5 9.5 10.6193 9.5 12C9.5 13.3807 10.6193 14.5 12 14.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /><path d="M8.5 12H7.5C6.94772 12 6.5 12.4477 6.5 13V15.5C6.5 16.0523 6.94772 16.5 7.5 16.5H16.5C17.0523 16.5 17.5 16.0523 17.5 15.5V13C17.5 12.4477 17.0523 12 16.5 12H15.5M8.5 12V7.5C8.5 7.22386 8.72386 7 9 7H15C15.2761 7 15.5 7.22386 15.5 7.5V12M8.5 12H15.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>);
const IconVenmo = () => (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7 7L10 18L13.5 9.5L17 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>);
const IconPaypal = () => (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3.5 10.5C3.5 8.29086 5.29086 6.5 7.5 6.5H17.5C19.1569 6.5 20.5 7.84315 20.5 9.5V16.5C20.5 18.1569 19.1569 19.5 17.5 19.5H7.5C5.29086 19.5 3.5 17.7091 3.5 15.5V10.5Z" stroke="currentColor" strokeWidth="1.5" /><path d="M14 6.5V5.5C14 4.39543 13.1046 3.5 12 3.5H7.5C5.84315 3.5 4.5 4.84315 4.5 6.5V10" stroke="currentColor" strokeWidth="1.5" /></svg>);
const IconAmazon = () => (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16 19.2223C13.5625 21.0556 10.4375 21.0556 8 19.2223M16.1429 4L12 15L7.85714 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /><path d="M5 4H20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>);
const IconCard = () => (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.5 7.50009C2.5 5.29095 4.29086 3.5 6.5 3.5H17.5C19.7091 3.5 21.5 5.29095 21.5 7.50009V16.5001C21.5 18.7092 19.7091 20.5 17.5 20.5H6.5C4.29086 20.5 2.5 18.7092 2.5 16.5001V7.50009Z" stroke="currentColor" strokeWidth="1.5" /><path d="M2.5 8.5H21.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /><path d="M6 16.5H10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>);


// =================================================================================
// 2. KOMPONEN CSS
// =================================================================================
const Styles = () => (
    <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

    body {
        font-family: 'Inter', sans-serif;
        background-color: #f8f9fa;
        color: #343a40;
    }
    .checkout-page-container {
        display: flex;
        gap: 32px;
        max-width: 1200px;
        margin: 40px auto;
        padding: 0 24px;
        align-items: flex-start;
    }
    .form-column {
        flex: 2;
        display: flex;
        flex-direction: column;
        gap: 32px;
    }
    .summary-column {
        flex: 1;
        position: sticky;
        top: 40px;
    }
    .form-section {
        background-color: white;
        padding: 24px;
        border-radius: 8px;
        border: 1px solid #e9ecef;
    }
    .section-title {
        font-size: 16px;
        font-weight: 600;
        margin: 0 0 24px 0;
    }
    .form-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 16px 24px;
    }
    .form-group {
        display: flex;
        flex-direction: column;
        gap: 8px;
    }
    .form-group.full-width {
        grid-column: 1 / -1;
    }
    .form-group label {
      font-size: 14px;
      font-weight: 500;
    }
    .form-group input[type="text"],
    .form-group input[type="email"],
    .form-group select,
    .form-group textarea {
      width: 100%;
      padding: 10px 12px;
      border: 1px solid #dee2e6;
      border-radius: 6px;
      font-size: 14px;
      font-family: 'Inter', sans-serif;
    }
    .form-group textarea {
        min-height: 100px;
        resize: vertical;
    }
    .checkbox-group {
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 14px;
    }
    
    /* Payment Methods */
    .payment-options {
        display: flex;
        justify-content: space-between;
        gap: 12px;
        padding-bottom: 24px;
        border-bottom: 1px solid #e9ecef;
        margin-bottom: 24px;
    }
    .payment-option {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 8px;
        padding: 12px;
        border: 2px solid transparent;
        border-radius: 8px;
        cursor: pointer;
        text-align: center;
        flex: 1;
        transition: border-color 0.2s, background-color 0.2s;
    }
    .payment-option.selected {
        border-color: #0C5AA2;
        background-color: #e7f5ff;
    }
    .payment-option label { font-size: 12px; font-weight: 500; }
    .payment-option svg { color: #495057; }
    .payment-option.selected svg { color: #0C5AA2; }
    
    /* Summary Card */
    .summary-card {
        background-color: white;
        padding: 24px;
        border-radius: 8px;
        border: 1px solid #e9ecef;
    }
    .summary-row {
        display: flex;
        justify-content: space-between;
        margin-bottom: 12px;
        font-size: 14px;
    }
    .summary-row.voucher a {
        color: #0C5AA2;
        font-weight: 600;
        text-decoration: none;
    }
    .summary-divider {
        border: none;
        border-top: 1px solid #e9ecef;
        margin: 16px 0;
    }
    .summary-total {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-weight: 600;
        font-size: 18px;
    }
    .summary-total .total-price {
        font-size: 24px;
    }
    .payment-button {
        width: 100%;
        padding: 14px;
        margin-top: 24px;
        background-color: #0C5AA2;
        color: white;
        border: none;
        border-radius: 6px;
        font-size: 16px;
        font-weight: 600;
        cursor: pointer;
    }
    .back-link {
        display: block;
        text-align: center;
        margin-top: 16px;
        color: #0C5AA2;
        font-weight: 500;
        text-decoration: none;
    }
    
    @media (max-width: 992px) {
        .checkout-page-container { flex-direction: column; }
        .summary-column { position: static; }
    }
     @media (max-width: 768px) {
        .form-grid { grid-template-columns: 1fr; }
     }
  `}</style>
);


// =================================================================================
// 3. KOMPONEN UTAMA
// =================================================================================
const Checkout = () => {
    const [paymentMethod, setPaymentMethod] = useState('');
    const [getOrder, setGetOrder] = useState([]);
    const [shippingAddress, setShippingAddress] = useState("");
    const [cardDetail, setCardDetail] = useState({
        cardHolderName: 'xxxxxx',
        cardNumber: 12345678901234,
        cvv: 123,
        expiryDate: '12/2050'
    })

    const getCartItems = async () => {

        try {
            const token = localStorage.getItem('authToken');
            const response = await fetch('http://localhost:8080/api/cart', {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })

            const data = await response.json()
            setGetOrder(data)
            console.log(data.items)
            console.log("SUBTOTAL")
            console.log(data.totalAmount)

        } catch (e) {
            console.log(e)
        }
    }

    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCardDetail((prevDetail) => ({
            ...prevDetail,
            [name]: value
        }));
    };

    const checkoutHandler = async () => {

        const payload = {
            shippingAddress: shippingAddress,
            paymentDetail: {
                paymentMethod: paymentMethod,
                cardHolderName: cardDetail.cardHolderName,
                cardNumber: cardDetail.cardNumber,
                cvv: cardDetail.cvv,
                expiryDate: cardDetail.expiryDate
            }
        };

        try {
            const token = localStorage.getItem('authToken');
            const response = await fetch(`http://localhost:8080/api/orders/checkout/from-cart`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            const data = await response.json();
            console.log("Checkout successful", data);
            navigate('/checkout-success');
        } catch (e) {
            navigate('/checkout-gagal');
            console.error('Checkout error:', e);
        }
    }

    useEffect(() => {
        getCartItems()
    }, [])

    const shippingCost = 2000;
    const serviceFee = 9000;
    const total = getOrder.totalAmount + shippingCost + serviceFee;

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(amount).replace('Rp', 'Rp ').trim();
    };

    const paymentOptionsList = [
        { id: 'COD', label: 'Cash on Delivery', icon: <IconCash /> },
        // { id: 'venmo', label: 'Venmo', icon: <IconVenmo /> },
        // { id: 'paypal', label: 'Paypal', icon: <IconPaypal /> },
        // { id: 'amazon', label: 'Amazon Pay', icon: <IconAmazon /> },
        { id: 'CARD', label: 'Debit/Credit Card', icon: <IconCard /> },
    ];

    return (
        <>
            <Styles />
            <div className="checkout-page-container">
                <div className="form-column">
                    <form onSubmit={(e) => e.preventDefault()}>
                        <div className="form-section">
                            <h2 className="section-title">Billing Information</h2>
                            <div className="form-grid">
                                <div className="form-group full-width"><label>Address</label><input
                                    type="text"
                                    value={shippingAddress}
                                    onChange={(e) => setShippingAddress(e.target.value)}
                                /></div>
                            </div>
                            <div className="checkbox-group" style={{ marginTop: '16px' }}>
                                <input type="checkbox" id="ship-different" />
                                <label htmlFor="ship-different">Ship into different address</label>
                            </div>
                        </div>

                        <div className="form-section">
                            <h2 className="section-title">Pilih Metode Pembayaran</h2>
                            <div className="payment-options">
                                {paymentOptionsList.map(option => (
                                    <div key={option.id} className={`payment-option ${paymentMethod === option.id ? 'selected' : ''}`} onClick={() => setPaymentMethod(option.id)}>
                                        {option.icon}
                                        <label>{option.label}</label>
                                        <input type="radio" name="payment-method" value={option.id} checked={paymentMethod === option.id} onChange={() => setPaymentMethod(option.id)} />
                                    </div>
                                ))}
                            </div>

                            {paymentMethod === 'CARD' && (
                                <div className="card-details-form">
                                    <div className="form-grid">
                                        <div className="form-group full-width"><label>Name on Card</label><input name="cardHolderName"
                                            value={cardDetail.cardHolderName}
                                            onChange={handleInputChange} type="text" /></div>
                                        <div className="form-group full-width"><label>Card Number</label><input name="cardNumber"
                                            value={cardDetail.cardNumber}
                                            onChange={handleInputChange} type="text" /></div>
                                        <div className="form-group"><label>Expire Date</label><input name="expiryDate"
                                            placeholder="MM/YYYY"
                                            value={cardDetail.expiryDate}
                                            onChange={handleInputChange} type="text" /></div>
                                        <div className="form-group"><label>CVC</label><input name="cvv"
                                            value={cardDetail.cvv}
                                            onChange={handleInputChange} type="text" /></div>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="form-section">
                            <h2 className="section-title">Additional Information</h2>
                            <div className="form-group">
                                <label>Order Notes <span style={{ fontWeight: 400, color: '#6c757d' }}>(Optional)</span></label>
                                <textarea placeholder="Notes about your order, e.g. special notes for delivery."></textarea>
                            </div>
                        </div>
                    </form>
                </div>

                <aside className="summary-column">
                    <div className="summary-card">
                        <h2 className="section-title">TOTAL KERANJANG</h2>
                        <div className="summary-row">
                            <span>Subtotal untuk Produk</span>
                            <strong>{formatCurrency(getOrder.totalAmount)}</strong>
                        </div>
                        <div className="summary-row">
                            <span>Biaya Pengiriman (2 - 3 hari)</span>
                            <strong>Rp 9.000</strong>
                        </div>
                        <div className="summary-row">
                            <span>Biaya Layanan</span>
                            <strong>Rp 2.000</strong>
                        </div>
                        <hr className="summary-divider" />
                        <div className="summary-row voucher">
                            <span>Tambahkan Voucher</span>
                            <a href="#">Pilih Voucher</a>
                        </div>
                        <hr className="summary-divider" />
                        <div className="summary-total">
                            <span>Total</span>
                            <strong className="total-price">{formatCurrency(total)}</strong>
                        </div>
                        <button className="payment-button" onClick={checkoutHandler}>Lakukan Pembayaran</button>
                        <a href="#" className="back-link">&lt; Kembali ke Keranjang</a>
                    </div>
                </aside>
            </div>
        </>
    );
};

export default Checkout;