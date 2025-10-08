  function toggleDropdown() {
    const dropdown = document.getElementById('moreDropdown');
    if (dropdown.style.display === 'flex') {
      dropdown.style.display = 'none';
    } else {
      dropdown.style.display = 'flex';
    }
  }