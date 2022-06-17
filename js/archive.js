async function init_archive() {
    setURL('http://gruppe-247.developerakademie.net/smallest_backend_ever');
    await includeHTML();
    await loadAllTasks();
    await load_current_user_local();
    document.getElementById('sidebar-link-archive').style.backgroundColor = "rgba(255, 255, 255, 0.6)"
    document.getElementById('sidebar-link-archive').style.color = "black";
    document.getElementById('main').style.backgroundImage = `url(${background_src})`;
}