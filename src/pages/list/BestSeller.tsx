import useInfiniteGetData from '@/hooks/list/useInfiniteGetListData';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

function BestSeller() {
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteGetData(
      'Bestseller-List',
      import.meta.env.VITE_ALADIN_API_URL,
      import.meta.env.VITE_ALADIN_API_KEY,
      'Bestseller'
    );

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  return (
    <>
      <h2 className="text-[1.5rem] border-b-2">베스트셀러</h2>
      <div className="flex flex-wrap">
        {!isLoading &&
          data?.pages.map((page) =>
            page.item.map(
              (el: { isbn13: number; cover: string; title: string }) => (
                <div
                  key={el.isbn13}
                  className="md:w-[50%] w-[100%] h-[300px] border-b-2">
                  <img src={el.cover} alt={el.title} />
                </div>
              )
            )
          )}
      </div>
      <h1 ref={ref}>Load more</h1>
    </>
  );
}

export default BestSeller;
