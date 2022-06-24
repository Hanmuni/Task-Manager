/**
 * initialize backlog page
 */
async function init_backlog() {
    await init();
    await render_backlog();
    await render_backlog_mobil();
    document.getElementById('sidebar-link-backlog').style.backgroundColor = "rgba(255, 255, 255, 0.6)"
    document.getElementById('sidebar-link-backlog').style.color = "black";
    document.getElementById('backlog-container').style.backgroundImage = `url(${background_src})`;
}


/**
 * render backlog page elemente from backend saved as tasks
 */
async function render_backlog() {
    document.getElementById('backlog-task-container').innerHTML = '';
    for (let i = 0; i < tasks.length; i++) {
        document.getElementById('backlog-task-container').innerHTML +=
            add_backlog_html(i);
        document.getElementById(`backlog-task-name${i}`).innerHTML = '';
        for (let j = 0; j < tasks[i].user.length; j++) {
            document.getElementById(`backlog-task-name${i}`).innerHTML +=
                add_backlog_task_name_html(i, j);
        }
        add_urgency_color(i);
        add_category_color(i);
    }
}

/**
 * add html code to the backlog elements
 * @param {number} i number of the elemnte in the JSON tasks
 * 
 */
function add_backlog_html(i) {
    return `
    <div id="backlog-task${i}" class="backlog-task">
        <div id="backlog-task-assigned-to${i}" class="backlog-task-assigned-to backlog-20">
            <div id="backlog-task-image${i}">
                <img src=${tasks[i].user[0]['user-image']}>
            </div>
            <div id="backlog-task-name${i}" class=""></div>
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
        <div id="backlog-task-category${i}" class="backlog-15">
            <p>${tasks[i].category}</p>
        </div>
        <div onclick="deleteTask(${i}); render_backlog()" id="backlog-task-details${i}" class="backlog-10">
            <p class="cursor"><img src="./img/trash-2-32.png"></p>
        </div>
        <div onclick="create_todo(${i}); render_backlog()" id="backlog-task-details${i}" class="backlog-15 add-to-board">
            <p class="cursor"><img src="./img/right-circular-32.png"></p>
        </div>
    </div>    
    `
}

/**
 * html code of users names
 * @param {number} i number of the elemnte in the JSON tasks
 * @param {number} j number of the amount of users the task i have
 */
function add_backlog_task_name_html(i, j) {
    return `<p class="" > ${tasks[i].user[j].name} </p>  
    `
}


/**
 * change the color of the category word corresponding to the category
 * @param {number} i number of the elemnte in the JSON tasks
 */
function add_category_color(i) {
    if (tasks[i].category == 'HTML') {
        document.getElementById(`backlog-task-category${i}`).classList.add('html-color');

    }
    if (tasks[i].category == 'CSS') {
        document.getElementById(`backlog-task-category${i}`).classList.add('css-color');
    }
    if (tasks[i].category == 'JavaScript') {
        document.getElementById(`backlog-task-category${i}`).classList.add('javascript-color');
    }
}

/**
 * change the color of the border left and right corresponding to the urgency
 * @param {number} i number of the elemnte in the JSON tasks
 */
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

/**
 * move a task from the backlog to the board. Now it´s change from a task to a todo. 
 * @param {number} position number of the elemnte in the JSON tasks
 */
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
    setURL('https://fabian-kalus.developerakademie.net/Task-Manager/smallest_backend_ever');
    console.log(todos);
}

/**
 * delete the selcted array at tasks
 *@param {number} position number of the elemnte in the JSON tasks
 */
function deleteTask(position) {
    tasks.splice(position, 1);
    backend.setItem('tasks', JSON.stringify(tasks));
}

// MOBIL BACKLOG

/**
 * initialize backlog page for mobil
 */
async function render_backlog_mobil() {
    document.getElementById('backlog-task-container-mobil').innerHTML = '';
    for (let i = 0; i < tasks.length; i++) {
        document.getElementById('backlog-task-container-mobil').innerHTML +=
            add_backlog_html_mobil(i);
        document.getElementById(`backlog-task-name-mobil${i}`).innerHTML = '';
        for (let j = 0; j < tasks[i].user.length; j++) {
            document.getElementById(`backlog-task-name-mobil${i}`).innerHTML +=
                add_backlog_task_name_html_mobil(i, j);
        }
        add_urgency_color_mobil(i);
        add_category_color_mobil(i);
    }
}


/**
 * render html code for mobil backlog
 * @param {number} i number of the elemnte in the JSON tasks 
 */
function add_backlog_html_mobil(i) {
    return `
    <div class="backlog-one-task-container-mobil" id="backlog-one-task-container-mobil${i}">
        <div class="bl-title-mobil">
            <p>${tasks[i].title}</p>
        </div>
        <div class="bl-assigned-to-mobil" id="bl-assigned-to-mobil${i}">
            <img src="${tasks[i].user[0]['user-image']}">
            <p id="backlog-task-name-mobil${i}">${tasks[i].user[0]['name']}</p>
        </div>
        <div class="bl-category-date">
            <div class="bl-category">
            <p>CATEGORY</p>
            <p id="details-mobil${i}">${tasks[i].category}</p>
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
}

/**
 * html code of users names - for mobil
 * @param {number} i number of the elemnte in the JSON tasks
 * @param {number} j number of the amount of users the task i have
 */
function add_backlog_task_name_html_mobil(i, j) {
    return `<p class="" > ${tasks[i].user[j].name} </p> </p>  
    `
}

/**
 * change the color of the category word corresponding to the category - for mobil
 * @param {number} i number of the elemnte in the JSON tasks
 */
function add_category_color_mobil(i) {
    if (tasks[i].category == 'HTML') {
        document.getElementById(`details-mobil${i}`).classList.add('html-color');

    }
    if (tasks[i].category == 'CSS') {
        document.getElementById(`details-mobil${i}`).classList.add('css-color');
    }
    if (tasks[i].category == 'JavaScript') {
        document.getElementById(`details-mobil${i}`).classList.add('javascript-color');
    }
}
/**
 * change the color of the border left and right corresponding to the urgency - for mobil
 * @param {number} i number of the elemnte in the JSON tasks
 */
function add_urgency_color_mobil(i) {
    if (tasks[i].urgency == 'High') {
        document.getElementById(`backlog-one-task-container-mobil${i}`).classList.add('urc-high');
    }
    if (tasks[i].urgency == 'Medium') {
        document.getElementById(`backlog-one-task-container-mobil${i}`).classList.add('urc-medium');
    }
    if (tasks[i].urgency == 'Low') {
        document.getElementById(`backlog-one-task-container-mobil${i}`).classList.add('urc-low');
    }
}