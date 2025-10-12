
// Add to Cart functionality
const addCartButtons = document.querySelectorAll('.add-cart');
const productContainer = document.getElementById('productContainer');
const cartPage = document.getElementById('cartPage');
const cartItems = document.getElementById('cartItems');
const continueShopping = document.getElementById('continueShopping');

addCartButtons.forEach(button => {
    button.addEventListener('click', e => {
        e.preventDefault();

        // Get product details from card
        const card = e.target.closest('.card');
        const productName = card.querySelector('h3').innerText;
        const productPrice = card.querySelector('.new-price').innerText;
        const productImg = card.querySelector('img').src;

        // Hide products, show cart
        productContainer.style.display = 'none';
        cartPage.style.display = 'block';

        // Add product to cart table
        cartItems.innerHTML = `
        <tr>
          <td><img src="${productImg}" width="50"> ${productName}</td>
          <td>${productPrice}</td>
          <td>1</td>
          <td>${productPrice}</td>
        </tr>
      `;
    });
});

// Continue shopping button
continueShopping.addEventListener('click', () => {
    cartPage.style.display = 'none';
    productContainer.style.display = 'grid';
});

document.querySelectorAll('.add-cart').forEach(button => {
    button.addEventListener('click', e => {
        e.preventDefault();
        const card = e.target.closest('.card');
        const name = card.querySelector('h3').innerText;
        const price = card.querySelector('.new-price').innerText;
        const image = card.querySelector('img').src;

        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        const existing = cart.find(item => item.name === name);
        if (existing) existing.quantity++;
        else cart.push({ name, price, image, quantity: 1 });

        localStorage.setItem('cart', JSON.stringify(cart));
        alert('✅ Added to cart successfully!');
        window.location.href = "cart.html";
    });
});


document.addEventListener("DOMContentLoaded", () => {
    const cartBody = document.getElementById("cartBody");
    const subtotalEl = document.getElementById("subtotal");
    const totalEl = document.getElementById("total");
    const freeShipEl = document.getElementById("freeShip");
    const progressFill = document.getElementById("progressFill");
    const continueShoppingBtn = document.getElementById("continueShopping");
    const checkoutBtn = document.getElementById("checkoutBtn");

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    function renderCart() {
        cartBody.innerHTML = "";
        let subtotal = 0;

        if (cart.length === 0) {
            cartBody.innerHTML = `
        <tr>
          <td colspan="5" style="text-align:center; padding:20px;">
            🛒 Your cart is empty. <a href="/order.html" style="color:green;">Go shop now!</a>
          </td>
        </tr>`;
            subtotalEl.textContent = "0.00";
            totalEl.textContent = "0.00";
            freeShipEl.textContent = "1000.00";
            progressFill.style.width = "0%";
            return;
        }

        cart.forEach((item, index) => {
            const price = parseFloat(item.price) || 0;
            const sub = price * item.quantity;
            subtotal += sub;

            const tr = document.createElement("tr");
            tr.innerHTML = `
        <td><button class="remove" data-index="${index}">✖</button></td>
        <td class="product-cell">
          <img src="${item.image}" alt="${item.name}" style="width:50px;height:50px;border-radius:8px;margin-right:8px;">
          <div>
            <strong>${item.name}</strong><br>
            <small>RSSLVP_${index + 100}</small>
          </div>
        </td>
        <td>$${price.toFixed(2)}</td>
        <td>
          <button class="qty minus" data-index="${index}">−</button>
          <span class="item-qty">${item.quantity}</span>
          <button class="qty plus" data-index="${index}">+</button>
        </td>
        <td class="item-subtotal">$${sub.toFixed(2)}</td>
      `;
            cartBody.appendChild(tr);
        });

        // Totals
        subtotalEl.textContent = subtotal.toFixed(2);
        totalEl.textContent = subtotal.toFixed(2);

        const freeLeft = Math.max(1000 - subtotal, 0);
        freeShipEl.textContent = freeLeft.toFixed(2);
        progressFill.style.width = `${Math.min((subtotal / 1000) * 100, 100)}%`;

        // Save to storage
        localStorage.setItem("cart", JSON.stringify(cart));

        // Rebind controls
        bindButtons();
    }

    function bindButtons() {
        document.querySelectorAll(".qty.plus").forEach(btn => {
            btn.addEventListener("click", () => {
                const index = btn.dataset.index;
                cart[index].quantity++;
                renderCart();
            });
        });

        document.querySelectorAll(".qty.minus").forEach(btn => {
            btn.addEventListener("click", () => {
                const index = btn.dataset.index;
                if (cart[index].quantity > 1) cart[index].quantity--;
                renderCart();
            });
        });

        document.querySelectorAll(".remove").forEach(btn => {
            btn.addEventListener("click", () => {
                const index = btn.dataset.index;
                cart.splice(index, 1);
                renderCart();
            });
        });
    }

    continueShoppingBtn.addEventListener("click", () => {
        window.location.href = "/order.html";
    });
    document.getElementById("continueShopping").addEventListener("click", () => {
        // Redirect to the order/product page
        window.location.href = "order.html"; // change path if your page is named differently
    });

    checkoutBtn.addEventListener("click", () => {
        alert("Proceeding to checkout page...");
    });

    renderCart();
});

document.getElementById("checkoutBtn").addEventListener("click", () => {
    window.location.href = "checkout.html";
});

