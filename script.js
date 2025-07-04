let todoItemsContainer = document.getElementById("todoItemsContainer");

let saveTodoButton = document.getElementById("saveTodoButton");

function getTodoListFromLocalStorage() {
    let stringifiedTodoList = localStorage.getItem("todoList");
    let parsedTodoList = JSON.parse(stringifiedTodoList);
    
    if (parsedTodoList === null) {
        return [];
    }
    else {
        return parsedTodoList;
    }
}

let todoList = getTodoListFromLocalStorage();

saveTodoButton.onclick = function() {
    localStorage.setItem("todoList", JSON.stringify(todoList));
    alert("Todo list saved successfully!");
}

let todosCount = todoList.length;

function onTodoStatusChange(checkboxId, labelId) {
    let checkboxElement = document.getElementById(checkboxId);
    let labelElement = document.getElementById(labelId);

    labelElement.classList.toggle('checked');
}

function onDeleteTodo(todoId) {
    let todoElement = document.getElementById(todoId);
    todoItemsContainer.removeChild(todoElement);

    let deleteIndex = todoList.findIndex(function(eachTodo) {
        let eachTodoId = "todo" + eachTodo.uniqueId;
        if (eachTodoId === todoId) {
            return true;
        }else {
            return false;
        }
    });
    todoList.splice(deleteIndex, 1);
    console.log(todoList);

}

function createAndAppendTodo(todo) {
    let todoId = "todo" + todo.uniqueId;
    let labelId = "label" + todo.uniqueId;
    let checkboxId = "checkbox" + todo.uniqueId;

    let todoElement = document.createElement("li");
    todoElement.classList.add("todo-item-container", "d-flex", "flex-row");
    todoElement.id = todoId;
    todoItemsContainer.appendChild(todoElement);

    let inputElement = document.createElement("input");
    inputElement.type = "checkbox";
    inputElement.id = checkboxId;
    inputElement.classList.add("checkbox-input");
    todoElement.appendChild(inputElement);

    inputElement.onclick = function() {
        onTodoStatusChange(checkboxId, labelId);
    }

    let labelContainer = document.createElement("div");
    labelContainer.classList.add("label-container", "d-flex", "flex-row");
    todoElement.appendChild(labelContainer);

    let labelElement = document.createElement("label");
    labelElement.setAttribute("for", checkboxId);
    labelElement.classList.add("checkbox-label");
    labelElement.id = labelId;
    labelElement.textContent = todo.text;
    labelContainer.appendChild(labelElement);

    let deleteIconContainer = document.createElement("div");
    deleteIconContainer.classList.add("delete-icon-container");
    labelContainer.appendChild(deleteIconContainer);

    let deleteIcon = document.createElement("i");
    deleteIcon.classList.add("far", "fa-trash-alt", "delete-icon");
    deleteIconContainer.appendChild(deleteIcon);

    deleteIcon.onclick = function() {
        onDeleteTodo(todoId);
    }
        

    
}

for (let todo of todoList) {
    createAndAppendTodo(todo);
}

let addTodoButtonElement = document.getElementById("addTodoButton");
let todoUserInputELement = document.getElementById("todoUserInput");

addTodoButtonElement.onclick = function() {
    let userInput = todoUserInputELement.value;
    if (userInput === "") {
        alert("Please enter a todo item.");
        return;
    }
    let newTodo = {
        text: userInput,
        uniqueId: todosCount + 1
    }

    todoList.push(newTodo);

    createAndAppendTodo(newTodo);
    todoUserInputELement.value = "";
}




