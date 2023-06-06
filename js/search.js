// 검색어 입력 이벤트를 감지하여 실시간으로 검색 실행
function handleSearchInput() {
  const searchInput = document.getElementById("input");
  searchInput.addEventListener("input", function () {
    const searchText = searchInput.value;
    const moviesContainer = document.getElementById("movies");

    // 기존 영화 카드 삭제
    moviesContainer.innerHTML = " ";

    const filteredMovies = searchFilter(searchText);
    displayMovies(filteredMovies);
  });
}

handleSearchInput();
