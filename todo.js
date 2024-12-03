let items = [];

const itemsDiv = document.getElementById("todoItems");
const input = document.getElementById("itemInput");

const storageKey = "todoItems";

function renderItems() {

    itemsDiv.innerHTML = null;

    for (const [index, item] of Object.entries(items)) {

        const text = document.createElement("p");
        text.id = "item";
        text.innerHTML = item;


        const deleteIcon = document.createElement("button");
        deleteIcon.innerHTML = "delete";
        deleteIcon.onclick = () => deleteItem(index);

        const listItem = document.createElement("div")
        listItem.appendChild(text);
        listItem.appendChild(deleteIcon);

        itemsDiv.appendChild(listItem);
    }
}

function saveItems() {
    const stringItems = JSON.stringify(items);

    localStorage.setItem(storageKey, stringItems);
}

function addItem() {
    if (!input.value) {
        return;
    }

    items.push(input.value);
    input.value = "";
    saveItems();
    renderItems();
}

function deleteItem(index) {
    items.splice(index, 1);

    saveItems();
    renderItems();
}

function loadItems() {
    const savedItems = localStorage.getItem(storageKey);

    if (savedItems) {
        items = JSON.parse(savedItems);
        renderItems();
    }
}

document.addEventListener("DOMContentLoaded", loadItems);