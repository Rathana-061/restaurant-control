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
