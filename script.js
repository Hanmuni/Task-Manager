/* Alle */

// Profil = [proilnummer Name, Bild, Usesrname, Passwort, E-Mail]
let profiles = [
    ['profil00', 'GUEST', './img/person-g086296c94_640.png', 'GUEST', 'PASSWORT', '123@mailvorbei.com'],
    ['profil01', 'Max Mustermann', './img/p24.jpg', 'Mustermann15', 'x', 'beispiel123@mail.com'],
    ['profil02', 'Brigitte Beispiel', './img/p26.jpg', 'B.Beispiel', 'katzenliebhaberin', 'beispiel123@mail.com'],
    ['profil03', 'Emily Example', './img/p30.jpg', 'Example92', 'passwort5', 'beispiel123@mail.com'],
    ['profil04', 'Michelle Modell', './img/p33.jpg', 'M.odell', 'supermodell', 'beispiel123@mail.com'],
    ['profil05', 'Victor Vorbild', './img/p36.jpg', 'Victory', 'venividi', 'beispiel123@mail.com']
]

let current_user = [];
let todos = [];

async function init() {
    setURL('http://gruppe-247.developerakademie.net/smallest_backend_ever');
    await includeHTML();
    await loadAllTasks();
    await load_current_user_local();
}

async function loadAllTasks() {
    await downloadFromServer();
    tasks = JSON.parse(backend.getItem('tasks')) || [];
    todos = JSON.parse(backend.getItem('todos')) || [];

}

async function includeHTML() {
    let includeElements = document.querySelectorAll('[w3-include-html]');

    for (let i = 0; i < includeElements.length; i++) {
        const element = includeElements[i];
        file = element.getAttribute("w3-include-html");

        let response = await fetch(file);
        if (response.ok) {
            element.innerHTML = await response.text();
        } else {
            element.innerHTML = 'Page not found';
        }
    }
}
/* Alle */


/* Ole */



/* Ole*/


/* Fabian */

async function init_backlog() {
    setURL('http://gruppe-247.developerakademie.net/smallest_backend_ever');
    await includeHTML();
    await loadAllTasks();
    await load_current_user_local();
    await render_backlog();
    await render_backlog_mobil();
}

async function render_backlog() {
    document.getElementById('backlog-task-container').innerHTML = '';
    for (let i = 0; i < tasks.length; i++) {
        document.getElementById('backlog-task-container').innerHTML += `
    <div id="backlog-task${i}" class="backlog-task">
        <div id="backlog-task-assigned-to${i}" class="backlog-task-assigned-to backlog-20">
        </div>
        <div id="backlog-task-title${i}" class="backlog-10">
            <p>${tasks[i].title}</p>
        </div>
        <div id="backlog-task-due-date${i}" class="backlog-15">
            <p backlog-task-due-date${i}-p>${tasks[i].date}</p>
        </div>
        <div id="backlog-task-details${i}" class="backlog-15 details" style="overflow: hidden;">
            <p>${tasks[i].description}</p>
        </div>
        <div id="backlog-task-details${i}" class="backlog-15">
            <p>${tasks[i].category}</p>
        </div>
        <div onclick="deleteTask(${i}); render_backlog()" id="backlog-task-details${i}" class="backlog-10">
            <p class="cursor"><img src="./img/trash-2-32.png"></p>
        </div>
        <div onclick="create_todo(${i}); render_backlog()" id="backlog-task-details${i}" class="backlog-15 add-to-board">
            <p class="cursor"><img src="./img/right-circular-32.png"></p>
        </div>
        
    </div>    
    `;
        document.getElementById(`backlog-task-assigned-to${i}`).innerHTML = `
        <div id="backlog-task-image${i}">
            <img src=${tasks[i].user[0]['user-image']} class="">
        </div>
        <div id="backlog-task-name${i}" class="">    
        </div>
        `;
        document.getElementById(`backlog-task-name${i}`).innerHTML = '';
        for (let j = 0; j < tasks[i].user.length; j++) {
            document.getElementById(`backlog-task-name${i}`).innerHTML += `
                <p class="" > ${tasks[i].user[j].name} </p>`
        }
        add_urgency_color(i);
        add_category_color(i);
    }
    console.log(tasks)
}

