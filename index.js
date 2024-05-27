const inputFieldEl = document.getElementById("input-field");
const addButtonEl = document.getElementById("add-button");
const shoppingListEl = document.getElementById("shopping-list");

class Shopping {
  date = new Date();
  inputArray = [];
  constructor() {
    this.retrieveItems();

    shoppingListEl.addEventListener("click", this.findAndDelete.bind(this));
    addButtonEl.addEventListener("click", this.inputItem.bind(this));
  }

  inputItem(e) {
    e.preventDefault();
    let id = new Date() + "";
    this.item = inputFieldEl.value;
    this.inputArray.push([this.item, id]);
    localStorage.setItem("shopping", JSON.stringify(this.inputArray));

    const newItemHTML = `<li class="list" data-id="${id}">${this.item}</li>`;
    shoppingListEl.insertAdjacentHTML("afterbegin", newItemHTML);
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
      console.log("Empty array");
      return;
    }
    console.log(this.inputArray);
    let shoppingListHTML = "";

    this.inputArray.forEach((item) => {
      shoppingListHTML += `<li class="list" data-id="${item[1]}">${item[0]}</li>`;
    });

    shoppingListEl.insertAdjacentHTML("afterbegin", shoppingListHTML);
  }
  findAndDelete(e) {
    const clickedItem = e.target.closest(".list");
    console.log("click", clickedItem);
    if (!clickedItem) return;
    const itemId = clickedItem.dataset.id;
    const foundItem = this.inputArray.find((item) => item[1] === itemId); // Find the item
    if (foundItem) {
      // Check if foundItem exists before using it
      const foundItemIndex = this.inputArray.indexOf(foundItem);
      shoppingListEl.children[foundItemIndex].remove(); // Remove from DOM directly
      this.inputArray.splice(foundItemIndex, 1); // Remove from array
      localStorage.setItem("shopping", JSON.stringify(this.inputArray)); // Update storage
    } else {
      console.log("Item not found"); // Optional: Log a message for debugging
    }
  }
}

const shoppingApp = new Shopping();
