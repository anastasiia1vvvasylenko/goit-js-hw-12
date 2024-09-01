import axios from 'axios';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const API_KEY = '45506482-0746cd613ccb32219c9653431';
const BASE_URL = 'https://pixabay.com/api/';

export async function fetchPhotos(query, page = 1, perPage = 15) {
  if (!query.trim()) {
    iziToast.error({
      message: 'Please enter a search query!',
      position: 'topRight',
    });
    return [];
  }

  const axiosOptions = {
    params: {
      key: API_KEY,
      q: query,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: 'true',
      per_page: perPage,
      page: page,
    },
  };

  try {
    document.querySelector('.loader').classList.remove('hidden');
    const response = await axios.get(BASE_URL, axiosOptions);
    const data = response.data;

    if (data.hits.length === 0) {
      iziToast.error({
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        position: 'topRight',
      });
    }
    return data;
  } catch (error) {
    console.log(error);
    iziToast.error({
      message:
        'An error occurred while fetching images. Please try again later.',
      position: 'topRight',
    });
    return [];
  } finally {
    document.querySelector('.loader').classList.add('hidden');
  }
}
