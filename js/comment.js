// 유저이름, 코멘트, 유효성 검사(확인 비밀번호)
// 삭제, 수정도 할 수 있으려나..

const commentForm = document.getElementById('commentForm');
const commentList = document.getElementById('commentList');
const movieId = getMovieIdFromURL(); // URL에서 영화 식별자를 가져오는 함수

commentForm.addEventListener('submit', saveComment);
displayComments();

// 코멘트 표시
function displayComments() {
  const comments = getCommentsForMovie(movieId);
  commentList.innerHTML = comments.length
    ? comments
        .map((comment, index) => createCommentHTML(comment, index))
        .join('')
    : '저장된 댓글이 없습니다.';
}

// 코멘트 HTML 생성
function createCommentHTML(comment, index) {
  return `
    <div class="writtenComment">
      <b>${comment.username}</b>${comment.comment}
      <div class="btn">
        <button id="edit" onclick="editComment(${index})"><img src="../img/edit.png" alt="" /></button>
        <button id="delete" onclick="deleteComment(${index})"><img src="../img/delete.png" alt="" /></button>
      </div>
    </div>
  `;
}

// 새 코멘트 저장
function saveComment(event) {
  event.preventDefault();
  const username = document.getElementById('username').value;
  const comment = document.getElementById('comment').value;
  const password = document.getElementById('password').value;
  const comments = getCommentsForMovie(movieId);
  comments.push({ username, comment, password });
  setCommentsForMovie(movieId, comments);
  commentForm.reset();
  displayComments();
}

// 코멘트 수정
function editComment(index) {
  const comments = getCommentsForMovie(movieId);
  const comment = comments[index];
  const password = prompt('비밀번호를 입력하세요:');
  if (password === comment.password) {
    const updatedComment = prompt('수정할 댓글을 입력하세요:', comment.comment);
    if (updatedComment !== null) {
      comment.comment = updatedComment;
      setCommentsForMovie(movieId, comments);
      displayComments();
    }
  } else {
    alert('비밀번호가 일치하지 않습니다.');
  }
}

// 코멘트 삭제
function deleteComment(index) {
  const comments = getCommentsForMovie(movieId);
  const comment = comments[index];
  const password = prompt('비밀번호를 입력하세요:');
  if (password === comment.password) {
    comments.splice(index, 1);
    setCommentsForMovie(movieId, comments);
    displayComments();
  } else {
    alert('비밀번호가 일치하지 않습니다.');
  }
}

// 영화 식별자를 기반으로 해당 영화의 댓글을 가져옴
function getCommentsForMovie(movieId) {
  const commentsJSON = localStorage.getItem(`comments_${movieId}`);
  return commentsJSON ? JSON.parse(commentsJSON) : [];
}

// 영화 식별자를 기반으로 해당 영화의 댓글을 설정
function setCommentsForMovie(movieId, comments) {
  localStorage.setItem(`comments_${movieId}`, JSON.stringify(comments));
}

// 현재 페이지의 URL에서 영화 식별자를 추출
function getMovieIdFromURL() {
  const url = window.location.href;
  const urlParts = url.split('?');
  const movieId = urlParts[urlParts.length - 1];
  return movieId;
}
