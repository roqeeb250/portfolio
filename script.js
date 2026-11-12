

/* =================================
   ACADEMIC PLANNER
================================= */

// GET THE HTML ELEMENTS
const taskForm = document.querySelector("#task-form");
const taskInput = document.querySelector("#task-input");
const taskDate = document.querySelector("#task-date");
const taskTime = document.querySelector("#task-time");
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

  emptyMessage.style.display =
    tasks.length === 0 ? "block" : "none";

  tasks.forEach((task, index) => {

    // CREATE TASK CONTAINER
    const listItem = document.createElement("li");

    // DISPLAY TASK NAME
    const taskText = document.createElement("span");
    taskText.textContent = task.name;

    if (task.completed) {
      taskText.style.textDecoration = "line-through";
      taskText.style.color = "#8993a5";
    }

    // DISPLAY TASK DATE AND TIME
    const deadline = document.createElement("p");

    if (task.date && task.time) {

      const dueDate = new Date(
        `${task.date}T${task.time}`
      );

      deadline.textContent =
        "📅 " + dueDate.toLocaleString();

    } else {
      deadline.textContent = "No deadline set";
    }

    // CHECK IF TASK IS OVERDUE
    const status = document.createElement("span");

    if (
      !task.completed &&
      task.date &&
      task.time &&
      new Date(`${task.date}T${task.time}`) < new Date()
    ) {
      status.textContent = "⚠️ OVERDUE";
    }

    // COMPLETE BUTTON
const completeButton = document.createElement("button");

completeButton.type = "button";

completeButton.textContent =
  task.completed ? "Undo" : "Complete";

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

    // ADD ELEMENTS TO THE TASK
    listItem.appendChild(taskText);
    listItem.appendChild(deadline);
    listItem.appendChild(status);
    listItem.appendChild(completeButton);
    listItem.appendChild(deleteButton);

    taskList.appendChild(listItem);

  });

}

// SAVE TASKS
function saveTasks() {

  localStorage.setItem(
    "academicTasks",
    JSON.stringify(tasks)
  );

  displayTasks();

}

// ADD A NEW TASK
if (taskForm && taskInput && taskDate && taskTime) {

  taskForm.addEventListener("submit", (event) => {

    event.preventDefault();

    const taskName = taskInput.value.trim();

    if (
      taskName === "" ||
      taskDate.value === "" ||
      taskTime.value === ""
    ) {
      alert("Please complete all task fields.");
      return;
    }

    // ADD TASK TO THE ARRAY
    tasks.push({

      name: taskName,
      date: taskDate.value,
      time: taskTime.value,
      completed: false

    });

    saveTasks();

    // CLEAR THE FORM
    taskForm.reset();

  });

}

// SHOW SAVED TASKS WHEN THE PAGE OPENS
displayTasks();
