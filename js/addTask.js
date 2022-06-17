let selectedUsers = [];
let tasks = [];
let userList = [{
        'name': 'Ole Engelhardt',
        'user-image': './img/p36.jpg',
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

async function init_addtask() {
    setURL('http://gruppe-247.developerakademie.net/smallest_backend_ever');
    await includeHTML();
    await loadAllTasks();
    await load_current_user_local();
    document.getElementById('sidebar-link-add-task').style.backgroundColor = "rgba(255, 255, 255, 0.6)"
    document.getElementById('sidebar-link-add-task').style.color = "black";
    document.getElementById('main').style.backgroundImage = `url(${background_src})`;
}

function atLeastOneUserSelected() {
    return selectedUsers.length > 0;
}

function createTask() {
    if (atLeastOneUserSelected()) {
        writeTask();
        saveTaskToBackend();
        resetTask();
    } else {
        alert('Select at least 1 user for your task');
    }

}

function writeTask() {
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

        if (document.getElementById('bigscreen')) {
            document.getElementById('assignedToUser').innerHTML += ` 
            <p onclick="selectUser_board(${i})" id="selectedUser${i}"> ${userName} </p>   
             `;
        } else {
            document.getElementById('assignedToUser').innerHTML += ` 
        <p onclick="selectUser(${i})" id="selectedUser${i}">${userName}</p>   
         `;
        }
    }

    document.getElementById('assignConfirm').innerHTML = `<p onclick="confirmUser()"> Confirm</p>`;

}

function selectUser(i) {
    let selectedUser = selectedUsers.indexOf(userList[i]);
    let selectionId = "selectedUser" + i;

    if (selectedUser == -1) {
        document.getElementById(selectionId).style = 'background-color: #2D3E97; color: white;';
        selectedUsers.push(userList[i]);
    } else {
        document.getElementById(selectionId).style = '';
        selectedUsers.splice(selectedUser, 1);
    }
}

function confirmUser() {

    if (atLeastOneUserSelected()) {
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
    } else {
        alert('Select at least 1 user for your task');
    }

}

function deleteTask(position) {
    tasks.splice(position, 1);
    backend.setItem('tasks', JSON.stringify(tasks));
}