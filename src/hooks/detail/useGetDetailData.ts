import fetchDetailData from '@/hooks/detail/fetchDetailData';
import { useQuery } from '@tanstack/react-query';

const useGetDetailData = (queryKey: string, ItemId: string | undefined) =>
  useQuery({
    queryKey: [queryKey, ItemId],
    queryFn: () => fetchDetailData(ItemId),
  });

export default useGetDetailData;
