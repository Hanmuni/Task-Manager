/* Alle */

let tasks = [];

// Profil = [proilnummer Name, Bild, Usesrname, Passwort]
let profiles = [
    ['profil01', 'Max Mustermann', './img/p24.jpg', 'Mustermann15', 'x'],
    ['profil02', 'Brigitte Beispiel', './img/p26.jpg', 'B.Beispiel', 'katzenliebhaberin'],
    ['profil03', 'Emily Example', './img/p30.jpg', 'Example92', 'passwort5'],
    ['profil04', 'Michelle Modell', './img/p33.jpg', 'M.odell', 'supermodell'],
    ['profil05', 'Victor Vorbild', './img/p36.jpg', 'Victory', 'venividi'],
]

let current_user = [];

async function init() {
    setURL('http://gruppe-247.developerakademie.net/smallest_backend_ever');
    await includeHTML();
    await loadAllTasks();
}

async function loadAllTasks() {
    await downloadFromServer();
    tasks = JSON.parse(backend.getItem('tasks')) || [];
    console.log(tasks);
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

/* Fabian*/


// BACKEND DRÜBER GUCKEN, SETZT DEN WERT VON CURRENT USER AUF NULL; OBWOHL DER IM INDEX DEFINIERT WURDE




// FAKE LOGIN




function change_passwort_button_type() {
    if (document.getElementById('login-passwort').type == 'password') {
        document.getElementById('login-passwort').type = 'text';
    } else { document.getElementById('login-passwort').type = 'password' }
}

function guest_login() {
    window.location.href = './board.html';
}

function check_login() {
    let input_user_field = document.getElementById('login-username').value;
    let input_passwort_field = document.getElementById('login-passwort').value;
    current_user = [];
    for (let i = 0; i < profiles.length; i++) {
        if (profiles[i][3] == input_user_field) {
            if (profiles[i][4] == input_passwort_field) {
                current_user.push(profiles[i]);
                console.log(current_user);
                window.location.href = './board.html';
                return;
            } else {
                alert('Das eingegebene Passwort ist nicht korrekt');
                return;
            }
        }
    }
    alert('Der eingebene Benutzername ist nicht vergeben.')
}

function test_function() {
    console.log(tasks)
}


/* Hong Hanh */
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
    };

    tasks.push(task);

    document.getElementById('title').value = ``;
    document.getElementById('description').value = ``;

    let tasksAsString = JSON.stringify(tasks);
    backend.setItem('tasks', tasksAsString);

    init();
}

function deleteTask(position) {
    tasks.splice(position, 1);
    backend.setItem('tasks', JSON.stringify(tasks));
    console.log(tasks);
}

function cancelTask() {
    document.getElementById('title').value = ``;
    document.getElementById('description').value = ``;
}
/* Hong Hanh*/