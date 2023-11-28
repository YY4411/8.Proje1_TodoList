// Select all elements

const form = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo");
const todoList = document.querySelector(".list-group");
const firstcardBody = document.querySelectorAll(".card-body")[0];
const secondcardBody = document.querySelectorAll(".card-body")[1];
const filter = document.querySelector("#filter");
const clearButton = document.querySelector("#clear-todos");

// console.log(form);
// console.log(todoInput);
// console.log(todoList);
// console.log(firstcardBody);
// console.log(secondcardBody);
// console.log(filter);
// console.log(clearButton);

eventListener();

// purpose of this function is to assign listeners to all events
function eventListener() {
  form.addEventListener("submit", addTodo);
  document.addEventListener("DOMContentLoaded", loadAllTodosToUI);
  secondcardBody.addEventListener("click", deleteTodo);
  filter.addEventListener("keyup", filterTodos);
  clearButton.addEventListener("click", clearAllTodos);
}

function clearAllTodos(e) {
  if (confirm("Tümünü silmek istediğinize emin misiniz?")) {
    // Arayüzden todoları temizleme
    // todoList.innerHTML = ""; // Yavaş kalıyor
    while (todoList.firstElementChild != null) {
      todoList.removeChild(todoList.firstElementChild);
    }
    localStorage.removeItem("todos");
  }
}

function filterTodos(e) {
  // console.log(e.target.value);
  const filterValue = e.target.value.toLowerCase();
  const listItems = document.querySelectorAll(".list-group-item");
  listItems.forEach(function (listItem) {
    const text = listItem.textContent.toLowerCase();
    if (text.indexOf(filterValue) === -1) {
      // Bulamadı
      listItem.setAttribute("style", "display:none !important");
    } else {
      listItem.setAttribute("style", "display:block");
    }
  });
}

function deleteTodo(e) {
  if (e.target.className === "fa fa-remove") {
    e.target.parentElement.parentElement.remove();
    deleteTodoFromStorage(e.target.parentElement.parentElement.textContent);
    showAlert("success", "Todo başarıyla silindi...");
    // console.log("Silme işlemi");
  }
}

function deleteTodoFromStorage(deletetodo) {
  let todos = getTodosfromStorage();
  todos.forEach(function (todo, index) {
    if (todo === deletetodo) {
      todos.splice(index, 1); //Arrayden değerimizi silebiliriz.
    }
  });
  localStorage.setItem("todos", JSON.stringify(todos));
}

function loadAllTodosToUI() {
  let todos = getTodosfromStorage();
  todos.forEach(function (todo) {
    addTodoToUI(todo);
  });
}

function addTodo(e) {
  const newTodo = todoInput.value.trim();
  if (newTodo === "") {
    showAlert("danger", "Lütfen bir todo girin...");
  } else {
    addTodoToUI(newTodo);
    addTodoToStorage(newTodo);

    showAlert("success", "Todo başarıyla eklendi...");
  }
  e.preventDefault();
}

function getTodosfromStorage() {
  //For get todos from storage
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  return todos;
}

function addTodoToStorage(newTodo) {
  let todos = getTodosfromStorage();
  todos.push(newTodo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function showAlert(type, message) {
  const alert = document.createElement("div");
  alert.className = `alert alert-${type}`;
  alert.textContent = message;
  firstcardBody.appendChild(alert);

  // SetTimeout
  setTimeout(function () {
    alert.remove();
  }, 1000);

  // console.log(alert);
}

function addTodoToUI(newTodo) {
  // add the String value to the UI as list item

  // creating a list item
  const listItem = document.createElement("li");

  // Creating link element
  const link = document.createElement("a");
  link.href = "#";
  link.className = "delete-item";
  link.innerHTML = "<i class = 'fa fa-remove'></i>";

  // Adding class
  listItem.className = "list-group-item d-flex justify-content-between";

  // Adding text Node
  listItem.appendChild(document.createTextNode(newTodo));
  listItem.appendChild(link);

  // adding listItem to todoList
  todoList.appendChild(listItem);
  todoInput.value = "";
}
