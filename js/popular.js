const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMTY5OThlOWQ3MWIzMGMyNjA5NGIzMjAzMTU5YWRlMSIsInN1YiI6IjY0NzA4OTAxNzI2ZmIxMDBlMWMzMTQ3ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.9aRWYGmmSO_w-LR_sSCNqaiyee3BBj_703_ymo46wzc',
  },
};

//인기
// https://api.themoviedb.org/3/movie/popular?api_key=d16998e9d71b30c26094b3203159ade1&language=ko&page=1
fetch('https://api.themoviedb.org/3/movie/popular?language=ko&page=1', options)
  .then((response) => response.json())
  .then((data) => {
    const moviesContainer = document.getElementById('movies');

    while (moviesContainer.firstChild) {
      moviesContainer.removeChild(moviesContainer.firstChild);
    }

    data.results.forEach((movie) => {
      const card = createMovieCard(movie);
      moviesContainer.appendChild(card);
    });
  })
  .catch((err) => console.error(err));

function createMovieCard(movie) {
  // 카드 요소 생성
  const card = document.createElement('div');
  card.classList.add('movie');

  // 포스터 이미지
  const posterUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
  const poster = document.createElement('img');
  poster.src = posterUrl;
  poster.alt = movie.title;
  card.appendChild(poster);

  // 제목
  const title = document.createElement('h2');
  title.textContent = movie.title;
  card.appendChild(title);

  // 줄거리
  const overview = document.createElement('p');
  overview.textContent = movie.overview;
  card.appendChild(overview);

  // 평점
  const voteAverage = document.createElement('p');
  voteAverage.textContent = `평점 ${movie.vote_average}`;
  card.appendChild(voteAverage);

  return card;
}
