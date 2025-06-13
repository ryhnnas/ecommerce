import React, { useState } from 'react';

function ProductInfo({ product, quantity, setQuantity }) {
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState(product.sizes[3]); // Default to XL

  const handleQuantityChange = (amount) => {
    setQuantity((prev) => Math.max(1, prev + amount));
  };

  return (
    <div className="product-info">
      <div className="product-rating">
        <span>⭐ {product.rating.toFixed(1)} Star Rating</span>
        <span className="review-count">({product.reviews} Pengguna memberikan ulasan)</span>
      </div>
      <h1>{product.name}</h1>
      <p className="availability">{product.availability}</p>
      <p className="price">Rp {product.price.toLocaleString('id-ID')}</p>
      
      <div className="options-selector">
        <div className="color-selector">
          <label>Color</label>
          <div className="colors">
            {product.colors.map(color => (
              <span
                key={color}
                className={`color-option ${selectedColor === color ? 'selected' : ''}`}
                style={{ backgroundColor: color }}
                onClick={() => setSelectedColor(color)}
              ></span>
            ))}
          </div>
        </div>
        <div className="size-selector">
          <label>Size</label>
          <select value={selectedSize} onChange={(e) => setSelectedSize(e.target.value)}>
            {product.sizes.map(size => (
              <option key={size} value={size}>{size}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="actions">
        <div className="quantity-selector">
            <button onClick={() => handleQuantityChange(-1)}>-</button>
            <span>{quantity}</span>
            <button onClick={() => handleQuantityChange(1)}>+</button>
        </div>
        <button className="btn-add-to-cart">Masukan Keranjang</button>
      </div>
      <button className="btn-buy-now">Beli Sekarang</button>
    </div>
  );
}

export default ProductInfo;