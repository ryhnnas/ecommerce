import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import ProductGallery from '../components/ProductGallery';
import ProductInfo from '../components/ProductInfo';
import ProductTabs from '../components/ProductTabs';
import RelatedProducts from '../components/RelatedProducts';
import '../style/ProductDetails.css';

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
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState([])
  const [products, setProducts] = useState([]);

  useEffect(() => {

    const getItem = async () => {

      try {
        const response = await fetch(`http://localhost:8080/api/products/${id}`)
        const data = await response.json();
        console.log(data)
        setProduct(data)
      } catch (e) {
        console.log("Error saat mengambil data : " + e)
      }

    }

    getItem();
    getProducts();
  }, [id])

  const getProducts = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/products')
      const data = await response.json();

      const filteredProducts = data.filter((product) => product.id !== parseInt(id));
      setProducts(filteredProducts);

    } catch (e) {
      console.error("Error saat mengambil data : " + e)
    }
  }

  return (
    <div className="product-page-container">
      <main className="product-main-section">
        <ProductGallery image={product.imageUrl} />
        <ProductInfo
          id={id}
          product={mainProduct}
          mainProduct={product}
          quantity={quantity}
          setQuantity={setQuantity}
        />
      </main>
      <ProductTabs description={product.description} prodId={product.id} />
      <RelatedProducts products={products} />
    </div>
  );
}

export default ProductDetails;