const todoList = [];

renderTodoList();

function renderTodoList() {
    let todoListHTML = '';

    for (let i = 0; i < todoList.length; i++) {
        const todoObject = todoList[i];
        //const name = todoObject.name;
        //const {name} = todoObject;
        //const dueDate = todoObject.dueDate;
        //const {dueDate} = todoObject;
        //const dueTime = todoObject.dueTime;
        const {name, dueDate, dueTime} = todoObject;
        const html = `
            <div>${name}</div>
            <div>${dueDate}</div>
            <div>${dueTime}</div>
            <button onclick="
                todoList.splice(${i}, 1);
                renderTodoList();
            " class="delete-todo-button">Delete</button>`;
        todoListHTML += html;
    }

    document.querySelector('.js-todo-list').innerHTML = todoListHTML;
}
function addTodo() {
    const inputElem = document.querySelector('.js-name-input');
    const name = inputElem.value;

    const dateInputElem = document.querySelector('.js-date-input');
    const date = dateInputElem.value;

    const timeInputElem = document.querySelector('.js-time-input');
    const time = timeInputElem.value;

    todoList.push({
        //name: name, 
        name,
        dueDate: date,
        dueTime: time});
    inputElem.value = '';
    dateInputElem.value = '';
    timeInputElem.value = '';
    renderTodoList();
}

function handleKeydown(event) {
    if (event.key === 'Enter') {
        addTodo();
    }
}