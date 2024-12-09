import React, { useState } from 'react';

interface ReviewFormProps {
  onAddReview: (review: string) => void;
}

function ReviewForm({ onAddReview }: ReviewFormProps): JSX.Element {
  const [newReview, setNewReview] = useState<string>('');

  const handleReviewChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
        <input
          type="text"
          value={newReview}
          onChange={handleReviewChange}
          className="w-full p-2 border rounded"
          placeholder="리뷰를 입력하세요."
        />
        <button
          type="submit"
          className="mt-2 bg-[#C0CFB2] text-white p-2 rounded hover:bg-[#45624E] transition duration-200 mt-1.5rem">
          리뷰 남기기
        </button>
      </form>
    </div>
  );
}

export default ReviewForm;
