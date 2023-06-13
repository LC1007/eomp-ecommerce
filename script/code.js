let droneArr =
JSON.parse(localStorage.getItem('droneArr')) ? 
JSON.parse(localStorage.getItem('droneArr')) :
localStorage.setItem('droneArr', JSON.stringify([{
    id: 1,
    title: 'DJI Drone 5',
    description: 'zorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatem, sint!',
    price: 6000,
    img: 'https://images.pexels.com/photos/392024/pexels-photo-392024.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
},{
    id: 2,
    title: 'DJI Drone 6',
    description: 'forem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatem, sint!',
    price: 7000,
    img: 'https://images.pexels.com/photos/392024/pexels-photo-392024.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
},{
    id: 3,
    title: 'DJI Drone 8',
    description: 'oorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatem, sint!',
    price: 9000,
    img: 'https://images.pexels.com/photos/392024/pexels-photo-392024.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
}]))

// Get the section where the product cards will be placed
let droneDisplayCards = document.querySelector('#droneDisplayCards')

droneDisplayCards.innerHTML = ''

droneArr.forEach((droneData) =>{
    droneDisplayCards.innerHTML += 
    `
    <div class="card p-0" style="width: 18rem;">
        <img src="${droneData.img}" alt="...">
    <div class="card-body">
        <h5 class="card-title">${droneData.title}</h5>
        <p class="card-text">${droneData.description}</p>
        <a href="#" class="btn btn-primary">Buy Now</a>
    </div>
    </div>
    `
})

