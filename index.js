
let item = {
    price: 125,
    quantity:0
}

const [plus, minus] = [document.getElementById('plus'), document.getElementById('minus')];
const addToCart = document.getElementById('add-to-cart');
const cartContent = document.querySelector('.cart-icon');
const count = document.querySelector('.count');

const body = document.getElementById('body');

const cart_container = document.createElement('div');
cart_container.classList.add('cart-container');
cart_container.classList.add('hidden');


const productImages = [
     "./images/image-product-1.jpg",
     "./images/image-product-2.jpg",
     "./images/image-product-3.jpg",
     "./images/image-product-4.jpg"
];

const activeImage = document.querySelector('.displayed-image');

const imageChoices = document.querySelectorAll('.thumbnail-container');

let isActive = false;
let isOpen = false;

for(let i = 0; i < 4; i++){
    imageChoices[i].addEventListener('click',(element) =>{
        activeImage.removeAttribute('src');
        activeImage.setAttribute("src",productImages[i]);
        imageChoices.forEach((e)=> e.classList.remove('active-image-selected'));
        imageChoices[i].classList.add('active-image-selected');
        isActive = true;
    });
}


plus.addEventListener('click' ,()=>{
   updateQuantity("plus");
   updateCountUI();
});

minus.addEventListener('click' ,()=>{
   updateQuantity("minus");
   updateCountUI();
});

addToCart.addEventListener('click', ()=>{
    cart_container.classList.remove('hidden');
    isOpen = true;
    renderCart();
});

cartContent.addEventListener('click', ()=>{
    if(isOpen) {
        cart_container.classList.add('hidden');
        isOpen = false ;
    } else {
        cart_container.classList.remove('hidden');
        isOpen = true;
    }
});

function updateQuantity(action){
     switch (action){
        case "plus":
             item.quantity++;
        break;
        case "minus":
            if(   item.quantity === 0)
                return 
               item.quantity--;
        case "delete":
               item.quantity = 0;           
     }
}

function updateCountUI(){
    count.innerHTML = `${item.quantity}`;
}

function renderCart(){

    const cart_title = document.createElement('h3');
    cart_title.innerText = 'Cart'
    cart_title.classList.add('cart-title');

    const cart_border = document.createElement('div');
    cart_border.classList.add('cart-border');

    if(item.quantity === 0){
        const empty_cart = document.createElement('p');
        empty_cart.classList.add('empty-cart-message');
        empty_cart.innerText = `Your Cart is empty`;
        cart_container.append(cart_title, cart_border, empty_cart);
        cartContent.parentElement.parentElement.append(cart_container)
        return;
    }

    cart_container.innerHTML = "";

    const item_details = document.createElement('div');
    item_details.classList.add('item-details');
    item_details.innerHTML = `<img src="./images/image-product-1-thumbnail.jpg" alt="" class="image-thumbnail">
                              <div>
                                  <div class = 'item_name'>Fall Limited Edition Sneakers</div>
                                  <div><span class = 'item-price-quantity'>$${item.price} x ${item.quantity}</span>
                                       <span class = 'item-total'>$${item.price * item.quantity}</span>
                                  </div>
                              </div> `;

    const deleteBtn = document.createElement('img');
    deleteBtn.setAttribute('src','./images/icon-delete.svg'); 
    deleteBtn.classList.add('deleteBtn');
    deleteBtn.addEventListener('click',()=>{
        updateQuantity("delete");
        updateCountUI();
        cart_container.classList.add('hidden');
        cart_container.innerHTML = "";
        isOpen = false;
        renderCart();
    });  
    item_details.appendChild(deleteBtn);                        

    const checkout = document.createElement('button');
    checkout.classList.add('checkout');
    checkout.innerText = "Checkout";
     
    cart_container.append(cart_title, cart_border, item_details, checkout);
    cartContent.parentElement.parentElement.append(cart_container);

}

renderCart();
