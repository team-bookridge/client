import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SetNickNameModal from '@components/modal/SetNickNameModal';

function MyPage(): JSX.Element {
  const [nickname, setNickname] = useState<string>('홍길동님');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [wishListCount, setWishListCount] = useState<number>(0);

  useEffect(() => {
    // localStorage에서 찜 목록 개수 가져오기
    const storedWishList = JSON.parse(localStorage.getItem('wishList') || '[]');
    setWishListCount(storedWishList.length);
  }, []);

  return (
    <div className="h-[1000px] p-4 flex flex-col items-center">
      {/* 닉네임 변경 모달 */}
      {isModalOpen && (
        <SetNickNameModal
          nickname={nickname}
          setNickname={setNickname}
          onClose={() => setIsModalOpen(false)}
        />
      )}

      {/* 마이페이지 전체 박스 */}
      <div className="flex flex-col w-full md:w-[48rem] h-[22rem] bg-gray-200 p-6 rounded-lg justify-center">
        <div className="flex flex-col md:flex-row items-center md:items-center justify-between w-full gap-4">
          <div className="flex items-center gap-4">
            <div className="w-[6rem] h-[6rem] md:w-[8rem] md:h-[8rem] bg-gray-400 rounded-full" />
            <div>
              <p className="font-bold text-lg">{nickname}</p>
              <p className="text-sm text-gray-600">아이디(기본) or 이메일</p>
            </div>
          </div>
          <div className="flex flex-row gap-2 items-center justify-center mt-8 md:mt-0 md:flex-col md:items-end md:justify-center w-full md:w-[8rem]">
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="border border-gray-500 text-white bg-gray-600 w-[8rem] py-3 rounded hover:bg-gray-700 text-center">
              닉네임 변경
            </button>
            <button
              type="button"
              className="border border-gray-500 text-white bg-gray-600 w-[8rem] py-3 rounded hover:bg-gray-700 text-center">
              회원 탈퇴
            </button>
          </div>
        </div>
      </div>

      {/* 찜 목록 */}
      <Link
        to="/MyPage/WishList"
        className="w-full md:w-[48rem] mt-8 bg-gray-100 p-4 rounded-lg flex flex-col items-start">
        <p className="font-bold text-lg text-left">찜 목록</p>
        <p className="text-sm text-gray-600 text-left">{wishListCount}개</p>
      </Link>
    </div>
  );
}

export default MyPage;
