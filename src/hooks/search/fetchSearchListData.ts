import axios from 'axios';

const fetchSearchListData = async (
  query: string,
  page: number = 1,
  maxResults: number = 5
) => {
  const response = await axios.get(
    `${import.meta.env.VITE_PROXY_OPEN_API_URL}/aladin/search`,
    {
      params: {
        ttbKey: import.meta.env.VITE_ALADIN_API_KEY,
        Query: query,
        QueryType: 'Keyword',
        Start: String(page),
        MaxResults: maxResults,
        Sort: 'Accuracy',
        SearchTarget: 'Book',
        Cover: 'Big',
        Output: 'JS',
        Version: '20131101',
      },
    }
  );
  return response.data;
};

export default fetchSearchListData;
