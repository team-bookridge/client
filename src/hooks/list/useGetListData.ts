import fetchListData from '@/hooks/list/fetchListData';
import { useQuery } from '@tanstack/react-query';

const useGetListData = (
  queryKey: string,
  baseUrl: string,
  apiKey: string,
  queryType: string,
  categoryId: number = 0
) =>
  useQuery({
    queryKey: [queryKey],
    queryFn: () => fetchListData(baseUrl, apiKey, queryType, categoryId, 1),
  });

export default useGetListData;
