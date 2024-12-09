import { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import useInfiniteGetSearchListData from '@/hooks/search/useInfiniteGetSearchListData';
import LinkButton from '@/components/common/LinkButton';
import { useInView } from 'react-intersection-observer';
import type { TResponseBookItemInfo } from '@/types';

function Search() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const navigate = useNavigate();

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error,
  } = useInfiniteGetSearchListData('search', query);

  const { ref, inView } = useInView({
    threshold: 1.0,
  });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  // 전체 검색 결과 개수 계산
  const totalResults =
    data?.pages.reduce((acc, page) => acc + (page.item?.length || 0), 0) || 0;

  if (!query) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <p>검색어를 입력해주세요.</p>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col bg-white">
      <div className="p-4 border-b">
        <h2 className="text-xl font-semibold">
          &apos;{query}&apos;에 대한 {totalResults.toLocaleString()}개의 검색
          결과
        </h2>
      </div>

      <div className="flex-grow flex flex-col p-4 overflow-y-auto scrollCSS">
        {isLoading && <p>로딩 중...</p>}
        {isError && <p>{(error as Error).message}</p>}
        {!isLoading && totalResults === 0 && (
          <p>검색 결과가 없습니다. 다른 검색어를 입력해주세요.</p>
        )}
        {data?.pages?.map((page) =>
          page.item?.map((bookInfo: TResponseBookItemInfo) => (
            <div
              className="flex gap-4 p-4 border-b items-center justify-between"
              key={bookInfo.itemId}
              onClick={() => navigate(`/BookDetail/${bookInfo.itemId}`)}
              aria-hidden="true">
              <div className="flex gap-4 items-start flex-grow overflow-hidden">
                <img
                  className="w-24 h-32 object-cover border"
                  src={bookInfo.cover}
                  alt={bookInfo.title}
                />
                <div className="flex flex-col overflow-hidden">
                  <h3 className="text-lg font-semibold truncate">
                    {bookInfo.title}
                  </h3>
                  <p className="text-sm text-gray-500 truncate">
                    {bookInfo.author}, {bookInfo.publisher}
                  </p>
                  <p className="text-sm text-gray-500">{bookInfo.pubDate}</p>
                  <p className="text-sm font-semibold">
                    {bookInfo.priceSales.toLocaleString()}원
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-2 items-center flex-none w-[120px]">
                <div className="w-full">
                  <LinkButton bookInfo={bookInfo} siteName="교보문고" />
                </div>
                <div className="w-full">
                  <LinkButton bookInfo={bookInfo} siteName="예스24" />
                </div>
                <div className="w-full">
                  <LinkButton bookInfo={bookInfo} siteName="알라딘" />
                </div>
              </div>
            </div>
          ))
        )}
        {isFetchingNextPage && <p>더 불러오는 중...</p>}
        {hasNextPage && (
          <div
            ref={ref}
            className="w-full h-8 flex items-center justify-center">
            <p>더 불러오는 중...</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Search;
