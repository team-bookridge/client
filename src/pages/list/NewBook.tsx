import useInfiniteGetListData from '@/hooks/list/useInfiniteGetListData';
import { TResponseBookItemInfo } from '@/types';
import BookItem from '@components/common/BookItem';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import scrollToTop from '@/utils/scrollToTop';
import useResetCashe from '@/hooks/useResetCashe';
import LoadingSpiner from '@components/common/LoadingSpiner';
import Footer from '@components/app/Footer';

function NewBook() {
  useEffect(() => {
    scrollToTop();
  }, []);

  const queryKey = 'newBook';

  useResetCashe(queryKey);

  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteGetListData(queryKey, 'ItemNewSpecial');

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  return (
    <>
      <div className="min-h-full flex flex-col">
        <h2 className="text-[1.5rem] py-[1rem] text-[#4F772D;] border-b-4 border-[#C0CFB2] font-[900]">
          신간도서
        </h2>
        <div className="flex-grow flex flex-wrap">
          {!isLoading &&
            data?.pages.map((page) =>
              page.item.map((el: TResponseBookItemInfo) => (
                <BookItem key={el.itemId} bookInfo={el} />
              ))
            )}
        </div>
      </div>
      {!isLoading && hasNextPage && (
        <div className="h-[6rem] flex justify-center items-center" ref={ref}>
          <LoadingSpiner />
        </div>
      )}
      {!isLoading && !hasNextPage && <Footer />}
    </>
  );
}

export default NewBook;
