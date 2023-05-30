const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMTY5OThlOWQ3MWIzMGMyNjA5NGIzMjAzMTU5YWRlMSIsInN1YiI6IjY0NzA4OTAxNzI2ZmIxMDBlMWMzMTQ3ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.9aRWYGmmSO_w-LR_sSCNqaiyee3BBj_703_ymo46wzc',
  },
};

fetch(
  'https://api.themoviedb.org/3/movie/now_playing?language=ko&page=1',
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

for (let i = 0; i < movies.length; i++) {
  document.querySelectorAll('#movies')[i].innerText = movies[i].title;
}

function searchFilter(data, search) {
  // data 값을 하나하나 꺼내와서
  return data.map((d) => {
    // 만약 해당 데이터가 search 값을 가지고 있다면 리턴한다.
    if (d.includes(search)) {
      return d;
    }
  });
}

// search 버튼 클릭 시 호출되는 함수
function search() {
  // 폼에 입력된 값

  let text = document.getElementById('input').value;

  // res [undefined, {id:, name: favorites:}, undefined] 이런식으로 리턴
  // 따라서 undefined 값을 제거해줘야하기 때문에 filter 메소드 적용
  let res = searchFilter(movies, text).filter((d) => d !== undefined);

  // 결과 값 화면 출력
  document.getElementById('movies').innerText = res.join(', ');
}

// 클릭 시 search 함수 호출
document.getElementById('btn').addEventListener('click', search);
