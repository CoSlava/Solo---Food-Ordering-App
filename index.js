import {menuArray} from "/data.js"
let orderDetails = document.getElementById("order-details")
let thxPage = document.getElementById("thank-you")
let sum = 0

menuArray.forEach(function(item){
    document.getElementById("list-items").innerHTML += `
    <div class="product-list-container">
        <div class="emoji">
            ${item.emoji}
        </div>
            <h3 class="item-name">${item.name}<div class="add-to-cart-btn" id="add-to-cart" data-add=${item.id}>+</div></h3>
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

function addToCartBtn(itemId){
    const selectedItems = menuArray.filter(function(obj){
        return obj.id == itemId
    })[0]         
        orderDetails.innerHTML += `
            <div id="${selectedItems.id}">
                <h3 class="item-name">${selectedItems.name}<span data-rmv=${selectedItems.id} class="remove-txt">remove</span><span class="item-price-cart">$${selectedItems.price}</span></h3>
                </div>
            </div>`   
        document.getElementById("display-order-details").classList.remove("hidden")
        sum += selectedItems.price
        document.getElementById("calculator").innerHTML = `$${sum}`
        thxPage.classList.add("hidden")
}

function removeItemsFromCart(){
    document.getElementById("display-order-details").classList.add("hidden")
    document.getElementById("order-details").innerHTML = ""
    sum = 0
}

function completeOrderBtn(){
    document.getElementById("add-card-container").classList.remove("hidden")
}

function processingThePayment(){
    document.getElementById("add-card-container").classList.add("hidden")
    document.getElementById("display-order-details").classList.add("hidden")
    thxPage.classList.remove("hidden")
    thxPage.innerHTML = `
    <div class="thanks-for-order">
        Thank you! Your order is on its way!
    </div>`
}