import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '22659377-0dd97b237805bca735c774318';

export async function fetchPhotos(searchName, currentPage) {
  const parameters = `?q=${searchName}&page=${currentPage}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`;
  const url = BASE_URL + parameters;

  // return fetch(
  //   `https://pixabay.com/api/?q=${searchName}&page=1&key=22659377-0dd97b237805bca735c774318&image_type=photo&orientation=horizontal&per_page=12`,
  // ).then(response => {
  //   if (response.ok) {
  //     return response.json();
  //   }

  //   return Promise.reject(new Error(`No result with name ${searchName}`));
  // });

  // AXIOS
  const response = await axios.get(url);

  return response.data;
}
