import useAuthStore from '@/stores/authStore';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function useAccessCheck(message: string) {
  const navigate = useNavigate();
  const { profile } = useAuthStore();

  useEffect(() => {
    // 로그인이 되어있다면 profile이 null이 아니므로 전역상태만 확인하면된다.
    if (!profile) {
      alert(message);
      navigate('/');
    }
  }, []);

  return !!profile;
}

export default useAccessCheck;
