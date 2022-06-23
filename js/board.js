let currentDraggedElement;

/**
 * initialize board
 */
async function init_board() {
    await init();
    await order_todos_ids();
    await updateHTML();
    document.getElementById('sidebar-link-board').style.backgroundColor = "rgba(255, 255, 255, 0.6)"
    document.getElementById('sidebar-link-board').style.color = "black";
    document.getElementById('bigscreen').style.backgroundImage = `url(${background_src})`;
}

/**
 *  sort the todos in the differt tabel-columns at board
 */
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
        <img onclick="create_archiv(${element['id']})" src="./img/archive-icon-64.png">
        `
    }
    change_card_border_color();
}

/**
 * render html code of the tabels
 * @param {number} element number of the elemnte in the JSON todos 
 */
function generateTodoHTML(element) {
    return `
        <div draggable="true" id="todo${element['id']}" ondragstart="startDragging(${element['id']})" class="todo2">
            <div class="card-icon-title">${element['title']}</div>
            <div class="card-icons-container">
                <div class="card-icons-left">
                    <p class="card-icon-user">${element['user'][0]['shortcut']}</p>
                    <div class="card-icon-calender-container">
                    <img class="card-icon-calender" src="./img/date-to-24.png">
                    <p>${element['date']}</p>
                    </div>
                </div>
                <div id="card-icon-trash${element['id']}" class="card-icons-right">
                    <img onclick="delete_todo(${element['id']})" src="./img/trash-2-24.png">
                </div>
            </div>
            <div class="card-icon-edit-container" id="card-icon-edit-container${element['id']}">
                <img onclick="open_dialog(${element['id']})" class="card-icon-edit" src="../img/edit-24.png">
            </div>
        </div>
    `
}

/**
 * change the color of the border left and right corresponding to the urgency
 */
function change_card_border_color() {
    for (i = 0; i < todos.length; i++) {
        if (todos[i].urgency == 'Low') {
            document.getElementById(`todo${i}`).style.border = "4px solid green";
        }
        if (todos[i].urgency == 'Medium') {
            document.getElementById(`todo${i}`).style.border = "4px solid goldenrod";
        }
        if (todos[i].urgency == 'High') {
            document.getElementById(`todo${i}`).style.border = "4px solid red";
        }
    }
}

/**
 * start dragging of the element
 * @param {number} id number of the elemnte in the JSON todos 
 */
function startDragging(id) {
    currentDraggedElement = id;
}

/**
 * allow drop of the element
 * @param {number} ev number of the elemnte in the JSON todos
 */
function allowDrop(ev) {
    ev.preventDefault();
}

/**
 * change the status of the todo element and save this in backlog, so it can move per drag and drop
 * @param {word} status status of the element
 */
function moveTo(status) {
    todos[currentDraggedElement]['status'] = status;
    updateHTML();
    let todosAsString = JSON.stringify(todos);
    backend.setItem('todos', todosAsString);
    setURL('http://gruppe-247.developerakademie.net/smallest_backend_ever');
}


/**
 * gives id to all todos (important to do this every time the page ist loaded because of the delete function)
 */
async function order_todos_ids() {
    for (let o = 0; o < todos.length; o++) {
        todos[o].id = o;
    }
}

/**
 * delete a todo element
 * @param {number} position number of the elemnte in the JSON todos
 */
async function delete_todo(position) {
    todos.splice(position, 1);
    backend.setItem('todos', JSON.stringify(todos));
    await order_todos_ids();
    updateHTML();
}

/**
 *  move a todo from the board to the archiv. Now it´s change from a todo to a archiv. 
 * @param {number} position number of the elemnte in the JSON todos
 */
async function create_archiv(position) {
    let archiv = {
        'title': todos[position].title,
        'category': todos[position].category,
        'description': todos[position].description,
        'date': todos[position].date,
        'urgency': todos[position].urgency,
        'user': todos[position].user,
        'status': 'archived',
    };
    archivs.push(archiv);
    todos.splice(position, 1);
    backend.setItem('todos', JSON.stringify(todos));

    let archivsAsString = JSON.stringify(archivs);
    backend.setItem('archivs', archivsAsString);
    setURL('http://gruppe-247.developerakademie.net/smallest_backend_ever');
    await order_todos_ids();
    updateHTML();
}

// DIALOG
/**
 * close the revise dialog 
 */
function close_dialog() {
    document.getElementById('dialog-container').classList.add('d-none');
    selectedUsers = [];
}

/**
 * open the revise dialog 
 */
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
                    <div class="select-container">
                    <select id="category" required class="add-task-select">
                        <option> HTML </option>
                        <option> CSS </option>
                        <option> JavaScript </option>
                    </select>
                    </div>
                </div>
                <div class="add-task-headline">
                    <p> DESCRIPTION </p>
                    <textarea required minlength="5" id="description" class="add-task-description"></textarea>
                </div>
            </div>
            <div class="add-task-colum">
                <div class="add-task-headline">
                    <p> DUE DATE </p>
                    <input id="date" required type="date" class="add-task-input">
                </div>
                <div class="add-task-headline">
                    <p> URGENCY </p>
                    <div class="select-container">
                    <select id="urgency" required class="add-task-select">
                        <option> Low </option>
                        <option> Medium </option>
                        <option> High </option>
                    </select>
                    </div>
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
}

/**
 * change choosen todo in backlog based on the information the user entered by the revise dialog
 * @param {number} id number of the elemnte in the JSON todos
 */
function change_task(id) {
    todos[id].title = document.getElementById('title').value;
    todos[id].category = document.getElementById('category').value;
    todos[id].description = document.getElementById('description').value;
    todos[id].description = document.getElementById('description').value;
    todos[id].date = document.getElementById('date').value;
    todos[id].urgency = document.getElementById('urgency').value;
    todos[id].user = selectedUsers;

    backend.setItem('todos', JSON.stringify(todos));
    updateHTML();
    document.getElementById('dialog-container').classList.add('d-none');
    selectedUsers = [];
}

/**
 * change the users that are selected for the todo
 * @param {*} i number of the elemnte in the JSON todos
 */
function selectUser_board(i) {
    for (let u = 0; u < userList.length; u++) {
        for (let s = 0; s < selectedUsers.length; s++) {
            if (userList[i].name == selectedUsers[s].name) {
                document.getElementById(`selectedUser${i}`).style = '';
                selectedUsers.splice([s], 1);
                return;
            }
        }
    }
    document.getElementById(`selectedUser${i}`).style = 'background-color: #2D3E97; color: white;';
    selectedUsers.push(userList[i]);
}