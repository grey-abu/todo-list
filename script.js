
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
const form = document.getElementById('task-form');
const input = document.getElementById('task-input');
const list = document.getElementById('task-list');
const deleteAllButton = document.getElementById('delete-all-btn'); 

const saveTasks = () => localStorage.setItem('tasks', JSON.stringify(tasks));

const toggleCompletion = (index) => {
    tasks[index].completed = !tasks[index].completed;
    renderTasks();
};

const deleteTask = (index) => {
    if (confirm('Yakin ingin menghapus tugas ini?')) {
        tasks.splice(index, 1);
        renderTasks();
    }
};

const deleteAllTasks = () => {
    if (tasks.length === 0) return;
    
    if (confirm('Anda yakin ingin menghapus SEMUA tugas?')) {
        tasks = []; 
        renderTasks();
    }
};

const editTask = (index) => {
    let newText = prompt("Ubah tugas:", tasks[index].text); 
    if (newText && newText.trim() !== "") {
        tasks[index].text = newText.trim();
        renderTasks();
    } else if (newText !== null) {
        alert("Nama tugas tidak boleh kosong!"); 
    }
};

const renderTasks = () => {
    list.innerHTML = "";
    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        const dateText = task.date ? `<small>${task.date}</small>` : '';
        
        if (task.completed) {
            li.classList.add('completed');
        }
        
        li.innerHTML = `
            <span class="task-text">${task.text} ${dateText}</span>
            <button class="edit-btn">Edit</button>
            <button class="delete-btn">Hapus</button>
        `;
        
        li.querySelector('.task-text').addEventListener('click', () => toggleCompletion(index));
        li.querySelector('.edit-btn').addEventListener('click', () => editTask(index));
        li.querySelector('.delete-btn').addEventListener('click', () => deleteTask(index));
        list.appendChild(li);
    });
    saveTasks();
};

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const taskText = input.value.trim();
    
    if (taskText !== "") {
        tasks.push({
            text: taskText,
            date: new Date().toLocaleDateString('id-ID'),
            completed: false,
        });
        renderTasks();
        input.value = "";
    } else {
        alert("Nama tugas tidak boleh kosong!");
    }
});

if (deleteAllButton) {
    deleteAllButton.addEventListener('click', deleteAllTasks);
}


renderTasks();
