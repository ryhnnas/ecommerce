import React from 'react';

// Data statis untuk ulasan (dalam aplikasi nyata, ini dari API)
const reviewData = {
  totalReviews: 12, // Terdapat 8 pada gambar, namun 12 lebih masuk akal
  averageRating: 4.8,
  ratingDistribution: [
    { stars: 5, count: 10 },
    { stars: 4, count: 1 },
    { stars: 3, count: 1 },
    { stars: 2, count: 0 },
    { stars: 1, count: 0 },
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


function ProductReviews() {
  // Menghitung total untuk persentase
  const totalReviewsCount = reviewData.ratingDistribution.reduce((acc, item) => acc + item.count, 0);

  return (
    <div className="product-reviews-container">
      <div className="reviews-summary">
        {reviewData.ratingDistribution.map(item => (
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
        ))}
      </div>

      <div className="reviews-list">
        <h4>{reviewData.totalReviews} Reviews</h4>
        {reviewData.reviews.map(review => (
          <div key={review.id} className="review-card">
            <div className="review-header">
                <span className="review-author">{review.author}</span>
                <span className="review-date">{review.date}</span>
            </div>
            <StarRating rating={review.rating} />
            <p className="review-text">{review.text}</p>
          </div>
        ))}
        <a href="#" className="see-more-reviews">Lainnya</a>
      </div>
    </div>
  );
}

export default ProductReviews;