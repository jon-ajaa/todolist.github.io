/*script for opening*/
let intro = document.querySelector('.intro');
let logo = document.querySelector('.logo-header');
let logoSpan = document.querySelectorAll('.logo');

window.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        logoSpan.forEach((span, idx) => {
            setTimeout(() => {
                span.classList.add('logo-active');
            }, (idx + 1) * 400);
        });

        setTimeout(() => {
            logoSpan.forEach((span, idx) => {
                setTimeout(() => {
                    span.classList.remove('logo-active');
                    span.classList.add('logo-fade');
                }, (idx + 1) * 50);
            });
        }, 2000);

        setTimeout(() => {
            intro.style.top = '-100vh';
            initApp();

            setTimeout(() => {
                document.querySelector('.fa-bars').style.opacity = 1;
                document.querySelector('.fa-close').style.opacity = 0;
            }, 400); 
        }, 2300); 
    });
});

/*script for todo section*/
const menuButton = document.querySelector(".menuButton");
const addButton = document.querySelector(".addButton");
const deleteButton = document.querySelector(".deleteButton");
const todoModal = document.querySelector("#modal");
const cover = document.querySelector(".cover");
const listView = document.querySelector(".todo_list");
const addTodo = document.querySelector(".addTodo");
const cancelTodo = document.querySelector(".cancelTodo");
let menuOpen = false;
let todos = [];

menuButton.addEventListener('click', () => {
    const barsIcon = document.querySelector('.fa-bars');
    const closeIcon = document.querySelector('.fa-close');

    if (!menuOpen) {
        addButton.classList.add('move');
        deleteButton.classList.add('move');
 
        barsIcon.classList.add('rotate');
        barsIcon.style.zIndex = 1; 
        closeIcon.style.zIndex = 2; 
        closeIcon.classList.add('rotate-back');
        setTimeout(() => {
            barsIcon.style.opacity = 0;
            closeIcon.style.opacity = 1;
        }, 300); 

        menuOpen = !menuOpen;
    } else {
        addButton.classList.remove('move');
        deleteButton.classList.remove('move');
        closeIcon.classList.remove('rotate-back');
        closeIcon.style.opacity = 0;  
        barsIcon.style.zIndex = 2;    
        closeIcon.style.zIndex = 1; 

        setTimeout(() => {
            barsIcon.style.opacity = 1; 
            barsIcon.classList.remove('rotate');
        }, 300);
        menuOpen = !menuOpen;
    }
});

deleteButton.addEventListener('click', () => {
    let newTd = todos.filter(elm => {
        return !elm.isComplete;
    });
    let deletedCount = todos.length - newTd.length;
    todos = newTd;
    listfresher();

    if (deletedCount > 0) {
        Swal.fire({
            icon: 'success',
            title: 'Completed Task Successfully Deleted!',
            text: `${deletedCount} task(s) removed.`,
            confirmButtonText: 'OK',
            customClass: {
                content: 'custom-swal-content',
                confirmButton: 'custom-confirm-button'
            }
        });
    } else {
        Swal.fire({
            icon: 'info',
            title: 'No Completed Tasks to Delete!',
            confirmButtonText: 'OK',
            customClass: {
                content: 'custom-swal-content',
                confirmButton: 'custom-confirm-button'
            }
        });
    }
});

addButton.addEventListener('click', () => {
    todoModal.classList.add('active');
    cover.classList.add('active');
});

cover.addEventListener('click', () => {
    todoModal.classList.remove('active');
    cover.classList.remove('active');
});

cancelTodo.addEventListener('click', () => {
    todoModal.classList.remove('active');
    cover.classList.remove('active');
});

/*date adjustment*/
let now = new Date();
let today = now.getDate();

let monthNumber = now.getMonth();
const monthNames = ["January", "February", "March", "April", "May", "June", 
    "July", "August", "September", "October", "November", "December"];
let month = monthNames[monthNumber];

let year = now.getFullYear();

