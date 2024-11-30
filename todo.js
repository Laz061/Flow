let items = [];

const itemsDiv = document.getElementById("todoItems");
const input = document.getElementById("itemInput");


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

function addItem() {
    if (!input.value) {
        return;
    }

    items.push(input.value);
    input.value = "";
    renderItems();
}

function deleteItem(index) {
    items.splice(index, 1);

    renderItems();
}
