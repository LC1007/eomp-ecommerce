let checkoutArr = 
JSON.parse(localStorage.getItem('checkoutData')) ? 
JSON.parse(localStorage.getItem('checkoutData')) : localStorage.setItem('checkoutData', JSON.stringify(checkoutArr))
let summaryCards = document.querySelector('#summaryCards')
let priceSection = document.querySelector('#price-section')

console.log(checkoutArr);

summaryCards.innerHTML = ''
checkoutArr.forEach((droneCheckout) =>{
    summaryCards.innerHTML +=
    `
    <div class="card mb-3 p-0" style="max-width: 540px;">
        <div class="row g-0">
          <div class="col-md-4">
            <img src="${droneCheckout.img}" class="img-fluid h-100 rounded-start custom-img-checkout" alt="...">
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <h5 class="card-title">${droneCheckout.title}</h5>
              <p class="card-text">${droneCheckout.description}</p>
            </div>
          </div>
        </div>
    </div>
    `
})

priceSection.innerHTML = ""
checkoutArr.forEach((droneCheckout) => {
  priceSection.innerHTML +=
  `
  <div class="d-flex justify-content-between">
      <p class="text-white">${droneCheckout.title}</p>
      <p class="text-white">R${droneCheckout.price}</p>
  </div> 
  <div>
    <div class="d-flex justify-content-center">
    <button class="btn btn-primary position-absolute bottom-0 mb-3">Proceed</button>
  </div>
  `
})
