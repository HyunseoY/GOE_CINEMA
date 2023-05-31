const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMTY5OThlOWQ3MWIzMGMyNjA5NGIzMjAzMTU5YWRlMSIsInN1YiI6IjY0NzA4OTAxNzI2ZmIxMDBlMWMzMTQ3ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.9aRWYGmmSO_w-LR_sSCNqaiyee3BBj_703_ymo46wzc',
  },
};

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
  card.onclick = () => showMovieDetail(movie.id);

  // 포스터 이미지
  const poster = document.createElement('img');
  poster.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
  poster.alt = movie.title;
  card.appendChild(poster);

  return card;
}

function showMovieDetail() {
  const url = (href = '../html/popular.html');
  window.location.href = url;
}

let cards = document.querySelector('.cards');
let movie = Array.from(document.querySelectorAll('.movie')); // NodeList를 배열로 변환
let currentIdx = 0;
let slideCount = movie.length;
let slideWidth = 247;
let slideMargin = 20;

// 초기 카드 배치
for (let i = 0; i < slideCount; i++) {
  cards.appendChild(movie[i].cloneNode(true));
}

// 슬라이드 너비 설정
cards.style.width =
  (slideWidth + slideMargin) * slideCount - slideMargin + 'px';

function moveSlide(num) {
  cards.style.left = -num * (slideWidth + slideMargin) + 'px';
  currentIdx = num;

  // 슬라이드가 끝에 도달하면 다시 처음으로 이동
  if (currentIdx === slideCount) {
    setTimeout(function () {
      cards.style.transition = 'none';
      cards.style.left = '0px';
      currentIdx = 0;
    }, 500);

    setTimeout(function () {
      cards.style.transition = '';
    }, 600);
  }
}

let timer = undefined;

function autoSlide() {
  if (timer == undefined) {
    timer = setInterval(function () {
      moveSlide(currentIdx + 1);
    }, 1000);
  }
}

autoSlide();

function stopSlide() {
  clearInterval(timer);
  timer = undefined;
}

cards.addEventListener('mouseenter', function () {
  stopSlide();
});

cards.addEventListener('mouseleave', function () {
  autoSlide();
});
