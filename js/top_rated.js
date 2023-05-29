const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMTY5OThlOWQ3MWIzMGMyNjA5NGIzMjAzMTU5YWRlMSIsInN1YiI6IjY0NzA4OTAxNzI2ZmIxMDBlMWMzMTQ3ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.9aRWYGmmSO_w-LR_sSCNqaiyee3BBj_703_ymo46wzc',
  },
};

fetch(
  'https://api.themoviedb.org/3/movie/top_rated?language=ko&page=1',
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
