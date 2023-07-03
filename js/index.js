// 1. Отримати посилання на всі елементи (інпут, кнопки, список)
// 2. Створити функцію, яка створює об"єкт однієї задачі
// 3. Створити розмітку однієї задачі та вставити її в DOM
// 4. Реалізувати запис задачі у localStorage
// 5. Реалізувати, щоб при оновленні сторінки задачі із localStorage відображалися на сторінці
// 6. Створити функцію, яка буде переводити задачу у статус "Виконано"
// 7. Створити функція, яка буде видаляти задачу по кліку на кнопку

const refs = {
    input: document.querySelector('.input-js'),
    btnAdd: document.querySelector('.btn-add'),
    btnDel: document.querySelector('.btn-delete'),
    ul: document.querySelector('.todo-list'),
}

refs.btnAdd.addEventListener('click', todoAdd);
refs.btnDel.addEventListener('click', todoDel)
refs.ul.addEventListener('click', changeStatus);

const key = 'todo';
const todoList = JSON.parse(localStorage.getItem(key)) || [];

if (todoList.length) {
    refs.ul.append(...todoList.map(el => createMarkup(el)));
}

function todoAdd(){
    if (!refs.input.value.trim()) {
        return
    }
    const td = {
        id: Date.now(),
        desc: refs.input.value,
        status: 'list-item',
    };
    todoList.push(td);
    refs.ul.appendChild(createMarkup(td));
    refs.input.value = '';

    localStorage.setItem(key,JSON.stringify(todoList));
}

function createMarkup(td) {
    const li = document.createElement('li');
    li.classList.add(td.status);
    li.textContent = td.desc;
    li.id = td.id;
    return li
}

function changeStatus(ev) {
    console.dir(ev.target)
    if (ev.target.nodeName !== 'LI') {
        return
    }
    if (ev.target.classList.contains('list-item')) {
        ev.target.classList.replace('list-item', 'list-item-complete')
    } else {
        ev.target.classList.replace('list-item-complete', 'list-item')     
    }

    console.log(ev.target.classList[0]);

    const data = JSON.parse(localStorage.getItem(key));
    const NewData = data.map(el => {
        if(el.id === Number(ev.target.id)){ el.status = ev.target.classList[0]};
        return el
    });

    localStorage.setItem(key, JSON.stringify(NewData));
}

function todoDel() {
    const data = JSON.parse(localStorage.getItem(key));
    const NewData = data.filter(el => el.status === 'list-item');
    localStorage.setItem(key, JSON.stringify(NewData));

    refs.ul.innerHTML = '';
    refs.ul.append(...NewData.map(el => createMarkup(el)));
}



