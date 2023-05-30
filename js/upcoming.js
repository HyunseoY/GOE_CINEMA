const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMTY5OThlOWQ3MWIzMGMyNjA5NGIzMjAzMTU5YWRlMSIsInN1YiI6IjY0NzA4OTAxNzI2ZmIxMDBlMWMzMTQ3ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.9aRWYGmmSO_w-LR_sSCNqaiyee3BBj_703_ymo46wzc',
  },
};

function fetchMovies() {
  fetch(
    'https://api.themoviedb.org/3/movie/upcoming?language=ko&page=1',
    options
  )
    .then((response) => response.json())
    .then((response) => {
      response.results.forEach((movie) => {
        let template = `<div class="movie">
                      <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="" />
                      <h2 class="movieName">${movie.title}</h2>
                      <p class="movieSum">${movie.overview}</p>
                      <p class="movieRate">평점 ${movie.vote_average}</p>
                      
                    </div>`;

        document
          .querySelector('#movies')
          .insertAdjacentHTML('beforeend', template);
      });
    })
    .catch((err) => console.error(err));
}

// 검색어를 사용하여 영화를 필터링하는 함수
function searchFilter(data, search) {
  return data.filter((movie) => movie.title.includes(search));
}

// 검색 버튼 클릭 시 호출되는 함수
function search() {
  document.getElementById('movies').innerHTML = '';
  const searchInput = document.getElementById('input');
  const searchText = searchInput.value.trim().toLowerCase();
  if (searchText === '') {
    // 검색어가 없는 경우, 모든 영화를 다시 표시
    fetchMovies();

    return;
  }

  clearMovies(); // 기존 영화 카드 삭제

  fetch(
    'https://api.themoviedb.org/3/movie/upcoming?language=ko&page=1',
    options
  )
    .then((response) => response.json())
    .then((response) => {
      const movies = response.results;
      const filteredMovies = searchFilter(movies, searchText);
      const moviesContainer = document.getElementById('movies');

      filteredMovies.forEach((movie) => {
        const template = `<div class="movie">
                            <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="" />
                            <h2 class="movieName">${movie.title}</h2>
                            <p class="movieSum">${movie.overview}</p>
                            <p class="movieRate">평점 ${movie.vote_average}</p>
                          </div>`;

        moviesContainer.insertAdjacentHTML('beforeend', template);
      });
    })
    .catch((error) => console.error(error));
}

// 기존 영화 카드를 삭제하는 함수
function clearMovies() {
  const moviesContainer = document.getElementById('movies');
  moviesContainer.innerHTML = '';
}

// 검색어 입력 이벤트를 감지하여 실시간으로 검색 실행
function handleSearchInput() {
  const searchInput = document.getElementById('input');
  searchInput.addEventListener('input', function () {
    search();
    clearMovies();
  });
}

// 초기화 및 이벤트 리스너 설정
function initialize() {
  fetchMovies();
  handleSearchInput();
  document
    .getElementById('input')
    .addEventListener('keydown', function (event) {
      if (event.key === 'Enter') {
        event.preventDefault(); // 기본 동작 방지

        search();
      }
    });
}

initialize();
