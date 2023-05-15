const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');
const clearBtn = document.getElementById('clear');
const itemFilter = document.getElementById('filter');
const formBtn = itemForm.querySelector('button');

let isEditMode = false;

//* FUNCTIONS //

function displayItems() {
  const itemsFromStorage = getItemsFromStorage();
  itemsFromStorage.forEach((item) => addItemToDOM(item));
  checkUI();
}

function onAddItemSubmit(e) {
  e.preventDefault();

  const newItem = itemInput.value;

  //* validate Input
  if (newItem === '') {
    alert('Please add an item');
    return;
  }

  //* check for edit mode
  if (isEditMode) {
    const itemToEdit = itemList.querySelector('.edit-mode');
    removeItemFromStorage(itemToEdit.textContent);
    itemToEdit.classList.remove('edit-mode'); // from local storage
    itemToEdit.remove(); // from the DOM
    isEditMode = false;
  } else {
    if (checkIfItemExists(newItem)) {
      alert('That item already exists');
      return;
    }
  }

  //* create item DOM element
  addItemToDOM(newItem);

  //* add item to local storage
  addItemToStorage(newItem);

  checkUI();

  //* clear the input field
  itemInput.value = '';
}

function addItemToDOM(item) {
  //* create List Item
  const li = document.createElement('li');
  const text = document.createTextNode(item);
  li.appendChild(text);

  const button = createButton('remove-item btn-link text-red');
  li.appendChild(button);

  //* add li to DOM
  itemList.appendChild(li);
}

function addItemToStorage(item) {
  const itemsFromStorage = getItemsFromStorage();

  // if (localStorage.getItem('items') === null) {
  //   itemsFromStorage = [];
  // } else {
  //   itemsFromStorage = JSON.parse(localStorage.getItem('items'));
  // }

  //* add new item to the array (shopping list)
  itemsFromStorage.push(item);

  //* convert to JSON string and set to local storage
  localStorage.setItem('items', JSON.stringify(itemsFromStorage));
}

function getItemsFromStorage() {
  let itemsFromStorage;

  if (localStorage.getItem('items') === null) {
    itemsFromStorage = [];
  } else {
    itemsFromStorage = JSON.parse(localStorage.getItem('items'));
  }

  return itemsFromStorage;
}

function createButton(classes) {
  const button = document.createElement('button');
  button.className = classes;
  const icon = createIcon('fa-solid fa-xmark');
  button.appendChild(icon);

  return button;
}

function createIcon(classes) {
  const icon = document.createElement('i');
  icon.className = classes;
  return icon;
}

function onClickItem(e) {
  //* event delegation

  if (e.target.parentElement.classList.contains('remove-item')) {
    removeItem(e.target.parentElement.parentElement);
  } else {
    setItemToEdit(e.target);
  }
}

function checkIfItemExists(item) {
  const itemsFromStorage = getItemsFromStorage();

  return itemsFromStorage.includes(item);
}

function setItemToEdit(item) {
  isEditMode = true;

  itemList
    .querySelectorAll('li')
    .forEach((i) => i.classList.remove('edit-mode'));

  item.classList.add('edit-mode');
  formBtn.innerHTML = '<i class="fa-solid fa-pen"></i>  Update Item';
  formBtn.style.backgroundColor = '#228B22';
  itemInput.value = item.textContent;
}

function removeItem(item) {
  if (confirm('Are you sure you want to remove this item?')) {
    //* Remove item from DOM
    item.remove();

    //* Remove item from Storage
    removeItemFromStorage(item.textContent);

    checkUI();
  }
}

function removeItemFromStorage(item) {
  let itemsFromStorage = getItemsFromStorage();
  //* filter out item to be removed
  itemsFromStorage = itemsFromStorage.filter((i) => i !== item);

  //* reset to local storage
  localStorage.setItem('items', JSON.stringify(itemsFromStorage));
}

function clearItems() {
  // itemList.innerHTML = '';
  // -OR-
  while (itemList.firstChild) {
    itemList.removeChild(itemList.firstChild);
  }

  //* clear from local storage
  localStorage.removeItem('items');

  checkUI();
}

//* reset the UI
function checkUI() {
  itemInput.value = '';

  const items = itemList.querySelectorAll('li');

  if (items.length === 0) {
    clearBtn.style.display = 'none';
    itemFilter.style.display = 'none';
  } else {
    clearBtn.style.display = 'block';
    itemFilter.style.display = 'block';
  }
  // formBtn.innerHTML = '<i class="fa-solid fa-plus"></i> Add Item';
  formBtn.innerHTML = '<i class="fa-solid fa-plus"></i> Add Item';
  formBtn.style.backgroundColor = '#333';

  isEditMode = false;
}

function filterItems(e) {
  const text = e.target.value.toLowerCase();
  const items = itemList.querySelectorAll('li');
  items.forEach((item) => {
    const itemName = item.firstChild.textContent.toLowerCase();
    if (itemName.indexOf(text) !== -1) {
      item.style.display = 'flex';
    } else {
      item.style.display = 'none';
    }
    // const match = item.innerText.substring(0, text.length);
    // if (match.toLowerCase() !== text) {
    //   item.style.display = 'none';
    // } else {
    //   item.style.display = 'flex';
    // }
  });
}

//* Initialize the app
function init() {
  //* Event Listeners
  itemForm.addEventListener('submit', onAddItemSubmit);
  itemList.addEventListener('click', onClickItem);
  clearBtn.addEventListener('click', clearItems);
  itemFilter.addEventListener('input', filterItems);
  document.addEventListener('DOMContentLoaded', displayItems);
  checkUI();
}

init();

// localStorage.setItem('name', 'David');
// const myName = localStorage.getItem('name');
// console.log(myName)
// localStorage.removeItem('name')
// localStorage.clear()
