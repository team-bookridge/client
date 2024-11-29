import { useState } from 'react';

function BookDetail() {
  const [isLiked, setIsLiked] = useState(false);

  const toggleLike = () => {
    setIsLiked(!isLiked);
  };

  return (
    <div className="h-full p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row border-b pb-4 bg-white rounded-lg shadow-md p-4">
        <div className="sm:w-1/4 w-full mb-4 sm:mb-0">
          <div className="w-full h-60 bg-gray-300 flex items-center justify-center">
            Book Cover
          </div>
        </div>
        <div className="sm:ml-6 flex-1">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-lg sm:text-xl font-bold">Title</h1>
            <button
              type="button"
              onClick={toggleLike}
              className={`text-xl sm:text-2xl ${
                isLiked ? 'text-pink-500' : 'text-gray-500'
              }`}
              aria-label="좋아요">
              ♥
            </button>
          </div>
          <p className="text-sm sm:text-base text-gray-700">Author :</p>
          <p className="text-sm sm:text-base text-gray-700">Publisher :</p>
          <p className="text-sm sm:text-base text-gray-700">
            Publication Date :
          </p>
          <p className="text-sm sm:text-base text-gray-700">Price :</p>
        </div>
      </div>

      <div className="flex flex-wrap justify-around mt-6 border-b pb-4 gap-2">
        <button
          type="button"
          className="w-full sm:w-auto px-6 py-2 bg-gray-200 rounded">
          교보문고
        </button>
        <button
          type="button"
          className="w-full sm:w-auto px-6 py-2 bg-gray-200 rounded">
          예스 24
        </button>
        <button
          type="button"
          className="w-full sm:w-auto px-6 py-2 bg-gray-200 rounded">
          알라딘
        </button>
      </div>

      <div className="mt-6 bg-white rounded-lg shadow-md p-4">
        <h2 className="text-base sm:text-lg font-semibold mb-4">
          Book Summary
        </h2>
        <p className="text-sm sm:text-base text-gray-700">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis congue
          felis a faucibus feugiat. Phasellus dictum rutrum ligula eget
          placerat. Aenean et pharetra nibh. Nullam interdum eros massa, ac
          pharetra ex porttitor quis. Nulla eget elementum sapien, sit amet
          scelerisque sapien. Vestibulum a venenatis lacus. Praesent dictum
          turpis non suscipit bibendum.
        </p>
      </div>
    </div>
  );
}

export default BookDetail;
