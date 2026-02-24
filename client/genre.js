document.addEventListener("DOMContentLoaded", () => {
    const grid = document.getElementById("genreGrid");
    if (!grid) return;

    const genres = ["Sci-Fi", "Thriller", "Action", "Romance", "Comedy", "Horror", "Mystery", "Fantasy", "Adventure", "Crime", "Documentary",
        "Biography", "Supernatural", "Coming-of-Age", "Animation", "War", "Family", "Music", "Slice of Life", "Historical Drama",
        "Psychological Thriller", "Action", "Fantasy", "Mystery", "Drama", "Horror", "Thriller", "Romantic Comedy"]; // queryFiltering by genre (fetch)

    genres.sort();

    for (const genre of genres) {
        const div = document.createElement("button");
        div.className = "genre-item";
        div.textContent = genre;
        grid.appendChild(div);
    }
});

document.addEventListener("DOMContentLoaded", () => {
    const menuBtn = document.querySelector(".menu-btn");
    const menuDropdown = document.getElementById("menuDropdown");
    if (!menuBtn || !menuDropdown) return;

    // Populate menu dropdown exactly like on index
    menuDropdown.innerHTML = "";

    const items = [
        { label: "Genres", href: "genre.html" },
        { label: "About", href: "about.html" },
    ];

    for (const item of items) {
        const row = document.createElement("div");
        row.className = "dropdown-item";
        row.textContent = item.label;

        row.addEventListener("click", () => {
            window.location.href = item.href;
        });

        menuDropdown.appendChild(row);
    }

    // Start hidden
    menuDropdown.style.display = "none";

    // Toggle on button click
    menuBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        menuDropdown.style.display =
            menuDropdown.style.display === "block" ? "none" : "block";
    });

    // Prevent dropdown clicks from closing it
    menuDropdown.addEventListener("click", (e) => e.stopPropagation());

    // Close on outside click
    document.addEventListener("click", (e) => {
        const inside = menuDropdown.contains(e.target) || menuBtn.contains(e.target);
        if (!inside) menuDropdown.style.display = "none";
    });

    // Close on Escape
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") menuDropdown.style.display = "none";
    });
});