// import pokemonCard from './templates/image-card.hbs';
// import { Notify } from 'notiflix';

// const form = document.querySelector('.search-form');
// const input = document.querySelector('input');
// const gallery = document.querySelector('.gallery');
// const loadMoreBtn = document.querySelector('.load-more');

// form.addEventListener('submit', searchPokemon);

// function searchPokemon(evt) {
//   evt.preventDefault();

//   const search = evt.target.elements.searchQuery.value;
//   fetchPokemon(search)
//     .then(renderPokemonCard)
//     .catch(onFetchEror)
//     .finally(() => form.reset());
// }

// function fetchPokemon(id) {
//   return fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then(response => {
//     return response.json();
//   });
// }

// function renderPokemonCard(pokemon) {
//   const markup = pokemonCard(pokemon);
//   gallery.innerHTML = markup;
// }

// function onFetchEror(error) {
//   console.log(error);
//   Notify.failure('Pokemon not found, please change enter new name.');
// }

// HOMEWORK 11 !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

// import axios from 'axios';
// import { Notify } from 'notiflix';
// import createCardsMarkup from './templates/image-card.hbs';

// // console.log(createCardsMarkup());

// const getImages = (query, page) => {
//   const KEY = '29675773-14c39cfbd09e94e65f3c5c74b';
//   const BASE_URL = 'https://pixabay.com/api/';

//   return axios
//     .get(
//       `${BASE_URL}?key=${KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=40`
//     )
//     .then(res => console.log(res.data));
// };

// getImages(dog, 1).then(createCardsMarkup());

// const form = document.querySelector('.search-form');
// const input = document.querySelector('input');
// const gallery = document.querySelector('.gallery');
// const loadMoreBtn = document.querySelector('.load-more');

// let page = 1;

// form.addEventListener('sumbit', onSearchSubmit);

// function onSearchSubmit(evt) {
//   evt.preventDefault();

//   const searchQuery = evt.target.searchQuery.value;

//   getImages(searchQuery, page);
//   // gallery.insertAdjacentHTML('beforeend', createCardsMarkup());
// }

// https://newsapi.org/docs/endpoints/everything  !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

// const KEY = '7787a30b48214acfb0cda2e2d14601fd';

// import { Notify } from 'notiflix';
// import NewsApiService from './js/news-service';
// import articlesTpl from './templates/image-card.hbs';

// // const BASE_URL = 'https://newsapi.org/v2/everything?q=cat';

// const form = document.querySelector('.search-form');
// const input = document.querySelector('input');
// const gallery = document.querySelector('.gallery');
// const loadMoreBtn = document.querySelector('.load-more');

// const newsApiService = new NewsApiService();

// console.log(newsApiService);

// form.addEventListener('submit', onSearch);
// loadMoreBtn.addEventListener('click', onLoadMore);

// function onSearch(evt) {
//   evt.preventDefault();

//   newsApiService.query = evt.currentTarget.elements.searchQuery.value;

//   if (evt.currentTarget.elements.searchQuery.value.trim() === '') {
//     return Notify.warning('Please, enter your search request!');
//   }

//   newsApiService.resetPage();
//   newsApiService.fetchArticles().then(articles => {
//     clearArticlesMarkup();
//     appendArticlesMarkup(articles);
//   });
// }

// function onLoadMore() {
//   newsApiService.fetchArticles().then(appendArticlesMarkup);
// }

// function appendArticlesMarkup(articles) {
//   gallery.insertAdjacentHTML('beforeend', articlesTpl(articles));
// }

// function clearArticlesMarkup() {
//   gallery.innerHTML = '';
// }

import filmCard from './templates/image-card.hbs';

export { NewServiceApi };
const key = 'bef2e1469ade062164db331fc6ab2f25';
const url = 'https://api.themoviedb.org/3';

class NewServiceApi {
  constructor() {
    this.searchValue = '';
    this.page = 1;
    this.id = NaN;
  }

  // сервіс  топ популярних фільмів за тиждень
  async serviceMovieTopApi() {
    try {
      const resp = await fetch(
        `${url}/trending/movie/week?api_key=${key}&media_type=all&time_window=week&page=${this.page}`
      );
      const respData = await resp.json();

      return respData;
    } catch (error) {
      console.error(error.message);
    }
  }

  // сервіс пошук фільмів за значенням
  async serviceSearchMovie() {
    try {
      const resp = await fetch(
        `${url}/search/movie?api_key=${key}&query="${this.searchValue}`
      );

      const respData = await resp.json();

      return respData;
    } catch (error) {
      console.error(error.message);
    }
  }

  // сервіс пошку фыльмыв по айді
  async serviceIdMovie(id) {
    try {
      const resp = await fetch(`${url}/movie/${id},?api_key=${key}`);

      const respData = await resp.json();

      return respData;
    } catch (error) {
      console.error(error.message);
    }
  }

  ressetPage() {
    this.page = 1;
  }

  incrementPage() {
    return (this.page += 1);
  }

  decrementPage() {
    return (this.page -= 1);
  }

  set query(nuwQuery) {
    this.searchValue = nuwQuery;
  }

  set pageNumber(nuwPage) {
    this.page = nuwPage;
  }

  set idNumber(nuwId) {
    this.id = nuwId;
  }
}
let STORAGE_KEY = 'filmId';

const newServiceApi = new NewServiceApi();

const watched = document.querySelector('.watched');
const watchedDiv = document.querySelector('.watched__container');
const wachedFilms = document.querySelector('.watched__films');

watched.addEventListener('click', renderWatchPage);

function onBtnWatchedClick() {
  newServiceApi.serviceMovieTopApi().then(renderWatchPage);
}

function renderWatchPage() {
  // watchedDiv.insertAdjacentHTML('beforeend', filmCard);
  // console.log(filmCard);
  console.log(
    newServiceApi.serviceMovieTopApi().then(data => {
      const apiCardId = `film ID: ${data.results[0].id}`;
      // watchedDiv.insertAdjacentHTML('beforeend', apiCardId);

      localStorage.setItem(STORAGE_KEY, JSON.stringify(apiCardId));
      // console.log(testApiCard);
    })
  );
}

const remove = document.querySelector('.remove');
remove.addEventListener('click', localStorageRemove);

function localStorageRemove() {
  localStorage.removeItem(STORAGE_KEY);
}

wachedFilms.addEventListener('click', readLocalStorage);

function readLocalStorage() {
  const localStorageFilm = localStorage.getItem(STORAGE_KEY);
  const parsedStorageFilm = JSON.parse(localStorageFilm);
  watchedDiv.insertAdjacentHTML('beforeend', parsedStorageFilm);

  if (!localStorage.getItem(STORAGE_KEY)) {
    return;
  }
}
