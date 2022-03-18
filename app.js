const express = require("express");
const app = express();
const mongoose = require("mongoose");

const modele = require("./modele");

mongoose
  .connect(
    "mongodb+srv://TestExo:TestExo@cluster0.bcra3.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  next();
});

app.post("/api/products", (req, res, next) => {
//   delete req.body._id;
  const newModele = new modele({
    ...req.body,
  });
  newModele
    .save()
    .then(() => res.status(201).json({product: newModele}))
    .catch((error) => res.status(400).json({ error }));
});

app.put("/api/products/:id", (req, res, next) => {
  modele
    .updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
    .then(() => res.status(200).json({ message: "Modified!" }))
    .catch((error) => res.status(400).json({ error }));
});

app.delete("/api/products/:id", (req, res, next) => {
  modele
    .deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: "Deleted!" }))
    .catch((error) => res.status(400).json({ error }));
});

app.get("/api/products/:id", (req, res, next) => {
  modele
    .findOne({ _id: req.params.id })
    .then((modeleFound) => res.status(200).json({ product: modeleFound }))
    .catch((error) => res.status(400).json({ error }));
});

app.get("/api/products", (req, res, next) => {
  modele
    .find()
    .then((modeles) => res.status(200).json({products: modeles }))
    .catch((error) => res.status(400).json({ error }));
});

module.exports = app;
