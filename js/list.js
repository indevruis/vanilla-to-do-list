const $toDoList = document.querySelector('.list');
const $toDoInput = document.querySelector('.addListContents');
const $addListBtn = document.querySelector('.addListBtn');

let toDos = [];

const handleAddListBtn = (event) => {
    event.preventDefault();

    const $newToDo = $toDoInput.value;
    $toDoInput.value = '';

    saveToDo($newToDo);
    toDos.push($newToDo);
    createToDoList($newToDo);
}

const saveToDo = () => {

}

const createToDoList = ($newToDo) => {
    const $div = document.createElement('div');

    const $checkBox = document.createElement('span');
    $checkBox.innerHTML = '⬜';
    $checkBox.addEventListener('click', handleCheckBox);
    $div.appendChild($checkBox);

    const $listContents = document.createElement('span');
    $listContents.innerHTML = $newToDo;
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
    const div = event.target.parentElement;
    div.remove();
}

$addListBtn.addEventListener('click', handleAddListBtn);