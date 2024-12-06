import React, { useState } from 'react';

interface ReviewFormProps {
  onAddReview: (review: string) => void;
}

function ReviewForm({ onAddReview }: ReviewFormProps): JSX.Element {
  const [newReview, setNewReview] = useState<string>('');

  const handleReviewChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewReview(e.target.value);
  };

  const handleReviewSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newReview.trim()) {
      onAddReview(newReview);
      setNewReview('');
    }
  };

  return (
    <div className="mt-6 bg-white rounded-lg shadow-md p-4">
      <h2 className="text-base sm:text-lg font-semibold mb-4">리뷰</h2>
      <form onSubmit={handleReviewSubmit}>
        <textarea
          value={newReview}
          onChange={handleReviewChange}
          className="w-full p-2 border rounded"
          rows={3}
          placeholder="욕설 및 인신공격성이 있는 리뷰도 저희는 삭제하지 않습니다."
        />
        <button
          type="submit"
          className="mt-2 bg-blue-500 text-white p-2 rounded hover:bg-pink-600 transition duration-200">
          리뷰 남기기
        </button>
      </form>
    </div>
  );
}

export default ReviewForm;
