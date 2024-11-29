import fetchListData from '@/hooks/list/fetchListData';
import { useInfiniteQuery } from '@tanstack/react-query';

const useInfiniteGetListData = (
  queryKey: string,
  queryType: string,
  categoryId: number = 0
) =>
  useInfiniteQuery({
    queryKey: [queryKey, String(categoryId)],
    queryFn: ({ pageParam }) => fetchListData(queryType, categoryId, pageParam),
    getNextPageParam: (last) => {
      let totalPage;

      if (last.totalResults >= 1000) {
        totalPage = 100;
      } else if (last.totalResults % 10 > 0) {
        totalPage = last.totalResults / 10 + 1;
      } else {
        totalPage = last.totalResults / 10;
      }

      if (last.startIndex < totalPage) {
        return last.startIndex + 1;
      }
      return undefined;
    },
    initialPageParam: 1,
  });

export default useInfiniteGetListData;
