import axios from 'axios';

const fetchSearchData = async (
  baseUrl: string,
  apiKey: string,
  query: string,
  page: number = 1
) => {
  const response = await axios.get(
    `${baseUrl}/ItemSearch.aspx?ttbKey=${apiKey}&Query=${query}&Sort=Accuracy&QueryType=Keyword&SearchTarget=Book&Start=${page}&Cover=Big&output=JS&Version=20131101`
  );
  return response.data;
};

export default fetchSearchData;
