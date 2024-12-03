import axios from 'axios';

const fetchSearchListData = async (query: string, page: number = 1) => {
  const response = await axios.get(
    `${import.meta.env.VITE_PROXY_OPEN_API_URL}/aladin/search`,
    {
      params: {
        ttbKey: import.meta.env.VITE_ALADIN_API_KEY,
        Query: query,
        QueryType: 'Keyword',
        Start: String(page),
        Sort: 'Accuracy',
        SearchTarget: 'Book',
        Cover: 'Big',
        output: 'JS',
        Version: '20131101',
      },
    }
  );
  return response.data;
};

export default fetchSearchListData;
