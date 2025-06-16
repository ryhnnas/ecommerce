import React, { useState } from 'react';
import ProductReviews from './ProductReview';

function ProductTabs({ description, prodId }) {
  const [activeTab, setActiveTab] = useState('deskripsi');

  return (
    <div className="product-tabs">
      <div className="tab-headers">
        <h3
          className={activeTab === 'deskripsi' ? 'active' : ''}
          onClick={() => setActiveTab('deskripsi')}
        >
          DESKRIPSI
        </h3>
        <h3
          className={activeTab === 'review' ? 'active' : ''}
          onClick={() => setActiveTab('review')}
        >
          REVIEW
        </h3>
      </div>
      <div className="tab-content">
        {activeTab === 'deskripsi' && <p>{description}</p>}
        {activeTab === 'review' && <ProductReviews prodId={prodId}/>}
      </div>
    </div>
  );
}

export default ProductTabs;