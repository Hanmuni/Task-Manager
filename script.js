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
}

async function render_backlog() {
    document.getElementById('backlog-task-container').innerHTML = '';
    console.log(tasks)
    for (let i = 0; i < tasks.length; i++) {
        let date = new Date(tasks[i].date);
        date_complete = date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear();
        document.getElementById('backlog-task-container').innerHTML += `
    <div id="backlog-task${i}" class="backlog-task">
        <div id="backlog-task-assigned-to${i}" class="backlog-task-assigned-to backlog-20">
        </div>
        <div id="backlog-task-title${i}" class="backlog-15">
            <p>${tasks[i].title}</p>
        </div>
        <div id="backlog-task-category${i}" class="backlog-15">
            <p>${tasks[i].category}</p>
        </div>
        <div id="backlog-task-due-date${i}" class="backlog-15">
            <p backlog-task-due-date${i}-p>${date_complete}</p>
        </div>
        <div id="backlog-task-details${i}" class="backlog-15">
            <p>${tasks[i].description}</p>
        </div>
        <div onclick="deleteTask(${i}); render_backlog()" id="backlog-task-details${i}" class="backlog-10">
            <p class="cursor"><img src="./img/trash-2-32.png"></p>
        </div>
        <div onclick="create_todo(${i}); render_backlog()" id="backlog-task-details${i}" class="backlog-10">
            <p class="cursor"><img src="./img/right-circular-32.png"></p>
        </div>
        
    </div>    
    `;
        document.getElementById(`backlog-task-assigned-to${i}`).innerHTML = `
        <div id="backlog-task-image">
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
    document.getElementById('help-choosed-text').innerHTML = `WILLKOMMENSTEXT Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam voluptates, numquam corrupti vel repellendus quasi commodi sit et dignissimos, qui cupiditate provident aperiam dolorum? Est dolore quod ea atque accusamus!`
}

function render_add_task_at_help() {
    remove_aktive_help_class();
    document.getElementById('help-headline-add-task').classList.add('aktive-help');
    document.getElementById('help-choosed-image').classList.remove('d-none');
    document.getElementById('help-choosed-image').src = './img/sunset-gf546bd15e_1280.jpg';
    document.getElementById('help-choosed-text').innerHTML = `Hier können Sie Aufgaben erstellen, einer Kategorie zuordnen und die Priorität festlegen.
    Optional können bereits hier einem oder mehreren Usern einer Aufgabe zugewiesen werden.`
}

function render_backlog_at_help() {
    remove_aktive_help_class();
    document.getElementById('help-headline-backlog').classList.add('aktive-help');
    document.getElementById('help-choosed-image').classList.remove('d-none');
    document.getElementById('help-choosed-image').src = './img/sunset-gf546bd15e_1280.jpg';
    document.getElementById('help-choosed-text').innerHTML = `BIN IMMERNOCH UNSICHER WOFÜR BACKLOG JETZT EIGENTLICH DA IST`
}

function render_board_at_help() {
    remove_aktive_help_class();
    document.getElementById('help-headline-board').classList.add('aktive-help');
    document.getElementById('help-choosed-image').classList.remove('d-none');
    document.getElementById('help-choosed-image').src = './img/sunset-gf546bd15e_1280.jpg';
    document.getElementById('help-choosed-text').innerHTML = `Im Board sind alle Aufgaben einer jeweiligen Liste zugeordnete. Die Aufgaben lassen sich per Drag an Drop jeweils einer anderen Liste zuordnen. Ebenfalls ist es möglich Aufgaben zu bearbeiten oder zu löschen. Zur besseren Übersichtlichkeit wurden die Aufgaben aufgrund ihrer Priorität nach dem Ampelsystem gekennzeichnet.`
}

function render_impressum_at_help() {
    remove_aktive_help_class();
    document.getElementById('help-headline-impressum').classList.add('aktive-help');
    document.getElementById('help-choosed-image').classList.add('d-none');
    document.getElementById('help-choosed-text').innerHTML = `IMPRESSUM / DATENSCHUTZ`
}