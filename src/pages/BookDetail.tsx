import { useParams } from 'react-router-dom';
import { useState } from 'react';
import useGetDetailData from '@/hooks/detail/useGetDetailData';
import LinkButton from '@/components/common/LinkButton';
import ReviewForm from '@/components/home/ReviewForm';
import ReviewList from '@/components/home/ReviewList';
import { useQuery } from '@tanstack/react-query';
import { getReviewsByContent } from '@/supabase';

function BookDetail() {
  const { itemId } = useParams<{ itemId: string }>();

  const validItemId = itemId || '';

  const { data, isLoading, error } = useGetDetailData(
    'bookDetail',
    validItemId
  );

  const { data: reviewsData, refetch } = useQuery({
    queryKey: [`reviews-${itemId}`],
    queryFn: () => getReviewsByContent(itemId as string),
    // refetchInterval: 30000, // 서버 비용이 많이 붙을수 있으
  });

  const [isLiked, setIsliked] = useState(false);

  const toggleLike = () => {
    setIsliked(!isLiked);
  };

  if (!itemId) {
    return <div>Invalid item ID</div>;
  }

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
        {/* 이미지 섹션 */}
        <div className="w-full sm:w-[200px] sm:h-[300px] mb-4 sm:mb-0">
          <div className="relative w-full h-[300px] sm:h-[300px] bg-white rounded-lg overflow-hidden">
            {cover ? (
              <img
                src={cover}
                alt={title}
                className="absolute top-0 left-0 w-full h-full object-contain"
              />
            ) : (
              <span className="text-center text-gray-500">
                No Cover Available
              </span>
            )}
          </div>
        </div>
        {/* 텍스트 섹션 */}
        <div className="sm:ml-6 flex-1">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-lg sm:text-xl font-bold">{title}</h1>
            <button
              type="button"
              onClick={toggleLike}
              className={`text-xl sm:text-2xl ${
                isLiked ? 'text-pink-500' : 'text-gray-400'
              }`}
              aria-label="찜버튼">
              ♥
            </button>
          </div>
          <p className="text-sm sm:text-base text-gray-700">저자 : {author}</p>
          <p className="text-sm sm:text-base text-gray-700">
            출판사 : {publisher}
          </p>
          <p className="text-sm sm:text-base text-gray-700">
            출판일 : {pubDate}
          </p>
          <p className="text-sm sm:text-base text-gray-700">
            가격 : {priceStandard}
          </p>
        </div>
      </div>
      <div className="flex flex-wrap justify-center mt-6 border-b pb-4 gap-2">
        <LinkButton bookInfo={book} siteName="알라딘" />
        <LinkButton bookInfo={book} siteName="교보문고" />
        <LinkButton bookInfo={book} siteName="예스24" />
      </div>

      <div className="mt-6 bg-white rounded-lg shadow-md p-4">
        <h2 className="text-base sm:text-lg font-semibold mb-4">설명</h2>
        <p className="text-sm sm:text-base text-gray-700">{description}</p>
      </div>
      <ReviewForm refetch={refetch} />
      <ReviewList data={reviewsData} />
    </div>
  );
}

export default BookDetail;
