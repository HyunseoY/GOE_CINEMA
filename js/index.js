import { displayResults } from './movie.js';
import { options } from './movie.js';

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
    // 초기 카드 배치
    let cards = document.querySelector('.cards');
    let movie = document.querySelectorAll('.movie'); // NodeList를 배열로 변환

    makeClone();

    function makeClone() {
      // 뒤에 복제
      for (let i = 0; i < 6; i++) {
        let cloneSlide =
          // a.cloneNode() a요소를 그대로 복사
          // a.cloneNode(true) a요소에 자식요소까지 모두 복사
          movie[i].cloneNode(true);
        cloneSlide.classList.add('clone');
        cards.appendChild(cloneSlide);
      }

      updateWidth();
      setTimeout(function () {
        cards.classList.add('animated');
      }, 100);
    }
  })
  .catch((err) => console.error(err));

function createMovieCard(movie) {
  // 카드 요소 생성
  const card = document.createElement('div');
  card.classList.add('movie');
  cards.onclick = () => showMovieDetail(movie.id);

  // 포스터 이미지
  const poster = document.createElement('img');
  poster.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
  poster.alt = movie.title;
  card.appendChild(poster);

  return card;
}

// 클릭 시 인기영화 페이지로 이동
function showMovieDetail() {
  window.location.href = '../popular/popular.html';
}

// 여기부터 슬라이드 관련 함수들
let cards = document.querySelector('.cards');
let movie = document.querySelectorAll('.movie');
let currentIdx = 0;
let slideCount = movie.length;
let slideWidth = 246.66;
let slideMargin = 20;

// 복제된 새로운 배열의 길이를 구하는 함수
function updateWidth() {
  let currentSlides = document.querySelectorAll('.movie');
  let newSlideCount = currentSlides.length;

  let newWidth =
    (slideWidth + slideMargin) * newSlideCount - slideMargin + 'px';
  cards.style.width = newWidth;
}

// 슬라이드 이동 함수
function moveSlide(num) {
  cards.style.left = -num * (slideWidth + slideMargin) + 'px';
  currentIdx = num;

  // 슬라이드가 끝에 도달하면 다시 처음으로 이동
  if (currentIdx == 20) {
    setTimeout(function () {
      cards.classList.remove('animated');
      cards.style.left = '0px';
      currentIdx = 0;
    }, 1000);
    setTimeout(function () {
      cards.classList.add('animated');
    }, 1050);
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

cards.addEventListener('mouseover', function () {
  stopSlide();
});

cards.addEventListener('mouseout', function () {
  autoSlide();
});

//메인 검색창
function mainSearchInput() {
  const submit = document.querySelector('.test');
  submit.addEventListener('submit', (event) => {
    event.preventDefault();

    const searchTerm = document.getElementById('input').value;
    const apiKey = '284209be9689b7bc72600c5c499ce6d3';
    const apiUrl =
      'https://api.themoviedb.org/3/search/movie?language=ko&page=1=api_key=' +
      apiKey +
      '&query=' +
      searchTerm;

    fetch(apiUrl, options)
      .then((response) => response.json())
      .then((data) => {
        console.log(data.results);
        displayResults(data.results);
      })
      .catch((error) => {
        console.error('에러 발생:', error);
      });
  });

  const movieList = document.querySelector('.newCards');
  movieList.addEventListener('click', ({ target }) => {
    const movieItem = target.closest('div');
    location.replace('/sub.html?id=' + movieItem.id);
  });
}
mainSearchInput();

// 아이콘 search
const searchEl = document.querySelector('.search');
const searchInputEl = searchEl.querySelector('input');

searchEl.addEventListener('click', function () {
  searchInputEl.focus();
});

searchInputEl.addEventListener('focus', function () {
  searchEl.classList.add('focused');
  searchInputEl.setAttribute('placeholder', '검색어를 입력해주세요  ');
});

searchInputEl.addEventListener('blur', function () {
  searchEl.classList.remove('focused');
  searchInputEl.setAttribute('placeholder', '');
});
