const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

// Load saved tasks from Local Storage
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];


// Save tasks to Local Storage
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}


// Display all tasks
function displayTasks() {
    taskList.innerHTML = "";

    tasks.forEach(function (task, index) {
        const li = document.createElement("li");

        // Show completed tasks as crossed out
        if (task.completed) {
            li.classList.add("completed");
        }

        const taskSpan = document.createElement("span");
        taskSpan.textContent = task.text;


        // Click task
        taskSpan.addEventListener("click", function () {

            // Mark task as completed
            task.completed = true;

            // Move task to bottom
            tasks.splice(index, 1);
            tasks.push(task);

            // Save the change
            saveTasks();

            // Show the crossed-out task
            displayTasks();
        });


        // Delete button
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.classList.add("delete-btn");


        deleteButton.addEventListener("click", function () {

            // Remove task
            tasks.splice(index, 1);

            // Save changes
            saveTasks();

            // Update the page
            displayTasks();
        });


        // Add elements
        li.appendChild(taskSpan);
        li.appendChild(deleteButton);

        taskList.appendChild(li);
    });
}


// Add a new task
function addTask() {

    const taskText = taskInput.value.trim();


    // Prevent empty or space-only tasks
    if (!taskText || !/\S/.test(taskText)) {
        alert("Please enter a valid task!");
        taskInput.focus();
        return;
    }


    // Create new task
    const newTask = {
        text: taskText,
        completed: false
    };


    // Add new task to the top
    tasks.unshift(newTask);


    // Save to Local Storage
    saveTasks();


    // Display tasks
    displayTasks();


    // Clear input
    taskInput.value = "";
    taskInput.focus();
}


// Press Enter to add task
taskInput.addEventListener("keypress", function (event) {

    if (event.key === "Enter") {
        addTask();
    }

});


// Display saved tasks when page loads
displayTasks();