async function render_backlog_mobil() {
    document.getElementById('backlog-task-container-mobil').innerHTML = '';
    for (let i = 0; i < tasks.length; i++) {
        document.getElementById('backlog-task-container-mobil').innerHTML += `
        <div class="backlog-one-task-container-mobil" id="backlog-one-task-container-mobil${i}">
            <div class="bl-title-mobil">
                <p>${tasks[i].title}</p>
            </div>
            <div class="bl-assigned-to-mobil" id="bl-assigned-to-mobil">
                <img src="${tasks[i].user[0]['user-image']}">
                <p>${tasks[i].user[0]['name']}</p>
            </div>
            <div class="bl-category-date">
                <div class="bl-category">
                    <p>CATEGORY</p>
                    <p>${tasks[i].category}</p>
                </div>
                <div class="bl-date">
                    <p>DATE</p>
                    <p>${tasks[i].date}</p>
                </div>
            </div>
            <div class="bl-description">
                <p>DESCRIPTION</p>
                <p>${tasks[i].description}</p>
            </div>
            <div class="bl-icons">
                <div  onclick="deleteTask(${i}); render_backlog_mobil()" class="bl-delete">
                    <p>DELETE</p>
                    <img src="./img/trash-2-32.png">
                </div>
                <div onclick="create_todo(${i}); render_backlog_mobil()" class="bl-add-board">
                    <p>ADD BOARD</p>
                    <img src="./img/right-circular-32.png">
                </div>
            </div>
        </div>    
        
        `
        add_urgency_color(i);
        add_category_color(i);

    }




}

function add_category_color(i) {
    if (tasks[i].category == 'HTML') {
        document.getElementById(`backlog-task-details${i}`).classList.add('html-color');
        document.getElementById(`backlog-task-details${i}`).classList.add('html-color');
    }
    if (tasks[i].category == 'CSS') {
        document.getElementById(`backlog-task-details${i}`).classList.add('css-color');
    }
    if (tasks[i].category == 'JavaScript') {
        document.getElementById(`backlog-task-details${i}`).classList.add('javascript-color');
    }
}

function add_urgency_color(i) {
    if (tasks[i].urgency == 'High') {
        document.getElementById(`backlog-task${i}`).classList.add('urc-high');
    }
    if (tasks[i].urgency == 'Medium') {
        document.getElementById(`backlog-task${i}`).classList.add('urc-medium');
    }
    if (tasks[i].urgency == 'Low') {
        document.getElementById(`backlog-task${i}`).classList.add('urc-low');
    }
}


function create_todo(position) {
    let todo = {

        'id': '',
        'title': tasks[position].title,
        'category': tasks[position].category,
        'description': tasks[position].description,
        'date': tasks[position].date,
        'urgency': tasks[position].urgency,
        'user': tasks[position].user,
        'status': 'todo',
    };
    todos.push(todo);
    tasks.splice(position, 1);
    backend.setItem('tasks', JSON.stringify(tasks));

    let todosAsString = JSON.stringify(todos);
    backend.setItem('todos', todosAsString);
    setURL('http://gruppe-247.developerakademie.net/smallest_backend_ever');
    console.log(todos);
}



/* Fabian*/


// LOGIN

function change_passwort_button_type() {
    if (document.getElementById('login-passwort').type == 'password') {
        document.getElementById('login-passwort').type = 'text';
    } else {
        document.getElementById('login-passwort').type = 'password'
    }
}

function guest_login() {
    document.getElementById('login-username').value = profiles[0][3];
    document.getElementById('login-passwort').value = profiles[0][4];
}

function check_login() {
    let input_user_field = document.getElementById('login-username').value;
    let input_passwort_field = document.getElementById('login-passwort').value;
    current_user = [];
    for (let i = 0; i < profiles.length; i++) {
        if (profiles[i][3] == input_user_field) {
            if (profiles[i][4] == input_passwort_field) {
                current_user.push(profiles[i]);
                save_current_user_local();
                window.location.href = './welcome.html';
                return;
            } else {
                alert('Das eingegebene Passwort ist nicht korrekt');
                return;
            }
        }
    }
    alert('Der eingebene Benutzername ist nicht vergeben.')
}

function save_current_user_local() {
    let current_userAsText = JSON.stringify(current_user);
    localStorage.setItem('current_user', current_userAsText);
}

