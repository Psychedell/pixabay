import axios from 'axios';
import { Notify } from 'notiflix';
import createCardsMarkup from './templates/image-card.hbs';

// console.log(createCardsMarkup());

const getImages = (query, page) => {
  const KEY = '29675773-14c39cfbd09e94e65f3c5c74b';
  const BASE_URL = 'https://pixabay.com/api/';

  return axios
    .get(
      `${BASE_URL}?key=${KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=40`
    )
    .then(res => console.log(res.data));
};

getImages(dog, 1).then(createCardsMarkup());

const form = document.querySelector('.search-form');
const input = document.querySelector('input');
const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');

let page = 1;

form.addEventListener('sumbit', onSearchSubmit);

function onSearchSubmit(evt) {
  evt.preventDefault();

  const searchQuery = evt.target.searchQuery.value;

  getImages(searchQuery, page);
  // gallery.insertAdjacentHTML('beforeend', createCardsMarkup());
}
