let droneArr = JSON.parse(localStorage.getItem("droneArr"))
  ? JSON.parse(localStorage.getItem("droneArr"))
  : localStorage.setItem(
      "droneArr",
      JSON.stringify([
        {
          id: 1,
          title: "DJI Mavic 3 Classic",
          description:
            "With powerful flight performance and a Hasselblad camera, Mavic 3 Classic delivers the absolute essence of flagship imaging. Take it on any adventure to create unforgettable work.",
          price: 8999,
          img: "https://i.postimg.cc/dVhSyNJd/josh-sorenson-ouuigywb-Xl-I-unsplash.jpg",
        },
        {
          id: 2,
          title: "DJI Inspire 3",
          description:
            "At the peak of aerial cinematography, DJI Inspire 3 offers unprecedented workflow efficiency, camera language, and creative freedom. This all-in-one 8K camera drone empowers professional-level filmmakers to fully maximize the potential of any shot and master the unseen.",
          price: 13999,
          img: "https://i.postimg.cc/wBjTBPDn/pexels-darrel-und-1087180.jpg",
        },
        {
          id: 3,
          title: "DJI Avata",
          description:
            "Compact and lightweight, DJI Avata is nimble in tight spaces. Every aspect of its design was made for you to be bold. The built-in propeller guard means that if Avata comes in contact with an object, it can bounce back, stay in the air, and can keep on flying.",
          price: 11999,
          img: "https://i.postimg.cc/nrhLPh1R/pexels-pok-rie-1336185.jpg",
        },
        {
          id: 4,
          title: "DJI MINI 3 PRO",
          description:
            "DJI Mini 3 is a compact, ultra-lightweight camera drone built for adventure. It features extended battery life, detail-rich 4K HDR video, and fun features like True Vertical Shooting for social-media-optimized shots.",
          price: 5999,
          img: "https://i.postimg.cc/DwbT0TNW/pexels-inmortal-producciones-336232.jpg",
        },
        {
          id: 5,
          title: "DJI MINI 3",
          description:
            "DJI Mini 3 is a compact, ultra-lightweight camera drone built for adventure. It features extended battery life, detail-rich 4K HDR video, and fun features like True Vertical Shooting for social-media-optimized shots.",
          price: 69999,
          img: "https://images.pexels.com/photos/392024/pexels-photo-392024.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        },
      ])
    );

// Get the section where the product cards will be placed
let droneDisplayCards = document.querySelector("#droneDisplayCards");
let checkoutArr = [];
let search = document.querySelector("#search");

// Line 52 captured the input and placed it in a variable called search and line 55 is placing a addEventListerner and listening for a keyup which will then run the filterDroneFunc() function
search.addEventListener("keyup", filterDroneFunc);

// Line 58 to line 63 - search
function filterDroneFunc(event) {
  // Line 60 is capturing the value of the input, converting the text to lower case and then placing it in a variable called searchValue
  let searchValue = event.target.value.toLowerCase();

  // Line 63 to line 65 then uses the searchValue to filter the array
  const filteredDroneArray = droneArr.filter((drone) =>
    drone.title.toLowerCase().includes(searchValue)
  );

  // Line 68 to line 88 then uses a map method to place a template literal for each element in the array that matches the filter criteria
  let filteredResults = filteredDroneArray
    .map(
      (drone) => `
      <div class="card p-0" style="width: 18rem;">
        <img src="${drone.img}" class="custom-img-product" alt="${
        drone.title
      }" loading="lazy">
        <div class="card-body">
          <div class="d-flex justify-content-between me-3 mb-3">
            <h5 class="card-title">${drone.title}</h5>
            <p>R${drone.price}.00</p>
          </div>
          <p class="card-text">${drone.description}</p>
          <p class="card-text mb-5"></p>
          <button class="btn btn-primary position-absolute bottom-0 my-3" onclick="addToCheckout(${JSON.stringify(
            drone
          )})">Buy Now</button>
        </div>
      </div>
    `
    )
    .join("");
// Line 90 places the template literal into the droneDisplayCards which is an ID on a div on the product.html
  droneDisplayCards.innerHTML = filteredResults;
}

// Line 94 to line 118 is a function called displayCheckout which loops through the droneArr array and places a template literal for each element it finds in the array
function displayCheckout() {
  droneDisplayCards.innerHTML = "";

  droneArr.forEach((droneData) => {
    droneDisplayCards.innerHTML += `
      <div class="card p-0" style="width: 18rem;">
            <img src="${droneData.img}" class="custom-img-product" alt="${droneData.title}" loading="lazy">
        <div class="card-body">
            <div class="d-flex justify-content-between me-3 mb-3">
                    <h5 class="card-title">${droneData.title}</h5>
                    <p>R${droneData.price}.00</p>
            </div>
                    <p class="card-text">${droneData.description}</p>
                    <p class="card-text mb-5"></p>
                    <button class="btn btn-primary position-absolute bottom-0 my-3" onclick='addToCheckout(${JSON.stringify(droneData)})'>Buy Now</button>
            </div>
      </div>
        `;
  });
}
// This runs the function everytime the pages loads which is what makes the data persist even after the page refreshes
displayCheckout();

// Line 124 to line 132 is a function that captures the details of the element that was clicked by using the onclick='addToCheckout(${JSON.stringify(droneData)})'  the capture the details and place it in the droneData argument. The checkoutArr.push(droneData); then takes the details and pushes it to the checkoutArr and also updates the local storage aswell
function addToCheckout(droneData) {
  try {
    checkoutArr.push(droneData);
    localStorage.setItem("checkoutData", JSON.stringify(checkoutArr));
    alert('Item Added to the cart')
  } catch (e) {
    alert(e);
  }
}

// Line 134 to line 152 - first we creating a copy of the droneArr array and placing it in a array called sortedDrone, I'm also creating a variable called ascDrones and setting it to true. The toggleDroneSort() function when clicked will change the ascDrones to either false or true which will change the sorting accordingly and it will run the sortedDroneFunc() function which will sort according to the value of ascDrone, if ascDrones is true then it will sort in ascending order otherwise descending order. Line 151 is a function that displays the result of the sort in template literals.
let sortedDrone = [...droneArr];
let ascDrones = true;

function toggleDroneSort(){
  ascDrones = !ascDrones
  sortedDroneFunc()
}

function sortedDroneFunc(){
  sortedDrone.sort((a,b) => {
    if(ascDrones){
      return a.price - b.price
    } else{
      return b.price - a.price
    }
  })

  displayAlteredArr()
}

function displayAlteredArr(){
  let sortedData = sortedDrone.map(
    (drone => `
    <div class="card p-0" style="width: 18rem;">
            <img src="${drone.img}" class="custom-img-product" alt="${drone.title}" loading="lazy">
    <div class="card-body">
        <div class="d-flex justify-content-between me-3 mb-3">
        <h5 class="card-title">${drone.title}</h5>
        <p>R${drone.price}.00</p>
    </div>
        <p class="card-text">${drone.description}</p>
        <p class="card-text mb-5"></p>
        <button class="btn btn-primary position-absolute bottom-0 my-3" onclick='addToCheckout(${JSON.stringify(drone)})'>Buy Now
        </div>
        </div>
    </div>
    </div>
  `)
  ).join('');

  droneDisplayCards.innerHTML = sortedData
  console.log(sortedDrone);
}


let form = document.querySelector("#contactUs");
let nameInput = document.querySelector("#name-input");

form.addEventListener('submit', function(event){
  event.preventDefault()
  form.reset()
  nameInput.innerHTML = ''
})