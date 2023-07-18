import axios from 'axios';

axios.defaults.headers.common['x-api-key'] =
  'live_aHWerD5kkMlVtWAXNBRTiahIoFmZcVQnZXqfuSxXhTgL7w2G2GHlQ4l1OyZBdl3L';
axios.defaults.baseURL = 'https://api.thecatapi.com/v1/breeds';

export function fetchBreeds() {
  return axios
    .get('https://api.thecatapi.com/v1/breeds')
    .then(response => response.data)
    .catch(error => {
      console.error(error);
      throw error;
    });
}

export function fetchCatByBreeds(breedId) {
  const url = `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`;
  return axios
    .get(url)
    .then(response => response.data)
    .catch(error => {
      console.error(error);
      throw error;
    });
}
