/* Alle */

let tasks = [];

// Profil = [Name, Bild, Usesrname, Passwort]
let profiles = [{
    'profil01': ['Max Mustermann', './img/p24.jpg', 'Mustermann15', 'xasdfasfes'],
    'profil02': ['Brigitte Beispiel', './img/p26.jpg', 'B.Beispiel', 'katzenliebhaberin'],
    'profil03': ['Emily Example', './img/p30.jpg', 'Example92', 'passwort5'],
    'profil04': ['Michelle Modell', './img/p33.jpg', 'M.odell', 'supermodell'],
    'profil05': ['Victor Vorbild', './img/p36.jpg', 'Victory', 'venividi'],
}]

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