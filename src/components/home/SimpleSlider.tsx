import Slider from 'react-slick';
import SimpleSilderArrow from '@components/home/SimpleSilderArrow';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '@/styles/simpleslider.css';

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
    prevArrow: (
      <SimpleSilderArrow className="simple-slider-prev" onClick={() => {}} />
    ),
    nextArrow: (
      <SimpleSilderArrow className="simple-slider-next" onClick={() => {}} />
    ),
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
