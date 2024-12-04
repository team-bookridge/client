import useGetListData from '@/hooks/list/useGetListData';
import { TResponseBookItemInfo } from '@/types';
import CategoryH from '@/components/home/CategoryH';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import SimpleSlider from '../components/home/SimpleSlider';

function Home() {
  const [selectedCategory, setSelectedCategory] = useState<number>(170);

  const { data, isLoading } = useGetListData(
    'EditorChoice-Home',
    'ItemEditorChoice',
    selectedCategory,
    12
  );

  return (
    <div className="flex flex-col">
      <div className="ad-container">
        <SimpleSlider />
      </div>

      <h2 className="text-[1.5rem] py-[1rem] text-[#4F772D;] border-b-4 border-[#C0CFB2] font-[900]">
        편집자추천
      </h2>
      <CategoryH
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      <div className="flex flex-wrap">
        {!isLoading &&
          data?.item.map((el: TResponseBookItemInfo) => (
            <div
              className="md:w-[25%] w590px:w-[33%] w-[50%] h-[250px] 
              flex flex-col justify-center items-center gap-[0.25rem]"
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
    </div>
  );
}

export default Home;

// import React, { useState } from 'react';
// import SimpleSlider from '../components/home/SimpleSlider';
// import Responsive from '../components/home/Responsive';
// import useGetListData from '@/hooks/list/useGetListData';
// import '../slick.css';
// import '../App.css';
// import 'tailwindcss/tailwind.css';
// import { TResponseBookItemInfo, TCategory } from '@/types';
// import { useQueryClient } from '@tanstack/react-query';
// import { Link } from 'react-router-dom';

// const Home: React.FC = () => {
//   const { data: bestSellerData, isLoading: isBestSellerLoading } =
//     useGetListData('SlickBestSeller', 'Bestseller');

//   const { data: newBookData, isLoading: isNewBookLoading } = useGetListData(
//     'SlickNewBook',
//     'ItemNewSpecial'
//   );

//   const [selectedCategory, setSelectedCategory] = useState<number>(170);

//   const { data: editorChoiceData, isLoading: isEditorChoiceLoading } =
//     useGetListData(
//       'EditorChoice-Home',
//       'ItemEditorChoice',
//       selectedCategory,
//       12
//     );

//   const queryClient = useQueryClient();

//   const categories: TCategory[] = [
//     { id: 170, name: '경제/경영' },
//     { id: 2105, name: '고전' },
//     { id: 987, name: '과학' },
//     { id: 2551, name: '만화' },
//     { id: 1, name: '소설/시/희곡' },
//     { id: 55889, name: '에세이' },
//     { id: 74, name: '역사' },
//     { id: 517, name: '예술/대중문화' },
//     { id: 1322, name: '외국어' },
//     { id: 656, name: '인문학' },
//     { id: 336, name: '자기계발' },
//     { id: 351, name: '컴퓨터/모바일' },
//     { id: 55890, name: '건강/취미' },
//     { id: 2913, name: '잡지' },
//   ];

//   return (
//     <div className="home-responsive-slider-container">
//       {/* SimpleSlider 섹션 */}
//       <div className="ad-container">
//         <SimpleSlider />
//       </div>

//       {/* 섹션 래퍼 */}
//       <div className="sections-container">
//         {/* 베스트 셀러 섹션 */}
//         <div className="book-list-container">
//           <h2 className="text-[1.5rem] py-[1rem] text-[#4F772D] border-b-4 border-[#C0CFB2] font-[900]">
//             베스트 셀러
//           </h2>
//           {isBestSellerLoading ? (
//             <p>로딩 중...</p>
//           ) : (
//             <Responsive books={bestSellerData?.item} />
//           )}
//         </div>

//         {/* 주목할 만한 신간 섹션 */}
//         <div className="book-list-container">
//           <h2 className="text-[1.5rem] py-[1rem] text-[#4F772D] border-b-4 border-[#C0CFB2] font-[900]">
//             주목할 만한 신간
//           </h2>
//           <hr className="divider" />
//           {isNewBookLoading ? (
//             <p>로딩 중...</p>
//           ) : (
//             <Responsive books={newBookData?.item} />
//           )}
//         </div>
//       </div>

//       {/* 편집자 추천 섹션 */}
//       <h2 className="text-[1.5rem] py-[1rem] text-[#4F772D] border-b-4 border-[#C0CFB2] font-[900]">
//         편집자 추천
//       </h2>
//       <div className="flex flex-col items-center"></div>

//       {/* 카테고리 버튼 */}
//       <div className="flex flex-wrap justify-center gap-[0.5rem] p-[0.5rem] my-[1rem] border-2 border-[#E4E6D9] rounded-[0.5rem]">
//         {categories.map((el) => (
//           <button
//             type="button"
//             key={el.id}
//             className={`px-[0.5rem] py-[0.25rem] text-white font-[900] rounded-[0.5rem] ${el.id === selectedCategory ? 'bg-[#45624E]' : 'bg-[#C0CFB2]'}`}
//             onClick={() => {
//               setSelectedCategory(el.id);
//               queryClient.invalidateQueries({
//                 queryKey: ['EditorChoice-List'],
//               });
//             }}>
//             {el.name}
//           </button>
//         ))}
//       </div>

//       {/* 편집자 추천 리스트 */}
//       <div className="flex flex-wrap justify-center">
//         {isEditorChoiceLoading ? (
//           <p>로딩 중...</p>
//         ) : (
//           editorChoiceData?.item.map((el: TResponseBookItemInfo) => (
//             <div
//               className="md:w-[25%] sm:w-[33%] w-[50%] h-[250px] flex flex-col justify-center items-center gap-[0.25rem] mb-[1rem]"
//               key={el.itemId}>
//               <Link to={`/BookDetail/${el.itemId}`}>
//                 <img
//                   className="w-[144px] h-[210px] object-cover"
//                   src={el.cover}
//                   alt={el.title}
//                 />
//               </Link>
//               <Link
//                 className="w-[144px] hover:underline text-start line-clamp-1 font-[900] text-[0.875rem] sm:text-[1rem]"
//                 to={`/BookDetail/${el.itemId}`}>
//                 {el.title}
//               </Link>
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// };

// export default Home;
