import axios from "axios";

const refreshAllFilms = () => {
  let container = document.getElementById("all-films");
  container.innerHTML = "";

  axios
    .get("/api/films")
    .then((results) => {
      const movies = results.data.data;
      movies.map((movie) => {
        container.innerHTML += `
          <li>
            <h3>${movie.title}</h3>
            <h4>Summary:</h4>
            <p>${movie.summary}</p>
          </li>
        `;
      });
    })
    .catch((error) => console.log(error));
};

const loadFeaturedFilm = () => {
  let container = document.getElementById("featured-film");
  container.innerHTML = "";

  axios.get("/api/films").then((results) => {
    const movies = results.data.data;
    const randomNum = Math.floor(Math.random() * movies.length);
    const featMovie = movies[randomNum];
    container.innerHTML += `
          <h2>${featMovie.title}</h2>
          <p>${featMovie.summary}</p>
        `;
  });
};

const refreshFeaturedFilm = () => {
  loadFeaturedFilm();
  setInterval(loadFeaturedFilm, 3000);
};

export { refreshAllFilms, refreshFeaturedFilm };
