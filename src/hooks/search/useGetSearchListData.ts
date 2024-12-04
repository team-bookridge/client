import fetchSearchListData from '@/hooks/search/fetchSearchListData';
import { useQuery } from '@tanstack/react-query';

const useGetSearchListData = (queryKey: string, query: string) =>
  useQuery({
    queryKey: [queryKey, query],
    queryFn: () => fetchSearchListData(query, 1, 5),
  });

export default useGetSearchListData;
