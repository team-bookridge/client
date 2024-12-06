import { useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import useInfiniteGetSearchListData from '@/hooks/search/useInfiniteGetSearchListData';
import LinkButton from '@/components/common/LinkButton'; // LinkButton 컴포넌트 import
import type { TResponseBookItemInfo } from '@/types';

function Search() {
  const [searchParams] = useSearchParams(); // URL의 쿼리 파라미터 사용
  const query = searchParams.get('query') || ''; // 검색어 가져오기

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error,
  } = useInfiniteGetSearchListData('search', query);

  const handleScroll = useCallback(() => {
    if (
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 100 &&
      hasNextPage &&
      !isFetchingNextPage
    ) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  if (!query) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <p>검색어를 입력해주세요.</p>
      </div>
    );
  }

  const totalResults = data?.pages[0]?.totalResults || 0;

  return (
    <div className="w-full h-full flex flex-col bg-white">
      {/* 검색 결과 헤더 */}
      <div className="p-4 border-b">
        <h2 className="text-xl font-semibold">
          &apos;{query}&apos;에 대한 {totalResults.toLocaleString()}개의 검색
          결과
        </h2>
      </div>

      {/* 검색 결과 */}
      <div className="flex-grow flex flex-col p-4 overflow-y-auto scrollCSS">
        {isLoading && <p>로딩 중...</p>}
        {isError && <p>{(error as Error).message}</p>}
        {!isLoading && totalResults === 0 && (
          <p>검색 결과가 없습니다. 다른 검색어를 입력해주세요.</p>
        )}
        {data?.pages?.map((page) =>
          page.item?.map((bookInfo: TResponseBookItemInfo) => (
            <div
              className="flex gap-4 p-4 border-b items-center"
              key={bookInfo.itemId}>
              {/* 책 표지 */}
              <img
                className="w-24 h-32 object-cover border"
                src={bookInfo.cover}
                alt={bookInfo.title}
              />

              {/* 책 정보 */}
              <div className="flex flex-col flex-grow">
                <h3 className="text-lg font-semibold">{bookInfo.title}</h3>
                <p className="text-sm text-gray-500">
                  {bookInfo.author}, {bookInfo.publisher}
                </p>
                <p className="text-sm text-gray-500">{bookInfo.pubDate}</p>
                <p className="text-sm font-semibold">
                  {bookInfo.priceSales.toLocaleString()}원
                </p>
              </div>

              {/* 링크 버튼 */}
              <div className="flex flex-col gap-2 items-end">
                <LinkButton bookInfo={bookInfo} siteName="교보문고" />
                <LinkButton bookInfo={bookInfo} siteName="예스24" />
                <LinkButton bookInfo={bookInfo} siteName="알라딘" />
              </div>
            </div>
          ))
        )}
        {isFetchingNextPage && <p>더 불러오는 중...</p>}
      </div>
    </div>
  );
}

export default Search;
