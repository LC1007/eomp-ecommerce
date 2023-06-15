// Line 2 is getting the array from localStorage and places it into a variable called droneArr
let droneArr = JSON.parse(localStorage.getItem('droneArr'))
let checkoutArr = JSON.parse(localStorage.getItem('checkoutArr'))
// line 4 captures the table's body (tbody) which is where the table will be updated
let tableBody = document.querySelector('#table-body')
// Line 6 is placing the add button into a variable called addDrone
let addDrone = document.querySelector('#addDrone')
let droneID = droneArr[droneArr.length-1] ? droneArr[droneArr.length-1].id + 1 : 1;

let title = document.querySelector('#title-input')
let description = document.querySelector('#desc-input')
let price = document.querySelector('#price-input')
let img = document.querySelector('#image-input')



// Line 9 to 31 is a function that loops through (forEach) the droneArr array and places each object in the array into the table
function displayData(){
    try {
        tableBody.innerHTML = ''
        droneArr.forEach((content) =>{
        tableBody.innerHTML +=
        `
    <tr>
        <td>${content.id}</td>
        <td>${content.title}</td>
        <td>${content.description}</td>
        <td>R${content.price}</td>
        <td><img src="${content.img}" id="custom-img" alt="${content.id}" loading="lazy"></td>
        <td>
        <!-- Button trigger modal -->
        <button type="button" class="btn btn-primary mb-1" data-bs-toggle="modal" data-bs-target="#staticBackdrop${content.id}">
          Edit
        </button>
        
        <!-- Modal -->
        <div class="modal fade" id="staticBackdrop${content.id}" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel${content.id}" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h1 class="modal-title fs-5" id="staticBackdropLabel${content.id}">Edit Product</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
              <form class="form">
                <div class="mb-3">
                  <h5>Title</h5>
                  <input type="text" class="form-control" id="edit-drone-title${content.title}" name="edit-drone-title">
                </div>
                <div class="mb-3">
                  <h5>Description</h5>
                  <textarea class="form-control" id="edit-drone-description" name="edit-drone-description${content.description}" rows="3"></textarea>
                </div>
                <div class="mb-3">
                  <h5>Price</h5>
                  <input type="number" class="form-control" id="edit-drone-price${content.price}" name="edit-drone-price">
                </div>
                <div class="mb-3">
                  <h5>Image</h5>
                  <input type="url" class="form-control" id="edit-drone-img${content.img}" name="edit-drone-img">
                </div>
              </form>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary" onclick='new EditDroneData(${JSON.stringify(content)})'>Save Changes</button>
              </div>
            </div>
          </div>
        </div>
            <button class="btn btn-primary" onclick='removeDrone(${JSON.stringify(content)})'>Delete</button>
        </td>
    </tr>
        `
    })
    } catch (e) {
        alert(e)
    }
}

// displayData() will run each time the page refreshes which means the data thats in the table won't go away but persist unless I manually delete the array in localStorage
displayData()



addDrone.addEventListener('click', ()=>{

        let newDroneData = {
            id: droneID,
            title: title.value,
            description: description.value,
            price: price.value,
            img: img.value
        }
        // line 48 pushes the values of newDrone to the array called droneArr
        droneArr.push(newDroneData)
        // Line 50 then captures the newly created array with the new objects and update the localStorage
        localStorage.setItem('droneArr', JSON.stringify(droneArr))
        // Line 52 then runs the displayData() function which displays the newly created object into the table
        
        displayData()    
        console.log(droneArr);
})


function removeDrone(item){
    let findX = droneArr.findIndex((a) => {
        return a.id == item.id
    })
    droneArr.splice(findX, 1)
    localStorage.setItem('droneArr', JSON.stringify(droneArr))
    localStorage.setItem('checkoutData', JSON.stringify(checkoutArr))
    displayData()
}

// Sorting 

let idOption = document.querySelector('#id-desc')
let priceOption = document.querySelector('#price-desc')

idOption.addEventListener('change', ()=>{
    let option = idOption.value 

    if(option === 'id'){
        droneArr.sort((a,b) => a.id - b.id) // Ascending sort for ID
        displayData()
    } else if(option === 'id-desc'){
        droneArr.sort((a,b) => b.id - a.id) // Descending sort for ID
        displayData()
    }
})

priceOption.addEventListener('change', ()=>{
    let option = priceOption.value 

    if(option === 'price'){
        droneArr.sort((a,b) => a.price - b.price) // Ascending sort for ID
        displayData()
    } else if(option === 'price-desc'){
        droneArr.sort((a,b) => b.price - a.price) // Descending sort for ID
        displayData()
    }
})


// function EditDroneData(content){
//     this.id = content.id,
//     this.title = document.querySelector('#edit-drone-title').value
//     this.description = document.querySelector('#edit-drone-description').value
//     this.price = document.querySelector('#edit-drone-price').value
//     this.img = document.querySelector('#edit-drone-img').value

//     let findDroneId = droneArr.findIndex((x)=> {
//         return x.id === content.id
//     })

//     droneArr[findDroneId] = {
//         id: this.id,
//         title: this.title,
//         description: this.description,
//         price: this.price,
//         img: this.img
//     }
//     localStorage.setItem('droneArr', JSON.stringify(droneArr))
//     displayData()
// }


function EditDroneData(item){
    location.reload()
    let findX = droneArr.findIndex( x=>{
        return x.id == item.id
    })
    this.id = item.id
    this.title = document.querySelector(`#edit-drone-title${item.id}`).value
    this.description = document.querySelector(`#edit-drone-description${item.id}`).value
    this.price = document.querySelector(`#edit-drone-price${item.id}`).value
    this.img = document.querySelector(`#edit-drone-img${item.id}`).value
    droneArr[findX] = Object.assign({}, this)
    localStorage.setItem('droneArr', JSON.stringify(droneArr))
    displayData()
}







