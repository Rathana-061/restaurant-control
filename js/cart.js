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

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    function renderCart() {
        cartBody.innerHTML = "";
        let subtotal = 0;

        cart.forEach((item, index) => {
            const sub = item.price * item.quantity;
            subtotal += sub;

            const tr = document.createElement("tr");

            tr.innerHTML = `
                <td><button class="remove" data-index="${index}">✖</button></td>
                <td class="product-cell">
                    <img src="${item.image}" alt="${item.name}" style="width:50px;height:50px;">
                    <div>
                        <strong>${item.name}</strong><br>
                        <small>SKU: SKU_${index + 100}</small>
                    </div>
                </td>
                <td>$${item.price.toFixed(2)}</td>
                <td>
                    <button class="qty minus" data-index="${index}">−</button>
                    <span class="item-qty">${item.quantity}</span>
                    <button class="qty plus" data-index="${index}">+</button>
                </td>
                <td class="item-subtotal">$${sub.toFixed(2)}</td>
            `;

            cartBody.appendChild(tr);
        });

        subtotalEl.textContent = subtotal.toFixed(2);
        totalEl.textContent = subtotal.toFixed(2);
        freeShipEl.textContent = Math.max(1000 - subtotal, 0).toFixed(2);
        progressFill.style.width = `${Math.min(subtotal / 10, 100)}%`;

        localStorage.setItem("cart", JSON.stringify(cart));

        // Bind quantity buttons
        document.querySelectorAll(".qty.plus").forEach(btn =>
            btn.addEventListener("click", () => {
                const i = btn.dataset.index;
                cart[i].quantity++;
                renderCart();
            })
        );

        document.querySelectorAll(".qty.minus").forEach(btn =>
            btn.addEventListener("click", () => {
                const i = btn.dataset.index;
                if (cart[i].quantity > 1) cart[i].quantity--;
                renderCart();
            })
        );

        document.querySelectorAll(".remove").forEach(btn =>
            btn.addEventListener("click", () => {
                const i = btn.dataset.index;
                cart.splice(i, 1);
                renderCart();
            })
        );
    }

    document.getElementById("continueShopping").onclick = () => {
        window.location.href = "product.html";
    };

    document.getElementById("checkoutBtn").onclick = () => {
        alert("Proceeding to checkout page…");
    };

    renderCart();
});