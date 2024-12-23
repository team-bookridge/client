import fetchDetailData from '@/hooks/detail/fetchDetailData';
import { useQuery } from '@tanstack/react-query';

const useGetDetailData = (queryKey: string, itemId: string) =>
  useQuery({
    queryKey: [queryKey, itemId],
    queryFn: () => fetchDetailData(itemId),
  });

export default useGetDetailData;
