async function init_help() {
    await init();
    document.getElementById('sidebar-link-help').style.backgroundColor = "rgba(255, 255, 255, 0.6)"
    document.getElementById('sidebar-link-help').style.color = "black";
    document.getElementById('help-container').style.backgroundImage = `url(${background_src})`;
}

function remove_aktive_help_class() {
    document.getElementById('help-headline-first-steps').classList.remove('aktive-help');
    document.getElementById('help-headline-add-task').classList.remove('aktive-help');
    document.getElementById('help-headline-backlog').classList.remove('aktive-help');
    document.getElementById('help-headline-board').classList.remove('aktive-help');
    document.getElementById('help-headline-impressum').classList.remove('aktive-help');
    document.getElementById('help-headline-archiv').classList.remove('aktive-help');
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
    document.getElementById('help-choosed-image').src = './img/addTaskHelp.png';
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

function render_archiv_at_help() {
    remove_aktive_help_class();
    document.getElementById('help-headline-archiv').classList.add('aktive-help');
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