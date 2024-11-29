import { TOtherLink } from '@/types';
import axios from 'axios';

interface Props {
  isbn: string;
  otherSite: TOtherLink;
}

function LinkButton({ isbn, otherSite }: Props) {
  let url: string;

  if (otherSite === '교보문고') {
    url = `https://www.kyobobook.co.kr/product/detailViewKor.laf?barcode=${isbn}`;
  } else {
    axios
      .get(
        `https://www.yes24.com/Product/searchapi/bulletsearch/goods?query=${isbn}&domain=ALL&page=0`
      )
      .then((res) => res.data)
      .then((res) => {
        url = `https://www.yes24.com/Product/Goods/${res.lstSearchKeywordResult[0].GOODDS_INDEXES.GOODS_NO}`;
      });
  }
  return (
    <button
      className="hover:bg-[#45624E] bg-[#C0CFB2] text-[1.125rem] text-[white] font-[900] rounded-[0.25rem] px-[0.75rem] py-[0.25rem]"
      type="button"
      onClick={() => {
        window.open(url, '_blank');
      }}>
      {otherSite}
    </button>
  );
}

export default LinkButton;
