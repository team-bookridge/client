import '@/App.css';
import Footer from '@components/app/Footer';
import Header from '@components/app/Header';
import BookDetail from '@pages/BookDetail';
import Home from '@pages/Home';
import BestSeller from '@pages/list/BestSeller';
import EditorChoice from '@pages/list/EditorChoice';
import NewBook from '@pages/list/NewBook';
import MyPage from '@pages/MyPage';
import Search from '@pages/Search';
import WishList from '@pages/WishList';

import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <>
      <Header />
      <div className="flex flex-col w-[64rem] gap-6 px-[1.25rem] pt-[3.75rem]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/BestSeller" element={<BestSeller />} />
          <Route path="/NewBook" element={<NewBook />} />
          <Route path="/EditorChoice" element={<EditorChoice />} />
          <Route path="/Search" element={<Search />} />
          <Route path="/MyPage" element={<MyPage />} />
          <Route path="/MyPage/WishList" element={<WishList />} />
          <Route path="/BookDetail/:isbn" element={<BookDetail />} />
        </Routes>
        <Footer />
      </div>
    </>
  );
}

export default App;
