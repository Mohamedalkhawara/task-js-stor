document.addEventListener('DOMContentLoaded', () => {
    const products = [
        { id: 1, name: 'iPhone 13 Pro', price: 900, img: 'iphon.png' },
        { id: 2, name: 'Headset', price: 150, img: 'headset.png' },
        { id: 3, name: 'Keyboard', price: 60, img: 'kay.png' }
    ];

    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    const productsContainer = document.querySelector('.products');
    const cartContainer = document.querySelector('.cart-items');
    const totalAmount = document.querySelector('.total-amount');

    function renderProducts() {
        products.forEach(product => {
            const productElement = document.createElement('div');
            productElement.className = 'product';
            productElement.dataset.id = product.id;
            productElement.innerHTML = `
                <img src="${product.img}" alt="${product.name}">
                <p>${product.name}</p>
                <p>${product.price}jd</p>
                <button class="add-to-cart">Add to cart</button>
            `;
            productsContainer.appendChild(productElement);
        });
    }

    function renderCart() {
        cartContainer.innerHTML = '';
        cart.forEach(item => {
            const product = products.find(p => p.id === item.id);
            const cartItemElement = document.createElement('div');
            cartItemElement.className = 'cart-item';
            cartItemElement.dataset.id = item.id;
            cartItemElement.innerHTML = `
                <img src="${product.img}" alt="${product.name}">
                <p>${product.name}</p>
                <div class="item-control">
                    <button class="decrease">-</button>
                    <span class="quantity">${item.quantity}</span>
                    <button class="increase">+</button>
                </div>
                <p>${product.price * item.quantity}jd</p>
                <button class="remove-from-cart">Remove</button>
            `;
            cartContainer.appendChild(cartItemElement);
        });
        totalAmount.textContent = cart.reduce((acc, item) => acc + item.quantity * products.find(p => p.id === item.id).price, 0);
    }

    function updateCart() {
        localStorage.setItem('cart', JSON.stringify(cart));
        renderCart();
    }

    productsContainer.addEventListener('click', (event) => {
        if (event.target.classList.contains('add-to-cart')) {
            const productId = parseInt(event.target.closest('.product').dataset.id);
            const cartItem = cart.find(item => item.id === productId);
            if (cartItem) {
                cartItem.quantity++;
            } else {
                cart.push({ id: productId, quantity: 1 });
            }
            updateCart();
        }
    });

    cartContainer.addEventListener('click', (event) => {
        const productId = parseInt(event.target.closest('.cart-item').dataset.id);
        const cartItem = cart.find(item => item.id === productId);

        if (event.target.classList.contains('remove-from-cart')) {
            cart = cart.filter(item => item.id !== productId);
        } else if (event.target.classList.contains('decrease')) {
            if (cartItem.quantity > 1) {
                cartItem.quantity--;
            } else {
                cart = cart.filter(item => item.id !== productId);
            }
        } else if (event.target.classList.contains('increase')) {
            cartItem.quantity++;
        }
        updateCart();
    });

    document.querySelector('.save-cart').addEventListener('click', () => {
        sessionStorage.setItem('cart', JSON.stringify(cart));
    });

    renderProducts();
    renderCart();
});
