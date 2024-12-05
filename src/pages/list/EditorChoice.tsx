import useInfiniteGetListData from '@/hooks/list/useInfiniteGetListData';
import { TResponseBookItemInfo } from '@/types';
import BookItem from '@components/common/BookItem';
import CategoryE from '@components/EditorChoice/CategoryE';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { useParams } from 'react-router-dom';

function EditorChoice() {
  const param = useParams();
  const categoryId = Number(param.categoryId);

  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteGetListData('EditorChoice-List', 'ItemEditorChoice', categoryId);

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
        편집자추천
      </h2>
      <CategoryE categoryId={categoryId} />
      <div className="flex flex-wrap">
        {!isLoading &&
          data?.pages.map((page) =>
            page.item.map((el: TResponseBookItemInfo) => (
              <BookItem key={el.itemId} bookInfo={el} />
            ))
          )}
      </div>
      <div ref={ref}>Load more</div>
    </div>
  );
}

export default EditorChoice;
