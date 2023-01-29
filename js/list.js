const $toDoList = document.querySelector('.list');
const $toDoInput = document.querySelector('.addListContents');
const $addListBtn = document.querySelector('.addListBtn');

let toDos = [];

const handleAddList = () => {
    const newToDo = $toDoInput.value;
    $toDoInput.value = '';

    const newToDoObj = {
        text: newToDo,
        id: Date.now(),
        check: false,
    }

    toDos.push(newToDoObj);
    createToDoList(newToDoObj);
    saveToDos();
}

const createToDoList = (newToDoObj) => {
    const $div = document.createElement('div');
    $div.id = newToDoObj.id;

    const $checkBox = document.createElement('span');
    $checkBox.innerHTML = newToDoObj.check ? '✔' : '⬜';
    $checkBox.check = newToDoObj.check;
    $checkBox.addEventListener('click', handleCheckBox(newToDoObj));
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

const handleCheckBox = (newToDoObj) => (event) => {
    const $check = event.target;
    $check.innerHTML = $check.innerHTML === '✔' ? '⬜' : '✔';
    
    const index = toDos.findIndex((todo)=>todo.id === newToDoObj.id);
    toDos[index].check = !toDos[index].check;

    saveToDos();
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

const savedToDos = localStorage.getItem('toDos');

if(savedToDos !== null) {
    const $parsedToDos = JSON.parse(savedToDos);
    toDos = $parsedToDos;
    $parsedToDos.forEach(createToDoList);
}

$addListBtn.addEventListener('click', handleAddList);
$toDoInput.addEventListener('keyup', (e) => {
    if(e.keyCode === 13) handleAddList();
});