import React from 'react';
import Slider, { Settings } from 'react-slick';
import '../../responsive.css'; // react-slick 커스텀 파일
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { TResponseBookItemInfo } from '@/types';
import { Link } from 'react-router-dom';

// 슬라이더의 커스텀 화살표 버튼 컴포넌트
interface ArrowProps {
  className: string;
  style: React.CSSProperties;
  onClick?: () => void;
}

// 슬라이더의 커스텀 화살표 컴포넌트 정의
const Arrow: React.FC<ArrowProps> = ({ className, style, onClick }) => {
  return (
    <div
      className={className} // slick-prev 또는 slick-next에 따라 스타일 지정
      style={{
        ...style,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'transparent',
        border: 'none',
        width: '50px',
        height: '50px',
        zIndex: 1,
        cursor: 'pointer',
      }}
      onClick={onClick}>
      {className.includes('slick-prev') ? ( // 이전 버튼 아이콘
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="30px"
          height="30px"
          viewBox="0 0 24 24"
          fill="none">
          <path
            d="M13 14.5L10.5 12L13 9.5"
            stroke="#31572C"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M8.95043 20.6471C6.17301 19.9956 4.00437 17.827 3.35288 15.0496C2.88237 13.0437 2.88237 10.9563 3.35288 8.95043C4.00437 6.17301 6.17301 4.00437 8.95044 3.35288C10.9563 2.88237 13.0437 2.88238 15.0496 3.35288C17.827 4.00437 19.9956 6.17301 20.6471 8.95043C21.1176 10.9563 21.1176 13.0437 20.6471 15.0496C19.9956 17.827 17.827 19.9956 15.0496 20.6471C13.0437 21.1176 10.9563 21.1176 8.95043 20.6471Z"
            stroke="#31572C"
            strokeWidth="1.5"
          />
        </svg>
      ) : (
        // 다음 버튼 아이콘
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="30px"
          height="30px"
          viewBox="0 0 24 24"
          fill="none">
          <path
            d="M11 9.5L13.5 12L11 14.5"
            stroke="#31572C"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M15.0496 3.35288C17.827 4.00437 19.9956 6.17301 20.6471 8.95043C21.1176 10.9563 21.1176 13.0437 20.6471 15.0496C19.9956 17.827 17.827 19.9956 15.0496 20.6471C13.0437 21.1176 10.9563 21.1176 8.95044 20.6471C6.17301 19.9956 4.00437 17.827 3.35288 15.0496C2.88237 13.0437 2.88237 10.9563 3.35288 8.95044C4.00437 6.17301 6.173 4.00437 8.95043 3.35288C10.9563 2.88237 13.0437 2.88237 15.0496 3.35288Z"
            stroke="#31572C"
            strokeWidth="1.5"
          />
        </svg>
      )}
    </div>
  );
};

// 반응형 슬라이더 컴포넌트
interface ResponsiveProps {
  books: TResponseBookItemInfo[]; // 책 데이터 목록
}

const Responsive: React.FC<ResponsiveProps> = ({ books }) => {
  // 슬라이더 설정 객체
  const settings: Settings = {
    dots: true, // 하단 도트 네비게이션 활성화
    infinite: true, // 무한 스크롤
    speed: 500, // 슬라이드 전환 속도(ms)
    slidesToShow: 4, // 한 번에 표시할 슬라이드 수
    slidesToScroll: 4, // 한 번에 스크롤할 슬라이드 수
    centerMode: true, // 중앙 정렬 모드
    centerPadding: '0px', // 좌우 여백
    prevArrow: <Arrow className="slick-prev" style={{}} onClick={() => {}} />,
    nextArrow: <Arrow className="slick-next" style={{}} onClick={() => {}} />,
    arrows: true, // 화살표 표시
    responsive: [
      {
        breakpoint: 1024, // 1024px 이하 화면에서
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768, // 768px 이하 화면에서
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 620, // 620px 이하 화면에서
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 425, // 425px 이하 화면에서
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerPadding: '10px',
          arrows: false, // 화살표 제거
        },
      },
    ],
    afterChange: () => {
      // 슬라이드 변경 후 포커스 해제
      const activeSlides = document.querySelectorAll('.slick-active');
      activeSlides.forEach((slide) => {
        (slide as HTMLElement).blur();
      });
    },
  };

  return (
    <div className="responsive-slider-container">
      <Slider {...settings}>
        {books?.map((book) => (
          <Link
            to={`/BookDetail/${book.itemId}`} // 클릭 시 해당 책의 상세 페이지로 이동
            key={book.itemId}
            className="book-card">
            <img
              src={book.cover}
              alt={book.title}
              style={{
                maxHeight: '150px',
                objectFit: 'contain',
                marginBottom: '10px',
                flexGrow: 1,
              }}
            />
            <div className="book-info">
              <h3>{book.title}</h3> {/* 책 제목 */}
              <p>{book.author}</p> {/* 책 저자 */}
            </div>
          </Link>
        ))}
      </Slider>
    </div>
  );
};

