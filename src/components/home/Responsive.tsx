import React from 'react';
import Slider, { Settings } from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../../slick.css';
import { TResponseBookItemInfo } from '@/types';

interface ResponsiveProps {
  books: TResponseBookItemInfo[];
}

interface ArrowProps {
  className: string;
  style: React.CSSProperties;
  onClick?: () => void;
}

const Arrow: React.FC<ArrowProps> = ({ className, style, onClick }) => {
  return (
    <div
      className={className}
      style={{
        ...style,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'white',
        border: '2px solid white',
        borderRadius: '50%',
        width: '30px',
        height: '30px',
        zIndex: 1,
        cursor: 'pointer',
      }}
      onClick={onClick}>
      <span
        style={{
          color: 'black',
          fontSize: '16px',
          lineHeight: '30px',
          textAlign: 'center',
        }}>
        {className.includes('slick-prev') ? '<' : '>'}
      </span>
    </div>
  );
};

const Responsive: React.FC<ResponsiveProps> = ({ books }) => {
  const settings: Settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    centerMode: true,
    centerPadding: '0px',
    prevArrow: <Arrow className="slick-prev" style={{}} onClick={() => {}} />,
    nextArrow: <Arrow className="slick-next" style={{}} onClick={() => {}} />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 750,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerPadding: '10px',
          arrows: false,
        },
      },
    ],
    afterChange: () => {
      const activeSlides = document.querySelectorAll('.slick-active');
      activeSlides.forEach((slide) => {
        (slide as HTMLElement).blur();
      });
    },
  };

  return (
    <div className="slider-container">
      <Slider {...settings}>
        {books?.map((book) => (
          <div key={book.itemId} className="book-card">
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
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Responsive;
