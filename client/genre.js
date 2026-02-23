document.addEventListener("DOMContentLoaded", ( )=> {
    const grid = document.getElementById("genreGrid");
    if (!grid) return;

    const genres = ["Sci-Fi", "Thriller", "Action", "Romance", "Comedy", "Horror", "Mystery", "Fantasy","Adventure", "Crime", "Documentary", 
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
