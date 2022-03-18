const mongoose = require("mongoose");

const modeleSchema = mongoose.Schema({
 name: {type: String, required: true},
 description: {type: String, required: true},
 price: {type: Number, required: true},
 inStock: {type: Boolean, required: true}
})

module.exports = mongoose.model("modele", modeleSchema);