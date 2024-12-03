import axios from 'axios';

const fetchListData = async (
  queryType: string,
  categoryId: number = 0,
  maxResults: number = 10,
  page: number = 1
) => {
  const response = await axios.get(
    `${import.meta.env.VITE_PROXY_OPEN_API_URL}/aladin/list`,
    {
      params: {
        ttbKey: import.meta.env.VITE_ALADIN_API_KEY,
        QueryType: queryType,
        CategoryId: String(categoryId),
        MaxResults: String(maxResults),
        Start: String(page),
        SearchTarget: 'Book',
        Cover: 'Big',
        output: 'JS',
        Version: '20131101',
      },
    }
  );
  return response.data;
};

export default fetchListData;
