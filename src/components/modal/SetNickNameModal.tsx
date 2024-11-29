function SetNickNameModal() {
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black/50 z-30">
      <div
        className="flex flex-col justify-center items-center 
        w-[90%] sm:w-[40%] min-h-[60%] bg-gray-100 rounded-lg shadow-lg p-6">
        <h2 className="text-lg font-bold mb-6 text-black">닉네임 변경</h2>

        <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-10 h-10 text-gray-500">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 9A3.75 3.75 0 1112 5.25 3.75 3.75 0 0115.75 9zM19.5 21a8.25 8.25 0 00-15 0"
            />
          </svg>
        </div>

        <input
          type="text"
          placeholder="닉네임을 입력하세요"
          className="w-[50%] sm:w-[50%] border border-gray-300 rounded-md p-2 mb-6 bg-gray-100 text-black placeholder-gray-500"
        />

        <div className="flex gap-4">
          <button
            type="button"
            className="px-4 py-2 bg-gray-300 text-black rounded-md hover:bg-gray-400">
            취소 하기
          </button>
          <button
            type="button"
            className="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-900">
            변경 하기
          </button>
        </div>
      </div>
    </div>
  );
}

export default SetNickNameModal;
