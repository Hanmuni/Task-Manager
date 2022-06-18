/* Alle */

let current_user = [];
let todos = [];
let background_src;

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
    background_src = JSON.parse(backend.getItem('background_image')) || [];
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

// MOBIL

function open_sidebar_mobil() {
    document.querySelector('.sidebar-container').style.display = 'flex';
    document.querySelector('.sidebar').style.display = 'flex';
    document.querySelector('.brush-container').style.display = 'flex';
}

function close_sidebar_mobil() {
    document.querySelector('.sidebar-container').style.display = 'none';
    document.querySelector('.sidebar').style.display = 'none';
    document.querySelector('.brush-container').style.display = 'none';
}

// BACKGROUND IMAGE

function change_background_image(src) {
    if (document.getElementById('backlog-container')) {
        document.getElementById('backlog-container').style.backgroundImage = `url(${src})`;
    }
    if (document.getElementById('bigscreen')) {
        document.getElementById('bigscreen').style.backgroundImage = `url(${src})`;
    }
    if (document.getElementById('main')) {
        document.getElementById('main').style.backgroundImage = `url(${src})`;
    }
    if (document.getElementById('help-container')) {
        document.getElementById('help-container').style.backgroundImage = `url(${src})`;
    }
    backend.setItem('background_image', JSON.stringify(src));
}

function show_background_images() {
    document.getElementById('background-images-container').classList.toggle('d-none');
}