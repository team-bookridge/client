import useInfiniteGetListData from '@/hooks/list/useInfiniteGetListData';
import { TResponseBookItemInfo } from '@/types';
import BookItem from '@components/common/BookItem';
import CategoryE from '@components/EditorChoice/CategoryE';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { useParams } from 'react-router-dom';

import scrollToTop from '@/utils/scrollToTop';
import useResetCashe from '@/hooks/useResetCashe';
import LoadingSpiner from '@components/common/LoadingSpiner';
import Footer from '@components/app/Footer';

function EditorChoice() {
  useEffect(() => {
    scrollToTop();
  }, []);

  const param = useParams();
  const categoryId = Number(param.categoryId as string);

  const queryKey = `editorChoice-${categoryId}`;

  useResetCashe(queryKey);

  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteGetListData(queryKey, 'ItemEditorChoice', categoryId);

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView]);

  return (
    <>
      <div className="min-h-full flex flex-col">
        <h2 className="text-[1.5rem] py-[1rem] text-[#4F772D;] border-b-4 border-[#C0CFB2] font-[900]">
          편집자추천
        </h2>
        <CategoryE categoryId={categoryId} />
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

export default EditorChoice;
