import fetchSearchListData from '@/hooks/search/fetchSearchListData';
import { useInfiniteQuery } from '@tanstack/react-query';

const useInfiniteGetSearchListData = (
  queryKey: string,
  baseUrl: string,
  apiKey: string,
  queryType: string
) =>
  useInfiniteQuery({
    queryKey: [queryKey],
    queryFn: ({ pageParam }) =>
      fetchSearchListData(baseUrl, apiKey, queryType, pageParam),
    getNextPageParam: (last) => {
      let totalPage;

      if (last.totalResults >= 200) {
        totalPage = 20;
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

export default useInfiniteGetSearchListData;
