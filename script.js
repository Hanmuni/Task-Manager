 /* Alle */
 let tasks = [];

 async function init() {
     await includeHTML();
     loadTasks();
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
 function loadTasks() {
     tasks = JSON.parse(localStorage.getItem('task')) || [];
     console.log('Loading Complete', tasks);
 }

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
     localStorage.setItem('tasks', tasksAsString);
 }

 function cancelTask() {
     document.getElementById('title').value = ``;
     document.getElementById('description').value = ``;
 }

 /* Hong Hanh*/