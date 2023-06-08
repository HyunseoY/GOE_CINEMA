import { searchFilter } from '/js/movie.js';
import { options } from '/js/movie.js';
import { displayMovies } from '/js/movie.js';

let movies = [];

fetch('https://api.themoviedb.org/3/movie/upcoming?language=ko&page=1', options)
  .then((response) => response.json())
  .then((response) => {
    movies = response.results;
    displayMovies(movies);
  })
  .catch((err) => console.error(err));

function handleSearchInput() {
  const searchForm = document.querySelector('.search-form');
  searchForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const searchInput = document.getElementById('input');
    const searchText = searchInput.value;
    const moviesContainer = document.getElementById('movies');

    // 기존 영화 카드 삭제
    moviesContainer.innerHTML = ' ';

    const filteredMovies = searchFilter(searchText, movies);
    displayMovies(filteredMovies);
  });

  const movieList = document.querySelector('.cards');
  movieList.addEventListener('click', ({ target }) => {
    const movieItem = target.closest('div');
    location.replace('/sub.html?id=' + movieItem.id);
  });
}

handleSearchInput();

// 버튼 클릭 시 맨 위로 이동
const topBtn = document.querySelector('.moveTopBtn');
topBtn.onclick = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};
