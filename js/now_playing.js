const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMTY5OThlOWQ3MWIzMGMyNjA5NGIzMjAzMTU5YWRlMSIsInN1YiI6IjY0NzA4OTAxNzI2ZmIxMDBlMWMzMTQ3ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.9aRWYGmmSO_w-LR_sSCNqaiyee3BBj_703_ymo46wzc',
  },
};

function fetchMovies() {
  fetch('https://api.themoviedb.org/3/movie/now_playing?language=ko', options)
    .then((response) => response.json())
    .then((response) => {
      movies = response.results; // 영화 데이터를 배열에 저장
      displayMovies(movies); // 영화 카드 표시 함수 호출
    })
    .catch((err) => console.error(err));
}

// 영화 카드를 표시하는 함수
function displayMovies(movies) {
  const moviesContainer = document.getElementById('movies');

  movies.forEach((movie) => {
    const template = `<div class="movie" onclick="alert(${movie.id})">
                        <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="" />
                        <h2 class="movieName">${movie.title}</h2>
                        <p class="movieSum">${movie.overview}</p>
                        <p class="movieRate">평점 ${movie.vote_average}</p>
                      </div>`;

    moviesContainer.insertAdjacentHTML('beforeend', template);
  });
}

fetchMovies();

// 검색어 입력 시 호출되는 함수
function search() {
  const searchInput = document.getElementById('input');
  const searchText = searchInput.value;
  const moviesContainer = document.getElementById('movies');

  // 기존 영화 카드 삭제
  moviesContainer.innerHTML = ' ';

  if (searchText === '') {
    // 검색어가 없는 경우, 모든 영화를 다시 표시
    displayMovies(movies);
    return;
  }

  const filteredMovies = searchFilter(movies, searchText);
  displayMovies(filteredMovies);
}

// 검색어를 사용하여 영화를 필터링하는 함수
function searchFilter(data, search) {
  const searchKeywords = search.toLowerCase().split(' '); // 검색어 모두 소문자로 전환
  // 공백을 기준으로 분리하여 배열로 반환하는 문자열 메서드
  // 예시) "Hello, world! This is an example." => ["Hello,", "world!", "This", "is", "an", "example."]

  return data.filter((movie) => {
    const movieTitle = movie.title.toLowerCase().replace(/\s/g, ''); // 정규 표현식을 사용하여 문자열에서 모든 공백을 제거하는 문자열 메서드
    // 예시) "The Dark Knight" => "TheDarkKnight"
    return searchKeywords.every((keyword) => movieTitle.includes(keyword));
  });
}

// 검색어 입력 이벤트를 감지하여 실시간으로 검색 실행
function handleSearchInput() {
  const searchInput = document.getElementById('input');
  searchInput.addEventListener('input', function () {
    search();
  });
}

handleSearchInput();

// 클릭 및 엔터 이벤트

document.getElementById('input').addEventListener('keydown', function (event) {
  if (event.key === 'Enter') {
    search();
  }
});
document.getElementById('btn').addEventListener('click', function () {
  search();
});

// 버튼 클릭 시 맨 위로 이동
const topBtn = document.querySelector('.moveTopBtn');
topBtn.onclick = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};
