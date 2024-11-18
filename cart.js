/* Image Filter Section */

// const allFilterItems = document.querySelectorAll('.filter-item');
// const allFilterBtns = document.querySelectorAll('.filter-btn');

// window.addEventListener('DOMContentLoaded', () => {
//     allFilterBtns[1].classList.add('active-btn');
// });

// allFilterBtns.forEach((btn) => {
//     btn.addEventListener('click', () => {
//         showFilteredContent(btn);
//     });
// });

// function showFilteredContent(btn){
//     allFilterItems.forEach((item) => {
//         if(item.classList.contains(btn.id)){
//             resetActiveBtn();
//             btn.classList.add('active-btn');
//             item.style.display = "block";
//         } else {
//             item.style.display = "none";
//         }
//     });
// }

function resetActiveBtn(){
    allFilterBtns.forEach((btn) => {
        btn.classList.remove('active-btn');
    });
}


/* Shopping Cart Section */
if (document.readyState == 'loading'){
    document.addEventListener('DOMContentLoaded' , ready);
}

else{
    ready();
}


 function ready(){
    var cartTable=document.getElementsByClassName('cart-items');
    if(cartTable?.length){
        printCart();
        updateCartTotal();
    }
    var removeCartItemButton = document.getElementsByClassName('btn-danger');
    for (var i = 0 ; i < removeCartItemButton.length; i++){
        var button = removeCartItemButton[i];
        button.addEventListener('click', removeCartItem)
    }

    var quantityInputs = document.getElementsByClassName('cart-quantity-input');
    for(var i = 0 ;i < quantityInputs.length ; i++){
        var input = quantityInputs[i];
        input.addEventListener('change', quantityChanged);
    }
    
    var addToCartButtons = document.getElementsByClassName('shop-item-button');
    var addToCartHomeButtons = document.getElementsByClassName('icon-cross');
    for(var i = 0; i< addToCartButtons.length; i++){
        var button = addToCartButtons[i];
        button.addEventListener('click',addToCartClicked)
    }
    for(var i = 0; i< addToCartHomeButtons.length; i++){
        var button = addToCartHomeButtons[i];
        button.addEventListener('click',addToCartClicked)
    }

    document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClicked)
 }


 function purchaseClicked(){
    
     var cartItems = document.getElementsByClassName('cart-items')[0];
     while(cartItems.hasChildNodes()){
         cartItems.removeChild(cartItems.firstChild)
     }
     localStorage.removeItem('cartItems');
     updateCartTotal();
 }

function removeCartItem(event){
    var buttonClicked = event.target;
    let productDelete= buttonClicked.parentElement.parentElement.getElementsByClassName('cart-item-title')[0].innerText
    let cartItems=localStorage.getItem('cartItems')?JSON.parse(localStorage.getItem('cartItems')):[];
    cartItems=cartItems.filter(f=>f.title!=productDelete);
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    buttonClicked.parentElement.parentElement.remove();
    updateCartTotal();
    
}

function  quantityChanged(event){
    var input = event.target;
    let product= input.parentElement.parentElement.getElementsByClassName('cart-item-title')[0].innerText

    if(isNaN(input.value) || input.value <= 0 ){
        input.value = 1;
    }
    let cartItems=localStorage.getItem('cartItems')?JSON.parse(localStorage.getItem('cartItems')):[];
    let cartItemIndex=cartItems.findIndex(f=>f.title==product);
    if(cartItemIndex>=0){
        cartItems[cartItemIndex].qty=input.value;
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }
    updateCartTotal();
}


function addToCartClicked(event){
    var button = event.target;
    var shopItem = button.parentElement.parentElement;
    var title = shopItem.getElementsByClassName('shop-item-title')[0].innerText;
    var price = shopItem.getElementsByClassName('shop-item-price')[0].innerText;
    var imageSrc = shopItem.getElementsByClassName('shop-item-image')[0].src;
    addCartItem(title,price,imageSrc);
    //updateCartTotal();
}

