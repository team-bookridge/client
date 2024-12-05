import useGetListData from '@/hooks/list/useGetListData';
import { TResponseBookItemInfo } from '@/types';
import CategoryH from '@/components/home/CategoryH';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import SimpleSlider from '../components/home/SimpleSlider';
import Responsive from '@components/home/Responsive';

function Home() {
  // 베스트 셀러 데이터 가져오기
  const { data: bestSellerData, isLoading: isBestSellerLoading } =
    useGetListData('SlickBestSeller', 'Bestseller');

  // 신간 데이터 가져오기
  const { data: newBookData, isLoading: isNewBookLoading } = useGetListData(
    'SlickNewBook',
    'ItemNewSpecial'
  );

  // 선택된 카테고리 상태 관리
  const [selectedCategory, setSelectedCategory] = useState<number>(170);

  // 편집자 추천 데이터 가져오기
  const { data: editorChoiceData, isLoading: isEditorChoiceLoading } =
    useGetListData(
      'EditorChoice-Home',
      'ItemEditorChoice',
      selectedCategory,
      12
    );

  return (
    <>
      <SimpleSlider />
      <h2 className="text-[1.5rem] py-[1rem] text-[#4F772D] border-b-4 border-[#C0CFB2] font-[900]">
        베스트 셀러
      </h2>
      {/* 베스트 셀러 데이터가 로딩 중이 아닐 때 Responsive 컴포넌트 렌더링 */}
      {!isBestSellerLoading && bestSellerData?.item && (
        <Responsive books={bestSellerData.item} />
      )}
      <h2 className="text-[1.5rem] py-[1rem] text-[#4F772D] border-b-4 border-[#C0CFB2] font-[900]">
        주목할 만한 신간
      </h2>
      {/* 신간 데이터가 로딩 중이 아닐 때 Responsive 컴포넌트 렌더링 */}
      {!isNewBookLoading && newBookData?.item && (
        <Responsive books={newBookData.item} />
      )}
      <h2 className="text-[1.5rem] py-[1rem] text-[#4F772D] border-b-4 border-[#C0CFB2] font-[900]">
        편집자추천
      </h2>
      {/* 카테고리 선택 컴포넌트 */}
      <CategoryH
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      <div className="flex flex-wrap">
        {/* 편집자 추천 데이터가 로딩 중이 아닐 때 책 카드 렌더링 */}
        {!isEditorChoiceLoading &&
          editorChoiceData?.item.map((el: TResponseBookItemInfo) => (
            <div
              className="md:w-[25%] w-[33%] w-[50%] h-[250px] flex flex-col justify-center items-center gap-[0.25rem]"
              key={el.itemId}>
              <Link to={`/BookDetail/${el.itemId}`}>
                <img
                  className="w-[144px] h-[210px]"
                  src={el.cover}
                  alt={el.title}
                />
              </Link>
              <Link
                className="w-[144px] hover:underline text-start line-clamp-1 font-[900]"
                to={`/BookDetail/${el.itemId}`}>
                {el.title}
              </Link>
            </div>
          ))}
      </div>
    </>
  );
}

export default Home;
