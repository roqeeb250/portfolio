
// MOBILE NAVIGATION
const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".nav-links");

if (menuButton && navigation) {

  menuButton.addEventListener("click", () => {
    const isOpen = navigation.classList.toggle("open");

    menuButton.setAttribute("aria-expanded", String(isOpen));
    menuButton.textContent = isOpen ? "✕" : "☰";
  });

  // Close menu after clicking a navigation link
  navigation.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navigation.classList.remove("open");
      menuButton.setAttribute("aria-expanded", "false");
      menuButton.textContent = "☰";
    });
  });

}

// AUTOMATIC COPYRIGHT YEAR
document.querySelectorAll(".year").forEach((element) => {
  element.textContent = new Date().getFullYear();
});

/* =================================
   ACADEMIC PLANNER
================================= */

// GET THE HTML ELEMENTS
const taskForm = document.querySelector("#task-form");
const taskInput = document.querySelector("#task-input");
const taskList = document.querySelector("#task-list");
const emptyMessage = document.querySelector("#empty-message");

// STORE ACADEMIC TASKS
let tasks = JSON.parse(localStorage.getItem("academicTasks")) || [];

// DISPLAY TASKS
function displayTasks() {

  if (!taskList || !emptyMessage) {
    return;
  }

  taskList.innerHTML = "";

  emptyMessage.style.display = tasks.length === 0 ? "block" : "none";

  tasks.forEach((task, index) => {

    const listItem = document.createElement("li");

    const taskText = document.createElement("span");
    taskText.textContent = task.name;

    if (task.completed) {
      taskText.style.textDecoration = "line-through";
      taskText.style.color = "#8993a5";
    }

    // COMPLETE BUTTON
    const completeButton = document.createElement("button");
    completeButton.textContent = task.completed ? "Undo" : "Complete";

    completeButton.addEventListener("click", () => {
      tasks[index].completed = !tasks[index].completed;
      saveTasks();
    });

    // DELETE BUTTON
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";

    deleteButton.addEventListener("click", () => {
      tasks.splice(index, 1);
      saveTasks();
    });

    listItem.appendChild(taskText);
    listItem.appendChild(completeButton);
    listItem.appendChild(deleteButton);

    taskList.appendChild(listItem);

  });

}

// SAVE TASKS
function saveTasks() {
  localStorage.setItem("academicTasks", JSON.stringify(tasks));
  displayTasks();
}

// ADD A NEW TASK
if (taskForm && taskInput) {

  taskForm.addEventListener("submit", (event) => {

    event.preventDefault();

    const taskName = taskInput.value.trim();

    if (taskName === "") {
      alert("Please enter an academic task.");
      return;
    }

    tasks.push({
      name: taskName,
      completed: false
    });

    saveTasks();

    taskInput.value = "";

  });

}

// SHOW SAVED TASKS WHEN THE PAGE OPENS
displayTasks();
