let droneArr = JSON.parse(localStorage.getItem("droneArr"));
let checkoutArr = JSON.parse(localStorage.getItem("checkoutArr"));
let tableBody = document.querySelector("#table-body");
let addDrone = document.querySelector("#addDrone");
let droneID = droneArr[droneArr.length - 1]
  ? droneArr[droneArr.length - 1].id + 1
  : 1;
let title = document.querySelector("#title-input");
let description = document.querySelector("#desc-input");
let price = document.querySelector("#price-input");
let img = document.querySelector("#image-input");

// Line 14 to 100 is a function that loops through (forEach) the droneArr array and places each object in the array into the table
function displayData() {
  try {
    tableBody.innerHTML = "";
    droneArr.forEach((content) => {
      tableBody.innerHTML += `
    <tr>
        <td>${content.id}</td>
        <td>${content.title}</td>
        <td>${content.description}</td>
        <td>R${content.price}.00</td>
        <td><img src="${content.img}" id="custom-img" alt="${
        content.id
      }" loading="lazy"></td>
        <td>
        <!-- Button trigger modal -->
        <button type="button" class="btn btn-primary mb-1" data-bs-toggle="modal" data-bs-target="#staticBackdrop${
          content.id
        }">
          <i class="bi bi-pen"></i>
        </button>
        
        <!-- Modal -->
        <div class="modal fade" id="staticBackdrop${
          content.id
        }" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel${
        content.id
      }" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h1 class="modal-title fs-5 text-dark" id="staticBackdropLabel${
                  content.id
                }">Edit Product</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
              <form class="form">
                <div class="mb-3">
                  <h5>Title</h5>
                  <input type="text" class="form-control" value="${
                    content.title
                  }" id="edit-drone-title${content.id}" name="edit-drone-title">
                </div>
                <div class="mb-3">
                  <h5>Description</h5>
                  <textarea class="form-control" id="edit-drone-description${
                    content.id
                  }" name="edit-drone-description" rows="3">${
        content.description
      }</textarea>
                </div>
                <div class="mb-3">
                  <h5>Price</h5>
                  <input type="number" value="${
                    content.price
                  }.00" class="form-control" id="edit-drone-price${
        content.id
      }" name="edit-drone-price">
                </div>
                <div class="mb-3">
                  <h5>Image</h5>
                  <input type="url" class="form-control" value="${
                    content.img
                  }" id="edit-drone-img${content.id}" name="edit-drone-img">
                </div>
              </form>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary" onclick='new EditDroneData(${JSON.stringify(
                  content
                )})'>Save Changes</button>
              </div>
            </div>
          </div>
        </div>
            <button class="btn btn-primary" onclick='removeDrone(${JSON.stringify(
              content
            )})'><i class="bi bi-trash3"></i></button>
        </td>
    </tr>
        `;
    });
  } catch (e) {
    alert(e);
  }
}

// displayData() will run each time the page refreshes which means the data thats in the table won't go away but persist unless I manually delete the array in localStorage
displayData();

// The addDrone arrow function will assissgn the input values of the inputs and place it in an object
addDrone.addEventListener("click", () => {
  let newDroneData = {
    id: droneID,
    title: title.value,
    description: description.value,
    price: price.value,
    img: img.value,
  };
  // line 115 pushes the values of newDrone to the array called droneArr
  droneArr.push(newDroneData);
  // Line 117 then captures the newly created array with the new objects and update the localStorage
  localStorage.setItem("droneArr", JSON.stringify(droneArr));
  // Line 119 then runs the displayData() function which displays the newly created object into the table
  displayData();
});
// The removeDrone function removes a element from the array, so wheneven I click on an element then the findX variable will find the ID of the element I've clicked and match it to the element in the array and assign that ID to the findX variable which we'll use to as I starting point for our splice method on line 126
function removeDrone(item) {
  let findX = droneArr.findIndex((a) => {
    return a.id == item.id;
  }); 
  // The 1 is amount of items we want to remove from the starting point (findX)
  droneArr.splice(findX, 1);
  // Line 129 to line 130 is updating the local storage on both the droneArr and checkoutArr which means if I delete an item in the table it will then remove it from the products page and from the checkout page if the item is in the checkout page
  localStorage.setItem("droneArr", JSON.stringify(droneArr));
  localStorage.setItem("checkoutData", JSON.stringify(checkoutArr));
  // Line 132 is updating the UI with the newly updated array 
  displayData();
}

// Sorting

// Line 138 is capturing the ID select and placing it in a variable called idOption
let idOption = document.querySelector("#id-desc");
// Line 138 is capturing the ID select and placing it in a variable called priceOption
let priceOption = document.querySelector("#price-desc");

// Line 143 to line 153 is an if statement to see which value I've selected in the dropdown menu and then does the sorting according to the value
idOption.addEventListener("change", () => {
  let option = idOption.value;

  if (option === "id") {
    droneArr.sort((a, b) => a.id - b.id); // Ascending sort for ID
    displayData();
  } else if (option === "id-desc") {
    droneArr.sort((a, b) => b.id - a.id); // Descending sort for ID
    displayData();
  }
});

// This does the same as the code above (line 143 to line 153)
priceOption.addEventListener("change", () => {
  let option = priceOption.value;

  if (option === "price") {
    droneArr.sort((a, b) => a.price - b.price); // Ascending sort for ID
    displayData();
  } else if (option === "price-desc") {
    droneArr.sort((a, b) => b.price - a.price); // Descending sort for ID
    displayData();
  }
});

// Line 169 to line 173 - when I click on the edit button then the EditDroneData function will run which will find the ID of the element I've click and match it with the ID of the array and store it in a variable called findX
function EditDroneData(item) {
  location.reload();
  let findX = droneArr.findIndex((x) => {
    return x.id == item.id;
  });
// Line 175 to line 179 is capturing new values of the input and placing it in the this.(element name) and then from line 180 to line 183 capture the ID along with all the element keys and values and then push the new text in the array which then updates the local storage and update the table (displayData())
  this.id = item.id;
  this.title = document.querySelector(`#edit-drone-title${item.id}`).value;
  this.description = document.querySelector(`#edit-drone-description${item.id}`).value;
  this.price = document.querySelector(`#edit-drone-price${item.id}`).value;
  this.img = document.querySelector(`#edit-drone-img${item.id}`).value;
  droneArr[findX] = Object.assign({}, this);
  localStorage.setItem("droneArr", JSON.stringify(droneArr));
  displayData();
}
