export let cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];


//! TO SAVE THE CART INTO LOCAL-STORAGE
function saveToStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

//! FUNCTION TO ADD A PRODUCT TO THE CART
export function addToCart(productId, qty) {
    //? Updating the cart
    let matchingItem;
    cart.forEach((item) => {
        if (item.productId === productId) matchingItem = item;
    });

    if (matchingItem) {
        matchingItem.quantity += qty;
    } else {
        cart.push({
            productId: productId,
            quantity: qty,
        });
    }

    saveToStorage();
}


//! FUNCTION TO DELETE A PRODUCT FROM THE CART
export function removeFromCart(productId) {
    const newCart = cart.filter((product) => {
        if (product.productId !== productId) {
            return product;
        }
    });
    cart = newCart;
    saveToStorage();
}