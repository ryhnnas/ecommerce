import React from 'react';

function ProductCard({ product }) {

  const cardStyles = {
    name: { fontWeight: '600', marginBottom: '0.5rem', color: '#212529', },
  };

  return (
    <div className="product-card">
      <img src={product.imageUrl} alt={product.name} />
      <a href={`/productdetails/${product.id}`}>
        <div style={cardStyles.name}><h3>{product.name}</h3></div>
      </a>

      <p>Rp {product.price.toLocaleString('id-ID')}</p>
      <div className="product-card-rating">
        ★★★★★
      </div>
    </div>
  );
}

export default ProductCard;