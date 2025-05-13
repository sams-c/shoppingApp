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

    inputFieldEl.addEventListener("keyup", (event) => {
      if (event.key === "Enter") {
        this.inputItem.bind(this)();
      }
    });
  }

  inputItem() {
    console.log("inputItem called", this.item, this.inputArray);
    let id = new Date() + 1 + "";
    this.item = inputFieldEl.value;
    this.inputArray.push([this.item, id]);
    localStorage.setItem("shopping", JSON.stringify(this.inputArray));

    inputFieldEl.value = "";
    this.renderData();
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
    shoppingListEl.innerHTML = "";

    if (this.inputArray.length === 0) {
      return;
    }

    let shoppingListHTML = "";

    for (let i = this.inputArray.length - 1; i >= 0; i--) {
      const item = this.inputArray[i];
      shoppingListHTML += `<li class="list" data-id="${item[1]}">${item[0]}</li>`;
    }

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

    const elementToRemove = document.querySelector(`[data-id="${itemId}"]`);
    if (elementToRemove) {
      elementToRemove.remove();
    }

    this.inputArray.splice(foundItemIndex, 1);
    localStorage.setItem("shopping", JSON.stringify(this.inputArray));
  }
}
const shoppingApp = new Shopping();
