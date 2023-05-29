const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMTY5OThlOWQ3MWIzMGMyNjA5NGIzMjAzMTU5YWRlMSIsInN1YiI6IjY0NzA4OTAxNzI2ZmIxMDBlMWMzMTQ3ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.9aRWYGmmSO_w-LR_sSCNqaiyee3BBj_703_ymo46wzc',
  },
};

//현재상영
// https://api.themoviedb.org/3/movie/popular?api_key=d16998e9d71b30c26094b3203159ade1&language=ko&page=1
fetch('https://api.themoviedb.org/3/movie/upcoming?language=ko&page=1', options)
  .then((response) => response.json())
  .then((data) => {
    document.getElementById('movies').innerHTML = '';
    document.querySelector('movie').remove();

    data.results.forEach((movie) => {
      temp_html = `<div class="movie">
                    <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="" />
                    <h3 class="movieName">${movie.title}</h3>
                    <p class="movieSum">
                      ${movie.overview}
                    </p>
                    <p class="movieRate">${movie.vote_average}</p>
                    <button class="ditailBtn">detail</button>
                  </div>`;

      document.querySelector('movies').insertAdjacentHTML('movie', temp_html);
    });
  })
  .catch((err) => console.error(err));
