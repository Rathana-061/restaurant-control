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
if (categoryFilter) {
  categoryFilter.addEventListener("change", () => {
    const value = categoryFilter.value;
    let maxItems = 0;

    if (value === "all") {
      maxItems = products.length;
    } else {
      maxItems = parseInt(value);
    }

    products.forEach((card, index) => {
      card.style.display = index < maxItems ? "block" : "none";
    });
  });
}

// --- Sorting function ---
if (sortSelect) {
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

    // Update container
    productContainer.innerHTML = "";
    sortedProducts.forEach((card) => productContainer.appendChild(card));
  });
}

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
  if (!moreButton && dropdown && !dropdown.contains(e.target)) {
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

// ======= PAGINATION =======
document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll('.card');
  const pagination = document.querySelector(".pagination");

  const itemsPerPage = 8;
  const totalPages = Math.ceil(cards.length / itemsPerPage);
  let currentPage = 1;

  function showPage(page) {
    cards.forEach(card => (card.style.display = 'none'));
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    for (let i = start; i < end && i < cards.length; i++) {
      cards[i].style.display = 'block';
    }
  }

  function renderPagination() {
    if (!pagination) return;
    pagination.innerHTML = "";

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

    // Add next arrow
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

  showPage(currentPage);
  renderPagination();
});
// ✅ FINAL ADD TO CART (only this one should remain)
document.addEventListener("DOMContentLoaded", () => {
  const addButtons = document.querySelectorAll(".add-cart");

  addButtons.forEach(button => {
    button.addEventListener("click", e => {
      e.preventDefault();

      const card = e.target.closest(".card");
      if (!card) return;

      const name = card.querySelector("h3").innerText;
      const priceText = card.querySelector(".new-price").innerText;
      const image = card.querySelector("img").src;

      // Convert price to number
      const price = parseFloat(priceText.replace(/[^0-9.]/g, "")) || 0;

      // Get existing cart from localStorage
      let cart = JSON.parse(localStorage.getItem("cart")) || [];

      // Check if product already exists
      const existing = cart.find(item => item.name === name);
      if (existing) {
        existing.quantity++;
      } else {
        cart.push({ name, price, image, quantity: 1 });
      }

      // Save back to localStorage
      localStorage.setItem("cart", JSON.stringify(cart));

      // Show success alert
      alert("✅ Added to cart successfully!");

      // Redirect to cart page
      window.location.href = "cart.html";
    });
  });
});
