const addTaskInput = document.querySelector("#addtask");
const btnSaveTask = document.querySelector(".save-task");
const btnAllTask = document.querySelector("#btn-all");
const btnActiveTask = document.querySelector("#btn-active");
const btnCompleted = document.querySelector("#btn-completed");
const errorMessage = document.querySelector(".errorMessage");
const taskList = document.querySelector(".task-list");

taskList.addEventListener("change", function (event) {
  if (event.target.classList.contains("checkbox-item")) {
    completedTask(event);
  }
});

btnSaveTask.addEventListener("click", addTask);

renderTask();
const taskArray = [];

function addTask() {
  try {
    if (addTaskInput.value.trim() !== "") {
      const newTask = {
        id: Date.now(),
        name: addTaskInput.value.trim(),
        completed: false,
      };

      if (saveTaskLocalStorage(newTask)) {
        //add the new object to the existing array
        task.push(newTask);
        taskId = newTask.id;
        errorMessageVisibility("none");
      }

      return 1;
    }
    errorMessageVisibility("block");
  } catch (message) {
    console.log(message);
  }

  return 0;
}

function errorMessageVisibility(visibility) {
  errorMessage.style.display = visibility;
}

function saveTaskLocalStorage(newTask) {
  //get the localstorage data before adding the new object
  let savedTask = JSON.parse(localStorage.getItem("task")) || [];
  savedTask.push(newTask); // the new object is added to the array saveTask

  //localstorage save the date it had before and the new one, so
  //that create a list
  localStorage.setItem("task", JSON.stringify(savedTask));

  if (savedTask !== undefined) {
    console.log("save successfully");
    clearInputTaks();
    renderTask(newTask.id);
    return true;
  }
  console.log("it was not saved");
  return false;
}
function clearInputTaks() {
  addTaskInput.value = "";
}

function deleteTask() {}

function completedTask(taskSelected) {
  const getAllTask = JSON.parse(localStorage.getItem("task"));
  let li = taskSelected.target.closest("li");
  let id = li.dataset.id;

  const updateTask = getAllTask.find((task) => task.id == id);

  if (updateTask) 
      updateTask.completed = true;

  localStorage.setItem("task", JSON.stringify(getAllTask));
  renderTask();
}

function hideTaskUI() {
  taskSelected.target.closest("li").style.display = "none";
}

function renderTask() {
  const tasks = JSON.parse(localStorage.getItem("task"));

  taskList.innerHTML = "";

  if (tasks != null) {
    tasks.forEach((task) => {
      taskList.innerHTML += `<li class="task-item" data-id= ${task.id}><label for="task-item">
     <input type="checkbox" class="checkbox-item">
        ${task.name}    
        <button type="button" class="btn delete">x</button></label></li>`;
    });
  }
}
