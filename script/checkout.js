let checkoutArr = JSON.parse(localStorage.getItem("checkoutData"))
  ? JSON.parse(localStorage.getItem("checkoutData"))
  : [];
let summaryCards = document.querySelector("#summaryCards");
let priceSection = document.querySelector("#price-section");
let clearCartBtn = document.querySelector("#cart-btn");
let totalPrice = checkoutArr.reduce((acc, curr) => {return acc + curr.price;}, 0);
let cartMsg = document.querySelector("#cart-msg");
let checkoutTable = document.querySelector("#checkout-table");

// Line 14 takes the value from line 7 (let totalPrice = checkoutArr.reduce((acc, curr) => {return acc + curr.price;}, 0);) which adds the prices of each element in the array into one number and then concat Total - R with the value of totalPrice which will result in eg R30000
function addTotal() {
  total.innerHTML = "Total - R" + totalPrice + ".00";
}
// This runs the function above
addTotal();

// Line 19 to line 28 - if I click on add to cart 3 times on a item with the ID of 3 then this block of code will group that items into one group otherwise it will just have an empty array, so this block of code is what will the page to only saw one card but have a quantity of 3 as I've clicked the item 3 times
function presentCheckout() {
  try {
    if (!checkoutArr.length)
      throw (cartMsg.innerHTML = "Shopping cart is empty");
    let groupDrones = checkoutArr.reduce((group, checkoutArr) => {
      let { id } = checkoutArr;
      group[id] = group[id] ?? [];
      group[id].push(checkoutArr);
      return group;
    }, {});
// Line 30 to 50 then takes the ID of the items I've clicked to display the item as cards on the page using template literals
    for (let droneID in groupDrones) {
      summaryCards.innerHTML += `
        <div class="card mb-3 p-0" style="max-width: 540px;">
          <div class="row g-0">
            <div class="col-md-4">
              <img src="${groupDrones[droneID][0].img}" class="img-fluid h-100 rounded-start custom-img-checkout" alt="${groupDrones[droneID][0].title}" loading="lazy">
              <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-primary">${groupDrones[droneID].length}</span>
            </div>
            <div class="col-md-8">
              <div class="card-body">
              <div class="d-sm-flex justify-content-between me-3 mb-3">
                <h5 class="card-title">${groupDrones[droneID][0].title}</h5>
                <h5>R${groupDrones[droneID][0].price}.00</h5>
              </div>
                <p class="card-text">${groupDrones[droneID][0].description}</p>
              </div>
            </div>
          </div>
        </div>
  `;
    }
// Line 52 to 65 does the same as the code above 
    for (let droneID in groupDrones) {
      checkoutTable.innerHTML += `
      <tr>
          <td>${groupDrones[droneID][0].title}</td>
          <td>${groupDrones[droneID].length}</td>
          <td>R${groupDrones[droneID][0].price}.00</td>
      </tr>
        
  `;
    }
  } catch (error) {
    cartMsg.innerHTML = error;
  }
}

presentCheckout();
// Line 69 to 73 displays a clear all button if the checkoutArr is empty but if its not then it sets the style of p tag to display: none
if (checkoutArr.length !== 0) {
  clearCartBtn.style = "display: block";
} else {
  clearCartBtn.style = "display: none";
}

// Clear button
// Line 77 to line 80 clears the local storage of the checkout page which deletes everything on the page
clearCartBtn.addEventListener("click", () => {
  localStorage.removeItem("checkoutData");
  location.reload();
});

