let droneArr =
JSON.parse(localStorage.getItem('droneArr')) ? 
JSON.parse(localStorage.getItem('droneArr')) :
localStorage.setItem('droneArr', JSON.stringify([{
    id: 1,
    title: 'DJI Mavic 3 Classic',
    description: 'With powerful flight performance and a Hasselblad camera, Mavic 3 Classic delivers the absolute essence of flagship imaging. Take it on any adventure to create unforgettable work.',
    price: 9000,
    img: 'https://i.postimg.cc/dVhSyNJd/josh-sorenson-ouuigywb-Xl-I-unsplash.jpg'
},{
    id: 2,
    title: 'DJI Inspire 3',
    description: 'At the peak of aerial cinematography, DJI Inspire 3 offers unprecedented workflow efficiency, camera language, and creative freedom. This all-in-one 8K camera drone empowers professional-level filmmakers to fully maximize the potential of any shot and master the unseen.',
    price: 18000,
    img: 'https://i.postimg.cc/wBjTBPDn/pexels-darrel-und-1087180.jpg'
},{
    id: 3,
    title: 'DJI Avata',
    description: 'Compact and lightweight, DJI Avata is nimble in tight spaces. Every aspect of its design was made for you to be bold. The built-in propeller guard means that if Avata comes in contact with an object, it can bounce back, stay in the air, and can keep on flying.',
    price: 9000,
    img: 'https://i.postimg.cc/nrhLPh1R/pexels-pok-rie-1336185.jpg'
},{
    id: 4,
    title: 'DJI MINI 3 PRO',
    description: "The mini-sized, mega-capable DJI Mini 3 Pro is just as powerful as it is portable. Weighing less than 249 g and with upgraded safety features, it's not only regulation-friendly, it's also the safest in its series. [1] With a 1/1.3-inch sensor and top-tier features, it redefines what it means to fly Mini.",
    price: 6000,
    img: 'https://i.postimg.cc/DwbT0TNW/pexels-inmortal-producciones-336232.jpg'
},{
    id: 5,
    title: 'DJI MINI 3',
    description: "DJI Mini 3 is a compact, ultra-lightweight camera drone built for adventure. It features extended battery life, detail-rich 4K HDR video, and fun features like True Vertical Shooting for social-media-optimized shots. Whether you're capturing an epic road trip, or just a day in your own backyard, Mini 3 is up for the moment.",
    price: 7000,
    img: 'https://images.pexels.com/photos/392024/pexels-photo-392024.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
},]))

// Get the section where the product cards will be placed
let droneDisplayCards = document.querySelector('#droneDisplayCards')
let checkoutArr = []

function displayCheckout(){
    droneDisplayCards.innerHTML = ''
    
    droneArr.forEach((droneData) =>{
        droneDisplayCards.innerHTML += 
        `
        <div class="card p-0" style="width: 18rem;">
            <img src="${droneData.img}" class="custom-img-product" alt="..." loading="lazy">
        <div class="card-body">
        <div class="d-flex justify-content-between me-3 mb-3">
        <h5 class="card-title">${droneData.title}</h5>
        <p>R${droneData.price}</p>
        </div>
            <p class="card-text">${droneData.description}</p>
            <p class="card-text mb-5"></p>
            <button class="btn btn-primary position-absolute bottom-0 my-3" onclick='addToCheckout(${JSON.stringify(droneData)})'>Buy Now
        </div>
        </div>
            </div>
        </div>
        `
    })
}

displayCheckout()

function addToCheckout(droneData){
    try {
        checkoutArr.push(droneData)
        localStorage.setItem('checkoutData', JSON.stringify(checkoutArr))
    } catch (e) {
        console.log(e);
    }
    console.log(checkoutArr);
}

