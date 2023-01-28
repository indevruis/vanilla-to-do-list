const $toDoList = document.querySelector('.list');
const $toDoInput = document.querySelector('.addListContents');
const $addListBtn = document.querySelector('.addListBtn');

let toDos = [];

const handleAddListBtn = (event) => {
    event.preventDefault();

    const $newToDo = $toDoInput.value;
    $toDoInput.value = '';

    const newToDoObj = {
        text: $newToDo,
        id: Date.now(),
    }

    toDos.push(newToDoObj);
    createToDoList(newToDoObj);
    saveToDos();
}

const createToDoList = (newToDoObj) => {
    const $div = document.createElement('div');
    $div.id = newToDoObj.id;

    const $checkBox = document.createElement('span');
    $checkBox.innerHTML = '⬜';
    $checkBox.addEventListener('click', handleCheckBox);
    $div.appendChild($checkBox);

    const $listContents = document.createElement('span');
    $listContents.innerHTML = newToDoObj.text;
    $div.appendChild($listContents);
    
    const $deleteBtn = document.createElement('span');
    $deleteBtn.innerHTML = '❌';
    $deleteBtn.className = 'deleteButton';
    $deleteBtn.addEventListener('click', handleDeleteBtn);
    $div.appendChild($deleteBtn);

    $toDoList.appendChild($div);
}

const handleCheckBox = (event) => {
    event.target.innerHTML = '✔';
}

const handleDeleteBtn = (event) => {
    const $div = event.target.parentElement;
    $div.remove();
    toDos = toDos.filter(toDo => toDo.id !== parseInt($div.id));
    saveToDos();
}

const saveToDos = () => {
    localStorage.setItem('toDos', JSON.stringify(toDos));
}

const $savedToDos = localStorage.getItem('toDos');

if($savedToDos !== null) {
    const $parsedToDos = JSON.parse($savedToDos);
    toDos = $parsedToDos;
    $parsedToDos.forEach(createToDoList);
}

$addListBtn.addEventListener('click', handleAddListBtn);