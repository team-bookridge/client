import '@/App.css';
import { TModal } from '@/types';
import Footer from '@components/app/Footer';
import Header from '@components/app/Header';
import HeaderMenuModal from '@components/modal/HeaderMenuModal';
import LoginModal from '@components/modal/LoginModal';
import SetNickNameModal from '@components/modal/SetNickNameModal';
import BookDetail from '@pages/BookDetail';
import Home from '@pages/Home';
import BestSeller from '@pages/list/BestSeller';
import EditorChoice from '@pages/list/EditorChoice';
import NewBook from '@pages/list/NewBook';
import MyPage from '@pages/MyPage';
import Search from '@pages/Search';
import WishList from '@pages/WishList';
import { useState } from 'react';

import { Route, Routes } from 'react-router-dom';

function App() {
  const [modal, setModal] = useState<TModal>('none');

  return (
    <>
      {modal !== 'none' && (
        <div
          className="fixed w-full h-full bg-black/50 z-30 flex justify-center"
          onClick={() => {
            setModal('none');
          }}
          aria-hidden="true">
          {modal === 'login' && <LoginModal />}
          {modal === 'setNickName' && <SetNickNameModal />}
          {modal === 'HeaderMenu' && <HeaderMenuModal />}
        </div>
      )}
      <Header setModal={setModal} />
      <div className="flex flex-col w-[64rem] gap-6 px-[1.25rem] pt-[5rem]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/BestSeller" element={<BestSeller />} />
          <Route path="/NewBook" element={<NewBook />} />
          <Route path="/EditorChoice" element={<EditorChoice />} />
          <Route path="/Search" element={<Search />} />
          <Route path="/MyPage" element={<MyPage setModal={setModal} />} />
          <Route path="/MyPage/WishList" element={<WishList />} />
          <Route path="/BookDetail/:itemId" element={<BookDetail />} />
        </Routes>
        <Footer />
      </div>
    </>
  );
}

export default App;
