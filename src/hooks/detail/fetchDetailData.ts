import axios from 'axios';

<<<<<<< Updated upstream
const fetchDetailData = async (itemId: string) => {
=======
const fetchDetailData = async (itemId: string | undefined) => {
>>>>>>> Stashed changes
  const response = await axios.get(
    `${import.meta.env.VITE_PROXY_OPEN_API_URL}/aladin/detail`,
    {
      params: {
        ttbKey: import.meta.env.VITE_ALADIN_API_KEY,
        ItemId: itemId,
        ItemIdType: 'ItemId',
        SearchTarget: 'Book',
        Cover: 'Big',
<<<<<<< Updated upstream
        Output: 'JS',
=======
        output: 'JS',
>>>>>>> Stashed changes
        Version: '20131101',
      },
    }
  );
  return response.data;
};

export default fetchDetailData;
