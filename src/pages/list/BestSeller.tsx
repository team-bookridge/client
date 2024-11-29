import useInfiniteGetData from '@/hooks/list/useInfiniteGetListData';
import { TResponseBookItemInfo } from '@/types';
import BookItem from '@components/common/BookItem';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

function BestSeller() {
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteGetData('Bestseller-List', 'Bestseller');

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  return (
    <div className="flex flex-col">
      <h2 className="text-[1.5rem] py-[1rem] text-[#4F772D;] border-b-4 border-[#C0CFB2] font-[900]">
        베스트셀러
      </h2>
      <div className="flex flex-wrap">
        {!isLoading &&
          data?.pages.map((page) =>
            page.item.map((el: TResponseBookItemInfo) => (
              <BookItem key={el.itemId} bookInfo={el} />
            ))
          )}
      </div>
      <h1 ref={ref}>Load more</h1>
    </div>
  );
}

export default BestSeller;
