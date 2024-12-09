interface Review {
  id: string;
  text: string;
}

interface ReviewListProps {
  reviews: Review[];
  onDeleteReview: (id: string) => void;
}

function ReviewList({ reviews, onDeleteReview }: ReviewListProps): JSX.Element {
  return (
    <div className="mt-6 bg-white rounded-lg shadow-md p-4">
      <h2 className="text-base sm:text-lg font-semibold mb-4">리뷰</h2>
      {reviews.length === 0 ? (
        <p>작성된 리뷰가 없습니다.</p>
      ) : (
        reviews.map((review) => (
          <div
            key={review.id}
            className="border-b py-2 flex justify-between items-center">
            <p className="text-sm sm:text-base text-gray-700">{review.text}</p>
            <button
              type="button"
              onClick={() => onDeleteReview(review.id)}
              className="text-red-500 ml-4 hover:underline">
              삭제
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default ReviewList;
