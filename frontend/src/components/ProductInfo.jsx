import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function ProductInfo({ product, quantity, setQuantity, mainProduct, id }) {
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState(product.sizes[3]); // Default to XL

  const handleQuantityChange = (amount) => {
    setQuantity((prev) => Math.max(1, prev + amount));
  };

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
        productId: id,
        quantity: quantity
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

  const navigate = useNavigate()
  const toCheckOut = () => {
    handleCart()
    navigate('/cart');
  }

  return (

    <div className="product-info">
      <div className="product-rating">
        <span>⭐ {mainProduct.averageRating?.toFixed(1)} Star Rating</span>
        <span className="review-count">({mainProduct.reviewCount} Pengguna memberikan ulasan)</span>
      </div>
      <h1>{mainProduct.name}</h1>
      <p className="availability">{mainProduct.stock} Stok tersedia</p>
      <p className="price">
        {mainProduct?.price !== undefined ? `Rp ${mainProduct.price.toLocaleString('id-ID')}` : 'Rp -'}
      </p>

      <div className="actions">
        <div className="quantity-selector">
          <button onClick={() => handleQuantityChange(-1)}>-</button>
          <span>{quantity}</span>
          <button onClick={() => handleQuantityChange(1)}>+</button>
        </div>
        <button onClick={handleCart} className="btn-add-to-cart">Masukan Keranjang</button>
      </div>
      <button onClick={toCheckOut} className="btn-buy-now">Beli Sekarang</button>
    </div>
  );
}

export default ProductInfo;