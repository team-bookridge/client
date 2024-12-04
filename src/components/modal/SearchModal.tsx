import useGetSearchListData from '@/hooks/search/useGetSearchListData';
import { TResponseBookItemInfo, TModal } from '@/types';
import { useEffect, useState } from 'react';
import { useDebounce } from 'use-debounce';
import { useNavigate } from 'react-router-dom';
import type { Dispatch, SetStateAction } from 'react';
import searchIcon from '@/assets/search-icon.png';

interface Props {
  setModal: Dispatch<SetStateAction<TModal>>;
}

function SearchModal({ setModal }: Props) {
  const navigate = useNavigate();

  const [query, setQuery] = useState<string>('');
  const [debouncedQuery] = useDebounce(query, 100);

  const { data, isLoading } = useGetSearchListData('search', debouncedQuery);

  useEffect(() => {
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
      searchInput.focus();
    }
  }, []);

  return (
    <div
      className="justify-self-end w-full h-[100%] overflow-y-auto max-w-[48rem] p-[1rem] bg-white z-30 
      flex flex-col justify-start gap-[1rem] animate-sliderightToLeft"
      onClick={(e) => {
        e.stopPropagation();
      }}
      aria-hidden="true">
      <div className="flex gap-[1rem]">
        <div className="flex-grow flex items-center rounded-md border-2 px-[0.5rem] gap-[0.5rem]">
          <img className="w-[1rem]" src={searchIcon} alt="검색 아이콘" />
          <input
            id="searchInput"
            className="focus:outline-none flex-grow"
            type="text"
            onChange={(e) => {
              setQuery(e.target.value);
            }}
            onKeyUp={(e) => {
              if (e.key === 'Enter') {
                navigate(`/Search?query=${query}`);
                setModal('');
              }
            }}
            value={query}
            autoComplete="off"
          />
        </div>
        <button
          className="hover:bg-[#45624E] bg-[#C0CFB2] text-[1.125rem] text-[white] font-[900] 
          rounded-[0.25rem] px-[0.75rem] py-[0.25rem]"
          type="button"
          onClick={() => setModal('')}>
          취소
        </button>
      </div>
      <div className="flex-grow flex flex-col overflow-y-auto scrollCSS">
        {!isLoading &&
          data?.item?.map((bookInfo: TResponseBookItemInfo) => (
            <div
              className="hover:bg-gray-200 flex items-center gap-[1rem] p-[0.5rem] pl-[0.25rem] cursor-pointer"
              key={bookInfo.itemId}
              onClick={() => {
                navigate(`/BookDetail/${bookInfo.itemId}`);
                setModal('');
              }}
              aria-hidden="true">
              <img
                className="max-w-[4rem]"
                src={bookInfo.cover}
                alt={bookInfo.title}
              />
              <div className="flex flex-col gap-[0.5rem]">
                <p className="text-[0.875rem] min-h-[2.625rem] line-clamp-2">
                  {bookInfo.title}
                </p>
                <p className="text-[0.875rem] min-h-[2.625rem] line-clamp-2">
                  {bookInfo.author}
                </p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default SearchModal;
