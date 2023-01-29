const $toDoList = document.querySelector('.list');
const $toDoInput = document.querySelector('.addListContents');
const $addListBtn = document.querySelector('.addListBtn');
const $addList = document.querySelector('.addListContents');

let toDos = [];

const handleAddList = () => {
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
    $checkBox.value = 'unchecked';
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
    const $check = event.target;
    if($check.value === 'unchecked') {
        $check.innerHTML = '✔';
        $check.value = 'checked'
    } else if($check.value === 'checked') {
        $check.innerHTML = '⬜';
        $check.value = 'unchecked';
    }
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

$addListBtn.addEventListener('click', handleAddList);
$addList.addEventListener('keyup', (e) => {
    if(e.keyCode === 13) handleAddList();
});