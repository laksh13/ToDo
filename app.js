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
  taskList.addEventListener("click", actionTaskEvent);
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

    const label = document.createElement('label');
    const check = document.createElement('input');
    check.setAttribute("type","checkbox");
    check.className = "filled-in";
    const span = document.createElement('span');
    label.appendChild(check);
    label.appendChild(span);
    li.appendChild(label);
    //Create Text Node and append to li
    li.appendChild(document.createTextNode(taskInput.value));
    //li.innerHTML = taskInput.value;

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

function actionTaskEvent(e) {
  let target = e.target;
  if (target.parentNode.classList.contains("delete-item")) {
    target.parentNode.parentNode.remove();
    //deleteTaskFromStorage(target.parentNode.parentNode.textContent);
    updateTaskInStorage(target.parentNode.parentNode.textContent, "delete");
    /* if (target.parentNode.className.indexOf("delete-item") != -1) {
      target.parentNode.parentNode.remove();
    } */
  }
  if(target.classList.contains("filled-in")){
    target.parentNode.parentNode.classList.toggle("completed");
    updateTaskInStorage(target.parentNode.parentNode.textContent, "check");
  }
  
  
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
      task.classList.add("displaying");
    } */
  });
}

function addTaskToLocalStorage(taskText) {
  let tasks;
  if (localStorage.getItem("taskList") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("taskList"));
  }
  const taskItem = {
    task: taskText,
    isChecked: false
  }
  tasks.push(taskItem);
  localStorage.setItem("taskList", JSON.stringify(tasks));
}

function loadTasksfromStorage() {
  if (localStorage.getItem("taskList") !== null) {
    let tasks = JSON.parse(localStorage.getItem("taskList"));
    tasks.map((taskItem) => {
      const li = document.createElement("li");
      li.className = "collection-item";
      const label = document.createElement('label');
      const check = document.createElement('input');
      check.setAttribute("type","checkbox");
      //check.setAttribute("checked",taskItem.isChecked)
      check.checked = taskItem.isChecked;
      check.className = "filled-in";
      const span = document.createElement('span');
      label.appendChild(check);
      label.appendChild(span);
      li.appendChild(label);
      //li.innerHTML = task;
      li.appendChild(document.createTextNode(taskItem.task));

      const link = document.createElement("a");
      link.className = "delete-item secondary-content";
      link.innerHTML = '<i class="fa fa-remove"></i>';
      li.appendChild(link);
      if(taskItem.isChecked){
        li.classList.add("completed");
      }
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

function updateTaskInStorage(task,action){
  if (localStorage.getItem("taskList") !== null) {
    let tasks = JSON.parse(localStorage.getItem("taskList"));
    tasks.map((taskItem, index) => {
      if(taskItem.task.indexOf(task) != -1){
        if(action === "check"){
          taskItem.isChecked = !taskItem.isChecked;
        }
        else if(action === "delete"){
          let pos = index;
          tasks.splice(pos, 1);
        }
      }
    });
    
    localStorage.setItem("taskList", JSON.stringify(tasks));
  }
}