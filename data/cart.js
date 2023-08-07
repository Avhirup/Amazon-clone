export let cart = [
    { productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d', quantity: 1 },
    { productId: 'a82c6bac-3067-4e68-a5ba-d827ac0be010', quantity: 1 }
];

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
}


//! FUNCTION TO DELETE A PRODUCT FROM THE CART
export function removeFromCart(productId) {
    const newCart = cart.filter((product) => {
        if (product.productId !== productId) {
            return product;
        }
    });
    cart = newCart;
}