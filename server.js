const config = require("config");
const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");

console.log("-----------------------------------------------");

mongoose
  .connect(config.get("db_connection")) //look up what will change in next version
  .then(() => console.log("connected to db..."))
  .catch(er => console.error("Couldn't connecte to db", er));

app.use(cors());

const textArray = [];
insertStories = () => {
  textArray.push("ovo je tekst sa indeksom 61 11");
  console.log("textArray je ubacen");
};
insertStories(); // ovde ce da bude za jezike kad se promeni jezik menje niz?
//bolje je preko matrcie? jezik ima id i to je prvi element matrice

const sotrySchema = new mongoose.Schema({
  language: {
    type: String,
    required: true,
    enum: ["eng", "srp"]
  },
  story: String,
  nameAndAuthor: String
});

const Story = mongoose.model("Stories", sotrySchema);

async function newStory() {
  const sotry = new Story({
    language: "eng",
    story: "",
    nameAndAuthor: ""
  });

  const result = await sotry.save();
  console.log(result);
}
//newStory();

async function returnAllStories() {
  const stories = await Story.find();
  stories.forEach(function(vrednost, index) {
    textArray.push(vrednost.story);
  });
}
returnAllStories();

app.get("/", (req, res) => {
  res.json(textArray[Math.floor(Math.random() * textArray.length)]);
});

app.get("/newStory", (req, res) => {
  res.json(textArray[Math.floor(Math.random() * textArray.length)]);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`app is running on port ${PORT}`);
});
