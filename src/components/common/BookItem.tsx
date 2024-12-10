/* eslint-disable no-nested-ternary */
/* eslint-disable no-alert */
import useAuthStore from '@/stores/authStore';
import useModalStore from '@/stores/modalStore';
import { addOrDeleteWishItem } from '@/supabase';
import { TResponseBookItemInfo } from '@/types';
import escapeHTML from '@/utils/escapeHTML';
import LinkButton from '@components/common/LinkButton';
import { Link } from 'react-router-dom';

interface Props {
  bookInfo: TResponseBookItemInfo;
}

function BookItem({ bookInfo }: Props) {
  const { profile, wishList, addWishItem, removeWishItem } = useAuthStore();

  const { setModal } = useModalStore();

  return (
    <div className="flex flex-col gap-[1.5rem] px-[0.5rem] py-[1rem] w-[100%] mt-6 bg-white rounded-lg shadow-md p-4">
      <div className="flex gap-[1rem]">
        <div className="min-w-[9rem] max-w-[9rem]">
          <Link to={`/BookDetail/${bookInfo.itemId}`}>
            <img
              className="w-[100%]"
              src={bookInfo.cover}
              alt={bookInfo.title}
            />
          </Link>
        </div>
        <div className="flex flex-col gap-[0.25rem] flex-grow max-h-[19.5]">
          <div className="min-h-[3rem] pb-[0.25rem] flex justify-between">
            <Link
              className="hover:underline text-start line-clamp-2 font-[900]"
              to={`/BookDetail/${bookInfo.itemId}`}>
              {bookInfo.title}
            </Link>
            {!profile ? (
              <button
                className="hover:text-pink-500 text-gray-400 text-[2rem] min-w-[3rem] min-h-[3rem]"
                type="button"
                onClick={() => {
                  alert('찜 기능은 로그인을 하셔야 합니다!');
                  setModal('login');
                }}>
                ♥
              </button>
            ) : (
              <button
                className={`hover:text-pink-500 text-[2rem] min-w-[3rem] min-h-[3rem] ${
                  wishList?.find(
                    (item) => Number(item.contentId) === bookInfo.itemId
                  ) === undefined
                    ? 'text-gray-400'
                    : 'text-pink-500'
                }`}
                type="button"
                onClick={() => {
                  addOrDeleteWishItem(
                    profile.id,
                    {
                      contentId: String(bookInfo.itemId),
                      contentTitle: bookInfo.title,
                      contentAuthor: bookInfo.author,
                      contentImg: bookInfo.cover,
                    },
                    wishList
                  ).then((res) => {
                    if (res === '추가성공') {
                      addWishItem({
                        contentId: String(bookInfo.itemId),
                        contentTitle: bookInfo.title,
                        contentAuthor: bookInfo.author,
                        contentImg: bookInfo.cover,
                      });
                    } else if (res === '삭제성공') {
                      removeWishItem(String(bookInfo.itemId));
                    } else {
                      alert('실패하였습니다. 다시 시도해 주세요');
                    }
                  });
                }}>
                ♥
              </button>
            )}
          </div>
          <p className="line-clamp-1 text-gray-700">{bookInfo.author}</p>
          <p className="line-clamp-1 text-gray-700">
            {bookInfo.publisher} (출판사)
          </p>
          <p className="text-gray-700">{bookInfo.pubDate}</p>
          <p className="text-gray-700">{bookInfo.priceStandard}원</p>
          <p className="md:-webkit-box hidden w-[100%] md:line-clamp-3 max-h-[4.5rem] text-gray-700">
            {bookInfo.description && escapeHTML(bookInfo.description)}
          </p>
        </div>
      </div>
      <div className="w535px:justify-start w535px:ml-[10rem] flex justify-center gap-[1.5rem]">
        <LinkButton bookInfo={bookInfo} siteName="알라딘" />
        <LinkButton bookInfo={bookInfo} siteName="교보문고" />
        <LinkButton bookInfo={bookInfo} siteName="예스24" />
      </div>
    </div>
  );
}

export default BookItem;
