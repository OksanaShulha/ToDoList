
// const addTodo = (event) => {

const addTaskBtn = document.getElementById('add-task-btn');  //user add any task in the list
const descTaskInput = document.getElementById('description-task'); //user type any task in input
const todoWrapper = document.querySelector('.todo-wrapper'); // any task goes here

let tasks; 
// !localStorage.tasks ? tasks = [] : tasks = JSON.parse(localStorage.getItem('tasks'));

let todoItemElem = [];


// text from input goes here
function Task(description) {
    this.description = description;
    this.complete = false; // user is not available to change something
}

// this template goes to task-wrapper
const createTemplate = (task,index) => { // `` it is a dynamic strings + ${} (to repeat each time: completed and description)
    return `
    <div class="todo-item ${task.completed ? 'checked' : ''}">
        <div class="description">${task.description}</div>
        <div class="buttons">
            <input onclick="completeTask(${index})" class="btn-complete" type="checkbox" ${task.completed ? 'checked' : ''}></input>
            <button onclick="deleteTask(${index})" class="btn-delete">Delete</button>
        </div>
    </div>
    `
}

const filterTasks = () => {
    const activeTasks = tasks.length && tasks.filter(item => item.completed == false);
    const completedTasks = tasks.length && tasks.filter(item => item.completed == true);
    tasks = [...activeTasks,...completedTasks];
}

const fillHtmlList = () => {
    todoWrapper.innerHTML = '';
    if(tasks.length > 0) {
        filterTasks();
        tasks.forEach((item,index) => {
            todoWrapper.innerHTML += createTemplate(item, index);
        });
        todoItemElem = document.querySelectorAll('.todo-item');
    }
}

fillHtmlList(); // refer to the loop "if"

const updateLocal = () => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}


addTaskBtn.addEventListener('click', () => {
    tasks.push(new Task(descTaskInput.value));
    updateLocal();
    fillHtmlList();
    descTaskInput.value = '';
})

const completeTask = index => {
    tasks[index].completed = !tasks[index].completed;
    if(tasks[index].completed) {
        todoItemElem[index].classList.add('checked');
    } else {
        todoItemElem[index].classList.remove('checked');
    }
    updateLocal();
    fillHtmlList();
    descTaskInput.value = '';
}

const deleteTask = index => {
    todoItemElem[index].classList.add('deleting');
    tasks.splice(index, 1);
    updateLocal();
    fillHtmlList;
    setTimeout (() => {
        tasks.splice(index, 1);
        updateLocal();
        fillHtmlList; 
    },500)
}

// };

// export { addTodo };