import { useParams } from 'react-router-dom';
import useGetDetailData from '@/hooks/detail/useGetDetailData';
import LinkButton from '@/components/common/LinkButton';
import ReviewForm from '@/components/home/ReviewForm';
import ReviewList from '@/components/home/ReviewList';
import { useQuery } from '@tanstack/react-query';
import { addOrDeleteWishItem, getReviewsByContent } from '@/supabase';
import Swal from 'sweetalert2';
import useAuthStore from '@/stores/authStore';
import useModalStore from '@/stores/modalStore';

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

  const { profile, wishList, addWishItem, removeWishItem } = useAuthStore();
  const { setModal } = useModalStore();

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
            {!profile ? (
              <button
                className="hover:text-pink-500 text-gray-400 text-[2rem] min-w-[3rem] min-h-[3rem]"
                type="button"
                onClick={() => {
                  Swal.fire({
                    icon: 'info',
                    text: '해당 서비스는 로그인이 필요합니다!',
                  }).then(() => {
                    setModal('login');
                  });
                }}>
                ♥
              </button>
            ) : (
              <button
                className={`hover:text-pink-500 text-[2rem] min-w-[3rem] min-h-[3rem] ${
                  wishList?.find(
                    (item) => Number(item.contentId) === book.itemId
                  ) === undefined
                    ? 'text-gray-400'
                    : 'text-pink-500'
                }`}
                type="button"
                onClick={() => {
                  addOrDeleteWishItem(
                    profile.id,
                    {
                      contentId: String(book.itemId),
                      contentTitle: book.title,
                      contentAuthor: book.author,
                      contentImg: book.cover,
                    },
                    wishList
                  ).then((res) => {
                    if (res === '추가성공') {
                      addWishItem({
                        contentId: String(book.itemId),
                        contentTitle: book.title,
                        contentAuthor: book.author,
                        contentImg: book.cover,
                      });
                    } else if (res === '삭제성공') {
                      removeWishItem(String(book.itemId));
                    } else {
                      Swal.fire({
                        icon: 'error',
                        title: '찜추가 실패',
                        text: '다시 시도해 주세요',
                        showConfirmButton: false,
                        timer: 1000,
                      });
                    }
                  });
                }}>
                ♥
              </button>
            )}
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
