const express = require('express');
const router = express.Router();
const User = require('../models/user.js');

router.get('/new', async (req, res) => {
  res.render('movies/new.ejs');
});

