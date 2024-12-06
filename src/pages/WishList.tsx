import { useEffect, useState } from 'react';

interface Book {
  id: number;
  title: string;
  author: string;
}

function WishList(): JSX.Element {
  const [books, setBooks] = useState<Book[]>([]); // 초기 상태를 빈 배열로 설정
  const [selectAll, setSelectAll] = useState<boolean>(false);
  const [selectedBooks, setSelectedBooks] = useState<Set<number>>(new Set());

  useEffect(() => {
    // 컴포넌트가 마운트될 때 localStorage에서 찜 목록 불러오기
    const storedWishList = JSON.parse(localStorage.getItem('wishList') || '[]');
    setBooks(storedWishList);
  }, []);

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedBooks(new Set());
    } else {
      const allIds = books.map((book) => book.id);
      setSelectedBooks(new Set(allIds));
    }
    setSelectAll(!selectAll);
  };

  const handleSelect = (id: number) => {
    const updatedSelection = new Set(selectedBooks);
    if (updatedSelection.has(id)) {
      updatedSelection.delete(id);
    } else {
      updatedSelection.add(id);
    }
    setSelectedBooks(updatedSelection);
    setSelectAll(updatedSelection.size === books.length);
  };

  const handleDelete = () => {
    const remainingBooks = books.filter((book) => !selectedBooks.has(book.id));
    setBooks(remainingBooks);
    setSelectedBooks(new Set());
    setSelectAll(false);

    // 변경된 찜 목록을 localStorage에 저장
    localStorage.setItem('wishList', JSON.stringify(remainingBooks));
  };

  return (
    <div className="bg-gray-100 min-h-screen p-4">
      <h2 className="text-xl font-bold border-b pb-2 mb-4">찜 목록</h2>
      <div className="flex items-center gap-2 mb-4">
        <input type="checkbox" checked={selectAll} onChange={handleSelectAll} />
        <span className="text-sm">찜한 도서</span>
        <button
          type="button"
          onClick={handleDelete}
          className="ml-auto bg-gray-400 text-white px-4 py-2 rounded">
          삭제
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {books.map((book) => (
          <div
            key={book.id}
            className="border rounded-lg p-4 bg-gray-200 flex items-start gap-2">
            <input
              type="checkbox"
              checked={selectedBooks.has(book.id)}
              onChange={() => handleSelect(book.id)}
              className="mt-1"
            />
            <div className="flex-shrink-0 w-16 h-24 bg-gray-300" />
            <div>
              <p className="font-bold">{book.title}</p>
              <p className="text-sm text-gray-600">{book.author}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default WishList;
