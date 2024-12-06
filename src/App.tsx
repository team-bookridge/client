import '@/App.css';
import Header from '@components/app/Header';
import HeaderMenuModal from '@components/modal/HeaderMenuModal';
import LoginModal from '@components/modal/LoginModal';
import SearchModal from '@components/modal/SearchModal';
import SetNickNameModal from '@components/modal/SetNickNameModal';
import BookDetail from '@pages/BookDetail';
import Home from '@pages/Home';
import BestSeller from '@pages/list/BestSeller';
import EditorChoice from '@pages/list/EditorChoice';
import NewBook from '@pages/list/NewBook';
import MyPage from '@pages/MyPage';
import Search from '@pages/Search';
import WishList from '@pages/WishList';
import { Route, Routes } from 'react-router-dom';
import topIcon from '@/assets/top-icon.png';
import scrollToTop from '@/utils/scrollToTop';
import useModalStore from '@/stores/modalStore';
import useLoginStateManagement from '@/hooks/useLoginStateManagement';

function App() {
  const { modal, setModal } = useModalStore((state) => state);

  useLoginStateManagement();
  return (
    <>
      {modal && (
        <div
          className="fixed w-full h-full bg-black/50 z-30 grid"
          onClick={() => {
            setModal(null);
          }}
          aria-hidden="true">
          {modal === 'login' && <LoginModal onClose={() => setModal('')} />}
          {modal === 'setNickName' && <SetNickNameModal />}
          {modal === 'headerMenu' && <HeaderMenuModal />}
          {modal === 'search' && <SearchModal />}
        </div>
      )}
      <Header />
      <div className="flex flex-col w-full h-full max-w-[64rem] px-[1.25rem] pt-[3rem]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/BestSeller" element={<BestSeller />} />
          <Route path="/NewBook" element={<NewBook />} />
          <Route path="/EditorChoice/:categoryId" element={<EditorChoice />} />
          <Route path="/Search" element={<Search />} />
          <Route path="/MyPage" element={<MyPage setModal={setModal} />} />
          <Route path="/MyPage/WishList" element={<WishList />} />
          <Route path="/BookDetail/:itemId" element={<BookDetail />} />
        </Routes>
      </div>
      <button
        className="fixed w-[3rem] bottom-[1rem] right-[1rem] z-10 opacity-30"
        type="button"
        onClick={scrollToTop}>
        <img src={topIcon} alt="탑" />
      </button>
    </>
  );
}

export default App;
