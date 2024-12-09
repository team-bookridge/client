import useAccessCheck from '@/hooks/useAccessCheck';
import useAuthStore from '@/stores/authStore';
import useModalStore from '@/stores/modalStore';
import { deleteUserData } from '@/supabase';
import scrollToTop from '@/utils/scrollToTop';
import { Link } from 'react-router-dom';
import Title from '@/components/common/Title';

function MyPage() {
  scrollToTop();

  const { setModal } = useModalStore();
  const { profile, wishList } = useAuthStore();

  const isAllowAccess = useAccessCheck('잘못된 접근입니다!');

  if (!isAllowAccess) return null;

  return (
    <>
      <Title text="마이페이지" />
      <div className="flex flex-col items-center min-h-[950px] gap-6 pt-[3rem]">
        <div className="flex flex-col w-full max-w-[40rem] p-6 rounded-lg border border-[#4F772D]">
          <div className="flex flex-col md:flex-row items-center justify-between w-full gap-4">
            <div className="flex items-center gap-4">
              <img
                className="w-[6rem] h-[6rem] md:w-[8rem] md:h-[8rem] rounded-full"
                src={profile?.avatar_url}
                alt="유저 프로필 이미지"
              />
              <div>
                <p className="font-bold text-lg text-center md:text-left">
                  {profile?.nickname}
                </p>
                <p className="text-sm text-gray-600 text-center md:text-left">
                  {profile?.email}
                </p>
              </div>
            </div>
            <div className="flex flex-row md:flex-col gap-2 items-center md:items-end justify-center w-full md:w-auto">
              <button
                type="button"
                onClick={() => setModal('setNickName')}
                className="text-white bg-[#4F772D] w-[8rem] py-3 rounded hover:bg-[#3b5e23] text-center">
                닉네임 변경
              </button>
              <button
                type="button"
                onClick={() => {
                  if (profile) deleteUserData(profile.id);
                }}
                className="text-white bg-[#4F772D] w-[8rem] py-3 rounded hover:bg-[#3b5e23] text-center">
                회원 탈퇴
              </button>
            </div>
          </div>
        </div>
        <Link
          to="/MyPage/WishList"
          className="w-full max-w-[40rem] border border-[#4F772D] p-4 rounded-lg shadow-sm hover:shadow-md transition flex flex-col items-start">
          <p className="font-bold text-lg text-left">찜 목록</p>
          <p className="text-sm text-gray-600 text-left">{wishList.length}개</p>
        </Link>
      </div>
    </>
  );
}

export default MyPage;
