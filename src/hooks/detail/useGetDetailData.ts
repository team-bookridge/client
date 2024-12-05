import fetchDetailData from '@/hooks/detail/fetchDetailData';
import { useQuery } from '@tanstack/react-query';

<<<<<<< Updated upstream
const useGetDetailData = (queryKey: string, itemId: string) =>
=======
const useGetDetailData = (queryKey: string, itemId: string | undefined) =>
>>>>>>> Stashed changes
  useQuery({
    queryKey: [queryKey, itemId],
    queryFn: () => fetchDetailData(itemId),
  });

export default useGetDetailData;
