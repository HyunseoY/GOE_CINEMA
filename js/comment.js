// 유저이름, 코멘트, 유효성 검사(확인 비밀번호)
// 삭제, 수정도 할 수 있으려나..

const commentForm = document.getElementById('commentForm');
const commentList = document.getElementById('commentList');

commentForm.addEventListener('submit', saveComment);
displayComments();

// 코멘트 표시 (1)
function displayComments() {
  const comments = JSON.parse(localStorage.getItem('comments')) || [];
  commentList.innerHTML = comments.length
    ? comments
        .map((comment, index) => createCommentHTML(comment, index))
        .join('')
    : '저장된 댓글이 없습니다.';
}

// 코멘트 표시 (2)
function createCommentHTML(comment, index) {
  return `
                <div>
                  유저 이름: ${comment.username}<br>
                  코멘트: ${comment.comment}<br>
                  <button onclick="editComment(${index})">댓글 수정</button>
                  <button onclick="deleteComment(${index})">댓글 삭제</button>
                </div>
              `;
}

// 새 코멘트 저장
function saveComment(event) {
  event.preventDefault();
  const username = document.getElementById('username').value;
  const comment = document.getElementById('comment').value;
  const password = document.getElementById('password').value;
  const comments = JSON.parse(localStorage.getItem('comments')) || [];
  comments.push({ username, comment, password });
  localStorage.setItem('comments', JSON.stringify(comments));
  commentForm.reset();
  displayComments();
}

// 코멘트 수정
function editComment(index) {
  const comments = JSON.parse(localStorage.getItem('comments')) || [];
  const comment = comments[index];
  const password = prompt('비밀번호를 입력하세요:');
  if (password === comment.password) {
    const updatedComment = prompt('수정할 댓글을 입력하세요:', comment.comment);
    if (updatedComment !== null) {
      comment.comment = updatedComment;
      localStorage.setItem('comments', JSON.stringify(comments));
      displayComments();
    }
  } else {
    alert('비밀번호가 일치하지 않습니다.');
  }
}

//코멘트 삭제
function deleteComment(index) {
  const comments = JSON.parse(localStorage.getItem('comments')) || [];
  const comment = comments[index];
  const password = prompt('비밀번호를 입력하세요:');
  if (password === comment.password) {
    comments.splice(index, 1);
    localStorage.setItem('comments', JSON.stringify(comments));
    displayComments();
  } else {
    alert('비밀번호가 일치하지 않습니다.');
  }
}

// 키값이 균일x

// const a = {
//   key: 'value',
//   comments: [],
// };

// localStorage.setItem('key', 'value');
// localStorage.getItem('key'); // 'value' | undefined

// const comment = {
//   user: 'user',
//   comment: 'comment',
// };

// const comments = [comment, comment, comment, comment];

// localStorage.setItem('comments', JSON.stringify(comments));
