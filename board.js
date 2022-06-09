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