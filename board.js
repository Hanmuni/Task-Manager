let currentDraggedElement;

function updateBoardHTML() {
    clearHTML();
    showTaskbox('todo');
    showTaskbox('inprogress');
    showTaskbox('testing');
    showTaskbox('done');
    getCategory();
    checkUrgency();
    removeHighlightTaskbox('todo');
    removeHighlightTaskbox('inprogress');
    removeHighlightTaskbox('testing');
    removeHighlightTaskbox('done');

}

function clearHTML() {
    document.getElementById('todo-tasks').innerHTML = '';
    document.getElementById('inprogress-tasks').innerHTML = '';
    document.getElementById('testing-tasks').innerHTML = '';
    document.getElementById('done-tasks').innerHTML = '';
}

function showTaskbox(taskBox) {
    let boxes = tasks.filter(t => t['Taskbox'] == taskBox)

    for (let i = 0; i < boxes.length; i++) {
        document.getElementById(taskBox+'-tasks').innerHTML += `
        <div class="task" draggable="true" ondragstart="startDragging(${boxes[i]['ID']})">
          <span id="category${i}" class="category">${boxes[i].Category}</span>
          <div id="urgency${boxes[i]['ID']}" class="urgency"></div>
          <span class="tasktitle"><b>${boxes[i].Titel}</b></span>
          <span class="taskmiddle">${boxes[i].Description}</span>
         <div class="lowertask">
          <span class="name">${boxes[i].Name}</span>
          <div> <img onclick="deleteTicket(${boxes[i]['ID']})" class="trash" src="img/trash.png"></div>
          <span class="date">${boxes[i].DueDate}</span>
         </div>
        </div>`;
    }
}

function moveTo(Taskbox) {
    let currentDraggedTask = tasks.find(ticket => ticket.ID == currentDraggedElement);
    currentDraggedTask['Taskbox'] = Taskbox;
    backend.setItem('tasks', JSON.stringify(tasks));
    updateBoardHTML();
}

function highlightTaskbox(taskBox){
    document.getElementById(taskBox+'-tasks').classList.add('bg-'+taskBox+'-highlight');
}

function removeHighlightTaskbox(taskBox){
    document.getElementById(taskBox+'-tasks').classList.remove('bg-'+taskBox+'-highlight');
}

function getCategory() {
    for (let i = 0; i < tasks.length; i++) {

        let categories = tasks[i]['Category'];
        backend.setItem('tasks', JSON.stringify(tasks));
    }
}

function checkUrgency() {
    
    for (let i = 0; i < tasks.length; i++) {
        let urgency = tasks[i]['Urgency'];
        
        if (urgency == 'High') {
            document.getElementById(`urgency${tasks[i]['ID']}`).classList.add('red');
        } else if (urgency == 'Medium') {
            document.getElementById(`urgency${tasks[i]['ID']}`).classList.add('yellow');
        }
        else if (urgency == 'Low') {
            document.getElementById(`urgency${tasks[i]['ID']}`).classList.add('green');
        }
        backend.setItem('tasks', JSON.stringify(tasks));
    }
}

function deleteTicket(id) {
    tasks = JSON.parse(backend.getItem("tasks"));
    let getID = tasks.findIndex(obj => obj.ID==id);
    tasks.splice(getID, 1);
    backend.setItem('tasks', JSON.stringify(tasks));
    if (window.location.href.indexOf('board') > -1) {
        document.getElementById('todo-tasks').innerHTML = '';
        document.getElementById('inprogress-tasks').innerHTML = '';
        document.getElementById('testing-tasks').innerHTML = '';
        document.getElementById('done-tasks').innerHTML = '';
    }
    if (window.location.href.indexOf("board") > -1) {

    }
    updateBoardHTML();
}