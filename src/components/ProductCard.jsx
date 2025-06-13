import React from 'react';

function ProductCard({ product }) {
  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} />
      <h3>{product.name}</h3>
      <p>Rp {product.price.toLocaleString('id-ID')}</p>
      <div className="product-card-rating">
          ★★★★★
      </div>
    </div>
  );
}

export default ProductCard;