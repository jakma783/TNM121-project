const searchInput = document.getElementById("searchInput");
const resultsDropdown = document.getElementById("resultsDropdown");

// Variable to wait for loading of search after user input
let debounceTimer = null;

const API_BASE = "http://127.0.0.1:3000";

searchInput.addEventListener("input", async () => {
    const query = searchInput.value.trim();

    clearTimeout(debounceTimer);

    debounceTimer = setTimeout(async () => {
        if(query.length < 3){
            resultsDropdown.innerHTML = "";
            resultsDropdown.style.display = "none";
            return;
        }
        try {
            const url = `${API_BASE}/search?query=${query}`;
            const response = await fetch(url);

            if(!response.ok){
                resultsDropdown.innerHTML = "";
                resultsDropdown.style.display = "none";
                return;
            }

            const results = await response.json();
            renderDropdown(results);

        } catch(err){
            console.error(err);
            resultsDropdown.innerHTML = "";
            resultsDropdown.style.display = "none";
        }
    }, 200);

});

function renderDropdown(movies){
    resultsDropdown.innerHTML = "";

    if(!movies || movies.length === 0){
        resultsDropdown.style.display = "none";
        return;
    }

    movies.forEach((movie) => {

        const item = document.createElement("div");
        item.classList.add("dropdown-item");
        
        item.textContent = `${movie.name} (${movie.year})`;

        item.addEventListener("click", () => {

            // Navigate to movie-site
            window.location.href = `movie.html?id=${movie._id}`;
        });
        resultsDropdown.appendChild(item);
    });

    resultsDropdown.style.display = "block";
}

document.addEventListener("click", (e) => {
    if(!resultsDropdown.contains(e.target) && e.target !== searchInput){
        resultsDropdown.style.display = "none";
    }
})

/* ========= Menu dropdown =========
   - Dropdown is a normal DOM element
   - Show/hide via style.display ("block"/"none")
   - Outside click closes (same as search dropdown)
   - Optional: Esc closes, ArrowUp/Down + Enter navigation
*/

function showDropdown(el) {
  if (!el) return;
  el.style.display = "block";
}

function hideDropdown(el) {
  if (!el) return;
  el.style.display = "none";
}

function clearDropdown(el) {
  if (!el) return;
  el.innerHTML = "";
}

function renderMenuDropdown(menuDropdownEl, items) {
  clearDropdown(menuDropdownEl);

  items.forEach((item) => {
    const row = document.createElement("div");
    row.className = "dropdown-item";
    row.tabIndex = 0; // enable keyboard focus
    row.textContent = item.label;

    row.addEventListener("click", () => {
      window.location.href = item.href;
    });

    row.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        window.location.href = item.href;
      }
    });

    menuDropdownEl.appendChild(row);
  });
}

function setupMenuDropdown(menuBtn, menuDropdownEl, items) {
  if (!menuBtn || !menuDropdownEl) return;

  // Start hidden (match search dropdown behavior)
  hideDropdown(menuDropdownEl);

  // Populate once (menu is static)
  renderMenuDropdown(menuDropdownEl, items);

  // Toggle open/close on button click
  menuBtn.addEventListener("click", (e) => {
    e.stopPropagation();

    const isOpen = menuDropdownEl.style.display === "block";
    if (isOpen) hideDropdown(menuDropdownEl);
    else showDropdown(menuDropdownEl);
  });

  // Prevent clicks inside dropdown from bubbling to document (so it doesn’t auto-close)
  menuDropdownEl.addEventListener("click", (e) => {
    e.stopPropagation();
  });

  // Close on outside click (same pattern as search dropdown)
  document.addEventListener("click", (e) => {
    const clickedInside =
      menuDropdownEl.contains(e.target) || menuBtn.contains(e.target);

    if (!clickedInside) hideDropdown(menuDropdownEl);
  });

  // Close on Escape
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") hideDropdown(menuDropdownEl);
  });

  // Optional keyboard navigation when open
  document.addEventListener("keydown", (e) => {
    if (menuDropdownEl.style.display !== "block") return;

    const rows = Array.from(menuDropdownEl.querySelectorAll(".dropdown-item"));
    if (rows.length === 0) return;

    const activeIndex = rows.findIndex((r) => r === document.activeElement);

    if (e.key === "ArrowDown") {
      e.preventDefault();
      const next = activeIndex < 0 ? 0 : Math.min(activeIndex + 1, rows.length - 1);
      rows[next].focus();
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();
      const prev = activeIndex < 0 ? rows.length - 1 : Math.max(activeIndex - 1, 0);
      rows[prev].focus();
    }

    if (e.key === "Enter" && activeIndex >= 0) {
      e.preventDefault();
      rows[activeIndex].click();
    }
  });
}

function initMenuDropdown() {
  const menuBtn = document.querySelector(".menu-btn");
  const menuDropdownEl = document.getElementById("menuDropdown");

  const items = [
    { label: "Genres", href: "genre.html" },
    { label: "About", href: "about.html" },
  ];

  setupMenuDropdown(menuBtn, menuDropdownEl, items);
}

document.addEventListener("DOMContentLoaded", initMenuDropdown);