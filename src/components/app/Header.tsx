import searchIcon from '@/assets/search-icon.png';
import logoIcon from '@/assets/logo-icon.png';
import { Link } from 'react-router-dom';
import useModalStore from '@/stores/modalStore';
import useAuthStore from '@/stores/authStore';
import { useState } from 'react';
import UserMenu from '@components/UserMenu';

function Header() {
  const [isActiveUserMenu, setIsActiveUserMenu] = useState<boolean>(false);
  const { setModal } = useModalStore((state) => state);
  const { profile } = useAuthStore((state) => state);
  return (
    <div
      className="fixed top-0 flex flex-col max-w-[64rem] w-full px-[1.25rem] 
      items-center gap-[0.75rem] py-[0.5rem] border-b-2 border-[#31572c] z-10 bg-white">
      <div className="flex justify-between w-full gap-[0.5rem]">
        <button
          className="md:hidden text-[1.25rem] text-[#31572c] font-[600]"
          type="button"
          onClick={() => {
            setModal('headerMenu');
          }}>
          ☰
        </button>
        <div className="flex gap-[1rem]">
          <Link to="/">
            <img className="h-[1.875rem]" src={logoIcon} alt="로고" />
          </Link>
          <div className="hidden gap-[0.5rem] md:flex">
            <Link
              className="flex items-center hover:text-[#809671] text-[#31572c]"
              to="/BestSeller">
              <div className="text-[1.125rem] font-[600]">베스트셀러</div>
            </Link>
            <Link
              className="flex items-center hover:text-[#809671] text-[#31572c]"
              to="/NewBook">
              <div className="text-[1.125rem] font-[600]">신간도서</div>
            </Link>
            <Link
              className="flex items-center hover:text-[#809671] text-[#31572c]"
              to="/EditorChoice/170">
              <div className="text-[1.125rem] font-[600]">편집자추천</div>
            </Link>
          </div>
        </div>
        <div className="flex gap-[1rem]">
          <button
            className="text-[1.25rem] text-[#31572c] font-[600]"
            type="button"
            onClick={() => {
              setModal('search');
            }}>
            <img className="w-[1rem]" src={searchIcon} alt="검색 아이콘" />
          </button>
          {profile ? (
            <button
              type="button"
              onClick={() => {
                setIsActiveUserMenu(!isActiveUserMenu);
              }}>
              <img
                className="w-[1.875rem] h-[1.875rem] rounded-full"
                src={profile.avatar_url}
                alt="유저 이미지"
              />
            </button>
          ) : (
            <button
              className="font-[900]"
              type="button"
              onClick={() => {
                setModal('login');
              }}>
              로그인
            </button>
          )}
        </div>
      </div>
      {isActiveUserMenu && (
        <UserMenu setIsActiveUserMenu={setIsActiveUserMenu} />
      )}
    </div>
  );
}

export default Header;
