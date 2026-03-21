const addTaskInput = document.querySelector("#addtask");
const btnSaveTask = document.querySelector(".save-task");
const btnAllTask = document.querySelector("#btn-all");
const btnActiveTask = document.querySelector("#btn-active");
const btnCompleted = document.querySelector("#btn-completed");
const errorMessage = document.querySelector(".errorMessage");
const taskList = document.querySelector(".task-list");
const dialog = document.querySelector(".modal-overlay");
const linkForm = document.querySelectorAll(".task-item");


let currentFilter = "all";


taskList.addEventListener("change", function (event) {
  if (event.target.classList.contains("checkbox-item")) {
    updateTask(event);
  }
});

taskList.addEventListener("click", function (event) {
  if (event.target.classList.contains("delete")) deleteTask(event);
});

btnAllTask.addEventListener("click", function (event) {
  currentFilter = "all";
  renderTask();
  updateActiveButton();
});

btnActiveTask.addEventListener("click", function (event) {
  currentFilter = "active";
  renderTask();
  updateActiveButton();
});

btnCompleted.addEventListener("click", function () {
  currentFilter = "completed";
  renderTask();
  updateActiveButton();
});

btnSaveTask.addEventListener("click", createTask);

renderTask();
updateActiveButton();
const task = [];

function createTask() {
  try {
    if (addTaskInput.value.trim() !== "") {
      const newTask = {
        id: Date.now(),
        name: addTaskInput.value.trim(),
        completed: false,
      };

      task.push(newTask);

      if (saveTask(task)) {
        errorMessageView("none");
      }

      return 1;
    }
    errorMessageView("block");
  } catch (message) {
    console.log(message);
  }

  return 0;
}

function errorMessageView(visibility) {
  errorMessage.style.display = visibility;
  addTaskInput.classList.remove("empty-field");

  if (visibility === "block") addTaskInput.classList.add("empty-field");
}

function saveTask(newTask) {
  //get the localstorage data before adding the new object
  let savedTask = JSON.parse(localStorage.getItem("tasks")) || [];
  savedTask.push(newTask[newTask.length - 1]);

  // the new object is added to the array saveTask
  //localstorage save the date it had before and the new one, so
  //that create a list
  localStorage.setItem("tasks", JSON.stringify(savedTask));

  if (savedTask !== undefined) {
    setMessageUI(true);
    clearInputTaks();
    addItemToList(newTask[newTask.length - 1]);
    return true;
  }
  setMessageUI(false);
  return false;
}

function setMessageUI(success) {
  const message = document.querySelector(".message");

  if (success) message.textContent = "The task was saved successfully!";
  else
    message.textContent =
      "Unfortunatelly, the task was not saved due to an error.";

}

function addItemToList(newTask) {
  var { id: identifier, name: taskName, completed: state } = newTask;

  taskList.innerHTML += `
    <li class="task-item" data-id="${identifier}">
        <label>
            <input type="checkbox" class="checkbox-item">
            ${taskName}
        </label>
    </li> 
`;

  if (currentFilter === "completed") {
    var lastItem = taskList?.lastElementChild;
    lastItem.style.display = "none";
  }
}

function clearInputTaks() {
  addTaskInput.value = "";
}

function deleteTask(event) {
  let itemList = event.target.closest("li");
  let taskIdToDelete = itemList.dataset.id;

  let tasksSaved = JSON.parse(localStorage.getItem("tasks")) || [];
  tasksSaved = tasksSaved.filter((task) => task.id != taskIdToDelete);

  localStorage.setItem("tasks", JSON.stringify(tasksSaved));
  itemList.remove(itemList);
}

function updateTask(event) {
  const allTask = JSON.parse(localStorage.getItem("tasks"));
  let itemList = event.target.closest("li");
  let id = itemList.dataset.id;
  let checkboxState = event.target.checked;

  const selectedTask = allTask.find((task) => task.id == id);

  if (selectedTask) selectedTask.completed = checkboxState;

  localStorage.setItem("tasks", JSON.stringify(allTask));
}

function renderTask() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  let showTasks = tasks;
  taskList.innerHTML = "";

  if (currentFilter === "active")
    showTasks = tasks.filter((task) => !task.completed);

  if (currentFilter === "completed")
    showTasks = tasks.filter((task) => task.completed);

  showTasks.forEach((task) => {
    taskList.innerHTML += `<li class="task-item" data-id= ${task.id}>
    <label>
     ${task.completed ? `<input type="checkbox" class="checkbox-item" checked>` : `<input type="checkbox" class="checkbox-item">`}
        ${task.name}   
    </label> 
        </li>`;
  });
}

function updateActiveButton() {
  [btnAllTask, btnActiveTask, btnCompleted].forEach((btn) => {
    btn.classList.remove("active");
  });

  if (currentFilter === "all") btnAllTask.classList.add("active");
  if (currentFilter === "active") btnActiveTask.classList.add("active");
  if (currentFilter === "completed") btnCompleted.classList.add("active");
}
