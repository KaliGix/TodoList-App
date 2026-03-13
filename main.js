const addTaskInput = document.querySelector("#addtask");
const btnSaveTask = document.querySelector(".save-task");
const btnAllTask = document.querySelector("#btn-all");
const btnActiveTask = document.querySelector("#btn-active");
const btnCompleted = document.querySelector("#btn-completed");
const errorMessage = document.querySelector(".errorMessage");
const taskList = document.querySelector(".task-list");
const checkboxList = document.querySelectorAll(".checkbox-item");

checkboxList.forEach(element=>{
    element.addEventListener('change', completedTask);
});

console.log(checkboxList.length);

btnSaveTask.addEventListener("click", addTask);
renderTask();
const task = [];

function addTask() {
  try {
    if (addTaskInput.value.trim() !== "") {
      const newTask = {
        id: Date.now(),
        name: addTaskInput.value.trim(),
        completed: false,
      };

      //add the new object to the existing array
      task.push(newTask);
      saveTaskLocal(newTask);
      return;
    }
    errorMessage.style.display = "block";
  } catch (message) {
    console.log(message);
  }
}


function saveTaskLocal(newTask){

      //get the localstorage data before adding the new object
      let savedTask = JSON.parse(localStorage.getItem("task"));
      savedTask.push(newTask); // the new object is added to the array saveTask

      //localstorage save the date it had before and the new one, so
      //that create a list
      localStorage.setItem("task", JSON.stringify(savedTask));

      if (savedTask !== undefined) {
        console.log("save successfully");
        clearInputTaks();
        renderTask();
       
      } else console.log("it was not saved");
     
}
function clearInputTaks() {
  addTaskInput.value = "";
}

function deleteTask() {}

function completedTask(event){
        
}
function renderTask() {
  const tasks = JSON.parse(localStorage.getItem("task"));

  taskList.innerHTML ="";
  tasks.forEach((task) => {
    taskList.innerHTML += `<li class="task-item"><label for="task-item">
     <input type="checkbox" class="checkbox-item">
        ${task.name}    
        <button type="button" class="btn delete">x</button></label></li>`;
  });
}
