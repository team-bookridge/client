import fetchListData from '@/hooks/list/fetchListData';
import { useQuery } from '@tanstack/react-query';

const useGetListData = (
  queryKey: string,
  queryType: string,
  categoryId: number = 0,
  maxResults: number = 10
) =>
  useQuery({
    queryKey: [queryKey, String(categoryId)],
    queryFn: () => fetchListData(queryType, categoryId, maxResults),
  });

export default useGetListData;
