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
        document.getElementById(`card-icon-trash${element['id']}`).innerHTML = `
        <img onclick="add_archiv(${element['id']})" src="../img/fabian.png">
        `

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
                    <p>${element['date']}</p>
                    </div>
                </div>
                <div id="card-icon-trash${element['id']}" class="card-icons-right">
                    <img onclick="delete_todo(${element['id']})" src="./img/trash-2-24.png">
                </div>
            </div>
            <div class="card-icon-edit-container">
                <img onclick="open_dialog(${element['id']})" class="card-icon-edit" src="../img/edit-24.png">
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

async function delete_todo(position) {
    todos.splice(position, 1);
    backend.setItem('todos', JSON.stringify(todos));
    await order_todos_ids();
    updateHTML();
}

// DIALOG

function close_dialog() {
    document.getElementById('dialog-container').classList.add('d-none');
    selectedUsers = [];
}

function open_dialog(id) {
    document.getElementById('dialog-container').classList.remove('d-none');
    document.getElementById('inner-dialog').innerHTML = '';
    document.getElementById('inner-dialog').innerHTML = `
    
        <div class="add-task-container">
            <div class="add-task-colum">

                <div class="add-task-headline">
                    <p>TITLE </p>

                    <input required minlength="5" id="title" class="add-task-input">
                </div>
                <div class="add-task-headline">
                    <p> CATEGORY </p>

                    <select id="category" required class="add-task-select">
                        <option> HTML </option>
                        <option> CSS </option>
                        <option> JavaScript </option>
                    </select>

                </div>

                <div class="add-task-headline">
                    <p> DESCRIPTION </p>

                    <input required minlength="5" id="description" class="add-task-description">
                </div>

            </div>

            <div class="add-task-colum">

                <div class="add-task-headline">
                    <p> DUE DATE </p>

                    <input id="date" required type="date" class="add-task-input">
                </div>

                <div class="add-task-headline">
                    <p> URGENCY </p>

                    <select id="urgency" required class="add-task-select">
                        <option> Low </option>
                        <option> Medium </option>
                        <option> High </option>
                    </select>
                </div>

                <div class="add-task-assign">
                    <p> ASSIGNED TO </p>

                    <div class="assign-section" id="assign-section">

                        <div id="selectedImage"> <img src="/img/change-user.png" class="add-task-user-image"> </div>

                        <div id="add-user-btn"> <button type="button" class="add-user-btn" onclick="assignTo()">
                            </button> </div>

                    </div>

                    <div id="user-list" class="user-list d-none">
                        <div id="assignedToUser"></div>
                        <div id="assignConfirm"></div>

                    </div>
                </div>

                <div class="add-task-final" id="add-task-final">
                    <button onclick="change_task(${id})" class="create-btn"> CHANGE TASK </button>
                </div>
            </div>

        </div>
    
    `;
    document.getElementById('title').value = todos[id].title;
    document.getElementById('category').value = todos[id].category;
    document.getElementById('description').value = todos[id].description;
    document.getElementById('description').value = todos[id].description;
    document.getElementById('date').value = todos[id].date;
    document.getElementById('urgency').value = todos[id].urgency;

    for (let i = 0; i < todos[id].user.length; i++) {
        for (let j = 0; j < selectedUsers.length; j++) {
            if (todos[id].user[i].name == selectedUsers[j].name) {
                return;
            }
        }
        selectedUsers.push(todos[id].user[i]);
    }

    document.getElementById('selectedImage').innerHTML = ``;
    for (let i = 0; i < selectedUsers.length; i++) {
        document.getElementById('selectedImage').innerHTML += `
            <img class="add-task-user-image" src="${selectedUsers[i]['user-image']}">
            `;
    }

    console.log(selectedUsers);
}

function change_task(id) {
    todos[id].title = document.getElementById('title').value;
    todos[id].category = document.getElementById('category').value;
    todos[id].description = document.getElementById('description').value;
    todos[id].description = document.getElementById('description').value;
    todos[id].date = document.getElementById('date').value;
    todos[id].urgency = document.getElementById('urgency').value;

    backend.setItem('todos', JSON.stringify(todos));
    updateHTML();
    document.getElementById('dialog-container').classList.add('d-none');
    selectedUsers = [];
}