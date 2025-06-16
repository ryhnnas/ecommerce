import React, { useState } from 'react';

function ProductGallery({ image }) {
  // const [mainImage, setMainImage] = useState(image[0]);

  return (
    <div className="product-gallery">
      <div className="main-image-container">
        <img src={ image } alt="Product" className="main-image" />
      </div>
      {/* <div className="thumbnail-container">
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Thumbnail ${index + 1}`}
            className={mainImage === image ? 'thumbnail active' : 'thumbnail'}
            onClick={() => setMainImage(image)}
          />
        ))}
      </div> */}
    </div>
  );
}

export default ProductGallery;