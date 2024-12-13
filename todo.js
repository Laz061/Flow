let items = [];

const contentDiv = document.getElementById("todoItems");
const input = document.getElementById("itemInput");
const storageKey = "todoItems";

//Allows user to add todo list item by tapping enter
input.addEventListener("keypress",
    //Anonymous function that calls add Item when enter is pressed
    function (event) {
        if (event.key == "Enter") {
            addItem();
        }
    }
)

function renderItems() {

    contentDiv.innerHTML = null;

    for (const [index, item] of Object.entries(items)) {

        //todo text
        const text = document.createElement("p");
        text.id = "itemText";
        text.innerHTML = item;

        //delete icon
        const deleteIcon = document.createElement("i");
        deleteIcon.setAttribute("data-feather", "trash");
        deleteIcon.id = "deleteIcon";
        deleteIcon.style.width = "100%";
        deleteIcon.style.height = "100%";


        //delete button
        const deleteButton = document.createElement("button");
        deleteButton.id = "deleteButton";
        deleteButton.onclick = () => deleteItem(index);
        deleteButton.appendChild(deleteIcon);

        const itemContainer = document.createElement("div");
        itemContainer.id = "itemContainer";
        itemContainer.appendChild(deleteButton);
        itemContainer.appendChild(text);


        contentDiv.appendChild(itemContainer);
    }

    feather.replace();
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