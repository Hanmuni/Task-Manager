let todos = [{
    'id': 0,
    'title': 'Coden',
    'category': 'todo',
}, {
    'id': 1,
    'title': 'Planen',
    'category': 'inprogress',
}];

let currentDraggedElement;

function updateHTML() {

    let todo = todos.filter(t => t['category'] == 'todo');

    document.getElementbyID('todo').innerHTML = '';

    for (let index = 0; index < todo.length; index++) {
        const element = todo[index];
        document.getElementById('todo').innerHTML += generateTodoHTML(element);
    }

    let inprogress = todos.filter(t => t['category'] == 'inprogress');

    document.getElementbyID('inprogress').innerHTML = '';

    for (let index = 0; index < inprogress.length; index++) {
        const element = inprogress[index];
        document.getElementById('inprogress').innerHTML += generateTodoHTML(element);
    }

    let testing = todos.filter(t => t['category'] == 'testing');

    document.getElementbyID('testing').innerHTML = '';

    for (let index = 0; index < testing.length; index++) {
        const element = testing[index];
        document.getElementById('testing').innerHTML += generateTodoHTML(element);
    }

    let done = todos.filter(t => t['category'] == 'done');

    document.getElementbyID('done').innerHTML = '';

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

function moveTo (category) {
    todos[currentDraggedElement] ['category'] = category;
    updateHTML ();
}

