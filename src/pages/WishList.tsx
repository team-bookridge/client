import { useState } from 'react';
import useAuthStore from '@/stores/authStore';
import { deleteSelectedWishItems } from '@/supabase';
import Title from '@/components/common/Title';

function WishList(): JSX.Element {
  const { profile, wishList, removeWishItem } = useAuthStore();
  const [selectedBooks, setSelectedBooks] = useState<string[]>([]);

  const handleSelect = (contentId: string) => {
    setSelectedBooks((prev) =>
      prev.includes(contentId)
        ? prev.filter((id) => id !== contentId)
        : [...prev, contentId]
    );
  };

  const handleSelectAll = () => {
    if (selectedBooks.length === wishList.length) {
      setSelectedBooks([]);
    } else {
      setSelectedBooks(wishList.map((book) => book.contentId));
    }
  };

  const handleDeleteSelected = async () => {
    if (!profile) {
      alert('로그인이 필요합니다.');
      return;
    }

    const success = await deleteSelectedWishItems(
      profile.id,
      selectedBooks.map((contentId) => Number(contentId))
    );

    if (success) {
      selectedBooks.forEach((contentId) => removeWishItem(contentId));
      setSelectedBooks([]);
      alert('선택한 항목이 삭제되었습니다.');
    } else {
      alert('삭제에 실패했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <div className="w-full flex justify-center">
      <div className="w-full min-h-[950px] max-w-[64rem]">
        {/* 헤더 */}
        <Title text="찜 목록" />
        {/* 전체 선택 및 삭제 버튼 */}
        <div className="flex items-center pt-6 pb-4 mb-[1rem] w-full">
          <input
            type="checkbox"
            checked={
              selectedBooks.length === wishList.length && wishList.length > 0
            }
            onChange={handleSelectAll}
            className="w-5 h-5 border-2 border-[#4F772D] rounded-lg accent-[#4F772D]"
          />
          <span className="ml-[1rem] text-[1rem]">찜한 도서</span>
          <button
            type="button"
            onClick={handleDeleteSelected}
            className="ml-auto bg-[#4F772D] text-white px-[1rem] py-[0.5rem] rounded">
            삭제
          </button>
        </div>
        {/* 책 리스트 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[1.5rem]">
          {wishList.map((book) => (
            <div
              key={book.contentId}
              className="border-[1px] border-[#4F772D] rounded-lg p-[1rem] bg-[#F1F8E9] flex items-start gap-[0.5rem]">
              <input
                type="checkbox"
                checked={selectedBooks.includes(book.contentId)}
                onChange={() => handleSelect(book.contentId)}
                className="w-5 h-5 border-2 border-[#4F772D] rounded-lg accent-[#4F772D]"
              />
              <div className="flex-shrink-0 w-[4rem] h-[6rem] bg-gray-300">
                <img
                  src={book.contentImg}
                  alt={book.contentTitle}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-grow">
                <p className="font-bold text-[1rem]">{book.contentTitle}</p>
                <p className="text-[0.875rem] text-gray-600">
                  {book.contentAuthor}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default WishList;
