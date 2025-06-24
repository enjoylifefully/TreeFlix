const searchMovie = (title) => {
    title = title.toLowerCase();
    return MOVIES.filter((movie) => movie.title.toLowerCase().includes(title));
};

const showMovie = (movie) => {
    const genreLabel = movie.genre.length > 1 ? "Gêneros" : "Gênero";
    return `<div class="movie">
        <strong>${movie.title}</strong><br/>
        Ano: ${movie.year}<br/>
        ${genreLabel}: ${movie.genre.join(", ")}<br/>
        Diretor: ${movie.director}
    </div>`;
};

document.getElementById("searchForm").addEventListener("submit", function (e) {
    e.preventDefault();
    const title = document.getElementById("searchTitle").value.trim();
    const resultDiv = document.getElementById("results");

    let found = searchMovie(title);
    if (found.length === 0) {
        resultDiv.innerHTML = `
            <h2>Results</h2>
            <p>No match found.</p>
            `;
    } else {
        resultDiv.innerHTML = `<h2>Results</h2>`;
        found.forEach((movie) => (resultDiv.innerHTML += showMovie(movie)));
    }
});
