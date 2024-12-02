import { useParams } from 'react-router-dom';
import useGetDetailData from '@/hooks/detail/useGetDetailData';

function BookDetail() {
  const { itemId } = useParams<{ itemId: string }>();
  const { data, isLoading, error } = useGetDetailData('bookDetail', itemId);

  console.log('Route Param ItemId:', itemId);
  console.log('Fetched Data:', data);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error || !data) {
    return <div>Error occurred while fetching book details.</div>;
  }

  if (data.errorCode) {
    return <div>{data.errorMessage || 'Invalid item ID'}</div>;
  }

  const book = Array.isArray(data.item) ? data.item[0] : data.item;

  if (!book) {
    return <div>No book details available.</div>;
  }

  const {
    title = 'Unknown Title',
    author = 'Unknown Author',
    publisher = 'Unknown Publisher',
    pubDate = 'Unknown Date',
    priceStandard = 'Unknown Price',
    cover = '',
    description = 'No description available',
  } = book;

  return (
    <div className="h-full p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row border-b pb-4 bg-white rounded-lg shadow-md p-4">
        <div className="sm:w-1/4 w-full mb-4 sm:mb-0">
          <div className="w-full h-60 bg-gray-300 flex items-center justify-center">
            {cover ? (
              <img
                src={cover}
                alt={title}
                className="w-full h-full object-cover"
              />
            ) : (
              <span>No Cover Available</span>
            )}
          </div>
        </div>
        <div className="sm:ml-6 flex-1">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-lg sm:text-xl font-bold">{title}</h1>
          </div>
          <p className="text-sm sm:text-base text-gray-700">Author: {author}</p>
          <p className="text-sm sm:text-base text-gray-700">
            Publisher: {publisher}
          </p>
          <p className="text-sm sm:text-base text-gray-700">
            Publication Date: {pubDate}
          </p>
          <p className="text-sm sm:text-base text-gray-700">
            Price: {priceStandard}
          </p>
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
        <p className="text-sm sm:text-base text-gray-700">{description}</p>
      </div>
    </div>
  );
}

export default BookDetail;
