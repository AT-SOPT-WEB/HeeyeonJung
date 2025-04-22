import { todos as initialTodos } from './todoData.js';

let todos = JSON.parse(localStorage.getItem('todos')) || initialTodos;
const todoBody = document.getElementById('todo-body');
const selectAllCheckbox = document.getElementById('select-all');

function saveTodos() {
  localStorage.setItem('todos', JSON.stringify(todos));
}

function renderTodos() {
  todoBody.innerHTML = "";

  todos.forEach((todo, index) => {
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

function enableRowCheckboxEvents() {
  const rowCheckboxes = document.querySelectorAll(".row-checkbox");
  rowCheckboxes.forEach(checkbox => {
    checkbox.addEventListener("change", () => {
      updateSelectAllState();
    });
  });
}

function updateSelectAllState() {
  const rowCheckboxes = document.querySelectorAll(".row-checkbox");
  const checked = [...rowCheckboxes].filter(cb => cb.checked).length;
  selectAllCheckbox.checked = checked === rowCheckboxes.length && rowCheckboxes.length > 0;
}

selectAllCheckbox.addEventListener("change", (e) => {
  const rowCheckboxes = document.querySelectorAll(".row-checkbox");
  rowCheckboxes.forEach(cb => {
    cb.checked = e.target.checked;
  });
});

// 드래그 앤 드롭
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
    const afterElement = [...todoBody.children].find(
      el => e.clientY < el.getBoundingClientRect().top + el.offsetHeight / 2
    );
    if (afterElement && afterElement !== dragged) {
      todoBody.insertBefore(dragged, afterElement);
    } else if (!afterElement) {
      todoBody.appendChild(dragged);
    }
  });

  todoBody.addEventListener("drop", () => {
    const newOrder = [...todoBody.children].map(row => todos[+row.dataset.index]);
    todos = newOrder;
    saveTodos();
    renderTodos(); 
    enableDrag();  
  });

  todoBody.addEventListener("dragend", (e) => {
    e.target.classList.remove("dragging");
  });
}

renderTodos();
enableDrag();
