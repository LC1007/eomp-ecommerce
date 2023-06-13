// Line 2 is getting the array from localStorage and places it into a variable called droneArr
let droneArr = JSON.parse(localStorage.getItem('droneArr'))
// line 4 captures the table's body (tbody) which is where the table will be updated
let tableBody = document.querySelector('#table-body')
// Line 6 is placing the add button into a variable called addDrone
let addDrone = document.querySelector('#addDrone')
let droneID = droneArr[droneArr.length-1] ? droneArr[droneArr.length-1].id + 1 : 1;

let title = document.querySelector('#title-input')
let description = document.querySelector('#desc-input')
let price = document.querySelector('#price-input')
let img = document.querySelector('#image-input')
let msg = document.querySelector('.error-msg')
let delBtn;



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
        <td><img src="${content.img}" id="custom-img" alt=""></td>
        <td>
            <button class="btn btn-primary">Edit</button>
            <button class="btn btn-primary">Delete</button>
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



// function delButtons(){
//     delBtn = [...document.querySelectorAll('.delDroneBtn')]
//     delBtn.forEach((item)=>{
//         item.addEventListener('click', delDrone)
//     })
// }          

// function delDrone(e){
//     let findX = delBtn.indexOf(e.target)
//     droneArr.splice(findX, 1)
//     localStorage.setItem('droneArr', JSON.stringify(droneArr))
//     displayData()
// }

// Sorting 

let selectOption = document.querySelector('select')

selectOption.addEventListener('change', ()=>{
    let option = selectOption.value 

    if(option === 'id'){
        droneArr.sort((a,b) => b.id - a.id)
        displayData()
    } else if(option === 'price'){
        droneArr.sort((a,b) => b.price - a.price)
        displayData()
    }
})

