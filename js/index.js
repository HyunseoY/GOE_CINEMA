const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMTY5OThlOWQ3MWIzMGMyNjA5NGIzMjAzMTU5YWRlMSIsInN1YiI6IjY0NzA4OTAxNzI2ZmIxMDBlMWMzMTQ3ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.9aRWYGmmSO_w-LR_sSCNqaiyee3BBj_703_ymo46wzc',
  },
};

//인기
fetch('https://api.themoviedb.org/3/movie/popular?language=ko&page=1', options)
  .then((response) => response.json())
  .then((data) => {
    const moviesContainer = document.getElementById('movies');

    // 데이터를 HTML로 변환하여 동적으로 생성
    data.results.forEach((movie) => {
      const movieElement = document.createElement('div');
      movieElement.textContent = movie.title;
      moviesContainer.appendChild(movieElement);
    });
  })
  .catch((err) => console.error(err));

//현재상영
fetch(
  'https://api.themoviedb.org/3/movie/now_playing?language=ko&page=1',
  options
)
  .then((response) => response.json())
  .then((response) => console.log(response))
  .catch((err) => console.error(err));

// 높은평점
fetch(
  'https://api.themoviedb.org/3/movie/top_rated?language=ko&page=1',
  options
)
  .then((response) => response.json())
  .then((response) => console.log(response))
  .catch((err) => console.error(err));

// 개봉예정
fetch('https://api.themoviedb.org/3/movie/upcoming?language=ko&page=4', options)
  .then((response) => response.json())
  .then((response) => console.log(response))
  .catch((err) => console.error(err));
