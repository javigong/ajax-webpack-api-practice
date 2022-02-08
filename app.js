const express = require("express");
const app = express();
const Film = require("./models/film.js");
const connection = require("./db/connection.js");

connection.once("open", () => {
  const server = app.listen(process.env.PORT || 8080, () => {
    console.log("Connected and listening");
  });
});

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post("/api/films", async (req, res) => {
  // TODO create a film on the mongodb collection
  try {
    const { title, summary } = req.body;
    const newFilm = new Film({
      title: title,
      summary: summary,
    });
    const result = await newFilm.save();
    res.set("content-location", `/api/films/${newFilm._id}`);
    res.status(201).json({
      data: result,
      url: `/api/films/${newFilm._id}`,
    });
  } catch (err) {
    return res.status(400).send(err);
  }
});

app.get("/api/films", async (req, res) => {
  // TODO fetch all films from the mongodb collection
  try {
    const results = await Film.find({}).exec();
    res.json({
      data: results,
      _links: {
        self: { href: `/api/films` },
      },
    });
  } catch (err) {
    return res.status(404).send(err);
  }
});
