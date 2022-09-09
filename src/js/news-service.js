const API_KEY = '7787a30b48214acfb0cda2e2d14601fd';
const BASE_URL = 'https://newsapi.org/v2/';
const options = {
  headers: {
    Authorization: '7787a30b48214acfb0cda2e2d14601fd',
  },
};

export default class NewsApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  fetchArticles() {
    const url = `${BASE_URL}everything?q=${this.searchQuery}&pageSize=5&page=${this.page}`;

    return fetch(url, options)
      .then(response => response.json())
      .then(({ articles }) => {
        this.incrementPage();

        return articles;
      });
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
