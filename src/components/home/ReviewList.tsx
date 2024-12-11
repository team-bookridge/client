interface Props {
  data:
    | {
        content_id: string;
        updated_at: string;
        user_nickname: string;
        review: string;
      }[]
    | undefined;
}

function ReviewList({ data }: Props) {
  return (
    <div className="mt-6 bg-white rounded-lg">
      <h2 className="text-base sm:text-lg font-semibold mb-4">리뷰</h2>
      {!data ? (
        <div>등록된 리뷰가 없습니다.</div>
      ) : (
        data?.map((item) => (
          <div
            key={`${item.content_id}-${item.updated_at}`}
            className="border-b py-2 flex flex-col rounded-lg shadow-md p-4 gap-[1rem]">
            <div className="flex justify-between text-[1.125rem] font-[900]">
              <p>{item.user_nickname}</p>
              <p>{item.updated_at}</p>
            </div>
            <p className="text-sm sm:text-base text-gray-700 whitespace-pre-line">
              {item.review}
            </p>
          </div>
        ))
      )}
    </div>
  );
}

export default ReviewList;
