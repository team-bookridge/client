import { useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useNavigationType } from 'react-router-dom';

function useResetCashe(queryKey: string) {
  const queryClient = useQueryClient();
  const navigateType = useNavigationType();

  useEffect(() => {
    if (navigateType === 'PUSH')
      queryClient.removeQueries({ queryKey: [queryKey] });
  }, [queryKey]);
}

export default useResetCashe;
