let tasks = [];

let selectedUsers = [];

let assignToUsers = [{
        'name': 'Ole Engelhardt',
        'user-image': './img/ole.png',
        'email': 'ole.engelhardt@email.com'
    },
    {
        'name': 'Fabian Kalus',
        'user-image': './img/p24.jpg',
        'email': 'fabian.kalus@email.com'
    }, {
        'name': 'Hong Hanh Chu',
        'user-image': './img/HongHanh.jpg',
        'email': 'hong-hanh.chu@email.com'
    }
];

function createTask() {
    let title = document.getElementById('title').value;
    let category = document.getElementById('category').value;
    let description = document.getElementById('description').value;
    let urgency = document.getElementById('urgency').value;

    let task = {
        'title': title,
        'category': category,
        'description': description,
        'date': new Date().getTime(),
        'urgency': urgency,
        'user': selectedUsers,
    };


    tasks.push(task);

    document.getElementById('title').value = ``;
    document.getElementById('description').value = ``;

    let tasksAsString = JSON.stringify(tasks);
    backend.setItem('tasks', tasksAsString);

    init();
}

function assignTo() {

    document.getElementById('assign-section').classList.add('d-none');
    document.getElementById('add-task-final').classList.add('d-none');
    displayUsersList();
}

function displayUsersList() {
    document.getElementById('user-list').classList.remove('d-none');
    document.getElementById('assignedToUser').innerHTML = ``;

    for (let i = 0; i < assignToUsers.length; i++) {

        let userName = assignToUsers[i]['name'];


        document.getElementById('assignedToUser').innerHTML += ` 
    <p onclick="selectUser(${i})" id="selectedUser${i}"> ${userName} </p>   
         `;
    }

    document.getElementById('assignConfirm').innerHTML = `<p onclick="confirmUser()"> Confirm</p>`;

}

function selectUser(i) {
    let id = "selectedUser" + i;
    document.getElementById(id).style = 'background-color: #2D3E97; color: white;';
    selectedUsers.push(assignToUsers[i]);

}

function confirmUser() {

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

function deleteTask(position) {
    tasks.splice(position, 1);
    backend.setItem('tasks', JSON.stringify(tasks));
    console.log(tasks);
}

function cancelTask() {
    document.getElementById('title').value = ``;
    document.getElementById('description').value = ``;
    document.getElementById('assign-section').innerHTML = `
    <div id="selectedImage"> <img src="/img/change-user.png" class="add-task-user-image"> </div>

    <div id="add-user-btn"> <button type="button" class="add-user-btn" onclick="assignTo()">
        </button> </div>
`;
}