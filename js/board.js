let currentDraggedElement;

async function init_board() {
    setURL('http://gruppe-247.developerakademie.net/smallest_backend_ever');
    await includeHTML();
    await loadAllTasks();
    load_current_user_local();
    await order_todos_ids();
    await updateHTML();
}

async function updateHTML() {

    let todo = todos.filter(t => t['status'] == 'todo');

    document.getElementById('todo').innerHTML = '';

    for (let index = 0; index < todo.length; index++) {
        const element = todo[index];
        document.getElementById('todo').innerHTML += generateTodoHTML(element);
    }

    let inprogress = todos.filter(t => t['status'] == 'inprogress');

    document.getElementById('inprogress').innerHTML = '';

    for (let index = 0; index < inprogress.length; index++) {
        const element = inprogress[index];
        document.getElementById('inprogress').innerHTML += generateTodoHTML(element);
    }

    let testing = todos.filter(t => t['status'] == 'testing');

    document.getElementById('testing').innerHTML = '';

    for (let index = 0; index < testing.length; index++) {
        const element = testing[index];
        document.getElementById('testing').innerHTML += generateTodoHTML(element);
    }

    let done = todos.filter(t => t['status'] == 'done');

    document.getElementById('done').innerHTML = '';

    for (let index = 0; index < done.length; index++) {
        const element = done[index];
        document.getElementById('done').innerHTML += generateTodoHTML(element);
    }
    console.log(todos)
}

function generateTodoHTML(element) {
    return `
        <div draggable="true" id="${element['id']}" ondragstart="startDragging(${element['id']})" class="todo2">
            <div class="card-icon-title">${element['title']}</div>
            <div class="card-icons-container">
                <div class="card-icons-left">
                    <p class="card-icon-user">${element['user'][0]['shortcut']}</p>
                    <img class="card-icon-img" src="./img/view-details-24.png">
                    <div class="card-icon-calender-container">
                    <img class="card-icon-calender" src="./img/date-to-24.png">
                    <p>12 / 6</p>
                    </div>
                </div>
                <div onclick="delete_todo(${element['id']})" class="card-icons-right">
                    <img src="./img/trash-2-24.png">
                </div>
            </div>
            <div class="card-icon-edit-container">
                <img class="card-icon-edit" src="../img/edit-24.png">
            </div>
        </div>
    `
}

function startDragging(id) {
    currentDraggedElement = id;
}

function allowDrop(ev) {
    ev.preventDefault();
}

function moveTo(status) {
    todos[currentDraggedElement]['status'] = status;
    updateHTML();
    let todosAsString = JSON.stringify(todos);
    backend.setItem('todos', todosAsString);
    setURL('http://gruppe-247.developerakademie.net/smallest_backend_ever');
}

async function order_todos_ids() {
    for (let o = 0; o < todos.length; o++) {
        todos[o].id = o;
    }
}

function delete_todo(position) {
    todos.splice(position, 1);
    backend.setItem('todos', JSON.stringify(todos));
    updateHTML();
}