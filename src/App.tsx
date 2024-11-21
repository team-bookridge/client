import '@/App.css';
import Footer from '@components/app/Footer';
import Header from '@components/app/Header';
import BookDetail from '@pages/BookDetail';
import BookList from '@pages/BookList';
import FavoriteList from '@pages/FavoriteList';
import Home from '@pages/Home';
import MyPage from '@pages/MyPage';
import Search from '@pages/Search';
import { Link, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="flex flex-col text-5xl items-center gap-5">
      <Header />
      <div className="flex gap-5 text-3xl">
        <Link to="/">홈</Link>
        <Link to="/domestic">국내도서</Link>
        <Link to="/overseas">해외도서</Link>
        <Link to="/new">신간도서</Link>
        <Link to="/mypage">마이페이지</Link>
        <Link to="/mypage/favorite">마이페이지/찜목록</Link>
        <Link to="/detail/2">상세정보</Link>
        <Link to="search">검색결과</Link>
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/domestic"
          element={<BookList headerCategory="domestic" />}
        />
        <Route
          path="/overseas"
          element={<BookList headerCategory="overseas" />}
        />
        <Route path="/new" element={<BookList headerCategory="new" />} />
        <Route path="/search" element={<Search />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/mypage/favorite" element={<FavoriteList />} />
        <Route path="/detail/:isbn" element={<BookDetail />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
