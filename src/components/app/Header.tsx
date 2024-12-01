import { useState } from 'react';
import logo from '@/assets/logo.png';
import { Link, useNavigate } from 'react-router-dom';
import type { Dispatch, SetStateAction } from 'react';
import { TModal } from '@/types';

interface Props {
  setModal: Dispatch<SetStateAction<TModal>>;
}

function Header({ setModal }: Props) {
  const navigate = useNavigate();
  const [query, setQuery] = useState<string>('');
  const [activeSearchBar, setActiveSearchBar] = useState<boolean>(false);
  return (
    <div
      className="fixed top-0 flex flex-col max-w-[64rem] w-full px-[1.25rem] 
      items-center gap-[0.75rem] py-[0.5rem] border-b-2 border-[#31572c] z-10 bg-white">
      <div className="flex justify-between w-full gap-[0.5rem]">
        <button
          className="md:hidden text-[1.25rem] text-[#31572c] font-[600]"
          type="button"
          onClick={() => {
            setModal('HeaderMenu');
          }}>
          ☰
        </button>
        <div className="flex gap-[1rem]">
          <Link to="/">
            <img className="h-[3rem]" src={logo} alt="로고" />
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
              to="/EditorChoice">
              <div className="text-[1.125rem] font-[600]">편집자추천</div>
            </Link>
          </div>
        </div>
        <div className="flex gap-[1rem]">
          <button
            className="text-[1.25rem] text-[#31572c] font-[600]"
            type="button"
            onClick={() => {
              setActiveSearchBar(!activeSearchBar);
            }}>
            🔍︎
          </button>
          {/* 로그인한 상태가 아니라면 로그인 버튼이 보이고 로그인한 상태라면 유저이름을 담은 버튼이 보이게.. */}
          <button
            type="button"
            onClick={() => {
              setModal('login');
            }}>
            로그인
          </button>
        </div>
      </div>
      {activeSearchBar && (
        <div className="flex w-[17.5rem] rounded-full border-2 px-[1rem] gap-[0.5rem]">
          <span>🔍︎</span>
          <input
            className="focus:outline-none flex-grow"
            type="text"
            onChange={(e) => {
              setQuery(e.target.value);
            }}
            onKeyUp={(e) => {
              if (e.key === 'Enter') {
                if (query.trim() !== '') {
                  navigate(`/Search?query=${query}`);
                  setActiveSearchBar(false);
                  setQuery('');
                } else {
                  setQuery('');
                }
              }
            }}
            value={query}
          />
        </div>
      )}
    </div>
  );
}

export default Header;
