import React from 'react';
import Slider from 'react-slick';
import '../../simpleslider.css'; // 커스텀 스타일 파일
import 'slick-carousel/slick/slick.css'; // 기본 슬릭 스타일
import 'slick-carousel/slick/slick-theme.css'; // 기본 슬릭 테마

// 슬라이더의 화살표 버튼 컴포넌트 인터페이스
interface ArrowProps {
  className?: string; // 화살표의 클래스 이름
  style?: React.CSSProperties; // 커스텀 스타일
  onClick?: () => void; // 클릭 이벤트 핸들러
}

// 슬라이더의 화살표 버튼 컴포넌트 정의
const Arrow: React.FC<ArrowProps> = ({ className, onClick }) => {
  const isPrev = className?.includes('slick-prev'); // 'slick-prev' 클래스 여부 확인
  return (
    <div
      className={`simple-slider-${isPrev ? 'prev' : 'next'}`} // 'prev' 또는 'next' 클래스 추가
      onClick={onClick}>
      {isPrev ? '<' : '>'} {/* 이전 버튼은 '<', 다음 버튼은 '>' 표시 */}
    </div>
  );
};

// 슬라이더 컴포넌트 정의
const SimpleSlider: React.FC = () => {
  // 슬라이더 설정 객체
  const settings = {
    dots: true, // 하단 도트 네비게이션 활성화
    infinite: true, // 무한 스크롤
    speed: 500, // 슬라이드 전환 속도(ms)
    slidesToShow: 1, // 한 번에 표시할 슬라이드 수
    slidesToScroll: 1, // 한 번에 스크롤할 슬라이드 수
    adaptiveHeight: true, // 슬라이드 높이 자동 조정
    prevArrow: <Arrow className="simple-slider-prev" />, // 이전 버튼 컴포넌트
    nextArrow: <Arrow className="simple-slider-next" />, // 다음 버튼 컴포넌트
    responsive: [
      {
        breakpoint: 1024, // 1024px 이하 화면에서
        settings: {
          slidesToShow: 1,
          dots: true,
        },
      },
      {
        breakpoint: 768, // 768px 이하 화면에서
        settings: {
          slidesToShow: 1,
          dots: true,
          arrows: true,
        },
      },
      {
        breakpoint: 480, // 480px 이하 화면에서
        settings: {
          slidesToShow: 1,
          dots: true,
          arrows: false, // 화살표 제거
        },
      },
    ],
  };

  return (
    <div className="simple-slider-container">
      {' '}
      {/* 슬라이더 컨테이너   {' '}  공백 표시 }*/}
      <Slider {...settings}>
        <div className="simple-slider-slide">
          {' '}
          {/* 슬라이드 1 */}
          <img src="https://via.placeholder.com/1200x400" alt="Ad Mockup 1" />
        </div>
        <div className="simple-slider-slide">
          {' '}
          {/* 슬라이드 2 */}
          <img src="https://via.placeholder.com/1200x400" alt="Ad Mockup 2" />
        </div>
        <div className="simple-slider-slide">
          {' '}
          {/* 슬라이드 3 */}
          <img src="https://via.placeholder.com/1200x400" alt="Ad Mockup 3" />
        </div>
      </Slider>
    </div>
  );
};

export default SimpleSlider;

// 슬라이더 배열타입정의 광고API 예정
// return (
//   <div className="simple-slider-container">
//     <Slider {...settings}>
//       {/** 슬라이드 데이터 예시 */}
//       {[1, 2, 3].map((num) => (
//         <div key={num} className="simple-slider-slide">
//           <img src={`https://via.placeholder.com/300x100`} alt={`Ad Mockup ${num}`} />
//         </div>
//       ))}
//     </Slider>
//   </div>
// );
// };