function addCartItem(title,price,imageSrc) {
    let cartItems=localStorage.getItem('cartItems')? JSON.parse(localStorage.getItem('cartItems')):[];
    if(cartItems?.length){
       let item= cartItems.find(f=>f.title==title);
       if(item){
           alert('This item already has added to the cart!');
           return
        }
    }
    cartItems.push({title:title,imageSrc:imageSrc,price:price,qty:1});
    localStorage.setItem('cartItems', JSON.stringify(cartItems));   
    var cartTable=document.getElementsByClassName('cart-items');
    if(cartTable?.length){
        printCart();
        updateCartTotal();
    }    
}

function printCart(){
   
    let cartItems=localStorage.getItem('cartItems')?JSON.parse(localStorage.getItem('cartItems')):[];
    var cartItemsTable = document.getElementsByClassName('cart-items')[0];
    cartItems.forEach(cartItem => {
        var cartRow = document.createElement('tr');
        cartRow.classList.add('cart-row');

        var cartRowContents = `

        <td class="cart-item cart-column">
            <img class="cart-item-image" src="${cartItem.imageSrc}" width="50" height="50">
            <span class="cart-item-title">${cartItem.title}</span>                  
        </td>
        <td class="cart-item cart-column">
            <span class="cart-price cart-column">${cartItem.price}</span>
        </td>
        <td class="cart-item cart-column">
            <input class="cart-quantity-input" type="number" value="${cartItem.qty?cartItem.qty:1}" style="width: 50px">
            <button class="btn btn-danger" type="button">Remove</button>
        </td>        
    `;
     
            
    cartRow.innerHTML = cartRowContents;
    let cartRows=cartItemsTable.getElementsByClassName('cart-row');
    
    let rowFind=false;
    for (let item of cartRows){
        if(item.getElementsByClassName('cart-item-title')[0]?.innerText==cartItem.title){
            rowFind=true;
        }
    }
    if(!rowFind){
        cartItemsTable.append(cartRow);
        cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem);
        cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged)
    }
    });
}
function addItemToCart(title, price, imageSrc){
    var cartRow = document.createElement('tr');
    cartRow.classList.add('cart-row');
    var cartItems = document.getElementsByClassName('cart-items')[0];
    if(cartItems){
        var cartItemNames = cartItems?.getElementsByClassName('cart-item-title');
        for (i = 0; i< cartItemNames?.length ; i++){
            if(cartItemNames[i].innerText == title){
                alert('This item already has added to the cart!');
                return
            }
        }
    }
    else{
        localStorage.setItem('cartItemNames', `

        <td class="cart-item cart-column">
            <img class="cart-item-image" src="${imageSrc}" width="50" height="50">
            <span class="cart-item-title">${title}</span>                  
        </td>
        <td class="cart-item cart-column">
            <span class="cart-price cart-column">${price}</span>
        </td>
        <td class="cart-item cart-column">
            <input class="cart-quantity-input" type="number" value="1" style="width: 50px">
            <button class="btn btn-danger" type="button">Remove</button>
        </td>        
    `)
    }

    var cartRowContents = `

        <td class="cart-item cart-column">
            <img class="cart-item-image" src="${imageSrc}" width="50" height="50">
            <span class="cart-item-title">${title}</span>                  
        </td>
        <td class="cart-item cart-column">
            <span class="cart-price cart-column">${price}</span>
        </td>
        <td class="cart-item cart-column">
            <input class="cart-quantity-input" type="number" value="1" style="width: 50px">
            <button class="btn btn-danger" type="button">Remove</button>
        </td>        
    `;
     
            
    cartRow.innerHTML = cartRowContents;
    cartItems.append(cartRow);
    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem);
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged)
}


function updateCartTotal(){
    var cartItemContainer = document.getElementsByClassName('cart-items')[0];
    var cartRows = cartItemContainer.getElementsByClassName('cart-row');
    var total = 0;
    for (var i = 0 ; i< cartRows.length ; i++){
        var cartRow =cartRows[i];
        var priceElement = cartRow.getElementsByClassName('cart-price')[0];
        var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0];
        var price = parseFloat(priceElement.innerText.replace('Rs ' , ''))
        var quantity = quantityElement.value;
        total = total + (price * quantity);
         
    }
    total = Math.round(total * 100 )/100;
    document.getElementsByClassName('cart-total-price')[0].innerText = 'Rs '+ total + '.00';
 
}