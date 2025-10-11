// ======= Dropdown (More ▼) =======
function toggleDropdown() {
  const dropdown = document.getElementById("moreDropdown");
  dropdown.style.display = dropdown.style.display === "flex" ? "none" : "flex";
}

// ======= Product Filtering & Sorting =======
const categoryFilter = document.getElementById("categoryFilter");
const sortSelect = document.getElementById("sortSelect");
const productContainer = document.getElementById("productContainer");

// Convert HTMLCollection to Array
let products = Array.from(productContainer.getElementsByClassName("card"));

// --- Filter by number of products ---
categoryFilter.addEventListener("change", () => {
  const value = categoryFilter.value;
  let maxItems = 0;

  if (value === "all") {
    maxItems = products.length;
  } else {
    // Extract number (e.g. "8Products" → 8)
    maxItems = parseInt(value);
  }

  products.forEach((card, index) => {
    card.style.display = index < maxItems ? "block" : "none";
  });
});

// --- Sorting function ---
sortSelect.addEventListener("change", () => {
  const value = sortSelect.value;
  let sortedProducts = [...products];

  if (value === "priceAsc") {
    sortedProducts.sort((a, b) => getPrice(a) - getPrice(b));
  } else if (value === "priceDesc") {
    sortedProducts.sort((a, b) => getPrice(b) - getPrice(a));
  } else if (value === "nameAsc") {
    sortedProducts.sort((a, b) =>
      getName(a).localeCompare(getName(b))
    );
  } else if (value === "nameDesc") {
    sortedProducts.sort((a, b) =>
      getName(b).localeCompare(getName(a))
    );
  }

  // Update the product container
  productContainer.innerHTML = "";
  sortedProducts.forEach((card) => productContainer.appendChild(card));
});

// --- Helper Functions ---
function getPrice(card) {
  const priceText = card.querySelector(".new-price").textContent.replace("$", "");
  return parseFloat(priceText);
}

function getName(card) {
  return card.querySelector("h3").textContent.trim();
}

// ======= Close dropdown if click outside =======
document.addEventListener("click", (e) => {
  const dropdown = document.getElementById("moreDropdown");
  const moreButton = e.target.closest("a[href='javascript:void(0)']");
  if (!moreButton && !dropdown.contains(e.target)) {
    dropdown.style.display = "none";
  }
});


// ======= SEARCH FUNCTION =======
const searchInput = document.getElementById("searchInput");
const productCards = productContainer.getElementsByClassName("card");

if (searchInput) {
  searchInput.addEventListener("keyup", function () {
    const query = this.value.toLowerCase().trim();

    Array.from(productCards).forEach(card => {
      const name = card.querySelector("h3").textContent.toLowerCase();
      const category = card.querySelector("p").textContent.toLowerCase();

      if (name.includes(query) || category.includes(query)) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });
  });
}


// ===== Pagination with styled buttons =====
document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll('.card');
  const pagination = document.querySelector(".pagination");

  const itemsPerPage = 8; // show 8 products per page
  const totalPages = Math.ceil(cards.length / itemsPerPage);
  let currentPage = 1;

  // Function to show cards by page
  function showPage(page) {
    cards.forEach(card => (card.style.display = 'none'));

    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    for (let i = start; i < end && i < cards.length; i++) {
      cards[i].style.display = 'block';
    }
  }

  // Function to render pagination UI
  function renderPagination() {
    pagination.innerHTML = ""; // clear old buttons

    // Create numbered buttons
    for (let i = 1; i <= totalPages; i++) {
      const btn = document.createElement("button");
      btn.textContent = i;
      btn.classList.add("page-btn");
      if (i === currentPage) btn.classList.add("active");

      btn.addEventListener("click", () => {
        currentPage = i;
        showPage(currentPage);
        renderPagination();
      });

      pagination.appendChild(btn);
    }

    // Add arrow button →
    const next = document.createElement("button");
    next.innerHTML = "→";
    next.classList.add("page-btn");

    next.addEventListener("click", () => {
      if (currentPage < totalPages) {
        currentPage++;
        showPage(currentPage);
        renderPagination();
      }
    });

    pagination.appendChild(next);
  }

  // Initialize
  showPage(currentPage);
  renderPagination();
});


// ======= ADD TO CART =======
document.addEventListener("DOMContentLoaded", () => {
  const addCartButtons = document.querySelectorAll(".add-cart");

  addCartButtons.forEach(button => {
    button.addEventListener("click", (event) => {
      event.preventDefault();

      const card = button.closest(".card");
      const name = card.querySelector("h3").textContent;
      const price = card.querySelector(".new-price").textContent;
      const image = card.querySelector("img").src;

      const product = { name, price, image };

      // Save to localStorage
      let cart = JSON.parse(localStorage.getItem("cart")) || [];
      cart.push(product);
      localStorage.setItem("cart", JSON.stringify(cart));

      // Show success alert
      alert("✅ Added successfully!");

      // Redirect to cart page
      window.location.href = "cart.html";
    });
  });
});



document.addEventListener("DOMContentLoaded", () => {
  const addCartButtons = document.querySelectorAll(".add-cart");

  addCartButtons.forEach(button => {
    button.addEventListener("click", event => {
      event.preventDefault();

      const card = button.closest(".card");
      const name = card.querySelector("h3").textContent;
      const price = card.querySelector(".new-price").textContent.replace('$', '');
      const image = card.querySelector("img").src;

      // Create product object
      const product = { name, price, image, quantity: 1 };

      // Get existing cart from localStorage
      let cart = JSON.parse(localStorage.getItem("cart")) || [];

      // Check if product already exists
      const existing = cart.find(item => item.name === name);
      if (existing) {
        existing.quantity += 1;
      } else {
        cart.push(product);
      }

      // Save back to localStorage
      localStorage.setItem("cart", JSON.stringify(cart));

      // Alert success
      alert("✅ Added successfully!");

      // Redirect to cart page
      window.location.href = "cart.html";
    });
  });
});




