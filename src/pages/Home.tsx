import { useState } from 'react';
import { Link } from 'react-router-dom';
import { TResponseBookItemInfo } from '@/types';
import useGetListData from '@/hooks/list/useGetListData';
import CategoryH from '@components/home/CategoryH';
import Responsive from '@components/home/Responsive';
import Title from '@components/common/Title';
import SimpleSlider from '@/components/home/SimpleSlider';
import Footer from '@components/app/Footer';

function Home() {
  // 데이터 가져오기
  const { data: bestSellerData, isLoading: isBestSellerLoading } =
    useGetListData('SlickBestSeller', 'Bestseller');

  const { data: newBookData, isLoading: isNewBookLoading } = useGetListData(
    'SlickNewBook',
    'ItemNewSpecial'
  );

  const [selectedCategory, setSelectedCategory] = useState<number>(170); // React 타입 명시 삭제 완료
  const { data: editorChoiceData, isLoading: isEditorChoiceLoading } =
    useGetListData(
      'EditorChoice-Home',
      'ItemEditorChoice',
      selectedCategory,
      12
    );

  // Responsive 컴포넌트 렌더링 함수
  const renderResponsive = ({
    item,
    isLoading,
  }: {
    item?: TResponseBookItemInfo[];
    isLoading: boolean;
  }) => {
    if (isLoading) return <p>로딩 중...</p>; // 에러 확인용
    if (!item?.length) return <p>데이터가 없습니다.</p>;
    return <Responsive books={item} />;
  };

  return (
    <>
      <SimpleSlider />
      <Title text="베스트 셀러" />
      {renderResponsive({
        item: bestSellerData?.item,
        isLoading: isBestSellerLoading,
      })}
      <Title text="주목할 만한 신간" />
      {renderResponsive({
        item: newBookData?.item,
        isLoading: isNewBookLoading,
      })}
      <Title text="편집자 추천" />
      <CategoryH
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      <div className="flex flex-wrap min-h-[46.875rem]">
        {!isEditorChoiceLoading &&
          editorChoiceData?.item?.map((el: TResponseBookItemInfo) => (
            <div
              className="md:w-[25%] w590px:w-[33%] w-[50%] h-[15.625rem] flex flex-col justify-center items-center gap-[0.25rem]"
              key={el.itemId}>
              <Link to={`/BookDetail/${el.itemId}`}>
                <img
                  className="w-[9rem] h-[13.125rem]"
                  src={el.cover}
                  alt={el.title}
                />
              </Link>
              <Link
                className="w-[9rem] hover:underline text-start line-clamp-1 font-[900]"
                to={`/BookDetail/${el.itemId}`}>
                {el.title}
              </Link>
            </div>
          ))}
      </div>
      <Footer />
    </>
  );
}

export default Home;
