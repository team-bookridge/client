import useAuthStore from '@/stores/authStore';
import { supabase } from '@/supabase';
import { useEffect } from 'react';

function useLoginStateManagement() {
  const { login, logout } = useAuthStore((state) => state);
  useEffect(() => {
    const checkSession = async () => {
      const { data, error } = await supabase.auth.getSession();

      if (error) return;

      if (data.session) {
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', data.session?.user.id)
          .single();

        if (profileError && profileError.code !== 'PGRST116') return;

        if (profileData) {
          login(profileData);
        }
      } else {
        logout();
      }
    };

    checkSession();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

export default useLoginStateManagement;
