let checkoutArr = 
JSON.parse(localStorage.getItem('checkoutData')) ? 
JSON.parse(localStorage.getItem('checkoutData')) : []


let summaryCards = document.querySelector('#summaryCards')
let priceSection = document.querySelector('#price-section')


let clearCartBtn = document.querySelector('#cart-btn')
let totalPrice = checkoutArr.reduce((acc, curr) => acc + curr.price, 0)

let cartMsg = document.querySelector('#cart-msg')




// Clear button

clearCartBtn.addEventListener('click', ()=>{
  localStorage.removeItem('checkoutData')
  cartMsg.innerHTML = 'test'
  console.log('cart has been cleared');
  location.reload()
})





function addTotal(){
  total.innerHTML = "R" + totalPrice
}

addTotal()




let groupDrones = checkoutArr.reduce((group, checkoutArr) =>{
  let {id} = checkoutArr
  group[id] = group[id] ?? []
  group[id].push(checkoutArr)
  return group
}, {})

for(let droneID in groupDrones){
  summaryCards.innerHTML +=
  `
      <div class="card mb-3 p-0" style="max-width: 540px;">
        <div class="row g-0">
          <div class="col-md-4">
            <img src="${groupDrones[droneID][0].img}" class="img-fluid h-100 rounded-start custom-img-checkout" alt="...">
          </div>
          <div class="col-md-8">
            <div class="card-body">
            <div class="d-flex justify-content-between me-3 mb-3">
              <h5 class="card-title">${groupDrones[droneID][0].title}</h5>
              <h5>R${groupDrones[droneID][0].price}</h5>
              <h5>${groupDrones[droneID].length}</h5>
            </div>
              <p class="card-text">${groupDrones[droneID][0].description}</p>
            </div>
          </div>
        </div>
    </div>
  `
  console.log("ID:",droneID);
}


for(let droneID in groupDrones){
  priceSection.innerHTML +=
  `
  <div class="d-flex justify-content-between">
      <p class="text-white">${groupDrones[droneID][0].title}</p>
      <p class="text-white m-1">${groupDrones[droneID].length}</p>
      <p class="text-white">R${groupDrones[droneID][0].price}</p>
  </div> 
  <div>
    <div class="d-flex justify-content-center">
    <button class="btn btn-primary position-absolute bottom-0 mb-3">Proceed</button>
  </div>
  `
}