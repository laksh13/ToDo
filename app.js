const form = document.querySelector("#task-form");
const taskList = document.querySelector(".collection");
const clearBtn = document.querySelector(".clear-tasks");
const filter = document.querySelector("#filter");
const taskInput = document.querySelector("#task");

//Load all Event Listeners
loadEventListeners();

function loadEventListeners() {
  //Add task event
  form.addEventListener("submit", addTask);
}

function addTask(e) {
  e.preventDefault();
  if (taskInput.value === "") {
    alert("Add a Task");
  }
  //Create list item
  const li = document.createElement("li");
  li.className = "collection-item";

  //Create Text Node and append to li
  //li.appendChild(document.createTextNode(taskInput.value));
  li.innerHTML = taskInput.value;

  //create  new link item
  const link = document.createElement("a");
  link.className = "delete-item secondary-content";
  //Add icon html
  link.innerHTML = '<i class="fa fa-remove"></i>';
  li.appendChild(link);

  taskList.appendChild(li);
}
