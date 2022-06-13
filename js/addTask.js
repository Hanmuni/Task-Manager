let selectedUsers = [];
let tasks = [];
let userList = [{
    'name': 'Ole Engelhardt',
    'user-image': './img/ole.png',
    'email': 'ole.engelhardt@email.com',
    'shortcut': 'OE',
},
{
    'name': 'Fabian Kalus',
    'user-image': './img/p24.jpg',
    'email': 'fabian.kalus@email.com',
    'shortcut': 'FK',
}, {
    'name': 'Hong Hanh Chu',
    'user-image': './img/HongHanh.jpg',
    'email': 'hong-hanh.chu@email.com',
    'shortcut': 'HHC',
}
];

let atLeastOneUser = false;

function createTask(event) {
    event.preventDefault();
    writeTask();
    saveTaskToBackend();
    resetTask();
}

function writeTask() {

    if (atLeastOneUser == true) {
        let title = document.getElementById('title').value;
        let category = document.getElementById('category').value;
        let date = document.getElementById('date').value;
        let description = document.getElementById('description').value;
        let urgency = document.getElementById('urgency').value;

        let task = {
            'title': title,
            'category': category,
            'description': description,
            'date': date,
            'urgency': urgency,
            'user': selectedUsers,
        };

        tasks.push(task);
    }

    else {
        alert('Select at least 1 user for your task');
    }

}

function saveTaskToBackend() {
    let tasksAsString = JSON.stringify(tasks);
    backend.setItem('tasks', tasksAsString);
}

function resetTask() {

    document.getElementById('title').value = ``;
    document.getElementById('category').value = ``;
    document.getElementById('description').value = ``;
    document.getElementById('date').value = ``;
    document.getElementById('urgency').value = ``;
    document.getElementById('selectedImage').innerHTML = `<img src="/img/change-user.png" class="add-task-user-image">`;
    selectedUsers = [];

}
function assignTo() {

    document.getElementById('assign-section').classList.add('d-none');
    document.getElementById('add-task-final').classList.add('d-none');
    displayUsersList();
}

function displayUsersList() {

    document.getElementById('user-list').classList.remove('d-none');
    document.getElementById('assignedToUser').innerHTML = ``;

    for (let i = 0; i < userList.length; i++) {

        let userName = userList[i]['name'];


        document.getElementById('assignedToUser').innerHTML += ` 
    <p onclick="selectUser(${i})" id="selectedUser${i}"> ${userName} </p>   
         `;
    }

    document.getElementById('assignConfirm').innerHTML = `<p onclick="confirmUser()"> Confirm</p>`;

}

function selectUser(i) {
    let selectedUser = selectedUsers.indexOf(userList[i]);
    let selectionId = "selectedUser" + i;

    if (selectedUser == -1) {
        document.getElementById(selectionId).style = 'background-color: #2D3E97; color: white;';
        selectedUsers.push(userList[i]);
    }

    else {
        document.getElementById(selectionId).style = '';
        selectedUsers.splice(selectedUser, 1);
    }
}

function confirmUser() {

    if (selectedUsers == "") {
        atLeastOneUser = false;
        alert('Select at least 1 user for your task');

    }

    else {
        atLeastOneUser = true;
        document.getElementById('user-list').classList.add('d-none');
        document.getElementById('assign-section').classList.remove('d-none');
        document.getElementById('add-task-final').classList.remove('d-none');

        document.getElementById('selectedImage').innerHTML = ``;

        for (let i = 0; i < selectedUsers.length; i++) {
            document.getElementById('selectedImage').innerHTML += `
            <img class="add-task-user-image" src="${selectedUsers[i]['user-image']}">
            `;
        }

        document.getElementById('add-user-btn').innerHTML = `
        <button id="add-user-btn" type="button" class="add-user-btn" onclick="assignTo()"> </button>
        `;
    }
}

function deleteTask(position) {
    tasks.splice(position, 1);
    backend.setItem('tasks', JSON.stringify(tasks));
}