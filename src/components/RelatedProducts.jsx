import React from 'react';
import ProductCard from './ProductCard';

function RelatedProducts({ products }) {
  return (
    <div className="related-products">
      <h2>Produk lain</h2>
      <div className="products-grid">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default RelatedProducts;