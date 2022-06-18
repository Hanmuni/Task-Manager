async function init_archive() {
    await init();
    document.getElementById('sidebar-link-archive').style.backgroundColor = "rgba(255, 255, 255, 0.6)"
    document.getElementById('sidebar-link-archive').style.color = "black";
    document.getElementById('main').style.backgroundImage = `url(${background_src})`;
}