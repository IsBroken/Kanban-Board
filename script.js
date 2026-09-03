let tasksData = {}

const todo = document.querySelector('#todo');
const progress = document.querySelector('#progress');
const done = document.querySelector('#done');
const tasks = document.querySelectorAll('.task'); 
const columns = [todo, progress, done];
let dragElement = null; 

function addTask(title, desc, column){
    const div = document.createElement('div');
    div.classList.add('task');
    div.setAttribute('draggable', 'true');
    div.innerHTML = `<h2>${title}</h2>
                    <p>${desc}</p>
                    <button class="delete-btn">Delete</button>`;
    column.appendChild(div);
    updateTaskCount();
    div.addEventListener("drag", (e) => {
        dragElement = div;
    })

    const deleteBtn = div.querySelector('.delete-btn');
    deleteBtn.addEventListener('click', () => {
        div.remove();
        updateTaskCount();
    })
    return div;
}

function updateTaskCount(){
        columns.forEach(col => {
            const tasks = col.querySelectorAll('.task');
            const count = col.querySelector('.right');
            
            tasksData[col.id] = Array.from(tasks).map(t => {
                return {
                    title: t.querySelector('h2').textContent,
                    desc: t.querySelector('p').textContent
                }
            })
            localStorage.setItem('tasks', JSON.stringify(tasksData));
            count.textContent = tasks.length;
        })
}

if (localStorage.getItem("tasks")){
    const data = JSON.parse(localStorage.getItem("tasks"));
    for(const col in data){
        const column = document.querySelector(`#${col}`);
        data[col].forEach(task => {
            addTask(task.title, task.desc, column);
        })

    }

    
}
 
tasks.forEach(task => {
    task.addEventListener("drag", (e) => {
        // console.log( e );
        dragElement = task;
    })
})

// progress.addEventListener("dragenter",(e)=> {
//     progress.classList.add("hover-over");
// })

// progress.addEventListener("dragleave",(e)=> {
//     progress.classList.remove("hover-over");
// })

// todo.addEventListener("dragenter",(e)=> {
//     todo.classList.add("hover-over");
// })

// todo.addEventListener("dragleave",(e)=> {
//     todo.classList.remove("hover-over");
// })

// done.addEventListener("dragenter",(e)=> {
//     done.classList.add("hover-over");
// })

// done.addEventListener("dragleave",(e)=> {
//     done.classList.remove("hover-over");
// })

function addDragEventsonColumn(column){
    column.addEventListener("dragenter",(e)=>{
        e.preventDefault();
        column.classList.add("hover-over");
    })

    column.addEventListener("dragleave",(e)=>{
        e.preventDefault();
        column.classList.remove("hover-over");
    })

    column.addEventListener("dragover",(e)=>{
        e.preventDefault();
    })

    column.addEventListener("drop",(e)=>{
        e.preventDefault();

        column.appendChild(dragElement);
        column.classList.remove("hover-over");

        updateTaskCount();
            
    })
    
}

addDragEventsonColumn(todo);
addDragEventsonColumn(progress);
addDragEventsonColumn(done);

// Modal functionality
const toggleModalButton = document.querySelector('#toggle-modal');
const modal = document.querySelector('.modal');
const modalBg = document.querySelector('.modal .bg');
const addNewTaskButton = document.querySelector('#add-new-task');

toggleModalButton.addEventListener('click', () => {
    modal.classList.toggle('active');
})

modalBg.addEventListener('click', () => {
    modal.classList.remove('active');
})

addNewTaskButton.addEventListener('click', () => {
    const taskTitle = document.querySelector('#task-title-input').value;
    const taskDesc = document.querySelector('#task-description-input').value;

    addTask(taskTitle, taskDesc, todo);

    updateTaskCount();

    modal.classList.remove('active');

    document.querySelector('#task-title-input').value = '';
    document.querySelector('#task-description-input').value = '';

})