import useAuthStore from '@/stores/authStore';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

function useAccessCheck(message: string) {
  const navigate = useNavigate();
  const { profile } = useAuthStore();

  useEffect(() => {
    const accessCheck = async () => {
      if (!profile) {
        await Swal.fire({
          icon: 'error',
          text: message,
        }).then(() => {
          navigate('/');
        });
      }
    };
    accessCheck();
  }, []);

  return !!profile;
}

export default useAccessCheck;
