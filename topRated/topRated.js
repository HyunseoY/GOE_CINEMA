import { searchFilter } from "../js/movie.js";
import { options } from "../js/movie.js";
import { displayMovies } from "../js/movie.js";

let movies = [];

fetch(
  "https://api.themoviedb.org/3/movie/top_rated?language=ko&page=1",
  options
)
  .then((response) => response.json())
  .then((response) => {
    movies = response.results;
    console.log(movies);
    displayMovies(movies);
  })
  .catch((err) => console.error(err));

// 검색어 입력 이벤트를 감지하여 실시간으로 검색 실행
function handleSearchInput() {
  const searchInput = document.getElementById("input");
  searchInput.addEventListener("input", function () {
    const searchText = searchInput.value;
    const moviesContainer = document.getElementById("movies");

    // 기존 영화 카드 삭제
    moviesContainer.innerHTML = " ";

    const filteredMovies = searchFilter(searchText, movies);
    displayMovies(filteredMovies);
  });
}

handleSearchInput();

// 버튼 클릭 시 맨 위로 이동
const topBtn = document.querySelector(".moveTopBtn");
topBtn.onclick = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};
