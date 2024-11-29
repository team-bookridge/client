function Search() {
  const books = [
    {
      id: 1,
      title: '책1',
      author: '저자 1',
      description: '설명 1',
      price: '₩10,000',
    },
    {
      id: 2,
      title: '책 제목 2',
      author: '저자 2',
      description: '설명 2',
      price: '₩12,000',
    },
    {
      id: 3,
      title: '책 제목 3',
      author: '저자 3',
      description: '설명 3',
      price: '₩15,000',
    },
    {
      id: 4,
      title: '책 제목 4',
      author: '저자 4',
      description: '설명 4',
      price: '₩20,000',
    },
  ];

  return (
    <div className="h-[1000px] p-4 bg-gray-100">
      <div className="text-lg font-medium mb-4">
        &apos;한강&apos;에 대한 {books.length}개의 검색 결과
      </div>
      <div className="space-y-4">
        {books.map((book) => (
          <div
            key={book.id}
            className="flex items-center p-4 border border-gray-300 rounded bg-gray-50">
            {/* <div className="w-24 h-32 bg-gray-300 flex-shrink-0 mr-4"></div> */}

            <div className="flex-grow">
              <div className="text-sm font-medium text-gray-800">
                <p>Title: {book.title}</p>
                <p>Author: {book.author}</p>
                <p>Description: {book.description}</p>
                <p>Price: {book.price}</p>
              </div>
            </div>

            <div className="flex flex-col space-y-2 ml-4">
              <button
                type="button"
                className="w-20 h-10 text-sm bg-gray-200 text-gray-600 rounded border border-gray-300">
                예스 24
              </button>
              <button
                type="button"
                className="w-20 h-10 text-sm bg-gray-200 text-gray-600 rounded border border-gray-300">
                알라딘
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Search;
