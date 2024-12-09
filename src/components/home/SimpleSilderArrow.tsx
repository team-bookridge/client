interface Props {
  className: string;
  onClick: () => void;
}

// 슬라이더의 화살표 버튼 컴포넌트 정의
function SimpleSilderArrow({ className, onClick }: Props) {
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

export default SimpleSilderArrow;
