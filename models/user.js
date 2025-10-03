const mongoose = require('mongoose');
const movieSchema = require('./movie.js').schema; 
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
    movies: [movieSchema] 
});

const User = mongoose.model('User', userSchema);

module.exports = User;
