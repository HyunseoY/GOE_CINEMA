export const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMTY5OThlOWQ3MWIzMGMyNjA5NGIzMjAzMTU5YWRlMSIsInN1YiI6IjY0NzA4OTAxNzI2ZmIxMDBlMWMzMTQ3ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.9aRWYGmmSO_w-LR_sSCNqaiyee3BBj_703_ymo46wzc",
  },
};

// 검색어를 사용하여 영화를 필터링하는 함수
export const searchFilter = (search, movies) => {
  const searchKeywords = search.toLowerCase().split(" ").join("");
  return movies.filter((movie) => {
    const movieTitle = movie.title.toLowerCase().replace(/\s/g, "");
    return movieTitle.includes(searchKeywords);
  });
};

// 영화 카드를 표시하는 함수
export const displayMovies = (movies) => {
  const moviesContainer = document.getElementById("movies");

  movies.forEach((movie) => {
    const template = `<div class="movie" id="${movie.id}">
                              <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="" />
                              <h2 class="movieName">${movie.title}</h2>
                              <p class="movieSum">${movie.overview}</p>
                              <p class="movieRate">평점 ${movie.vote_average}</p>
                            </div>`;

    moviesContainer.insertAdjacentHTML("beforeend", template);
  });
};

// index.html에서 사용하는 함수
export function displayResults(movies) {
  const searchResults = document.getElementById("lists");
  searchResults.innerHTML = " ";

  if (movies.length === 0) {
    alert("검색 결과가 없습니다.");
  } else {
    movies.forEach((movie) => {
      if (movie.poster_path !== null) {
        const template = `<div class="newMovieCard" onclick="alert(${movie.id})">
                                <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="" />
                                <h2 class="movieName">${movie.title}</h2>
                                <p class="movieSum">${movie.overview}</p>
                                <p class="movieRate">평점 ${movie.vote_average}</p>
                              </div>`;
        const moviesContainer = document.getElementById("container");

        // 기존 영화 카드 삭제
        moviesContainer.innerHTML = " ";
        moviesContainer.style.height = "0";
        moviesContainer.style.overflow = "hidden";
        searchResults.insertAdjacentHTML("beforeend", template);
      }
    });
  }
}
