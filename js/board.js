// Defines which Element is dragged at this very moment
let currentDraggedElement;

// Opens the tasks and users that are saved in the Backlog via the Backend
async function init_board() {
    setURL('http://gruppe-247.developerakademie.net/smallest_backend_ever');
    await includeHTML();
    await loadAllTasks();
    load_current_user_local();
    await order_todos_ids();
    await updateHTML();
}

// This function filters through the Tasks (coming from Backlog) and puts them in the right column; which in this case will always be "todo". So for this first step, the other 3 Status could also be deleted, but then Drag&Drop would not work.
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

// This function creates the DRAGGABLE Task-Container, including delete and edit button, user shortcut and task name
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
                <div onclick="delete_todo(${element['id']})" class="card-icons-right">
                    <img src="./img/trash-2-24.png">
                </div>
            </div>
            <div class="card-icon-edit-container">
                <img onclick="open_dialog(${element['id']})" class="card-icon-edit" src="../img/edit-24.png">
            </div>
        </div>
    `
}
// The following 3 functions make the Task-Container draggable, or rather define the process of dragging (the ability to be dragged is soley done by "draggable=true")
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

// Deletes one task that has been put on the Board from Backlog
function delete_todo(position) {
    todos.splice(position, 1);
    backend.setItem('todos', JSON.stringify(todos));
    updateHTML();
}

// These following functions enable the small task-container to be enlarged by clicking on it. This works in combination with Board.html, where e.g. we put the onclick-Function "close-dialog" and where we activate d-none via an ID.

function close_dialog() {
    document.getElementById('dialog-container').classList.add('d-none');
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

    // In this part, all the mentioned IDs above in the inner.HTML part of the function open_dialog (title, category) are filled, as they were defined previously already. So it is the same content as it as written in the Backlog/Add_Task-Section
    document.getElementById('title').value = todos[id].title;
    document.getElementById('category').value = todos[id].category;
    document.getElementById('description').value = todos[id].description;
    document.getElementById('description').value = todos[id].description;
    document.getElementById('date').value = todos[id].date;
    document.getElementById('urgency').value = todos[id].urgency;
    // USERS FEHLT NOCH
}

function change_task(id) {
    // jetzt den neuen Wert der Felder in Todos Array übertragen (an der Stelle von der mitgegebenen ID);
    // MUSST DU MIT BACKEND MACHEN
    init_board();
}