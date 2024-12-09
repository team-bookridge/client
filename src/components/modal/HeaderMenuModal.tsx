import { Link } from 'react-router-dom';

function HeaderMenuModal() {
  return (
    <div
      className="justify-self-center self-end w-[90%] h-[10rem] 
    bg-white rounded-[1rem_1rem_0_0] z-30 animate-slideUpAndFadeIn">
      <div className="w-full h-full flex flex-col text-[1.5rem]">
        <Link
          className="flex-grow flex justify-center items-center border-b-2 rounded-[1rem_1rem_0_0] hover:bg-gray-400"
          to="/BestSeller">
          <span>베스트셀러</span>
        </Link>
        <Link
          className="flex-grow flex justify-center items-center border-b-2 hover:bg-gray-400"
          to="/NewBook">
          <span>신간도서</span>
        </Link>
        <Link
          className="flex-grow flex justify-center items-center hover:bg-gray-400"
          to="/EditorChoice/170">
          <span>편집자추천</span>
        </Link>
      </div>
    </div>
  );
}

export default HeaderMenuModal;
