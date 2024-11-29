import axios from 'axios';

const fetchDetailData = async (ItemId: string | undefined) => {
  const response = await axios.get(
    `${import.meta.env.VITE_ALADIN_API_URL}/ItemLookUp.aspx?ttbKey=${import.meta.env.VITE_ALADIN_API_KEY}&ItemId=${ItemId}&ItemIdType=ItemId&SearchTarget=Book&Cover=Big&output=JS&Version=20131101`
  );
  return response.data;
};

export default fetchDetailData;
