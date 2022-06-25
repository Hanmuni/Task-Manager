/* Alle */

let current_user = [];
let todos = [];
let archivs = [];
let background_src;


/**
 * standart initialize function, used in every html
 */
async function init() {
    setURL('http://gruppe-247.developerakademie.net/Task-Manager/smallest_backend_ever');
    await includeHTML();
    await loadAllTasks();
}

async function init_welcome() {
    await init();
    load_current_user_local();
}

/**
 * load all backlog data
 */
async function loadAllTasks() {
    await downloadFromServer();
    tasks = JSON.parse(backend.getItem('tasks')) || [];
    todos = JSON.parse(backend.getItem('todos')) || [];
    archivs = JSON.parse(backend.getItem('archivs')) || [];
    background_src = JSON.parse(backend.getItem('background_image')) || [];
}

/**
 * includes the templates
 */
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

/**
 * open mobil sidebar
 */
function open_sidebar_mobil() {
    document.querySelector('.sidebar-container').style.display = 'flex';
    document.querySelector('.sidebar').style.display = 'flex';
    document.querySelector('.brush-container').style.display = 'flex';
    if (document.querySelector('.welcome-help')) {
        document.querySelector('.welcome-help').style.display = 'none';
    }
}

// MOBIL
/**
 * open mobil sidebar
 */
function close_sidebar_mobil() {
    document.querySelector('.sidebar-container').style.display = 'none';
    document.querySelector('.sidebar').style.display = 'none';
    document.querySelector('.brush-container').style.display = 'none';
    if (document.querySelector('.welcome-help')) {
        document.querySelector('.welcome-help').style.display = 'flex';
    }
}

// BACKGROUND IMAGE
/**
 * change backgroundimage in every html document
 */
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

/**
 * show the current user image in the sidebar
 */
function load_current_user_local() {
    let current_userAsText = localStorage.getItem('current_user');
    if (current_userAsText) {
        current_user = JSON.parse(current_userAsText);
    };
    document.getElementById('sidebar-user-image').src = current_user[0][2];
    document.getElementById('sidebar-user-name').innerHTML = current_user[0][3];
}

/**
 * open and close Backgroundimage container at sidebar
 */
function show_background_images() {
    document.getElementById('background-images-container').classList.toggle('d-none');
}