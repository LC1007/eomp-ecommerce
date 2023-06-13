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

addDrone.addEventListener('click', (item)=>{
    let title = document.querySelector('#title-input').value
    let description = document.querySelector('#desc-input').value
    let price = document.querySelector('#price-input').value
    let img = document.querySelector('#image-input').value

})


