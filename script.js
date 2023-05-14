const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');
const clearBtn = document.getElementById('clear');
const itemFilter = document.getElementById('filter');

//* FUNCTIONS //
function addItem(e) {
  e.preventDefault();

  const newItem = itemInput.value;

  //* validate Input
  if (newItem === '') {
    alert('Please add an item');
    return;
  }

  //* create List Item
  const li = document.createElement('li');
  const text = document.createTextNode(newItem);
  li.appendChild(text);

  const button = createButton('remove-item btn-link text-red');
  li.appendChild(button);

  //* add li to DOM
  itemList.appendChild(li);
  checkUI();

  //* clear the input field
  itemInput.value = '';
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

function removeItem(e) {
  //* event delegation
  if (e.target.parentElement.classList.contains('remove-item')) {
    if (confirm('Are you sure you want to remove this item?')) {
      e.target.parentElement.parentElement.remove();
      checkUI();
    }
  }
}

function clearItems() {
  // itemList.innerHTML = '';
  // -OR-
  while (itemList.firstChild) {
    itemList.removeChild(itemList.firstChild);
  }
  checkUI();
}

function checkUI() {
  const items = itemList.querySelectorAll('li');

  if (items.length === 0) {
    clearBtn.style.display = 'none';
    itemFilter.style.display = 'none';
  } else {
    clearBtn.style.display = 'block';
    itemFilter.style.display = 'block';
  }
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

//* EVENT LISTENERS //
itemForm.addEventListener('submit', addItem);
itemList.addEventListener('click', removeItem);
clearBtn.addEventListener('click', clearItems);
itemFilter.addEventListener('input', filterItems);
// itemFilter.addEventListener('keydown', (e) =>
//   console.log(`Your pressed ${e.key}`)
// );

checkUI();
