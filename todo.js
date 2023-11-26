// Select all elements

const form = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo");
const todolist = document.querySelector(".list-group");
const firstcardBody = document.querySelectorAll(".card-body")[0];
const secondcardBody = document.querySelectorAll(".card-body")[1];
const filter = document.querySelector("#filter");
const clearButton = document.querySelector("#clear-todos");

// console.log(form);
// console.log(todoInput);
// console.log("todoList");
// console.log(firstcardBody);
// console.log(secondcardBody);
// console.log(filter);
// console.log(clearButton);

eventListener();

// purpose of this function is to assign listeners to all events
function eventListener() {
  form.addEventListener("submit", addtodo);
}

function addtodo(e) {
  const newTodo = todoInput.value.trim();
  if (newTodo === "") {
    showAlert("danger", "Lütfen bir todo girin...");
  } else {
    addtodoToUI(newTodo);
    addTodoToStorage(newTodo);

    showAlert("success", "Todo başarıyla eklendi...");
  }
  e.preventDefault();
}

function getTodosfronStorage() {
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
  let todos = getTodosfronStorage();
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

function addtodoToUI(newTodo) {
  // add the String value to the UI as list item

  // creating a list item
  const listItem = document.createElement("li");

  // Creating a link element
  const link = document.createElement("a");
  link.href = "#";
  link.className = "delete-item";
  link.innerHTML = "<i class = 'fa fa - remove'></i>";

  // Adding class
  listItem.className = "list-group-item d-flex justify-content-between";

  // Adding text Node
  listItem.appendChild(document.createTextNode(newTodo));
  listItem.appendChild(link);

  // adding listItem to todolist
  todolist.appendChild(listItem);
  todoInput.value = "";
}
