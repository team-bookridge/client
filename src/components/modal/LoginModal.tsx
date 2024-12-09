import useModalStore from '@/stores/modalStore';

export default function LoginModal() {
  const { setModal } = useModalStore();

  return (
    <div
      className="fixed inset-0 bg-black/50 z-50 flex justify-center items-center"
      onClick={() => setModal(null)}
      aria-hidden="true">
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
            onClick={() => alert('카카오로 로그인')}
            className="w-[300px] h-[50px] rounded-lg overflow-hidden">
            <img
              src="/src/assets/kakao.png"
              alt="카카오 로그인"
              className="w-full h-full object-contain"
            />
          </button>

          {/* 구글 로그인 버튼 */}
          <button
            type="button"
            onClick={() => alert('구글로 로그인')}
            className="w-[300px] h-[50px] rounded-lg overflow-hidden border border-grey">
            <img
              src="/src/assets/google.png"
              alt="구글 로그인"
              className="w-full h-full object-contain"
            />
          </button>
        </div>
      </div>
    </div>
  );
}
