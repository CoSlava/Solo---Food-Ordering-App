import {menuArray} from "/data.js"
let orderArray = []
let index = 0
let sum = 0

let displayOrderDetails = document.getElementById("display-order-details")
let addCardContainter = document.getElementById("add-card-container")
let orderDetails = document.getElementById("order-details")
let calculator = document.getElementById("calculator")
let foodFeed = document.getElementById("list-items")
let thxPage = document.getElementById("thank-you")

menuArray.forEach(function(item){
    foodFeed.innerHTML += `
    <div class="product-list-container">
        <div class="emoji">
            ${item.emoji}
        </div>
            <h3 class="item-name">${item.name}<div class="add-to-cart-btn" id="add-to-cart" "
            data-add=${item.name}>+</div></h3>
            <p class="item-ingredients">${item.ingredients}</p>
            <h3 class="item-price">$${item.price}</h3>
        <div class="bottom-border"></div>
    </div>`
})

document.addEventListener("click", function(e){
    if (e.target.dataset.add){
        addToCartBtn(e.target.dataset.add)
    } else if (e.target === document.getElementById("complete-order-btn")){
        completeOrderBtn()
    } else if (e.target.dataset.rmv){
        removeItemsFromCart(e.target.dataset.rmv)
    } else if (e.target === document.getElementById("pay-btn")){
        processingThePayment()
    }
})

function addToCartBtn(itemName){
    const selectedItem = menuArray.filter(function(obj){
       return obj.name === itemName
    })[0]
        orderArray.push(selectedItem)
        renderCartItems()
}

function renderCartItems(){
    orderDetails.innerHTML = ""
    sum = 0
        orderArray.forEach(function(item){
            orderDetails.innerHTML += `
                <div id="${item.id}">
                    <h3 class="item-name">${item.name}<span data-rmv=${item.id} class="remove-txt">remove</span><span class="item-price-cart">$${item.price}</span></h3>
                    </div>
                </div>`
            sum += item.price
            index ++
        })
    
    if (sum > 0) {
        displayOrderDetails.classList.remove("hidden")
    } else if (sum === 0) {
        displayOrderDetails.classList.add("hidden")
    }
        calculator.innerHTML = `$${sum}`
        thxPage.classList.add("hidden")
}

function removeItemsFromCart(itemId){
    let newOrderArray = orderArray.filter(function(item){
        return item.id != parseInt(itemId)
    })
    orderArray = newOrderArray
    renderCartItems()
}

function completeOrderBtn(){
    addCardContainter.classList.remove("hidden")
}

function processingThePayment(){
    addCardContainter.classList.add("hidden")
    displayOrderDetails.classList.add("hidden")
    thxPage.classList.remove("hidden")
    thxPage.innerHTML = `
    <div class="thanks-for-order">
        Thank you! Your order is on its way!
    </div>`
    orderArray = []
    sum = 0
}