import axios from 'axios';

const fetchSearchListData = async (query: string, page: number = 1) => {
  const response = await axios.get(
    `${import.meta.env.VITE_ALADIN_API_URL}/ItemSearch.aspx?ttbKey=${import.meta.env.VITE_ALADIN_API_KEY}&Query=${query}&Sort=Accuracy&QueryType=Keyword&SearchTarget=Book&Start=${page}&Cover=Big&output=JS&Version=20131101`
  );
  return response.data;
};

export default fetchSearchListData;
