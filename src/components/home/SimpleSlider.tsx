import Slider from 'react-slick';
import SimpleSilderArrow from '@components/home/SimpleSilderArrow';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '@/styles/simpleslider.css';
import banner1 from '@/assets/banner1.png';
import banner2 from '@/assets/banner2.png';
import banner3 from '@/assets/banner3.png';

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
          <img src={banner1} alt="광고 배너1" />
        </div>
        <div className="simple-slider-slide">
          <img src={banner2} alt="광고 배너2" />
        </div>
        <div className="simple-slider-slide">
          <img src={banner3} alt="광고 배너3" />
        </div>
      </Slider>
    </div>
  );
}

export default SimpleSlider;
