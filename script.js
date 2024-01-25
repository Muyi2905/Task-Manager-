document.addEventListener('DOMContentLoaded', () => {
    loadTasksFromStorage();
});

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskList = document.getElementById('taskList');

    if (taskInput.value.trim() !== '') {
        const taskItem = document.createElement('li');
        taskItem.innerHTML = `
            <input type="checkbox" onchange="markAsCompleted(this)">
            <span>${taskInput.value}</span>
            <button onclick="removeTask(this)">Delete</button>
        `;

        taskList.appendChild(taskItem);
        saveTaskToStorage(taskInput.value);
        taskInput.value = ''; // Clear the input field
    }
}

function removeTask(button) {
    const taskItem = button.parentNode;
    const taskList = document.getElementById('taskList');
    taskList.removeChild(taskItem);
    removeTaskFromStorage(taskItem.querySelector('span').innerText);
}

function markAsCompleted(checkbox) {
    const taskItem = checkbox.parentNode;
    taskItem.querySelector('span').classList.toggle('completed');
}

function saveTaskToStorage(task) {
    let tasks = getTasksFromStorage();
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}


function loadTasksFromStorage() {
    let tasks = getTasksFromStorage();
    const taskList = document.getElementById('taskList');

    tasks.forEach(task => {
        const taskItem = document.createElement('li');
        taskItem.innerHTML = `
            <input type="checkbox" onchange="markAsCompleted(this)">
            <span>${task}</span>
            <button onclick="removeTask(this)">Delete</button>
        `;
        taskList.appendChild(taskItem);
    });
}

function getTasksFromStorage() {
    return JSON.parse(localStorage.getItem('tasks')) || [];
}