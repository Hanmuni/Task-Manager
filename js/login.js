// Profil = [proilnummer Name, Bild, Usesrname, Passwort, E-Mail]
let profiles = [
    ['profil00', 'GUEST', './img/person-g086296c94_640.png', 'GUEST', 'PASSWORT', '123@mailvorbei.com'],
    ['profil01', 'Max Mustermann', './img/p24.jpg', 'Mustermann15', 'x', 'beispiel123@mail.com'],
    ['profil02', 'Brigitte Beispiel', './img/p26.jpg', 'B.Beispiel', 'katzenliebhaberin', 'beispiel123@mail.com'],
    ['profil03', 'Emily Example', './img/p30.jpg', 'Example92', 'passwort5', 'beispiel123@mail.com'],
    ['profil04', 'Michelle Modell', './img/p33.jpg', 'M.odell', 'supermodell', 'beispiel123@mail.com'],
    ['profil05', 'Victor Vorbild', './img/p36.jpg', 'Victory', 'venividi', 'beispiel123@mail.com']
]


document.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        check_login();
    }
});

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