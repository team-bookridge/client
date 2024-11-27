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

  console.log(data);

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  return (
    <div className="flex flex-col">
      <h2 className="text-[1.5rem] border-b-2">베스트셀러</h2>
      <div className="flex flex-wrap">
        {!isLoading &&
          data?.pages.map((page) =>
            page.item.map(
              (el: { isbn13: number; cover: string; title: string }) => (
                <div
                  key={el.isbn13}
                  className="md:w-[50%] flex flex-col gap-[1rem] py-[1rem] w-[100%] border-b-2">
                  <div className="flex">
                    <img
                      className="w-[9rem] max-h-[13rem]"
                      src={el.cover}
                      alt={el.title}
                    />
                    <div className="flex flex-col flex-grow pr-[0.5rem]">
                      <p>책이름</p>
                      <p>저자</p>
                      <p>출판사</p>
                      <p>출판일</p>
                      <p>가격</p>
                      <p>설명</p>
                    </div>
                  </div>
                  <div className="flex justify-around">
                    <button
                      className="text-[1.5rem] bg-gray-300 "
                      type="button">
                      알라딘
                    </button>
                    <button
                      className="text-[1.5rem] bg-gray-300 "
                      type="button">
                      교보문고
                    </button>
                    <button
                      className="text-[1.5rem] bg-gray-300 "
                      type="button">
                      예스24
                    </button>
                  </div>
                </div>
              )
            )
          )}
      </div>
      <h1 ref={ref}>Load more</h1>
    </div>
  );
}

export default BestSeller;