async function load_current_user_local() {
    let current_userAsText = localStorage.getItem('current_user');
    if (current_userAsText) {
        current_user = JSON.parse(current_userAsText);
    };
    document.getElementById('sidebar-user-image').src = current_user[0][2];
    document.getElementById('sidebar-user-name').innerHTML = current_user[0][3];
}

// HELP
function remove_aktive_help_class() {
    document.getElementById('help-headline-first-steps').classList.remove('aktive-help');
    document.getElementById('help-headline-add-task').classList.remove('aktive-help');
    document.getElementById('help-headline-backlog').classList.remove('aktive-help');
    document.getElementById('help-headline-board').classList.remove('aktive-help');
    document.getElementById('help-headline-impressum').classList.remove('aktive-help');

}

function render_first_steps_at_help() {
    remove_aktive_help_class();
    document.getElementById('help-headline-first-steps').classList.add('aktive-help');
    document.getElementById('help-choosed-image').classList.remove('d-none');
    document.getElementById('help-choosed-image').src = './img/sunset-gf546bd15e_1280.jpg';
    document.getElementById('help-choosed-text').innerHTML = `Welcome to the join page of: Ole Engelhardt, Hong Hanh Chu and Fabian Kalus.<br>
    This is a project management tool based on the kanban-methode. It´s the easiest way to manage your projects and tasks. Try it out.`
}

function render_add_task_at_help() {
    remove_aktive_help_class();
    document.getElementById('help-headline-add-task').classList.add('aktive-help');
    document.getElementById('help-choosed-image').classList.remove('d-none');
    document.getElementById('help-choosed-image').src = './img/sunset-gf546bd15e_1280.jpg';
    document.getElementById('help-choosed-text').innerHTML = `In the 'Add Task' area you can add individual tasks.<br>
    Enter title, category, description, due date, importance and assign the task to one or more user/s. All fields have to been filled.`
}

function render_backlog_at_help() {
    remove_aktive_help_class();
    document.getElementById('help-headline-backlog').classList.add('aktive-help');
    document.getElementById('help-choosed-image').classList.remove('d-none');
    document.getElementById('help-choosed-image').src = './img/sunset-gf546bd15e_1280.jpg';
    document.getElementById('help-choosed-text').innerHTML = `Backlog shows every task the team added, except the tasks that are already on the board.<br>
    At the beggining of a project you can add all tasks and have overview of them at the baglock. Then you can decide, which tasks your team should work on at the next time and push them to the board.<br>
    The urgency of the task you can see at the left and right border. The colors are assigned according to the traffic-light-system.`
}

function render_board_at_help() {
    remove_aktive_help_class();
    document.getElementById('help-headline-board').classList.add('aktive-help');
    document.getElementById('help-choosed-image').classList.remove('d-none');
    document.getElementById('help-choosed-image').src = './img/sunset-gf546bd15e_1280.jpg';
    document.getElementById('help-choosed-text').innerHTML = `The board consists of four sections. Per drag and drop you can move each task to a different Section.<br>
    Further informations can be displayed by clicking on a pencil in the right corner of the task. By clicking the trashcan you can delete the task.<br>
    In the 'todo' section the tasks that are to be processed next are listed. The 'in progress' section lists tasks that are currently being processed.<br>
    The 'testing' section lists tasks that have been completed but are still being tested for completion. The 'done' section lists tasks that have been successfully tested and thus fully processed.
    `
}

function render_impressum_at_help() {
    remove_aktive_help_class();
    document.getElementById('help-headline-impressum').classList.add('aktive-help');
    document.getElementById('help-choosed-image').classList.add('d-none');
    document.getElementById('help-choosed-text').innerHTML = `IMPRESSUM / DATENSCHUTZ`
}


function change_background_image(src) {
    document.getElementById('backlog-container').style.backgroundImage = `url(${src})`;
}

function show_background_images() {
    document.getElementById('background-images-container').classList.toggle('d-none');
}

// MOBIL

function open_sidebar_mobil() {
    document.querySelector('.sidebar-container').style.display = 'flex';
    document.querySelector('.sidebar').style.display = 'flex';
    // document.querySelector('.brush-container').style.display = 'none';
}

function close_sidebar_mobil() {
    document.querySelector('.sidebar-container').style.display = 'none';
    document.querySelector('.sidebar').style.display = 'none';
    // document.querySelector('.brush-container').style.display = 'block';
}