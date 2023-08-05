import { cart } from '../data/cart.js'
import { products } from '../data/products.js'

let productsHTML = '';

products.forEach(product => {
  productsHTML += `<div class="product-container">
    <div class="product-image-container">
      <img
        class="product-image"
        src="${product.image}"
      />
    </div>

    <div class="product-name limit-text-to-2-lines">
      ${product.name}
    </div>

    <div class="product-rating-container">
      <img
        class="product-rating-stars"
        src="images/ratings/rating-${product.rating.stars * 10}.png"
      />
      <div class="product-rating-count link-primary">${product.rating.count}</div>
    </div>

    <div class="product-price">$${(product.priceCents / 100).toFixed(2)}</div>

    <div class="product-quantity-container">
      <select class="qty">
        <option selected value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
        <option value="7">7</option>
        <option value="8">8</option>
        <option value="9">9</option>
        <option value="10">10</option>
      </select>
    </div>

    <div class="product-spacer"></div>

    <div class="added-to-cart">
      <img src="images/icons/checkmark.png" />
      Added
    </div>

    <button class="add-to-cart-button button-primary AddToCartBtn" data-product-id="${product.id}">Add to Cart</button>
  </div>`
})

//! RENDERING ALL THE PRODUCTS
document.querySelector('.js-products').innerHTML = productsHTML;


const addToCartBtn = document.querySelectorAll('.AddToCartBtn');

addToCartBtn.forEach((button) => {
  button.addEventListener('click', (e) => {
    const productId = button.dataset.productId;
    const qty = parseInt(button.parentElement.querySelector('select').value);

    // let cartQuantity = parseInt(document.querySelector('.cart-quantity').textContent);

    //! Updating the cart
    let matchingItem;
    cart.forEach((item) => {
      if (item.productId === productId)
        matchingItem = item;
    })

    if (matchingItem) {
      matchingItem.quantity += qty;
    }
    else {
      cart.push({
        productId: productId,
        quantity: qty
      })
    }

    //! UPDATING THE CART VALUE
    document.querySelector('.cart-quantity').textContent = cart.length;

    console.log(cart);
    //! ADDED TO CART NOTIFICATION
    let t;
    const btn = e.target.parentElement;
    const isVisible = btn.querySelector(".added-to-cart").classList.contains("visible");
    if (isVisible) {
      console.log('check passed');
      remove();
    }
    else {
      showNotification();
    }

    function remove() {
      clearTimeout(t);
      btn.querySelector(".added-to-cart").classList.remove("visible");
      showNotification();
    }

    function showNotification() {
      btn.querySelector(".added-to-cart").classList.add('visible');
      t = setTimeout(() => {
        btn.querySelector(".added-to-cart").classList.remove('visible');
      }, 3000);
    }
  })
})