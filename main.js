const addTaskInput = document.querySelector("#addtask");
const btnSaveTask = document.querySelector(".save-task");
const btnAllTask = document.querySelector("#btn-all");
const btnActiveTask = document.querySelector("#btn-active");
const btnCompleted = document.querySelector("#btn-completed");
const errorMessage = document.querySelector(".errorMessage");
const taskList = document.querySelector(".task-list");
const dialog = document.querySelector(".modal-overlay");
const linkForm = document.querySelectorAll(".task-item");
const modal = document.querySelector(".modal-overlay");
const modalIcon = document.querySelector("#icon-message");
const modalMessageTitle = document.querySelector("#modal-message-title");
const urlErrorIcon = "/resources/error.png";
const urlSuccessIcon = "/resources/checkicon.png";
let currentFilter = "all";

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

taskList.addEventListener("change", function (event) {
  if (event.target.classList.contains("checkbox-item")) {
    updateTask(event);
  }
});

taskList.addEventListener("click", (event) => {
  if (
    event.target.classList.contains("container-delete") ||
    event.target.classList.contains("delete")
  )
    deleteTask(event);
});

modal.style.display = "none";
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
  localStorage.setItem("tasks", JSON.stringify(savedTask));

  if (savedTask !== undefined) {
    setMessageUI(1);
    clearInputTaks();
    addItemToList(newTask[newTask.length - 1]);
    return true;
  }
  setMessageUI(2);
  return false;
}

function setMessageUI(option) {
  const message = document.querySelector(".message");

  if (option === 1) {
    message.textContent = "The task was saved successfully!";
    modalIcon.src = urlSuccessIcon;
    modalMessageTitle.textContent = "success!";
  } else if (option === 2) {
    message.textContent = "the task was not saved due to an error.";
    modalIcon.src = urlErrorIcon;
    modalMessageTitle.textContent = "Error";
  } else if (option === 3) {
    message.textContent = "Task removed successfully";
    modalIcon.src = urlSuccessIcon;
    modalMessageTitle.textContent = "success!";
  } else if (option === 4) {
    message.textContent = "there was an error while removing the task";
    modalIcon.src = urlErrorIcon;
    modalMessageTitle.textContent = "Error";
  }

  modal.style.display = "block";

  setTimeout(() => {
    modal.style.display = "none";
  }, 3000);
}

function addItemToList(newTask) {
  var { id: identifier, name: taskName, completed: state } = newTask;

  taskList.innerHTML += `
    <li class="task-item" data-id="${identifier}">
       <label class="task-name">
            <input type="checkbox" class="checkbox-item">
            ${taskName}
        </label>
        <div class="container-delete">
            <img src="/resources/trash-can.png" class="delete" />
        </div>
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
  try {
    let itemList = event.target.closest("li");
    let taskIdToDelete = itemList.dataset.id;

    let tasksSaved = JSON.parse(localStorage.getItem("tasks")) || [];
    tasksSaved = tasksSaved.filter((task) => task.id != taskIdToDelete);

    localStorage.setItem("tasks", JSON.stringify(tasksSaved));

    setMessageUI(3);
    itemList.remove(itemList);

  } catch (error) {
    setMessageUI(4);
  }
}

function updateTask(event) {
  const allTask = JSON.parse(localStorage.getItem("tasks"));
  let itemList = event.target.closest("li");
  let id = itemList.dataset.id;
  let checkboxState = event.target.checked;

  const selectedTask = allTask.find((task) => task.id == id);

  if (selectedTask) selectedTask.completed = checkboxState;

  localStorage.setItem("tasks", JSON.stringify(allTask));

  lineTroughText(selectedTask.completed, itemList);
  hideItem(itemList);
}

function lineTroughText(checked, item) {
  if (checked) item.classList.add("line-through");
  else item.classList.remove("line-through");
}
function hideItem(item) {
  if (currentFilter === "completed" || currentFilter === "active")
    item.style.display = "none";
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
    taskList.innerHTML += `${task.completed ? `<li class="task-item ${"line-through"}" data-id= ${task.id}> ` : `<li class="task-item" data-id= ${task.id}>`}
    <label class="task-name">
     ${task.completed ? `<input type="checkbox" class="checkbox-item" checked>` : `<input type="checkbox" class="checkbox-item">`}
        ${task.name}   
    </label> 
    
    <div class="container-delete">
         <img src="/resources/trash-can.png" class="delete" />
    </div>
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

  errorMessageView("none");
}
