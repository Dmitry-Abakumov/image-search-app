import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';

const searchParams = new URLSearchParams({
  key: '31957804-7ea8105ad7bc82cd0f7ef445f',
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: true,
  per_page: 40,
});

export const fetchImages = async (inputValue, page) => {
  const url = `?${searchParams}&q=${inputValue}&page=${page}`;
  const response = await axios(url);

  return response.data;
};
