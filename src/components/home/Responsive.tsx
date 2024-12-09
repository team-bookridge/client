import Slider, { Settings } from 'react-slick';
import { TResponseBookItemInfo } from '@/types';
import { Link } from 'react-router-dom';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../../responsive.css';
import Arrow from './Arrow';

// 반응형 슬라이더 컴포넌트
interface ResponsiveProps {
  books: TResponseBookItemInfo[];
}

const Responsive = ({ books }: ResponsiveProps) => {
  // 슬라이더 설정 객체
  const defaultSettings: Settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    centerMode: true,
    centerPadding: '0px',
    prevArrow: <Arrow className="slick-prev" style={{}} onClick={() => {}} />,
    nextArrow: <Arrow className="slick-next" style={{}} onClick={() => {}} />,
    arrows: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 620,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 425,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerPadding: '10px',
          arrows: false,
        },
      },
    ],
  };

  return (
    <div className="responsive-slider-container">
      <Slider {...defaultSettings}>
        {books?.map((book) => (
          <Link
            to={`/BookDetail/${book.itemId}`}
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
              <h3>{book.title}</h3>
              <p>{book.author}</p>
            </div>
          </Link>
        ))}
      </Slider>
    </div>
  );
};

export default Responsive;
