import React, { useState } from 'react';
import ProductGallery from '../components/ProductGallery';
import ProductInfo from '../components/ProductInfo';
import ProductTabs from '../components/ProductTabs';
import RelatedProducts from '../components/RelatedProducts';
import '../style/ProductDetails.css'; // Pastikan untuk mengimpor CSS yang sesuai

// Data statis untuk produk utama
const mainProduct = {
  name: 'Kaos Biru Polos',
  price: 75000,
  rating: 5.0,
  reviews: 457,
  availability: 'In Stock',
  category: 'Pakaian',
  colors: ['#1E40AF', '#FFFFFF', '#A3A3A3'],
  sizes: ['S', 'M', 'L', 'XL'],
  images: [
    '/path/to/image_e4a3b2.png', // Ganti dengan path gambar utama
    // Tambahkan path untuk thumbnail lainnya
  ],
  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
};

// Data statis untuk produk terkait
const relatedProductsData = [
  { id: 1, name: 'Kaos biru polos', price: 75000, image: '/path/to/related1.png' },
  { id: 2, name: 'Kaos putih polos', price: 75000, image: '/path/to/related2.png' },
  { id: 3, name: 'Polo coklat', price: 100000, image: '/path/to/related3.png' },
  { id: 4, name: 'Kemeja biru langit', price: 250000, image: '/path/to/related4.png' },
  { id: 5, name: 'Polo abu', price: 100000, image: '/path/to/related5.png' }
];

function ProductDetails() {
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="product-page-container">
      <main className="product-main-section">
        <ProductGallery images={mainProduct.images} />
        <ProductInfo
          product={mainProduct}
          quantity={quantity}
          setQuantity={setQuantity}
        />
      </main>
      <ProductTabs description={mainProduct.description} />
      <RelatedProducts products={relatedProductsData} />
    </div>
  );
}

export default ProductDetails;