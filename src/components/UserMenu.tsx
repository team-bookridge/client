import useAuthStore from '@/stores/authStore';
import { signOut } from '@/supabase';
import React from 'react';
import { useNavigate } from 'react-router-dom';

interface Porps {
  setIsActiveUserMenu: React.Dispatch<React.SetStateAction<boolean>>;
}

function UserMenu({ setIsActiveUserMenu }: Porps) {
  const navigate = useNavigate();
  const { profile } = useAuthStore();
  return (
    <div className="absolute top-[3.25rem] right-[1.25rem] z-20">
      <div className="bg-white border-2 rounded-md min-w-[10rem] flex flex-col py-[0.125rem]">
        <span className="text-[1.25rem] font-[900] text-center pb-[0.125rem] border-b-2">
          {profile?.nickname} 님
        </span>
        <button
          className="hover:bg-slate-100 text-[1.125rem] font-[400]"
          type="button"
          onClick={() => {
            navigate('/MyPage');
            setIsActiveUserMenu(false);
          }}>
          마이페이지
        </button>
        <button
          className="hover:bg-slate-100 text-[1.125rem] font-[400]"
          type="button"
          onClick={() => {
            if (profile) {
              signOut();
              setIsActiveUserMenu(false);
            }
          }}>
          로그아웃
        </button>
      </div>
    </div>
  );
}

export default UserMenu;
