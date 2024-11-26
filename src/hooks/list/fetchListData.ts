import axios from 'axios';

const fetchListData = async (
  baseUrl: string,
  apiKey: string,
  queryType: string,
  categoryId: number = 0,
  page: number = 1
) => {
  const response = await axios.get(
    `${baseUrl}/ItemList.aspx?ttbKey=${apiKey}&QueryType=${queryType}&SearchTarget=Book&CategoryId=${categoryId}&Start=${page}&Cover=Big&output=JS&Version=20131101`
  );
  return response.data;
};

export default fetchListData;
