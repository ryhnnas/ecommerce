import React, { useEffect, useState } from 'react';

// Data statis untuk ulasan (dalam aplikasi nyata, ini dari API)
const reviewData = {
  totalReviews: 12, // Terdapat 8 pada gambar, namun 12 lebih masuk akal
  averageRating: 4.8,
  ratingDistribution: [
    { stars: 5, count: 10 },
    { stars: 4, count: 1 },
    { stars: 3, count: 1 },
  ],
  reviews: [
    {
      id: 1,
      author: 'Jeanne Moore',
      date: 'June 6, 2025',
      rating: 5,
      text: "The dress is great! Very classy and comfortable. It fit perfectly! I'm 5'7 and 130 pounds. I am a 34B chest. This dress would be too tight for those who are a C bust but could be hemmed. Would recommend it for those big chested as I am smaller chested and it fit me perfectly. The underarms were not too wide and the dress was made well."
    },
    // Anda bisa menambahkan ulasan lainnya di sini
  ]
};

// Komponen kecil untuk menampilkan bintang
const StarRating = ({ rating }) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    stars.push(
      <span key={i} className={`star ${i <= rating ? 'filled' : ''}`}>
        &#9733;
      </span>
    );
  }
  return <div className="star-rating">{stars}</div>;
};


function ProductReviews( prodId ) {

  const [reviews, setReviews] = useState([]);

  const getReviews = async () => {

    const response = await fetch(`http://localhost:8080/api/products/${prodId.prodId}/reviews`)
    const data = await response.json()
    const content = data.content
    setReviews(content);
  }

  useEffect(() => {
    getReviews()
  })
  
  // Menghitung total untuk persentase
  const totalReviewsCount = reviewData.ratingDistribution.reduce((acc, item) => acc + item.count, 0);

  return (
    <div className="product-reviews-container">
      <div className="reviews-summary">
        {/* {reviewData.ratingDistribution.map(item => (
          <div key={item.stars} className="rating-bar-row">
            <div className="star-label">
              <span>{item.stars}</span>
              <span className="star filled">&#9733;</span>
            </div>
            <div className="rating-bar">
              <div
                className="rating-bar-filled"
                style={{ width: `${(item.count / totalReviewsCount) * 100}%` }}
              ></div>
            </div>
          </div>
        ))} */}
        {reviews.map(review => (
          <div className='rating-bar-row'>
            <div className='star-label'>
              <span>{review.rating}</span>
              <span className='star filled'>&#9733;</span>
            </div>
            <div className='rating-bar'>
              <div className='rating-bar-fille' style={{ width: `${{  }}` }}>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="reviews-list">
        <h4>{reviews.length} Reviews</h4>
        {reviews.map(review => (
          <div key={review.id} className="review-card">
            <div className="review-header">
                <span className="review-author">{review.username}</span>
                <span className="review-date">{review.reviewDate}</span>
            </div>
            <StarRating rating={review.rating} />
            <p className="review-text">{review.comment}</p>
          </div>
        ))}
        {/* <a href="#" className="see-more-reviews">Lainnya</a> */}
      </div>
    </div>
  );
}

export default ProductReviews;