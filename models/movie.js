const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
 name : {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  watched: {
    type: Boolean,
    required: true,
  },
  notes: {
    type: String,
  },
});


const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;
