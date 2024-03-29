/**
 * initialize help
 */
async function init_help() {
    await init();
    load_current_user_local();
    document.getElementById('sidebar-link-help').style.backgroundColor = "rgba(255, 255, 255, 0.6)"
    document.getElementById('sidebar-link-help').style.color = "black";
    document.getElementById('help-container').style.backgroundImage = `url(${background_src})`;
}

/**
 * remove aktive from every part in the help header
 */
function remove_aktive_help_class() {
    document.getElementById('help-headline-first-steps').classList.remove('aktive-help');
    document.getElementById('help-headline-add-task').classList.remove('aktive-help');
    document.getElementById('help-headline-backlog').classList.remove('aktive-help');
    document.getElementById('help-headline-board').classList.remove('aktive-help');
    document.getElementById('help-headline-impressum').classList.remove('aktive-help');
    document.getElementById('help-headline-archiv').classList.remove('aktive-help');
}

/**
 * add first steps html and image
 */
function render_first_steps_at_help() {
    remove_aktive_help_class();
    document.getElementById('help-headline-first-steps').classList.add('aktive-help');
    document.getElementById('help-choosed-image').classList.remove('d-none');
    document.getElementById('help-choosed-image').src = './img/first_steps_help_section.png';
    document.getElementById('help-choosed-text').innerHTML = `Welcome to the join page of: Ole Engelhardt, Hong Hanh Chu and Fabian Kalus.<br>
    This is a project management tool based on the kanban-methode. It´s the easiest way to manage your projects and tasks. Try it out.`
}

/**
 * add add tasks html and image
 */
function render_add_task_at_help() {
    remove_aktive_help_class();
    document.getElementById('help-headline-add-task').classList.add('aktive-help');
    document.getElementById('help-choosed-image').classList.remove('d-none');
    document.getElementById('help-choosed-image').src = './img/addTaskHelp.png';
    document.getElementById('help-choosed-text').innerHTML = `In the 'Add Task' area you can add individual tasks.<br>
    Enter title, category, description, due date, importance and assign the task to one or more user/s. All fields have to been filled.`
}

/**
 * add backlog html and image
 */
function render_backlog_at_help() {
    remove_aktive_help_class();
    document.getElementById('help-headline-backlog').classList.add('aktive-help');
    document.getElementById('help-choosed-image').classList.remove('d-none');
    document.getElementById('help-choosed-image').src = './img/Screenshot (66).png';
    document.getElementById('help-choosed-text').innerHTML = `Backlog shows every task the team added, except the tasks that are already on the board.<br>
    At the beggining of a project you can add all tasks and have overview of them at the baglock. Then you can decide, which tasks your team should work on at the next time and push them to the board.<br>
    The urgency of the task you can see at the left and right border. The colors are assigned according to the traffic-light-system.`
}

/**
 * add board html and image
 */
function render_board_at_help() {
    remove_aktive_help_class();
    document.getElementById('help-headline-board').classList.add('aktive-help');
    document.getElementById('help-choosed-image').classList.remove('d-none');
    document.getElementById('help-choosed-image').src = './img/Screenshot (67).png';
    document.getElementById('help-choosed-text').innerHTML = `The board consists of four sections. Per drag and drop you can move each task to a different Section.<br>
    Further informations can be displayed by clicking on a pencil in the right corner of the task. By clicking the trashcan you can delete the task.<br>
    In the 'todo' section the tasks that are to be processed next are listed. The 'in progress' section lists tasks that are currently being processed.<br>
    The 'testing' section lists tasks that have been completed but are still being tested for completion. The 'done' section lists tasks that have been successfully tested and thus fully processed.
    `;
}

/**
 * add archiv html and image
 */
function render_archiv_at_help() {
    remove_aktive_help_class();
    document.getElementById('help-headline-archiv').classList.add('aktive-help');
    document.getElementById('help-choosed-image').classList.remove('d-none');
    document.getElementById('help-choosed-image').src = './img/Screenshot (68).png';
    document.getElementById('help-choosed-text').innerHTML = `The archive section stores all your tasks from the 'done'-section from the board.
    `;
}

