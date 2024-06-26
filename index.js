const inputFieldEl = document.getElementById("input-field");
const addButtonEl = document.getElementById("add-button");
const shoppingListEl = document.getElementById("shopping-list");

class Shopping {
  date = new Date();
  inputArray = [];
  constructor() {
    this.retrieveItems();

    shoppingListEl.addEventListener("click", (e) => {
      const clickedItem = e.target.closest(".list");
      if (!clickedItem) return;
      this.findAndDelete.bind(this)(clickedItem);
    });

    addButtonEl.addEventListener("click", this.inputItem.bind(this));
  }

  inputItem(e) {
    e.preventDefault();
    let id = new Date() + 1 + "";
    this.item = inputFieldEl.value;
    this.inputArray.push([this.item, id]);
    localStorage.setItem("shopping", JSON.stringify(this.inputArray));

    const newItem = document.createElement("li");
    newItem.classList.add("list");
    newItem.dataset.id = id;
    newItem.textContent = this.item;

    shoppingListEl.appendChild(newItem);
    inputFieldEl.value = "";
  }
  retrieveItems() {
    const retrievedData = JSON.parse(localStorage.getItem("shopping"));
    if (!retrievedData) return;
    if (retrievedData) {
      this.inputArray = retrievedData;
    }
    this.renderData();
  }

  renderData() {
    if (this.inputArray.length === 0) {
      return;
    }

    let shoppingListHTML = "";

    this.inputArray.forEach((item) => {
      shoppingListHTML += `<li class="list" data-id="${item[1]}">${item[0]}</li>`;
    });

    shoppingListEl.insertAdjacentHTML("afterbegin", shoppingListHTML);
  }
  findAndDelete(clickedItem) {
    if (!clickedItem) return;
    const itemId = clickedItem.dataset.id;

    const foundItemIndex = this.inputArray.findIndex(
      (item) => item[1] === itemId
    );
    if (foundItemIndex === -1) {
      return;
    }
    shoppingListEl.children[foundItemIndex].remove();
    this.inputArray.splice(foundItemIndex, 1); // Remove from array
    localStorage.setItem("shopping", JSON.stringify(this.inputArray)); // Update storage
  }
}

const shoppingApp = new Shopping();
