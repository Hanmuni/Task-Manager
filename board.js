let todos = [{
    'id': 0,
    'title': 'planen',
    'status': 'todo',
}, {
    'id': 1,
    'title': 'coden',
    'status': 'inprogress',
}, {
    'id': 2,
    'title': 'fine tuning',
    'status': 'testing',
}, {
    'id': 3,
    'title': 'chillen',
    'status': 'done',
}];

let currentDraggedElement;

async function init_board() {
    setURL('http://gruppe-247.developerakademie.net/smallest_backend_ever');
    await includeHTML();
    await loadAllTasks();
    load_current_user_local();
    await updateHTML();
}

function updateHTML() {

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
}

function generateTodoHTML(element) {
    return `<div draggable="true" ondragstart="startDragging(${element['id']})" class="todo">${element['title']}</div>`;
}

function startDragging(id) {
    currentDraggedElement = id;
}

function allowDrop (ev) {
    ev.preventDefault ();
}

function moveTo (status) {
    todos[currentDraggedElement] ['status'] = status;
    updateHTML();
}

