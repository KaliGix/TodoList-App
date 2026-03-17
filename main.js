const addTaskInput = document.querySelector("#addtask");
const btnSaveTask = document.querySelector(".save-task");
const btnAllTask = document.querySelector("#btn-all");
const btnActiveTask = document.querySelector("#btn-active");
const btnCompleted = document.querySelector("#btn-completed");
const errorMessage = document.querySelector(".errorMessage");
const taskList = document.querySelector(".task-list");

taskList.addEventListener("change", function (event) {
  if (event.target.classList.contains("checkbox-item")) {
    checkTask(event);
  }
});

taskList.addEventListener("click", function (event) {
  if (event.target.classList.contains("delete"))
     deleteTask(event);
});

btnAllTask.addEventListener('click', function(event){
  renderTask(0);
});

btnActiveTask.addEventListener('click', function(event){
  renderTask(1);
});

btnCompleted.addEventListener('click', function(){
  renderTask(2);
});

btnSaveTask.addEventListener("click", createTask);

renderTask(0);
const task = [];

function createTask() {
  try {
    if (addTaskInput.value.trim() !== "") {
      const newTask = {
        id: Date.now(),
        name: addTaskInput.value.trim(),
        completed: false,
      };

      if (saveTask(newTask)) {
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

function saveTask(newTask) {
  //get the localstorage data before adding the new object
  let savedTask = JSON.parse(localStorage.getItem("tasks")) || [];
  savedTask.push(newTask); // the new object is added to the array saveTask

  //localstorage save the date it had before and the new one, so
  //that create a list
  localStorage.setItem("tasks", JSON.stringify(savedTask));

  if (savedTask !== undefined) {
    console.log("save successfully");
    clearInputTaks();
    renderTask(0);
    return true;
  }
  console.log("it was not saved");
  return false;
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
  renderTask(0);
}

function checkTask(taskSelected) {
  const getAllTask = JSON.parse(localStorage.getItem("tasks"));
  let itemList = taskSelected.target.closest("li");
  let id = itemList.dataset.id;

  const updateTask = getAllTask.find((task) => task.id == id);

  if (updateTask) {
    updateTask.completed = true;
    console.log(updateTask);
  }

  localStorage.setItem("tasks", JSON.stringify(getAllTask));
  renderTask(0);
}

function hideTaskUI() {
  taskSelected.target.closest("li").style.display = "none";
}

function renderTask(identifier) {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  taskList.innerHTML = "";

  switch (identifier) {
    case 0:
      tasks.forEach((task) => {
        taskList.innerHTML += `<li class="task-item" data-id= ${task.id}><label for="task-item">
     <input type="checkbox" class="checkbox-item">
        ${task.name}    
        <button type="button" class="btn delete">x</button></label></li>`;
      });

      break;

    case 1:
      tasks.forEach((task) => {
        if (!task.completed)
          taskList.innerHTML += `<li class="task-item" data-id= ${task.id}><label for="task-item">
     <input type="checkbox" class="checkbox-item">
        ${task.name}    
        <button type="button" class="btn delete">x</button></label></li>`;
      });

      console.log("active tasks")
      break;

    case 2:
      tasks.forEach((task) => {
        if (task.completed)
          taskList.innerHTML += `<li class="task-item" data-id= ${task.id}><label for="task-item">
     <input type="checkbox" class="checkbox-item" checked>
        ${task.name}    
        <button type="button" class="btn delete">x</button></label></li>`;
      });

      console.log("completed tasks");
      break;
  }
}
