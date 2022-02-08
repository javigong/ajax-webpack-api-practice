import "./style.css";
import axios from "axios";
import { refreshAllFilms, refreshFeaturedFilm } from "./rendering.js";
refreshAllFilms();
refreshFeaturedFilm();

// Event handler for form submission events
const formsubmit = (event) => {
  event.preventDefault();
  // use Axios to send the data
  axios({
    method: "post",
    url: "/api/films",
    data: {
      title: document.getElementById("form-title").value,
      summary: document.getElementById("form-summary").value,
    },
  }).then(() => {
    refreshAllFilms();
  });
};

let form = document.getElementById("form");
form.addEventListener("submit", formsubmit);
