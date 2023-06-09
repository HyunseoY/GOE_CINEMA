const link = document.location.href.split('?');
const urlSearchParamsObject = new URLSearchParams(link[1]);
const id = urlSearchParamsObject.get('id');

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyNzZmYzQyYzYyY2JhMWJmOGNjZWE3NGIzYzY1ZmIxYiIsInN1YiI6IjY0NTBhNjM3ZDcxMDdlMDE0YzZmZDk4MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ispHusWEKA3CalXIEK51_NiqFwzActFVSyietRsLH68',
  },
};
// 영화 장르 id별 리스트를 콘솔에 표시
fetch(
  'https://api.themoviedb.org/3/genre/movie/list?language=ko&page=1',
  options
)
  .then((response) => response.json())
  .then((response) => {
    genre = response;
    console.log(JSON.parse(JSON.stringify(genre)));
  })
  .catch((err) => console.error(err));

fetch(`https://api.themoviedb.org/3/movie/${id}?language=ko&page=1`, options)
  .then((response) => response.json())
  .then((response) => {
    let movies = [];
    movies.push(response);
    displayMovies(movies);
    console.log(JSON.parse(JSON.stringify(movies)));
  })
  .catch((err) => console.error(err));

const displayMovies = (movies) => {
  const detailMovie = document.querySelector('.desc-container');
  const movie = movies[0];
  const movieGenre = movie.genres;
  const genre = movieGenre.map((a) => a.name).join(', ');

  const template = `<div class="bg-box">
                        <img src="../img/pngegg2.png" alt="영화관 배경" />
                        <div class="desc-box">
                            <div class="movie-img">
                                <img
                                src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
                                alt="포스터"
                                />
                                <div class="genre">🎬 ${genre}</div>
                            </div>
                            <div class="movie-desc">
                                <h2>${movie.title}</h2>
                            <p>                            
                                ${movie.overview}
                            </p>                         
                                <span><strong>평점 : ${movie.vote_average}</strong></span>
                            </div>
                     </div>`;

  detailMovie.insertAdjacentHTML('beforeend', template);
};
