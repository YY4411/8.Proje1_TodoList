// Tüm Elementleri Seçme

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

function eventListener() {
  // Bu fonsiyonun görevi bütün event listenerları atamak
  form.addEventListener("submit", addtodo);
}

function addtodo(e) {
  const newTodo = todoInput.value.trim();
  addtodoToUI(newTodo);
  e.preventDefault();
}

function addtodoToUI(newTodo) {
  // String değerini list item olarak UI'ya ekleyecek

  // List item oluşturma
  const listItem = document.createElement("li");
  // Link Oluşturma
  const link = document.createElement("a");
  link.href = "#";
  link.className = "delete-item";
  link.innerHTML = "<i class = 'fa fa - remove'></i>";

  // class ekleme
  listItem.className = "list-group-item d-flex justify-content-between";

  // text Node ekleme
  listItem.appendChild(document.createTextNode(newTodo));
  listItem.appendChild(link);

  // todolist'e listItem'ı ekleme
  todolist.appendChild(listItem);
  todoInput.value = "";
}
