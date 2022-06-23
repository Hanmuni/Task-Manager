async function init_archive() {
    await init();
    render_archive();
    render_archive_mobile();
    document.getElementById('sidebar-link-archive').style.backgroundColor = "rgba(255, 255, 255, 0.6)"
    document.getElementById('sidebar-link-archive').style.color = "black";
    document.getElementById('main').style.backgroundImage = `url(${background_src})`;
}

function render_archive() {
    document.getElementById('archive-task-container').innerHTML = ``;
    for (let i = 0; i < archivs.length; i++) {
        document.getElementById('archive-task-container').innerHTML +=
            add_archive_html(i);
    }
}

function add_archive_html(i) {
    return `
    <div class="backlog-task">
        <div  class="backlog-task-assigned-to backlog-20">
            <div>
                <img src=${archivs[i].user[0]['user-image']}>
                <p>${archivs[i].user[0]['name']}</p>
            </div>
            <div class=""></div>
        </div>
        <div class="backlog-15">
            <p>${archivs[i].title}</p>
        </div>
        <div class="backlog-15">
            <p>${archivs[i].date}</p>
        </div>
        <div class="backlog-20 details" style="overflow: hidden;">
            <p>${archivs[i].description}</p>
        </div>
        <div  class="backlog-15">
            <p>${archivs[i].category}</p>
        </div>
        <div onclick="deleteArchiv(${i})" class="backlog-15">
            <p class="cursor"><img src="./img/trash-2-32.png"></p>
        </div>
    </div> 
    `;
}

function deleteArchiv(position) {
    archivs.splice(position, 1);
    backend.setItem('archivs', JSON.stringify(archivs));
    render_archive();
    render_archive_mobile();
}

function render_archive_mobile() {

    document.getElementById('archive-task-container-mobil').innerHTML = ``;

    for (let i = 0; i < archivs.length; i++) {
        document.getElementById('archive-task-container-mobil').innerHTML +=
            add_archive_html_mobile(i);
    }
}

function add_archive_html_mobile(i) {
    return `
    <div class="backlog-one-task-container-mobil">
        <div class="bl-title-mobil">
            <p>${archivs[i].title}</p>
        </div>
        <div class="bl-assigned-to-mobil">
            <img src=${archivs[i].user[0]['user-image']}>
            <p>${archivs[i].user[0]['name']}</p>
        </div>
        <div class="bl-category-date">
            <div class="bl-category">
            <p>CATEGORY</p>
            <p >${archivs[i].category}</p>
            </div>
            <div class="bl-date">
            <p>DATE</p>
            <p>${archivs[i].date}</p>
            </div>
        </div>
        <div class="bl-description">
            <p>DESCRIPTION</p>
            <p>${archivs[i].description}</p>
        </div>
        <div class="bl-icons">
            <div onclick="deleteArchiv(${i})" class="bl-delete">
                <p>DELETE</p>
                <img src="./img/trash-2-32.png">
            </div>
        </div>
    </div>    
    `
}