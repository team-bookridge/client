type BookListProps = {
  headerCategory: string;
};

function BookList({ headerCategory }: BookListProps) {
  /* 
    TODO: headerCategory의 값에 따라 API 요청 쿼리가 달라지도록 해서
    3개의 페이지를 구현되도록..
  */
  return <div>{headerCategory}</div>;
}

export default BookList;
