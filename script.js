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