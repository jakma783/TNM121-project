const API_BASE = "http://127.0.0.1:3000";

window.addEventListener("DOMContentLoaded", async () => {

    const parameters = new URLSearchParams(window.location.search);
    const imdbId = parameters.get("id");

    if(!imdbId) return;

    try {
        const response = await fetch(`${API_BASE}/movie/${imdbId}`);
        const movie = await response.json();   
        
        document.getElementById("title").textContent = movie.title;
        document.getElementById("year").textContent = movie.year;
        document.getElementById("genre").textContent = movie.genre.join(", ");
        document.getElementById("length").textContent = movie.runtime;
        document.getElementById("rating").textContent = movie.imdb_rating;
        document.getElementById("bechdel").textContent = movie.bechdel_score ?? "N/A";
        document.getElementById("description").textContent = movie.description;

        // Image
        document.getElementById("poster").src = `${API_BASE}/image/${movie.normalized_id}`;

        // directors
        const directorList = document.getElementById("director-list");
        directorList.innerHTML = "";

        movie.director.forEach((dir, index) => {
            const li = document.createElement("li");
            li.textContent = dir;
            directorList.appendChild(li);
        });

        // actors
        const actorsList = document.getElementById("actors-list");
        actorsList.innerHTML = "";

        movie.actors.forEach((actor, index) => {
            const li = document.createElement("li");
            li.textContent = actor;
            actorsList.appendChild(li);
        });

    } catch (err){
        console.error(err);
    }
});