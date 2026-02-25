function ReviewPage() {
  const reviews = [
    { id: 1, user: "Alice", rating: 5, comment: "Excellent service!" },
    { id: 2, user: "Bob", rating: 4, comment: "Very good, loved it." },
    { id: 3, user: "Charlie", rating: 3, comment: "It was okay." },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Reviews</h2>
      <div className="grid gap-4">
        {reviews.map((review) => (
          <div key={review.id} className="bg-white rounded-xl shadow p-5">
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold text-gray-700">{review.user}</span>
              <span className="text-yellow-500">{"★".repeat(review.rating)}{"☆".repeat(5 - review.rating)}</span>
            </div>
            <p className="text-gray-500 text-sm">{review.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ReviewPage;