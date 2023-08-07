import { cart, removeFromCart } from '../data/cart.js';
import { products } from '../data/products.js';

let cartHTML = '';
cart.forEach((cartItem) => {
  const productId = cartItem.productId;
  const productQty = cartItem.quantity;

  let matchingProduct;

  products.forEach((product) => {
    if (productId === product.id) {
      matchingProduct = product;
    }
  });

  cartHTML += `<div class="cart-item-container cart-item-${matchingProduct.id}">
  <div class="delivery-date">Delivery date: <span class="change-date">Wednesday, June 15</span></div>

  <div class="cart-item-details-grid">
    <img
      class="product-image"
      src="${matchingProduct.image}"
    />

    <div class="cart-item-details">
      <div class="product-name">${matchingProduct.name}</div>
      <div class="product-price">$${(matchingProduct.priceCents / 100).toFixed(2)}</div>
      <div class="product-quantity">
        <span> Quantity: <span class="quantity-label">${productQty}</span> </span>
        <span class="update-quantity-link link-primary">
          Update
        </span>
        <span class="delete-quantity-link del-qty-link link-primary" data-product-id="${matchingProduct.id}">
          Delete
        </span>
      </div>
    </div>

    <div class="delivery-options">
      <div class="delivery-options-title">
        Choose a delivery option:
      </div>

      <div class="delivery-option">
        <input
          type="radio"
          class="delivery-option-input"
          name="${matchingProduct.id}"
        />
        <div>
          <div class="delivery-option-date">Tuesday, June 21</div>
          <div class="delivery-option-price">FREE Shipping</div>
        </div>
      </div>
      <div class="delivery-option">
        <input
          type="radio"
          checked
          class="delivery-option-input"
          name="${matchingProduct.id}"
        />
        <div>
          <div class="delivery-option-date">Wednesday, June 15</div>
          <div class="delivery-option-price">FREE Shipping</div>
        </div>
      </div>
      <div class="delivery-option">
        <input
          type="radio"
          class="delivery-option-input"
          name="${matchingProduct.id}"
        />
        <div>
          <div class="delivery-option-date">Monday, June 13</div>
          <div class="delivery-option-price">FREE Shipping</div>
        </div>
      </div>
    </div>
  </div>
</div>`;
});

//! RENDERING THE CART INTO THE DOM
document.querySelector('.order-summary').innerHTML += cartHTML;


//! EVENT LISTENER TO DELETE BUTTON
document.querySelectorAll('.del-qty-link').forEach((link) => {
  link.addEventListener('click', () => {
    const productId = link.dataset.productId;
    removeFromCart(productId);
    document.querySelector(`.cart-item-${productId}`).remove();
    checkOrderSummary();
  })
});

//! CORRECTING ORDER SUMMARY 
function checkOrderSummary() {
  document.querySelector('.no-of-order').textContent = cart.length;
  const bill = totalItemsCost();
  document.querySelectorAll('.total-bill').forEach((elem) => elem.textContent = bill)
  const tax = estimatedTax();
  document.querySelector('.total-tax').textContent = tax;
  const orderTotal = (parseFloat(bill) + parseFloat(tax)).toFixed(2);
  document.querySelector('.order-total').textContent = orderTotal;
}

checkOrderSummary();

function totalItemsCost() {
  let bill = 0;
  cart.forEach((cartItem) => {
    const productId = cartItem.productId;
    const productQty = cartItem.quantity;
    products.forEach((product) => {
      if (product.id === productId) {
        bill += (productQty * product.priceCents);
      }
    })
  })
  return (bill / 100).toFixed(2);
}

function estimatedTax() {
  const totalItems = totalItemsCost();
  let tax = (totalItems * (10 / 100)).toFixed(2);
  return tax;
}

//!UPDATEING THE DELIVERY DATE
document.querySelectorAll('.delivery-option-input').forEach((input) => {
  input.addEventListener('click', () => {
    const nextDiv = input.nextElementSibling;
    document.querySelector(`.cart-item-${input.name}`).querySelector('.change-date').textContent = nextDiv.querySelector('.delivery-option-date').textContent;
  })
})