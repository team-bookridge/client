import { TResponseBookItemInfo, TSiteName } from '@/types';
import axios from 'axios';

interface Props {
  bookInfo: TResponseBookItemInfo;
  siteName: TSiteName;
}

function LinkButton({ bookInfo, siteName }: Props) {
  return (
    <button
      className="hover:bg-[#45624E] bg-[#C0CFB2] min-w-[5.5rem] text-[1.125rem] text-[white] font-[900] rounded-[0.25rem] px-[0.25rem] py-[0.25rem]"
      type="button"
      onClick={() => {
        if (siteName === '교보문고') {
          window.open(
            `https://www.kyobobook.co.kr/product/detailViewKor.laf?barcode=${bookInfo.isbn13}`,
            '_blank'
          );
        } else if (siteName === '예스24') {
          axios
            .get(
              `${import.meta.env.VITE_PROXY_OPEN_API_URL}/yes24/goods?query=${bookInfo.isbn13}&domain=ALL&page=0`
            )
            .then((res) => res.data)
            .then((res) => {
              window.open(
                `https://www.yes24.com/Product/Goods/${res.lstSearchKeywordResult[0].GOODDS_INDEXES.GOODS_NO}`,
                '_blank'
              );
            });
        } else {
          window.open(bookInfo.link, '_blank');
        }
      }}>
      {siteName}
    </button>
  );
}

export default LinkButton;
