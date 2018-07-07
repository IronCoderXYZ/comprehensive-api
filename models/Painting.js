const mongoose = require('mongoose');

const PaintingSchema = new mongoose.Schema({
  name: String,
  url: String,
  techniques: [String]
});

module.exports = mongoose.model('Painting', PaintingSchema);
