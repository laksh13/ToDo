const form = document.querySelector("#task-form");
const taskList = document.querySelector(".collection");
const clearBtn = document.querySelector(".clear-tasks");
const filter = document.querySelector("#filter");
const taskInput = document.querySelector("#task");
const deleteTask = document.querySelector(".delete-item");

//Load all Event Listeners
loadEventListeners();

function loadEventListeners() {
  //Load existing Tasks from Local Storage
  document.addEventListener("DOMContentLoaded", loadTasksfromStorage);
  //Add task event
  form.addEventListener("submit", addTask);
  //Delete a Task
  taskList.addEventListener("click", deleteTaskEvent);
  //Delete all tasks
  clearBtn.addEventListener("click", clearTasks);
  //Filter Tasks
  filter.addEventListener("keyup", filterTasks);
}

function addTask(e) {
  e.preventDefault();
  if (taskInput.value === "") {
    alert("Add a Task");
  } else {
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
    //Store the task in Local Storage
    addTaskToLocalStorage(taskInput.value);
    taskInput.value = "";
  }
}

function clearTasks() {
  while (taskList.firstChild) {
    taskList.firstChild.remove();
    //taskList.removeChild();
    //Remove all tasks from Local Storage
    localStorage.removeItem("taskList");
  }
}

function deleteTaskEvent(e) {
  let target = e.target;
  if (target.parentNode.classList.contains("delete-item")) {
    target.parentNode.parentNode.remove();
  }
  deleteTaskFromStorage(target.parentNode.parentNode.textContent);
  /* if (target.parentNode.className.indexOf("delete-item") != -1) {
    target.parentNode.parentNode.remove();
  } */
  /* if ((target.parentNode.tagName = "a")) {
    target.parentNode.parentNode.remove();
  } */
}

function filterTasks(e) {
  const filterText = e.target.value.toLowerCase();
  document.querySelectorAll(".collection-item").forEach(function (task) {
    const item = task.firstChild.textContent;
    if (item.toLowerCase().indexOf(filterText) != -1) {
      task.classList.remove("hide");
    } else {
      task.classList.add("hide");
    }
    /* if (filterText === "") {
      console.log("Here");
      task.classList.add("displaying");
    } */
  });
}

function addTaskToLocalStorage(task) {
  let tasks;
  if (localStorage.getItem("taskList") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("taskList"));
  }

  tasks.push(task);
  localStorage.setItem("taskList", JSON.stringify(tasks));
}

function loadTasksfromStorage() {
  if (localStorage.getItem("taskList") !== null) {
    let tasks = JSON.parse(localStorage.getItem("taskList"));
    tasks.map((task) => {
      const li = document.createElement("li");
      li.className = "collection-item";

      li.innerHTML = task;

      const link = document.createElement("a");
      link.className = "delete-item secondary-content";
      link.innerHTML = '<i class="fa fa-remove"></i>';
      li.appendChild(link);

      taskList.appendChild(li);
    });
  }
}

function deleteTaskFromStorage(task) {
  if (localStorage.getItem("taskList") !== null) {
    let tasks = JSON.parse(localStorage.getItem("taskList"));
    let pos = tasks.indexOf(task);
    if (pos != -1) {
      tasks.splice(pos, 1);
    }
    localStorage.setItem("taskList", JSON.stringify(tasks));
  }
}
