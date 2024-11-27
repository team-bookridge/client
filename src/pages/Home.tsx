import React from 'react';
import SimpleSlider from '../components/home/SimpleSlider';
import Responsive from '../components/home/Responsive';
import useGetListData from '@/hooks/list/useGetListData';

const Home: React.FC = () => {
  const { data, isLoading } = useGetListData(
    'SlickBestSeller',
    import.meta.env.VITE_ALADIN_API_URL,
    import.meta.env.VITE_ALADIN_API_KEY,
    'Bestseller'
  );

  console.log(data);

  return (
    <div className="container">
      {/* SimpleSlider 섹션 */}
      <div className="ad-container">
        <SimpleSlider />
      </div>
      {/* 베스트 셀러 섹션 */}
      <div className="book-list-container">
        <h2>베스트 셀러</h2>
        <Responsive />
      </div>

      {/* 주목할 만한 신간 섹션 */}
      <div className="book-list-container">
        <h2>주목할 만한 신간</h2>
        <Responsive />
      </div>

      {/* 편집자 추천 섹션 */}
      <div className="category-container">
        <h2>편집자 추천</h2>
        <div className="categories">
          {/* 카테고리 목록 */}
          <div className="category-card">
            <h3>카테고리 이름</h3>
            <p>카테고리 설명</p>
            <button type="button">자세히 보기</button>
          </div>
          {/* 더 많은 카테고리 카드 추가 */}
        </div>
        <button type="button" className="more-button">
          더 보기
        </button>
      </div>

      {/* 추가 책 목록 섹션 */}
      <div className="book-list-container">
        <Responsive />
      </div>
    </div>
  );
};

export default Home;
