import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import type { Dispatch, SetStateAction } from 'react';
import { TModal } from '@/types';

type MyPageProps = {
  setModal: Dispatch<SetStateAction<TModal>>;
};

type ProfileProps = {
  name: string;
  emailOrId: string;
};

type InfoButtonProps = {
  label: string;
  onClick: () => void;
};

function Profile({ name, emailOrId }: ProfileProps): JSX.Element {
  return (
    <div className="flex items-center gap-4">
      <div className="w-[6rem] h-[6rem] md:w-[8rem] md:h-[8rem] bg-[#C0CFB2] rounded-full" />
      <div>
        <p className="font-bold text-lg text-center md:text-left">{name}</p>
        <p className="text-sm text-gray-600 text-center md:text-left">
          {emailOrId}
        </p>
      </div>
    </div>
  );
}

function InfoButton({ label, onClick }: InfoButtonProps): JSX.Element {
  return (
    <button
      type="button"
      onClick={onClick}
      className="text-white bg-[#4F772D] w-[8rem] py-3 rounded hover:bg-[#3b5e23] text-center">
      {label}
    </button>
  );
}

function MyPage({ setModal }: MyPageProps): JSX.Element {
  const [wishListCount, setWishListCount] = useState<number>(0);

  useEffect(() => {
    const storedWishList = JSON.parse(localStorage.getItem('wishList') || '[]');
    setWishListCount(storedWishList.length);
  }, []);

  return (
    <div className="flex flex-col items-center min-h-[950px] w-full mx-auto gap-6">
      {/* 페이지 헤더 */}
      <h2 className="text-[1.5rem] font-bold text-[#4F772D] border-b-4 border-[#C0CFB2] py-[1rem] w-full text-left">
        마이페이지
      </h2>
      {/* 마이페이지 전체 박스 */}
      <div className="flex flex-col w-full max-w-[40rem] p-6 rounded-lg border border-[#4F772D]">
        <div className="flex flex-col md:flex-row items-center justify-between w-full gap-4">
          {/* 프로필 섹션 */}
          <Profile name="홍길동님" emailOrId="아이디(기본) or 이메일" />
          {/* 버튼 섹션 */}
          <div className="flex flex-row md:flex-col gap-2 items-center md:items-end justify-center w-full md:w-auto">
            <InfoButton
              label="닉네임 변경"
              onClick={() => setModal('setNickName')}
            />
            <InfoButton
              label="회원 탈퇴"
              onClick={() => alert('정말 탈퇴하시겠습니까?')}
            />
          </div>
        </div>
      </div>
      {/* 찜 목록 */}
      <Link
        to="/MyPage/WishList"
        className="w-full max-w-[40rem] border border-[#4F772D] p-4 rounded-lg shadow-sm hover:shadow-md transition flex flex-col items-start">
        <p className="font-bold text-lg text-left">찜 목록</p>
        <p className="text-sm text-gray-600 text-left">{wishListCount}개</p>
      </Link>
    </div>
  );
}

export default MyPage;
