import { todos as initialTodos } from './todoData.js';

let todos;
try {
  todos = JSON.parse(localStorage.getItem('todos')) || initialTodos;
} catch (e) {
  todos = initialTodos; 
}

let currentFilter = 'all';        
let currentPriority = 'all';      

const todoBody = document.getElementById('todo-body');
const selectAllCheckbox = document.getElementById('select-all');
const inputField = document.getElementById('input-field');
const addBtn = document.getElementById('add-btn');
const selectedPriority = document.getElementById('selected-priority');

// 중요도 필터 선택
document.querySelectorAll('#select-dropdown li').forEach(item => {
  item.addEventListener('click', () => {
    currentPriority = item.dataset.priority;
    selectedPriority.textContent = currentPriority;
  });
});

// 로컬 스토리지에 todos 데이터를 저장하는 함수
function saveTodos() {
  localStorage.setItem('todos', JSON.stringify(todos));
}

// 필터링된 todos 목록을 반환하는 함수
function getFilteredTodos() {
  return todos.filter(todo => {
    const statusMatch =
      currentFilter === 'all' ||
      (currentFilter === 'completed' && todo.completed) ||
      (currentFilter === 'incomplete' && !todo.completed);

    const priorityMatch =
      currentPriority === 'all' ||
      String(todo.priority) === String(currentPriority);

    return statusMatch && priorityMatch;
  });
}

// todos를 화면에 렌더링하는 함수
function renderTodos() {
  todoBody.innerHTML = "";
  const filteredTodos = getFilteredTodos();

  filteredTodos.forEach((todo, index) => {
    const tr = document.createElement("tr");
    tr.setAttribute("draggable", true);
    tr.dataset.index = index; 

    tr.innerHTML = `
      <td><input type="checkbox" class="row-checkbox" data-index="${index}"></td>
      <td>${todo.priority}</td>
      <td>${todo.completed ? "✅" : "❌"}</td>
      <td>${todo.title}</td>
    `;

    todoBody.appendChild(tr);
  });

  updateSelectAllState();
  enableRowCheckboxEvents();
}

// 체크박스의 선택 상태에 따라 '전체 선택' 체크박스를 업데이트하는 함수
function updateSelectAllState() {
  const rowCheckboxes = document.querySelectorAll(".row-checkbox");
  const checkedCount = [...rowCheckboxes].filter(cb => cb.checked).length;
  selectAllCheckbox.checked = checkedCount === rowCheckboxes.length && rowCheckboxes.length > 0;
}

// 개별 체크박스 이벤트를 활성화하는 함수
function enableRowCheckboxEvents() {
  const rowCheckboxes = document.querySelectorAll(".row-checkbox");
  rowCheckboxes.forEach(checkbox => {
    checkbox.addEventListener("change", () => {
      updateSelectAllState();
    });
  });
}

// '전체 선택' 체크박스 클릭 이벤트
selectAllCheckbox.addEventListener("change", (e) => {
  const rowCheckboxes = document.querySelectorAll(".row-checkbox");
  rowCheckboxes.forEach(cb => {
    cb.checked = e.target.checked;
  });
  updateSelectAllState();
});

// 드래그 앤 드롭 기능 활성화
function enableDrag() {
  let dragged;

  todoBody.addEventListener("dragstart", (e) => {
    if (e.target.tagName === "TR") {
      dragged = e.target;
      e.target.classList.add("dragging");
    }
  });

  todoBody.addEventListener("dragover", (e) => {
    e.preventDefault();
    const draggingOver = [...todoBody.children].find(
      el => e.clientY < el.getBoundingClientRect().top + el.offsetHeight / 2
    );
    if (draggingOver && draggingOver !== dragged) {
      todoBody.insertBefore(dragged, draggingOver);
    } else if (!draggingOver) {
      todoBody.appendChild(dragged);
    }
  });

  todoBody.addEventListener("drop", () => {
    const newOrder = [...todoBody.children].map(row => {
      const originalIndex = +row.dataset.index;
      return todos[originalIndex];
    });
    todos = newOrder;
    saveTodos();
    renderTodos();
    enableDrag();
  });

  todoBody.addEventListener("dragend", (e) => {
    e.target.classList.remove("dragging");
  });
}

// 필터 버튼 이벤트 처리
document.getElementById('filter-all').addEventListener('click', () => {
  currentFilter = 'all';
  renderTodos();
});
document.getElementById('filter-completed').addEventListener('click', () => {
  currentFilter = 'completed';
  renderTodos();
});
document.getElementById('filter-incomplete').addEventListener('click', () => {
  currentFilter = 'incomplete';
  renderTodos();
});

// 중요도 필터 이벤트 처리
document.querySelectorAll('#priority-dropdown li').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    currentPriority = e.target.dataset.priority;
    renderTodos();
  });
});

addBtn.addEventListener("click", () => {
  const title = inputField.value.trim();

  if (!title || currentPriority === "all") {
    alert("할 일과 중요도를 입력하세요!");
    return;
  }
  
  const newTodo = {
    title,
    completed: false,
    priority: Number(currentPriority),
  };

  todos.push(newTodo);
  saveTodos();
  renderTodos();

  inputField.value = "";
  selectedPriority.textContent = "all";
  currentPriority = "all";
});

renderTodos();
enableDrag();