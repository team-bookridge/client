import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../../simpleslider.css';

interface ArrowProps {
  className: string;
  style: React.CSSProperties;
  onClick?: () => void;
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

const SimpleSlider: React.FC = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
    prevArrow: (
      <Arrow className="simple-slider-prev" style={{}} onClick={() => {}} />
    ),
    nextArrow: (
      <Arrow className="simple-slider-next" style={{}} onClick={() => {}} />
    ),
  };

  return (
    <div className="home-simple-slider-container">
      <Slider {...settings}>
        <div className="simple-slider-slide">
          <img
            src="https://plus.unsplash.com/premium_photo-1732730224379-8a0805fa27ef?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyfHx8ZW58MHx8fHx8"
            alt="Ad Mockup 1"
          />
        </div>
        <div className="simple-slider-slide">
          <img
            src="https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8JUVEJTk1JTk4JUVEJThBJUI4fGVufDB8fDB8fHww"
            alt="Ad Mockup 2"
          />
        </div>
        <div className="simple-slider-slide">
          <img
            src="https://media.istockphoto.com/id/1973841841/ko/%EC%82%AC%EC%A7%84/%EB%B9%A8%EA%B0%84-%EC%83%89%EA%B9%94-%EC%8B%AC%EC%9E%A5-%EB%AA%A8%EC%96%91-%EC%8A%A4%ED%8B%B0%EC%BB%A4-%EC%84%B8%ED%8A%B8-%EB%B0%B1%EC%83%89-%EB%B0%B0%EA%B2%BD%EC%97%90-%EA%B3%A0%EB%A6%BD%EB%90%98%EC%96%B4-%EC%9E%88%EC%97%88%EB%8B%A4.webp?a=1&b=1&s=612x612&w=0&k=20&c=Y3qLxggHYkleNOtwbkRwqmtBs1B-E_6aWk6HZvcUHv8="
            alt="Ad Mockup 3"
          />
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
