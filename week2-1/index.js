// 요소 선택 !!!
const input = document.querySelector('.todo-input');
const addBtn = document.querySelector('.add-btn');
const todoList = document.querySelector('.todo-list');

// 로컬스토리지에서 가져오기
let todos = JSON.parse(localStorage.getItem('todos')) || [];

// 초기화 - 화면에 표시
todos.forEach((todo) => {
  const li = document.createElement('li');
  li.textContent = todo;
  todoList.appendChild(li);
});

// 추가 버튼 클릭 이벤트
addBtn.addEventListener('click', () => {
  const value = input.value;

  if (!value) return;

  // 리스트에 추가
  const li = document.createElement('li');
  li.textContent = value;
  todoList.appendChild(li);

  // 로컬스토리지에 저장
  todos.push(value);
  localStorage.setItem('todos', JSON.stringify(todos));

  // input 초기화
  input.value = '';
});
