let item = {
    price: 125,
    quantity:0
}

const [plus, minus] = [document.getElementById('plus'), document.getElementById('minus')];

const [next, previous] = [document.getElementById('next'), document.getElementById('previous')];
const menu = document.getElementById('menu');
const closeBtn = document.getElementById('close');

const addToCart = document.getElementById('add-to-cart');
const cartContent = document.querySelector('.cart-icon');
const count = document.querySelector('.count');
const notificationQuantity = document.querySelector('.notification-quantity');

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
function preloadAndSwap(index){
    // keep layout stable (dimensions set in HTML/CSS) and show a subtle placeholder
    activeImage.classList.add('image-loading');
    const img = new Image();
    img.src = productImages[index];
    img.onload = ()=>{
        activeImage.src = productImages[index];
        activeImage.classList.remove('image-loading');
    }
    img.onerror = ()=>{
        // on error, still remove loading state
        activeImage.classList.remove('image-loading');
    }
}

let activeImageMobile = 0;

document.body.addEventListener('click', (event) => {
    const target = event.target;

    const thumbnail = target.closest('.thumbnail-container');
    if (thumbnail) {
        // Find index of clicked thumbnail matching your original array format
        const index = Array.from(imageChoices).indexOf(thumbnail);
        if (index !== -1) {
            preloadAndSwap(index);
            imageChoices.forEach((e) => e.classList.remove('active-image-selected'));
            thumbnail.classList.add('active-image-selected');
            isActive = true;
        }
        return; 
    }

    if (target.closest('#next')) {
        if(activeImageMobile >= 0 && activeImageMobile < productImages.length){
            if(activeImageMobile === productImages.length - 1) {
                activeImageMobile = 0;
                preloadAndSwap(activeImageMobile);
                return;
            }
            activeImageMobile++;
            preloadAndSwap(activeImageMobile);
        } 
        return;
    }

    if (target.closest('#previous')) {
        if(activeImageMobile >= 0 && activeImageMobile < productImages.length){
            if(activeImageMobile === 0) {
                activeImageMobile = productImages.length - 1;
                preloadAndSwap(activeImageMobile);
                return;
            }
            activeImageMobile--;
            preloadAndSwap(activeImageMobile);
        }  
        return;
    }

    if (target.closest('#menu')) {
        document.querySelector('.hamburger-menu').classList.remove('hidden');
        return;
    }

    if (target.closest('#close')) {
        document.querySelector('.hamburger-menu').classList.add('hidden');
        return;
    }

    if (target.closest('#plus')) {
        updateQuantity("plus");
        updateCountUI();
        return;
    }

    if (target.closest('#minus')) {
        updateQuantity("minus");
        updateCountUI();
        return;
    }

    if (target.closest('#add-to-cart')) {
        if(item.quantity === 0) return;
        cart_container.classList.remove('hidden');
        isOpen = true;
        renderCart();
        return;
    }

    if (target.closest('.cart-icon')) {
        if(isOpen) {
            cart_container.classList.add('hidden');
            isOpen = false ;
        } else {
            cart_container.classList.remove('hidden');
            isOpen = true;
        }
        return;
    }

    
    if(isOpen) {
        cart_container.classList.add('hidden');
        isOpen = false ;
    } else {
        cart_container.classList.remove('hidden');
        isOpen = true;
    }
    return;

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
        break; 
        case "delete":
               item.quantity = 0;           
     }
}

function updateCountUI(){
    count.innerHTML = `${item.quantity}`;
    notificationQuantity.textContent = item.quantity;
    notificationQuantity.style.display = item.quantity > 0 ? 'flex' : 'none';
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

const width = window.innerWidth;

  if(window.innerWidth < 850 && window.innerWidth> 475){
     menu.classList.remove('hidden');
  }
  if(window.innerWidth < 475) {
     document.getElementById('navigate-images').style.display = "flex";
     next.classList.remove('hidden');
     previous.classList.remove('hidden');
     menu.classList.remove('hidden');
  }

preloadAndSwap(0);
updateCountUI();
renderCart();