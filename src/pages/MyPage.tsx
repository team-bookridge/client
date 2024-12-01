import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import type { Dispatch, SetStateAction } from 'react';
import { TModal } from '@/types';

interface MyPageProps {
  setModal: Dispatch<SetStateAction<TModal>>;
}

function MyPage({ setModal }: MyPageProps): JSX.Element {
  const [wishListCount, setWishListCount] = useState<number>(0);

  useEffect(() => {
    const storedWishList = JSON.parse(localStorage.getItem('wishList') || '[]');
    setWishListCount(storedWishList.length);
  }, []);

  return (
    <div className="flex flex-col max-w-[64rem] w-full mx-auto gap-6 px-[1.25rem] pt-[1.5rem]">
      {' '}
      {/* 페이지 헤더 */}
      <h2 className="text-2xl font-bold text-[#4F772D] border-b-4 border-[#C0CFB2] pb-2">
        마이페이지
      </h2>
      {/* 마이페이지 전체 박스 */}
      <div className="flex flex-col w-full p-6 rounded-lg border border-[#4F772D]">
        <div className="flex flex-col md:flex-row items-center md:items-center justify-between w-full gap-4">
          <div className="flex items-center gap-4">
            <div className="w-[6rem] h-[6rem] md:w-[8rem] md:h-[8rem] bg-[#C0CFB2] rounded-full" />
            <div>
              <p className="font-bold text-lg">홍길동님</p>
              <p className="text-sm text-gray-600">아이디(기본) or 이메일</p>
            </div>
          </div>
          <div className="flex flex-row gap-2 items-center justify-center mt-8 md:mt-0 md:flex-col md:items-end md:justify-center w-full md:w-[8rem]">
            <button
              type="button"
              onClick={() => setModal('setNickName')}
              className="text-white bg-[#4F772D] w-[8rem] py-3 rounded hover:bg-[#3b5e23] text-center">
              닉네임 변경
            </button>
            <button
              type="button"
              className="text-white bg-[#4F772D] w-[8rem] py-3 rounded hover:bg-[#3b5e23] text-center">
              회원 탈퇴
            </button>
          </div>
        </div>
      </div>
      {/* 찜 목록 */}
      <Link
        to="/MyPage/WishList"
        className="w-full border border-[#4F772D] p-4 rounded-lg shadow-sm hover:shadow-md transition flex flex-col items-start">
        <p className="font-bold text-lg text-left">찜 목록</p>
        <p className="text-sm text-gray-600 text-left">{wishListCount}개</p>
      </Link>
    </div>
  );
}

export default MyPage;
