import useAuthStore from '@/stores/authStore';
import useModalStore from '@/stores/modalStore';
import { addReview, deleteReview, updateReview } from '@/supabase';
import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

interface Props {
  refetch: () => void;
}

function ReviewForm({ refetch }: Props) {
  const { itemId } = useParams<{ itemId: string }>();
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [isExistReview, setIsExistReview] = useState(false);

  const {
    profile,
    reviewList,
    authAddReview,
    authUpdateReview,
    authDeleteReview,
  } = useAuthStore();
  const { setModal } = useModalStore();

  useEffect(() => {
    const review = reviewList.find((item) => item.contentId === itemId);
    if (inputRef.current) {
      if (review) {
        inputRef.current.value = review.review;
        setIsExistReview(true);
      }
    }
  }, []);

  const handleAddReview = async () => {
    if (!profile) {
      await Swal.fire({
        icon: 'info',
        text: '로그인이 필요한 서비스입니다.',
      }).then(() => {
        setModal('login');
      });
      return;
    }

    if (inputRef.current?.value.trim()) {
      addReview(
        profile.id,
        profile.nickname,
        itemId as string,
        inputRef.current.value
      ).then((res) => {
        if (res) {
          if (inputRef.current) {
            authAddReview(
              itemId as string,
              profile.nickname,
              inputRef.current.value
            );
            Swal.fire({
              icon: 'success',
              text: '리뷰를 등록했습니다!',
              showConfirmButton: false,
              timer: 1500,
            }).then(() => {
              setIsExistReview(true);
              refetch();
            });
          }
        }
      });
    } else {
      Swal.fire({
        icon: 'error',
        text: '리뷰 입력창이 비었습니다!',
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  const handleUpdateReview = () => {
    if (!profile) return;
    if (inputRef.current) {
      updateReview(profile.id, String(itemId), inputRef.current.value).then(
        (res) => {
          if (res) {
            if (inputRef.current) {
              authUpdateReview(itemId as string, inputRef.current.value);
              Swal.fire({
                icon: 'success',
                text: '리뷰를 수정했습니다!',
                showConfirmButton: false,
                timer: 1500,
              }).then(() => {
                setIsExistReview(true);
                refetch();
              });
            }
          }
        }
      );
    }
  };

  const handleDeleteReview = () => {
    if (!profile) return;

    deleteReview(profile.id, String(itemId)).then((res) => {
      if (res) {
        authDeleteReview(itemId as string);
        Swal.fire({
          icon: 'success',
          text: '리뷰를 삭제했습니다!',
          showConfirmButton: false,
          timer: 1500,
        }).then(() => {
          setIsExistReview(false);
          refetch();
          if (inputRef.current) inputRef.current.value = '';
        });
      }
    });
  };

  return (
    <div className="mt-6 bg-white rounded-lg shadow-md p-4 flex flex-col items-end">
      <textarea
        ref={inputRef}
        className="w-full p-2 border rounded resize-none"
        placeholder="리뷰를 입력하세요. (1000자)"
      />
      {!isExistReview ? (
        <button
          type="button"
          className="mt-2 bg-blue-500 text-white p-2 rounded hover:bg-pink-600 transition duration-200"
          onClick={handleAddReview}>
          리뷰 남기기
        </button>
      ) : (
        <div className="flex gap-[1rem]">
          <button
            type="button"
            className="mt-2 bg-blue-500 text-white p-2 rounded hover:bg-pink-600 transition duration-200"
            onClick={handleDeleteReview}>
            리뷰 삭제
          </button>
          <button
            type="button"
            className="mt-2 bg-blue-500 text-white p-2 rounded hover:bg-pink-600 transition duration-200"
            onClick={handleUpdateReview}>
            리뷰 수정
          </button>
        </div>
      )}
    </div>
  );
}

export default ReviewForm;
