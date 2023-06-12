let droneArr = JSON.parse(localStorage.getItem('droneArr'))
let tableBody = document.querySelector('#table-body')
let addDrone = document.querySelector('#addDrone')


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

displayData()

addDrone.addEventListener('click', ()=>{
    let title = document.querySelector('#title-input')
    let description = document.querySelector('#desc-input')
    let price = document.querySelector('#price-img')
    let img = document.querySelector('#image-input')
})

