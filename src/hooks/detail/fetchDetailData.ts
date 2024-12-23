import axios from 'axios';

const fetchDetailData = async (itemId: string) => {
  const response = await axios.get(
    `${import.meta.env.VITE_PROXY_OPEN_API_URL}/aladin/detail`,
    {
      params: {
        ttbKey: import.meta.env.VITE_ALADIN_API_KEY,
        ItemId: itemId,
        ItemIdType: 'ItemId',
        SearchTarget: 'Book',
        Cover: 'Big',
        Output: 'JS',
        Version: '20131101',
      },
    }
  );
  return response.data;
};

export default fetchDetailData;