export default Responsive;

// import React from 'react';
// import Slider, { Settings } from 'react-slick';
// import '../../responsive.css';
// import 'slick-carousel/slick/slick.css';
// import 'slick-carousel/slick/slick-theme.css';
// import { TResponseBookItemInfo } from '@/types';
// import { Link } from 'react-router-dom';

// interface ResponsiveProps {
//   books: TResponseBookItemInfo[];
// }

// interface ArrowProps {
//   className: string;
//   style: React.CSSProperties;
//   onClick?: () => void;
// }

// // 애로우 컴포넌트 정의
// const Arrow: React.FC<ArrowProps> = ({ className, style, onClick }) => {
//   return (
//     <div
//       className={className}
//       style={{
//         ...style,
//         display: 'flex',
//         alignItems: 'center',
//         justifyContent: 'center',
//         background: 'transparent',
//         border: '2px solid white',
//         borderRadius: '50%',
//         width: '30px',
//         height: '30px',
//         zIndex: 1,
//         cursor: 'pointer',
//       }}
//       onClick={onClick}>
//       <span
//         style={{
//           color: 'black',
//           fontSize: '16px',
//           lineHeight: '30px',
//           textAlign: 'center',
//         }}>
//         {className.includes('slick-prev') ? '<' : '>'}
//       </span>
//     </div>
//   );
// };

// const Responsive: React.FC<ResponsiveProps> = ({ books }) => {
//   // 슬라이더 설정
//   const settings: Settings = {
//     dots: true,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 4,
//     slidesToScroll: 4,
//     centerMode: true,
//     centerPadding: '0px',
//     prevArrow: <Arrow className="slick-prev" style={{}} onClick={() => {}} />,
//     nextArrow: <Arrow className="slick-next" style={{}} onClick={() => {}} />,
//     responsive: [
//       {
//         breakpoint: 1024,
//         settings: {
//           slidesToShow: 4,
//           slidesToScroll: 1,
//         },
//       },
//       {
//         breakpoint: 768,
//         settings: {
//           slidesToShow: 3,
//           slidesToScroll: 1,
//         },
//       },
//       {
//         breakpoint: 620,
//         settings: {
//           slidesToShow: 2,
//           slidesToScroll: 1,
//         },
//       },
//       {
//         breakpoint: 425,
//         settings: {
//           slidesToShow: 1,
//           slidesToScroll: 1,
//           centerPadding: '10px',
//           arrows: false,
//         },
//       },
//     ],
//     afterChange: () => {
//       const activeSlides = document.querySelectorAll('.slick-active');
//       activeSlides.forEach((slide) => {
//         (slide as HTMLElement).blur();
//       });
//     },
//   };

//   return (
//     <div className="slider-container">
//       <Slider {...settings}>
//         {books?.map((book) => (
//           <Link
//             to={`/BookDetail/${book.itemId}`}
//             key={book.itemId}
//             className="book-card">
//             <img
//               src={book.cover}
//               alt={book.title}
//               style={{
//                 maxHeight: '150px',
//                 objectFit: 'contain',
//                 marginBottom: '10px',
//                 flexGrow: 1,
//               }}
//             />
//             <div className="book-info">
//               <h3>{book.title}</h3>
//               <p>{book.author}</p>
//             </div>
//           </Link>
//         ))}
//       </Slider>
//     </div>
//   );
// };

// export default Responsive;
