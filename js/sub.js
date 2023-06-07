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

fetch(`https://api.themoviedb.org/3/movie/${id}?language=ko&page=1`, options)
  .then((response) => response.json())
  .then((response) => {
    movies = response;
    displayMovies(movies);
  })
  .catch((err) => console.error(err));

const displayMovies = (movies) => {
  const detailMovie = document.querySelector('.desc-container');

  const template = `<div class="bg-box">
                        <img src="../img/pngegg2.png" alt="영화관 배경" />
                        <div class="desc-box">
                            <div class="movie-img">
                                <img
                                src="https://image.tmdb.org/t/p/w500${movies.poster_path}"
                                alt="포스터"
                                />
                            </div>
                            <div class="movie-desc">
                                <h2>${movies.title}</h2>
                                <p>
                                ${movies.overview}
                                </p>
                                <span><strong>평점 : ${movies.vote_average}</strong></span>
                            </div>
                        </div>
                     </div>`;

  detailMovie.insertAdjacentHTML('beforeend', template);
};
