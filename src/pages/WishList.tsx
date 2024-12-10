import { useState } from 'react';
import useAuthStore from '@/stores/authStore';
import { deleteSelectedWishItems } from '@/supabase';
import Title from '@/components/common/Title';
import useAccessCheck from '@/hooks/useAccessCheck';

function WishList() {
  const { profile, wishList, removeSelectWishItems } = useAuthStore();

  const [selectedBooks, setSelectedBooks] = useState<string[]>([]);

  const isAllowAccess = useAccessCheck('잘못된 접근입니다!');

  if (!isAllowAccess) return null;

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

  const handleDeleteSelected = () => {
    if (!profile) {
      alert('로그인이 필요합니다.');
      return;
    }

    deleteSelectedWishItems(
      profile.id,
      selectedBooks.map((contentId) => Number(contentId))
    ).then((isSuccess) => {
      if (isSuccess) {
        removeSelectWishItems(selectedBooks);
        setSelectedBooks([]);
        alert('선택한 항목이 삭제되었습니다.');
      } else {
        alert('삭제에 실패했습니다. 다시 시도해주세요.');
      }
    });
  };

  return (
    <div className="w-full flex justify-center">
      <div className="w-full min-h-[950px] max-w-[64rem]">
        <Title text="찜 목록" />
        <div className="flex justify-between items-center py-6 px-4 w-full">
          <div className="flex items-center gap-[1rem]">
            <input
              type="checkbox"
              checked={
                selectedBooks.length === wishList.length && wishList.length > 0
              }
              onChange={handleSelectAll}
              className="w-5 h-5 border-2 border-[#4F772D] rounded-lg accent-[#4F772D]"
            />
            <span className="text-[1rem]">찜한 도서</span>
          </div>
          <button
            type="button"
            onClick={handleDeleteSelected}
            className="bg-[#4F772D] text-white px-[1rem] py-[0.5rem] rounded">
            삭제
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[1.5rem] w-full">
          {wishList.map((book) => (
            <div
              key={book.contentId}
              className="border-[1px] border-[#4F772D] rounded-lg p-[1rem] bg-[#F1F8E9] flex items-start gap-[0.5rem]">
              <input
                type="checkbox"
                checked={selectedBooks.includes(book.contentId)}
                onChange={() => handleSelect(book.contentId)}
                className="min-w-5 min-h-5 border-2 border-[#4F772D] rounded-lg accent-[#4F772D]"
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
