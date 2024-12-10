import Slider from 'react-slick';
import SimpleSilderArrow from '@components/home/SimpleSilderArrow';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '@/styles/simpleslider.css';
import image1 from './banner1.png';
import image2 from './banner2.png';
import image3 from './banner3.png';

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
    autoplay: true,
    autoplaySpeed: 5000,
    fade: true,
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
    <div className="simple-slider-container">
      <Slider {...settings}>
        <div className="simple-slider-slide">
          <img src={image1} />
        </div>
        <div className="simple-slider-slide">
          <img src={image2} />
        </div>
        <div className="simple-slider-slide">
          <img src={image3} />
        </div>
      </Slider>
    </div>
  );
}

export default SimpleSlider;
