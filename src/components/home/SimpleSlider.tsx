import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../../simpleslider.css';

interface ArrowProps {
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}

const Arrow: React.FC<ArrowProps> = ({ className, onClick }) => {
  const isPrev = className?.includes('slick-prev');
  return (
    <div
      className={`simple-slider-${isPrev ? 'prev' : 'next'}`}
      onClick={onClick}>
      {isPrev ? '<' : '>'}
    </div>
  );
};

const SimpleSlider: React.FC = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: false,
    prevArrow: <Arrow className="slick-prev" />,
    nextArrow: <Arrow className="slick-next" />,
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
    <div className="home-simple-slider-container">
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
