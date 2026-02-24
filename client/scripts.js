const searchInput = document.getElementById("searchInput");
const resultsContainer = document.getElementById("resultsContainer");

// Variable to wait for loading of search after user input
let debounceTimer = null;

searchInput.addEventListener("input", async () => {
    const query = searchInput.value.trim();

    clearTimeout(debounceTimer);

    debounceTimer = setTimeout(async () => {
        if(query.length < 3){
            resultsContainer.innerHTML = "";
            return;
        }
        try {
            const response = await fetch('/search?query=${query}');
            const results = await response.json();

            console.log(results);
            renderResults(results);
        } catch(err){
            console.error(err);
        }
    }, 200);

});

function renderResults(movies){
    resultsContainer.innerHTML = "";

    if(!movies){
        resultsContainer.innerHTML = "<p>No results found</p>";
        return;
    }

    const ul = document.createElement("ul");

    movies.forEach(movie => {
        const li = document.createElement("li");

        const link = document.createElement("a");
        link.href = '/movie.html?id={movie._id}';
        link.textContent = '${movie.name} (${movie.year})';

        li.appendChild(link);
        ul.appendChild(li);
    });

    resultsContainer.appendChild(ul);
}