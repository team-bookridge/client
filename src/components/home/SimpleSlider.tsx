import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../../simpleslider.css';

interface ArrowProps {
  className: string;
  style: React.CSSProperties;
  onClick: () => void;
}

const Arrow: React.FC<ArrowProps> = ({ className, style, onClick }) => {
  const isPrev = className.includes('slick-prev');
  return (
    <div
      className={`simple-slider-${isPrev ? 'prev' : 'next'}`}
      style={style}
      onClick={onClick}>
      <span>{isPrev ? '<' : '>'}</span>
    </div>
  );
};

function SimpleSlider() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: <Arrow className="slick-prev" style={{}} onClick={() => {}} />,
    nextArrow: <Arrow className="slick-next" style={{}} onClick={() => {}} />,
  };

  return (
    <div className="simple-slider-container">
      <Slider {...settings}>
        <div className="simple-slider-slide">
          <img src="https://via.placeholder.com/300x100" alt="Ad Mockup 1" />
        </div>
        <div className="simple-slider-slide">
          <img src="https://via.placeholder.com/300x100" alt="Ad Mockup 2" />
        </div>
        <div className="simple-slider-slide">
          <img src="https://via.placeholder.com/300x100" alt="Ad Mockup 3" />
        </div>
      </Slider>
    </div>
  );
}

export default SimpleSlider;
