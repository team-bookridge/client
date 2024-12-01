import { TResponseBookItemInfo } from '@/types';
import escapeHTML from '@/utils/escapeHTML';
import LinkButton from '@components/common/LinkButton';
import { Link } from 'react-router-dom';

interface Props {
  bookInfo: TResponseBookItemInfo;
}

function BookItem({ bookInfo }: Props) {
  return (
    <div className="flex flex-col gap-[1.5rem] px-[0.5rem] py-[1rem] w-[100%] border-b-2 border-[#C0CFB2]">
      <div className="flex h-[16.5rem] gap-[1rem]">
        <div className="min-w-[9rem] max-w-[9rem]">
          <Link to={`/BookDetail/${bookInfo.itemId}`}>
            <img
              className="w-[100%]"
              src={bookInfo.cover}
              alt={bookInfo.title}
            />
          </Link>
        </div>
        <div className="flex flex-col gap-[0.25rem] flex-grow max-h-[19.5]">
          <div className="min-h-[3.25rem]">
            <Link
              className="hover:underline text-start line-clamp-2 pb-[0.25rem] font-[900]"
              to={`/BookDetail/${bookInfo.itemId}`}>
              {bookInfo.title}
            </Link>
          </div>
          <p className="line-clamp-1 text-gray-700">{bookInfo.author}</p>
          <p className="line-clamp-1 text-gray-700">
            {bookInfo.publisher} (출판사)
          </p>
          <p className="text-gray-700">{bookInfo.pubDate}</p>
          <p className="text-gray-700">{bookInfo.priceStandard}원</p>
          <p className="w-[100%] line-clamp-4 text-gray-700">
            {bookInfo.description !== '' && escapeHTML(bookInfo.description)}
          </p>
        </div>
      </div>
      <div className="w519px:justify-start w519px:ml-[10rem] flex justify-center gap-[1.5rem]">
        <LinkButton bookInfo={bookInfo} siteName="알라딘" />
        <LinkButton bookInfo={bookInfo} siteName="교보문고" />
        <LinkButton bookInfo={bookInfo} siteName="예스24" />
      </div>
    </div>
  );
}

export default BookItem;
