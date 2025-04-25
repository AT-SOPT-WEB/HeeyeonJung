import { todos as initialTodos } from './todoData.js';

let todos;
try {
  const saved = JSON.parse(localStorage.getItem('todos'));
  todos = saved && Array.isArray(saved) ? saved : initialTodos;

  if (!saved) {
    saveTodos(); 
  }
} catch (e) {
  todos = initialTodos;
  saveTodos(); 
}

let currentFilter = 'all';
let currentPriority = 'all';

const todoBody = document.getElementById('todo-body');
const selectAllCheckbox = document.getElementById('select-all');
const inputField = document.getElementById('input-field');
const addBtn = document.getElementById('add-btn');
const selectedPriority = document.getElementById('selected-priority');
const deleteBtn = document.getElementById('delete-btn');
const completeBtn = document.getElementById('complete-btn');
const modal = document.getElementById("modal");
const closeModalBtn = document.getElementById("close-modal");

// 상단 버튼 이벤트 처리
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

//상단, 하단 드롭다운 
function setupDropdown({ btn, dropdown, onSelect, label }) {
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    const isOpen = dropdown.style.display === 'block';
    dropdown.style.display = isOpen ? 'none' : 'block';
  });

  document.addEventListener('click', (e) => {
    if (!btn.contains(e.target) && !dropdown.contains(e.target)) {
      dropdown.style.display = 'none';
    }
  });

  dropdown.querySelectorAll('li').forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const value = item.dataset.priority;
      onSelect(value);
      if (label) label.textContent = value;
      dropdown.style.display = 'none';
    });
  });
}

setupDropdown({
  btn: document.getElementById('priority-btn'),
  dropdown: document.getElementById('priority-dropdown'),
  onSelect: (val) => {
    currentPriority = val;
    renderTodos(); 
  }
});

setupDropdown({
  btn: document.getElementById('select-toggle'), 
  dropdown: document.getElementById('select-dropdown'),
  onSelect: (val) => {
    currentPriority = val;
  },
  label: document.getElementById('selected-priority')
});

// ID 자동 생성
function generateNextId() {
  const maxId = todos.reduce((max, todo) => (todo.id ? Math.max(max, todo.id) : max), 0);
  return maxId + 1;
}

// 로컬스토리지 저장
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

  filteredTodos.forEach((todo) => {
    const tr = document.createElement("tr");
    tr.setAttribute("draggable", true);
    tr.dataset.id = todo.id;

    tr.innerHTML = `
      <td><input type="checkbox" class="row-checkbox" data-id="${todo.id}"></td>
      <td>${todo.priority}</td>
      <td>${todo.completed ? "✅" : "❌"}</td>
      <td>${todo.title}</td>
    `;

    todoBody.appendChild(tr);
  });

  updateSelectAllState();
  enableRowCheckboxEvents();
  enableDragAndDrop();
}

// 전체선택 체크박스 업데이트
function updateSelectAllState() {
  const rowCheckboxes = document.querySelectorAll(".row-checkbox");
  const checkedCount = [...rowCheckboxes].filter(cb => cb.checked).length;
  selectAllCheckbox.checked = checkedCount === rowCheckboxes.length && rowCheckboxes.length > 0;
}

// 개별 체크박스 이벤트
function enableRowCheckboxEvents() {
  const rowCheckboxes = document.querySelectorAll(".row-checkbox");
  rowCheckboxes.forEach(checkbox => {
    checkbox.addEventListener("change", () => {
      updateSelectAllState();
    });
  });
}

// 전체 선택
selectAllCheckbox.addEventListener("change", () => {
  const checkboxes = document.querySelectorAll(".row-checkbox");
  checkboxes.forEach(cb => {
    cb.checked = selectAllCheckbox.checked;
  });
});

//추가 버튼
addBtn.addEventListener("click", () => {
  const title = inputField.value.trim();
  const priority = selectedPriority.textContent;

  if (!title || currentPriority === "all") {
    alert("할 일과 중요도를 입력하세요!");
    return;
  }

  const newTodo = {
    id: generateNextId(),
    title,
    completed: false,
    priority: Number(priority),
  };

  todos.push(newTodo);
  saveTodos();

  currentFilter = 'all';
  currentPriority = 'all';
  selectedPriority.textContent = '중요도 선택';

  renderTodos();
  inputField.value = "";
});

// 삭제 버튼
deleteBtn.addEventListener("click", () => {
  const checkedIds = [...document.querySelectorAll(".row-checkbox")]
    .filter(cb => cb.checked)
    .map(cb => Number(cb.dataset.id));

  if (checkedIds.length === 0) {
    alert("삭제할 항목을 선택해주세요!");
    return;
  }

  todos = todos.filter(todo => !checkedIds.includes(todo.id));
  saveTodos();
  renderTodos();
});

// 완료 버튼
completeBtn.addEventListener("click", () => {
  const checkedIds = [...document.querySelectorAll(".row-checkbox")]
    .filter(cb => cb.checked)
    .map(cb => Number(cb.dataset.id));

  if (checkedIds.length === 0) {
    alert("완료할 항목을 선택해주세요!");
    return;
  }

  const hasCompleted = checkedIds.some(id => {
    const todo = todos.find(t => t.id === id);
    return todo && todo.completed;
  });

  if (hasCompleted) {
    showModal("이미 완료된 todo입니다");
    return;
  }
  
  todos = todos.map(todo =>
    checkedIds.includes(todo.id) ? { ...todo, completed: true } : todo
  );

  saveTodos();
  renderTodos();
});

// 드래그앤드롭
let draggedRowId = null;

function enableDragAndDrop() {
  const rows = document.querySelectorAll("tr[draggable=true]");

  rows.forEach(row => {
    row.addEventListener("dragstart", () => {
      draggedRowId = row.dataset.id;
    });

    row.addEventListener("dragover", e => {
      e.preventDefault(); 
    });

    row.addEventListener("drop", () => {
      const targetId = row.dataset.id;
      if (draggedRowId === targetId) return;

      const fromIndex = todos.findIndex(todo => String(todo.id) === draggedRowId);
      const toIndex = todos.findIndex(todo => String(todo.id) === targetId);

      const [movedItem] = todos.splice(fromIndex, 1);
      todos.splice(toIndex, 0, movedItem);

      saveTodos();
      renderTodos();
    });
  });
}

// 커스텀 모달
closeModalBtn.addEventListener("click", () => {
  modal.classList.add("hidden");
});

function showModal(message) {
  modal.querySelector("p").textContent = message;
  modal.classList.remove("hidden");
}

renderTodos();
enableDragAndDrop();