document.querySelector('.date').innerHTML = today;
document.querySelector('.month').innerHTML = month;
document.querySelector('.year').innerHTML = year;

const updateDateTime = () => {
    const now = new Date();
    const options = { weekday: 'long' };
    const day = now.toLocaleDateString('en-US', options);
    const hours = now.getHours().toString().padStart(2, '0'); 
    const minutes = now.getMinutes().toString().padStart(2, '0'); 
    const seconds = now.getSeconds().toString().padStart(2, '0');
    const currentTime = `${hours}:${minutes}:${seconds}`;
    document.getElementById('currentDay').textContent = day;
    document.getElementById('currentTime').textContent = currentTime;
};

window.onload = updateDateTime;
setInterval(updateDateTime, 1000);

/*function for add list (modal popup)*/ 
const hideModal = () => {
    todoModal.classList.remove('active');
    cover.classList.remove('active');
};

const complete = (i) => {
    todos[i].isComplete = !todos[i].isComplete;
    if (todos[i].isComplete) {
        Swal.fire({
            icon: 'success',
            title: 'Congratulations!',
            text: 'You did it!',
            confirmButtonText: 'OK',
            customClass: {
                content: 'custom-swal-content',
                confirmButton: 'custom-confirm-button'
            }
        });
    }
    listfresher();
};

const listfresher = () => {
    listView.innerHTML = "";
    renderTodos();
};

const renderTodos = () => {
    if (todos.length > 0) {
        listView.style.display = 'block';
    } else {
        listView.style.display = 'none';
    }

    listView.innerHTML = "";

    for (let i in todos) {
        let td = todos[i];
        let template = `<div class="listItem ${td.isComplete ? 'complete' : null}">
                <p>${td.title}<br/>
                <small>${td.date}</small></p>
                <span onClick="complete(${i})"></span>
            </div>`;
        listView.insertAdjacentHTML('beforeend', template);
    }
};

addTodo.addEventListener('click', (event) => {
    event.preventDefault();
    let title = document.querySelector(".newTitle").value;
    let date = document.querySelector(".newDate").value;
    let form = document.querySelector("#addForm");

    if (title === "" || date === "") {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Please fill out both the title and date!',
            confirmButtonText: 'OK',
            customClass: {
                content: 'custom-swal-content',
                confirmButton: 'custom-confirm-button'
            }
        });
        return;
    }

    let selectedDate = new Date(date);
    if (selectedDate < new Date()) {
        Swal.fire({
            icon: 'error',
            title: 'Invalid Date',
            text: 'The selected date has already passed. Please choose a future date.',
            confirmButtonText: 'OK',
            customClass: {
                content: 'custom-swal-content',
                confirmButton: 'custom-confirm-button'
            }
        });
        return;
    }
    let temp = { "title": title, "date": date, "isComplete": false };
    todos.push(temp);
    listfresher();
    hideModal();
    form.reset();
    renderTodos();
});

cancelTodo.addEventListener('click', (event) => {
    let form = document.querySelector("#addForm");

    event.preventDefault();
    listfresher();
    hideModal();
    form.reset();
    renderTodos();
})

const initApp = async () => {
    let localData = localStorage.getItem("weDoData");

    if (localData) {
        let data = JSON.parse(localData);

        if (Array.isArray(data)) {
            todos = data;
        }
    }

    renderTodos();
};

window.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        initApp();
    }, 2500);
});

window.addEventListener('beforeunload', function(e) {
    let data = JSON.stringify(todos);
    localStorage.setItem('weDoData', data);
});

/*for about me section */
const aboutButton = document.getElementById('aboutButton');
const aboutModal = document.getElementById('aboutModal');
const closeAbout = document.getElementById('closeAbout');

aboutButton.addEventListener('click', () => {
    aboutModal.style.display = 'block'; 
});

closeAbout.addEventListener('click', () => {
    aboutModal.style.display = 'none';
});

window.addEventListener('click', (event) => {
    if (event.target === aboutModal) {
        aboutModal.style.display = 'none';
    }
});
