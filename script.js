let cart = [];

function addToCart(button) {
    const product = button.parentElement;
    const name = product.getAttribute('data-name');
    const price = parseFloat(product.getAttribute('data-price'));

    const item = cart.find(item => item.name === name);

    if (item) {
        item.quantity++;
    } else {
        cart.push({ name: name, price: price, quantity: 1 });
    }

    updateCart();
}

function updateCart() {
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');

    cartItems.innerHTML = '';
    let total = 0;

    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;

        const li = document.createElement('li');
        li.textContent = `${item.name} - $${item.price} x ${item.quantity} = $${itemTotal.toFixed(2)}`;
       
        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.onclick = () => removeFromCart(item.name);
        removeBtn.style.marginLeft = '10px';

        li.appendChild(removeBtn);
        cartItems.appendChild(li);
    });

    if (cart.length === 0) {
        cartItems.innerHTML = '<li>Your cart is empty</li>';
    }

    cartTotal.textContent = `Total: $${total.toFixed(2)}`;
}

function removeFromCart(name) {
    const itemIndex = cart.findIndex(item => item.name === name);

    if (itemIndex > -1) {
        cart[itemIndex].quantity--;

        if (cart[itemIndex].quantity === 0) {
            cart.splice(itemIndex, 1);
        }

        updateCart();
    }
}

function checkout() {
    if (cart.length === 0) {
        alert('Your cart is empty.');
    } else {
        alert('Thank you for your purchase!');
        cart = [];
        updateCart();
    }
}