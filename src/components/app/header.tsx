import { useState } from 'react';
import { Link } from 'react-router-dom';

function Header() {
  const [activeSearchBar, setActiveSearchBar] = useState<boolean>(false);
  // const [activeHamburgerBar, setActiveHamburgerBar] = useState<boolean>(false);
  return (
    <div
      className="fixed top-0 flex flex-col max-w-[1024px] w-full px-[1.25rem] 
      items-center gap-[0.75rem] py-[0.5rem] border-b-2 z-10 bg-white">
      <div className="flex justify-between w-full gap-[0.5rem]">
        <button className="md:hidden" type="button">
          ☰
        </button>
        <div className="flex gap-[1rem]">
          <Link to="/">LOGO</Link>
          <div className="hidden gap-[0.5rem] md:flex">
            <Link to="/BestSeller">베스트셀러</Link>
            <Link to="/NewBook">신간도서</Link>
            <Link to="/EditorChoice">편집자추천</Link>
          </div>
        </div>
        <div className="flex gap-[1rem]">
          <button
            type="button"
            onClick={() => {
              setActiveSearchBar(!activeSearchBar);
            }}>
            🔍︎
          </button>
          <button type="button">로그인</button>
        </div>
      </div>
      {activeSearchBar && (
        <div className="flex w-[17.5rem] rounded-full border px-[1rem] gap-[0.5rem]">
          <span>🔍︎</span>
          <input className="flex-grow before:content-['🔍︎']" type="text" />
        </div>
      )}
    </div>
  );
}

export default Header;
