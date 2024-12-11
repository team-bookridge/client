import { signInWithProvider } from '@/supabase';
import kakaoLoginImg from '@/assets/kakao.png';
import googleLoginImg from '@/assets/google.png';

export default function LoginModal() {
  return (
    <div className="inset-0 flex justify-center items-center">
      <div
        className="bg-white rounded-lg w-[90%] max-w-[25rem] p-6 shadow-lg relative"
        onClick={(e) => {
          e.stopPropagation();
        }}
        aria-hidden="true">
        {/* 모달 제목 */}
        <h2 className="text-center text-lg font-semibold text-[#4F772D]">
          로그인
        </h2>
        <hr className="my-4 border-[#C0CFB2] border-b-2" />

        {/* 소셜 로그인 버튼 */}
        <div className="flex flex-col items-center gap-4">
          {/* 카카오 로그인 버튼 */}
          <button
            type="button"
            onClick={() => {
              signInWithProvider('kakao');
            }}
            className="w-[300px] h-[50px] rounded-lg overflow-hidden">
            <img
              src={kakaoLoginImg}
              alt="카카오 로그인"
              className="w-full h-full object-contain"
            />
          </button>

          {/* 구글 로그인 버튼 */}
          <button
            type="button"
            onClick={() => {
              signInWithProvider('google');
            }}
            className="w-[300px] h-[50px] rounded-lg overflow-hidden border border-grey">
            <img
              src={googleLoginImg}
              alt="구글 로그인"
              className="w-full h-full object-contain"
            />
          </button>
        </div>
      </div>
    </div>
  );
}