/**
 * add impressum and datenschutz text
 */
function render_impressum_at_help() {
    remove_aktive_help_class();
    document.getElementById('help-headline-impressum').classList.add('aktive-help');
    document.getElementById('help-choosed-image').classList.add('d-none');
    document.getElementById('help-choosed-text').innerHTML = ` 

    <div> 
    <h1>Impressum</h1> <br>
    <p>Angaben gemäß § 5 TMG</p><p>Ole Engelhardt <br> 
    Am Programmierweg 1001<br> 
    01101 Codehausen <br> 
    </p>
    <p> <strong>Vertreten durch: </strong><br>
    Ole-Fabian Chu<br>
    </p>
    <p><strong>Haftungsausschluss: </strong><br><br><strong>Haftung für Inhalte</strong><br><br>
    Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen. Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen. Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.<br><br><strong>Urheberrecht</strong><br><br>
    Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers. Downloads und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen Gebrauch gestattet. Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt wurden, werden die Urheberrechte Dritter beachtet. Insbesondere werden Inhalte Dritter als solche gekennzeichnet. Sollten Sie trotzdem auf eine Urheberrechtsverletzung aufmerksam werden, bitten wir um einen entsprechenden Hinweis. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Inhalte umgehend entfernen.<br><br><strong>Datenschutz</strong><br><br>
    Die Nutzung unserer Webseite ist in der Regel ohne Angabe personenbezogener Daten möglich. Soweit auf unseren Seiten personenbezogene Daten (beispielsweise Name, Anschrift oder eMail-Adressen) erhoben werden, erfolgt dies, soweit möglich, stets auf freiwilliger Basis. Diese Daten werden ohne Ihre ausdrückliche Zustimmung nicht an Dritte weitergegeben. <br>
    Wir weisen darauf hin, dass die Datenübertragung im Internet (z.B. bei der Kommunikation per E-Mail) Sicherheitslücken aufweisen kann. Ein lückenloser Schutz der Daten vor dem Zugriff durch Dritte ist nicht möglich. <br>
    Der Nutzung von im Rahmen der Impressumspflicht veröffentlichten Kontaktdaten durch Dritte zur Übersendung von nicht ausdrücklich angeforderter Werbung und Informationsmaterialien wird hiermit ausdrücklich widersprochen. Die Betreiber der Seiten behalten sich ausdrücklich rechtliche Schritte im Falle der unverlangten Zusendung von Werbeinformationen, etwa durch Spam-Mails, vor.<br>
    </p><br> 
    Website Impressum erstellt durch <a href="https://www.impressum-generator.de">impressum-generator.de</a> von der <a href="https://www.kanzlei-hasselbach.de/" rel="nofollow">Kanzlei Hasselbach</a>
     </div>

    <h1>Datenschutzerklärung</h1>
<p>Verantwortlicher im Sinne der Datenschutzgesetze, insbesondere der EU-Datenschutzgrundverordnung (DSGVO), ist:</p>
<p>Ole Engelhardt</p>
<h2>Ihre Betroffenenrechte</h2>
<p>Unter den angegebenen Kontaktdaten unseres Datenschutzbeauftragten können Sie jederzeit folgende Rechte ausüben:</p>
<ul>
<li>Auskunft über Ihre bei uns gespeicherten Daten und deren Verarbeitung (Art. 15 DSGVO),</li>
<li>Berichtigung unrichtiger personenbezogener Daten (Art. 16 DSGVO),</li>
<li>Löschung Ihrer bei uns gespeicherten Daten (Art. 17 DSGVO),</li>
<li>Einschränkung der Datenverarbeitung, sofern wir Ihre Daten aufgrund gesetzlicher Pflichten noch nicht löschen dürfen (Art. 18 DSGVO),</li>
<li>Widerspruch gegen die Verarbeitung Ihrer Daten bei uns (Art. 21 DSGVO) und</li>
<li>Datenübertragbarkeit, sofern Sie in die Datenverarbeitung eingewilligt haben oder einen Vertrag mit uns abgeschlossen haben (Art. 20 DSGVO).</li>
</ul>
<p>Sofern Sie uns eine Einwilligung erteilt haben, können Sie diese jederzeit mit Wirkung für die Zukunft widerrufen.</p>
<p>Sie können sich jederzeit mit einer Beschwerde an eine Aufsichtsbehörde wenden, z. B. an die zuständige Aufsichtsbehörde des Bundeslands Ihres Wohnsitzes oder an die für uns als verantwortliche Stelle zuständige Behörde.</p>
<p>Eine Liste der Aufsichtsbehörden (für den nichtöffentlichen Bereich) mit Anschrift finden Sie unter: <a href="https://www.bfdi.bund.de/DE/Service/Anschriften/Laender/Laender-node.html" target="_blank" rel="noopener nofollow">https://www.bfdi.bund.de/DE/Service/Anschriften/Laender/Laender-node.html</a>.</p>
<p></p><h2>Verwendung von Scriptbibliotheken (Google Webfonts)</h2>
<p>Um unsere Inhalte browserübergreifend korrekt und grafisch ansprechend darzustellen, verwenden wir auf dieser Website „Google Web Fonts“ der Google LLC (1600 Amphitheatre Parkway, Mountain View, CA 94043, USA; nachfolgend „Google“) zur Darstellung von Schriften.</p>
<p>Weitere Informationen zu Google Web Fonts finden Sie unter <a href="https://developers.google.com/fonts/faq" rel="noopener nofollow" target="_blank">https://developers.google.com/fonts/faq</a> und in der Datenschutzerklärung von Google: <a href="https://www.google.com/policies/privacy/" rel="noopener nofollow" target="_blank">https://www.google.com/policies/privacy/</a>.</p>
<p></p><hr>
<h2>Information über Ihr Widerspruchsrecht nach Art. 21 DSGVO</h2>
<h3>Einzelfallbezogenes Widerspruchsrecht</h3>
<p>Sie haben das Recht, aus Gründen, die sich aus Ihrer besonderen Situation ergeben, jederzeit gegen die Verarbeitung Sie betreffender personenbezogener Daten, die aufgrund Art. 6 Abs. 1 lit. f DSGVO (Datenverarbeitung auf der Grundlage einer Interessenabwägung) erfolgt, Widerspruch einzulegen; dies gilt auch für ein auf diese Bestimmung gestütztes Profiling im Sinne von Art. 4 Nr. 4 DSGVO.</p>
<p>Legen Sie Widerspruch ein, werden wir Ihre personenbezogenen Daten nicht mehr verarbeiten, es sei denn, wir können zwingende schutzwürdige Gründe für die Verarbeitung nachweisen, die Ihre Interessen, Rechte und Freiheiten überwiegen, oder die Verarbeitung dient der Geltendmachung, Ausübung oder Verteidigung von Rechtsansprüchen.</p>
<h3>Empfänger eines Widerspruchs</h3>
<p>Ole Engelhardt</p>
<hr>
<h2>Änderung unserer Datenschutzbestimmungen</h2>
<p>Wir behalten uns vor, diese Datenschutzerklärung anzupassen, damit sie stets den aktuellen rechtlichen Anforderungen entspricht oder um Änderungen unserer Leistungen in der Datenschutzerklärung umzusetzen, z.B. bei der Einführung neuer Services. Für Ihren erneuten Besuch gilt dann die neue Datenschutzerklärung.</p>
<h2>Fragen an den Datenschutzbeauftragten</h2>
<p>Wenn Sie Fragen zum Datenschutz haben, schreiben Sie uns bitte eine E-Mail oder wenden Sie sich direkt an die für den Datenschutz verantwortliche Person in unserer Organisation:</p>
<p>Fabian Kalus</p>
<p><em>Die Datenschutzerklärung wurde mithilfe der activeMind AG erstellt, den Experten für <a href="https://www.activemind.de/datenschutz/datenschutzbeauftragter/" target="_blank" rel="noopener">externe Datenschutzbeauftragte</a> (Version #2020-09-30).</em></p>y    `
}