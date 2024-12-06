import { useEffect, useState } from 'react';

type Book = {
  id: number;
  title: string;
  author: string;
};

const DUMMY_BOOKS: Book[] = [
  { id: 1, title: '책 제목 1', author: '작가 1' },
  { id: 2, title: '책 제목 2', author: '작가 2' },
  { id: 3, title: '책 제목 3', author: '작가 3' },
  { id: 4, title: '책 제목 4', author: '작가 4' },
  { id: 5, title: '책 제목 5', author: '작가 5' },
];

type BookItemProps = {
  book: Book;
  checked: boolean;
  onCheck: (id: number) => void;
};

function BookItem({ book, checked, onCheck }: BookItemProps) {
  return (
    <div className="border-[1px] border-[#4F772D] rounded-lg p-[1rem] bg-[#F1F8E9] flex items-start gap-[0.5rem]">
      <input
        type="checkbox"
        checked={checked}
        onChange={() => onCheck(book.id)}
        className="w-5 h-5 border-2 border-[#4F772D] rounded-lg accent-[#4F772D]"
      />
      <div className="flex-shrink-0 w-[4rem] h-[6rem] bg-gray-300" />
      <div>
        <p className="font-bold text-[1rem]">{book.title}</p>
        <p className="text-[0.875rem] text-gray-600">{book.author}</p>
      </div>
    </div>
  );
}

function WishList(): JSX.Element {
  const [books, setBooks] = useState<Book[]>([]);
  const [selectedBooks, setSelectedBooks] = useState<number[]>([]);

  useEffect(() => {
    const storedWishList = JSON.parse(localStorage.getItem('wishList') || '[]');
    if (storedWishList.length > 0) {
      setBooks(storedWishList);
    } else {
      setBooks(DUMMY_BOOKS);
      localStorage.setItem('wishList', JSON.stringify(DUMMY_BOOKS));
    }
  }, []);

  const handleSelectAll = () => {
    if (selectedBooks.length === books.length) {
      setSelectedBooks([]);
    } else {
      setSelectedBooks(books.map((book) => book.id));
    }
  };

  const handleSelect = (id: number) => {
    setSelectedBooks((prev) =>
      prev.includes(id) ? prev.filter((bookId) => bookId !== id) : [...prev, id]
    );
  };

  const handleDelete = () => {
    const remainingBooks = books.filter(
      (book) => !selectedBooks.includes(book.id)
    );
    setBooks(remainingBooks);
    setSelectedBooks([]);
    localStorage.setItem('wishList', JSON.stringify(remainingBooks));
  };

  return (
    <div className="w-full flex justify-center">
      <div className="w-full min-h-[950px] max-w-[64rem]">
        {/* 헤더 */}
        <h2 className="text-[1.5rem] font-bold text-[#4F772D] border-b-4 border-[#C0CFB2] py-[1rem] w-full text-left">
          찜 목록
        </h2>
        {/* 전체 선택 및 삭제 버튼 */}
        <div className="flex items-center pt-6 pb-4 mb-[1rem] w-full">
          <input
            type="checkbox"
            checked={selectedBooks.length === books.length}
            onChange={handleSelectAll}
            className="w-5 h-5 border-2 border-[#4F772D] rounded-lg accent-[#4F772D]"
          />
          <span className="ml-[1rem] text-[1rem]">찜한 도서</span>
          <button
            type="button"
            onClick={handleDelete}
            className="ml-auto bg-[#4F772D] text-white px-[1rem] py-[0.5rem] rounded">
            삭제
          </button>
        </div>
        {/* 책 리스트 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[1.5rem] w-full">
          {books.map((book) => (
            <BookItem
              key={book.id}
              book={book}
              checked={selectedBooks.includes(book.id)}
              onCheck={handleSelect}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default WishList;
