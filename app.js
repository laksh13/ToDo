const form = document.querySelector("#task-form");
const taskList = document.querySelector(".collection");
const clearBtn = document.querySelector(".clear-tasks");
const filter = document.querySelector("#filter");
const taskInput = document.querySelector("#task");
const deleteTask = document.querySelector(".delete-item");

//Load all Event Listeners
loadEventListeners();

function loadEventListeners() {
  //Add task event
  form.addEventListener("submit", addTask);
  taskList.addEventListener("click", deleteTaskEvent);
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
  taskInput.value = "";
}

//Delete all tasks
clearBtn.addEventListener("click", clearTasks);

function clearTasks() {
  while (taskList.firstChild) {
    taskList.firstChild.remove();
  }
  //taskList.removeChild();
}

function deleteTaskEvent(e) {
  let target = e.target;
  if (target.parentNode.classList.contains("delete-item")) {
    target.parentNode.parentNode.remove();
  }
  /* if (target.parentNode.className.indexOf("delete-item") != -1) {
    target.parentNode.parentNode.remove();
  } */
  /* if ((target.parentNode.tagName = "a")) {
    target.parentNode.parentNode.remove();
  } */
}
