import { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import useInfiniteGetSearchListData from '@/hooks/search/useInfiniteGetSearchListData';
import LinkButton from '@/components/common/LinkButton';
import { useInView } from 'react-intersection-observer';
import type { TResponseBookItemInfo } from '@/types';
import LoadingSpiner from '@components/common/LoadingSpiner';
import { useQueryClient } from '@tanstack/react-query';
import scrollToTop from '@/utils/scrollToTop';

function Search() {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const navigate = useNavigate();

  useEffect(() => {
    queryClient.removeQueries({
      queryKey: ['search', query],
    });
    scrollToTop();
  }, [query]);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteGetSearchListData('search', query);

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView]);

  if (isLoading) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <LoadingSpiner />
      </div>
    );
  }

  if (data && data?.pages[0].totalResults === 0) {
    return (
      <div className="w-full h-screen flex flex-col justify-center items-center">
        <p className="text-[1.5rem] text-center">
          &apos;{query}&apos;에 대한 검색 결과가 없습니다. 다른 검색어를
          입력해주세요.
        </p>
      </div>
    );
  }

  if (data && data?.pages[0].totalResults !== 0) {
    return (
      <div className="w-full h-full flex flex-col bg-white">
        <div className="p-4 border-b">
          <h2 className="text-xl font-semibold">
            &apos;{query}&apos;에 대한 검색 결과
          </h2>
        </div>
        <div className="flex-grow flex flex-col p-4">
          {isLoading ? (
            <div className="flex-grow flex justify-center items-center">
              <LoadingSpiner />
            </div>
          ) : (
            data?.pages.map((page) =>
              page.item.map((bookInfo: TResponseBookItemInfo) => (
                <div
                  className="flex gap-4 p-4 w590px:flex-row flex-col border-b items-center justify-between"
                  key={bookInfo.itemId}
                  onClick={() => navigate(`/BookDetail/${bookInfo.itemId}`)}
                  aria-hidden="true">
                  <div className="flex gap-4 items-start overflow-hidden">
                    <img
                      className="w-24 h-32 object-cover border"
                      src={bookInfo.cover}
                      alt={bookInfo.title}
                    />
                    <div className="flex flex-col">
                      <h3 className="text-lg font-semibold line-clamp-2">
                        {bookInfo.title}
                      </h3>
                      <p className="text-sm text-gray-500 line-clamp-1">
                        {bookInfo.author}, {bookInfo.publisher}
                      </p>
                      <p className="text-sm text-gray-500">
                        {bookInfo.pubDate}
                      </p>
                      <p className="text-sm font-semibold">
                        {bookInfo.priceStandard.toLocaleString()}원
                      </p>
                    </div>
                  </div>
                  <div className="flex w590px:flex-col flex-row gap-2 w590px:justify-between justify-center items-center">
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
            )
          )}
          {!isLoading && hasNextPage && !isFetchingNextPage && (
            <div
              ref={ref}
              className="w-full h-8 flex items-center justify-center">
              <LoadingSpiner />
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default Search;
