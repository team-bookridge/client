import fetchSearchData from '@/hooks/search/fetchSearchData';
import { useInfiniteQuery } from '@tanstack/react-query';

const useInfiniteGetSearchData = (
  queryKey: string,
  baseUrl: string,
  apiKey: string,
  queryType: string
) =>
  useInfiniteQuery({
    queryKey: [queryKey],
    queryFn: ({ pageParam }) =>
      fetchSearchData(baseUrl, apiKey, queryType, pageParam),
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

export default useInfiniteGetSearchData;
