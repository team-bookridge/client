import React, { useState } from 'react';

type MyPageProps = Record<string, never>;

const MyPage: React.FC<MyPageProps> = function MyPage() {
  const [nickname, setNickname] = useState<string>('홍길동님');
  const [isEditingNickname, setIsEditingNickname] = useState<boolean>(false);
  const [newNickname, setNewNickname] = useState<string>('');

  return (
    <div className="h-[1000px] p-4 flex flex-col items-center">
      {/* 마이페이지 전체 박스 */}
      <div className="flex flex-col w-full md:w-[48rem] h-[22rem] bg-gray-200 p-6 rounded-lg justify-center">
        <div className="flex flex-col md:flex-row items-center md:items-center justify-between w-full gap-4">
          <div className="flex items-center gap-4">
            {/* 프로필 이미지 */}
            <div className="w-[6rem] h-[6rem] md:w-[8rem] md:h-[8rem] bg-gray-400 rounded-full" />
            <div>
              {/* 닉네임 수정 모드 여부에 따라 다른 UI 표시 */}
              {isEditingNickname ? (
                <input
                  type="text"
                  value={newNickname}
                  onChange={(e) => setNewNickname(e.target.value)}
                  className="border rounded p-1 w-full md:w-auto"
                />
              ) : (
                <p className="font-bold text-lg">{nickname}</p>
              )}
              {/* 사용자 아이디 또는 이메일 표시 */}
              <p className="text-sm text-gray-600">
                아이디(기본) or 이메일(소셜로그인시)
              </p>
            </div>
          </div>
          <div className="flex flex-row gap-2 items-center justify-center mt-8 md:mt-0 md:flex-col md:items-end md:justify-center w-full md:w-[8rem]">
            {/* 닉네임 수정 모드에 따라 다른 버튼 표시 */}
            {isEditingNickname ? (
              <button
                type="button"
                onClick={() => {
                  setNickname(newNickname);
                  setIsEditingNickname(false);
                }}
                className="border border-gray-500 text-white bg-gray-600 w-[8rem] py-3 rounded hover:bg-gray-700 text-center">
                저장
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setIsEditingNickname(true)}
                className="border border-gray-500 text-white bg-gray-600 w-[8rem] py-3 rounded hover:bg-gray-700 text-center">
                닉네임 변경
              </button>
            )}
            {/* 회원 탈퇴 버튼 */}
            <button
              type="button"
              className="border border-gray-500 text-white bg-gray-600 w-[8rem] py-3 rounded hover:bg-gray-700 text-center">
              회원 탈퇴
            </button>
          </div>
        </div>
      </div>
      {/* 찜 목록 박스 */}
      <div className="w-full md:w-[48rem] mt-8 bg-gray-100 p-4 rounded-lg">
        <p className="font-bold text-lg">찜 목록</p>
        <p className="text-sm text-gray-600">3개</p>
      </div>
    </div>
  );
};

export default MyPage;
