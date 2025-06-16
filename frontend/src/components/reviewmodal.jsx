import React, { useState } from 'react';
import '../style/modal.css'

const ModalReview = ({ productDetails, onClose, onSubmit }) => {
    const { ids, orderIds, names } = productDetails;

    const [reviews, setReviews] = useState(
        ids.reduce((acc, id) => {
            acc[id] = { rating: 1, reviewText: '' }; // Default rating is 1 for each product
            return acc;
        }, {}),
    );

    const handleRatingChange = (id, e) => {
        setReviews({
            ...reviews,
            [id]: { ...reviews[id], rating: Number(e.target.value) }
        });
    };

    const handleReviewTextChange = (id, e) => {
        setReviews({
            ...reviews,
            [id]: { ...reviews[id], reviewText: e.target.value }
        });
    };

    const handleSubmit = async () => {
        try {
            // Iterate over both ids and orderIds arrays
            for (let i = 0; i < productDetails.ids.length; i++) {
                const productId = productDetails.ids[i];
                const orderId = productDetails.orderIds[i];

                // Create the review data for this product
                const reviewData = {
                    orderItemId: orderId, // Passing orderId as orderItemId
                    rating: reviews[productId].rating,
                    comment: reviews[productId].reviewText,
                };

                console.log("Submitting review for product ID:", productId);
                console.log("Review data:", reviewData); // Log review data

                // Make the POST request to submit the review for this product
                const response = await fetch(
                    `http://localhost:8080/api/products/${productId}/reviews`,
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
                        },
                        body: JSON.stringify(reviewData),
                    }
                );

                // If the response is not OK, log the error and stop the process
                if (!response.ok) {
                    const errorData = await response.json();
                    console.error("Error response data:", errorData);
                    throw new Error(`Failed to submit review for product ${productId}`);
                }

                const data = await response.json();
                console.log(`Review for product ${productId} submitted:`, data);
            }

            alert("Reviews submitted successfully!");
            onClose(); // Close the modal after submission
        } catch (error) {
            console.error("Error submitting reviews:", error);
            alert("Failed to submit reviews. Please try again.");
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Review Products</h2>
                <div className="modal-body">
                    {ids.map((id, index) => (
                        <div key={id}>
                            <h3>Product: {names[index]}</h3> {/* Display each product name */}
                            <div>
                                <label>Rating:</label>
                                <select value={reviews[id].rating} onChange={(e) => handleRatingChange(id, e)}>
                                    <option value={1}>⭐ 1 Star Rating</option>
                                    <option value={2}>⭐⭐ 2 Stars Rating</option>
                                    <option value={3}>⭐⭐⭐ 3 Stars Rating</option>
                                    <option value={4}>⭐⭐⭐⭐ 4 Stars Rating</option>
                                    <option value={5}>⭐⭐⭐⭐⭐ 5 Stars Rating</option>
                                </select>
                            </div>
                            <div>
                                <label>Review:</label>
                                <textarea
                                    value={reviews[id].reviewText}
                                    onChange={(e) => handleReviewTextChange(id, e)}
                                    placeholder="Write your review here..."
                                />
                            </div>
                            <hr />
                        </div>
                    ))}
                    <button onClick={handleSubmit}>Submit Reviews</button>
                    <button onClick={onClose}>Close</button>
                </div>
            </div>
        </div>
    );
};

export default ModalReview;
