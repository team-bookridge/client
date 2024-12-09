import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '@/simpleslider.css';

// 슬라이더의 화살표 버튼 컴포넌트 인터페이스
interface ArrowProps {
  className: string;
  onClick: () => void;
}

// 슬라이더의 화살표 버튼 컴포넌트 정의
function Arrow({ className, onClick }: ArrowProps) {
  const isPrev = className?.includes('slick-prev');
  return (
    <div
      className={`simple-slider-${isPrev ? 'prev' : 'next'}`}
      onClick={onClick}
      aria-hidden>
      {isPrev ? '<' : '>'}
    </div>
  );
}

// 슬라이더 컴포넌트 정의
function SimpleSlider() {
  // 슬라이더 설정 객체
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
    prevArrow: <Arrow className="simple-slider-prev" onClick={() => {}} />,
    nextArrow: <Arrow className="simple-slider-next" onClick={() => {}} />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          dots: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          dots: true,
          arrows: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          dots: true,
          arrows: false,
        },
      },
    ],
  };

  return (
    // 현재 목업용이라 임시방편 추후 map, index 활용하여 배열 정리
    <div className="simple-slider-container">
      <Slider {...settings}>
        <div className="simple-slider-slide">
          <img src="https://via.placeholder.com/1200x400" alt="Ad Mockup 1" />
        </div>
        <div className="simple-slider-slide">
          <img src="https://via.placeholder.com/1200x400" alt="Ad Mockup 2" />
        </div>
        <div className="simple-slider-slide">
          <img src="https://via.placeholder.com/1200x400" alt="Ad Mockup 3" />
        </div>
      </Slider>
    </div>
  );
}

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
