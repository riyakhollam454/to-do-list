document.addEventListener("DOMContentLoaded", loadTasks);

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => renderTask(task));
}

function saveTasks() {
    const tasks = [];
    document.querySelectorAll('.todo-item').forEach(item => {
        tasks.push(item.querySelector('.task-text').innerText);
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function renderTask(taskText) {
    const todoList = document.getElementById('todoList');
    const li = document.createElement('li');
    li.className = 'todo-item';

    const span = document.createElement('span');
    span.className = 'task-text';
    span.innerText = taskText;
    li.appendChild(span);

    const editButton = document.createElement('button');
    editButton.className = 'edit';
    editButton.innerText = 'Edit';
    editButton.onclick = () => editTask(span);
    li.appendChild(editButton);

    const deleteButton = document.createElement('button');
    deleteButton.className = 'delete';
    deleteButton.innerText = 'Delete';
    deleteButton.onclick = () => deleteTask(li);
    li.appendChild(deleteButton);

    todoList.appendChild(li);
}

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value.trim();

    if (taskText) {
        renderTask(taskText);
        saveTasks();
        taskInput.value = '';
    }
}

function editTask(span) {
    const newTaskText = prompt('Edit task:', span.innerText);
    if (newTaskText !== null && newTaskText.trim() !== '') {
        span.innerText = newTaskText;
        saveTasks();
    }
}

function deleteTask(li) {
    if (confirm('Are you sure you want to delete this task?')) {
        li.remove();
        saveTasks();
    }
}
