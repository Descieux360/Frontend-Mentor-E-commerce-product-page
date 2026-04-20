
let item = {
    price: 125,
    quantity:0
}

const [plus, minus] = [document.getElementById('plus'), document.getElementById('minus')];
const addToCart = document.getElementById('add-to-cart');
const cartContent = document.querySelector('.cart-icon');
const count = document.querySelector('.count');

const body = document.getElementById('body');


const productImages = [
     "./images/image-product-1.jpg",
     "./images/image-product-2.jpg",
     "./images/image-product-3.jpg",
     "./images/image-product-4.jpg"
];

const activeImage = document.querySelector('.displayed-image');

const imageChoices = document.querySelectorAll('.thumbnail-container');

let isActive = false;

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
   item.quantity++;
   count.innerHTML = `${item.quantity}`;
});

minus.addEventListener('click' ,()=>{
    if(item.quantity === 0)
        return;
   item.quantity--;
   count.innerHTML = `${item.quantity}`;
});

addToCart.addEventListener('click', renderCart);

cartContent.addEventListener('click', renderCart());

function renderCart(){
    
    if(item.quantity === 0)
         return;

    const cart_container = document.createElement('div');
    cart_container.classList.add('cart-container');

    const cart_title = document.createElement('h3');
    cart_title.innerText = 'Cart'
    cart_title.classList.add('cart-title');

    const cart_border = document.createElement('div');
    cart_border.classList.add('cart-border');

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
        item.quantity = 0;
        count.innerText = 0;
        cart_container.remove();
    });
    console.log(deleteBtn);  
    item_details.appendChild(deleteBtn);                        

    const checkout = document.createElement('button');
    checkout.classList.add('checkout');
    checkout.innerText = "Checkout";
     
    cart_container.append(cart_title, cart_border, item_details, checkout);
    cartContent.parentElement.parentElement.append(cart_container);

}


    window.addEventListener('click', (e)=>{
        const target =  e.target;
        if(target == document.querySelector('add-to-cart'))
            return;
           document.querySelector('cart-container').remove();
           isOpen = false;
    })
