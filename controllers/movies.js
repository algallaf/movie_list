const express = require('express');
const router = express.Router();
const User = require('../models/user.js');

router.get('/new', async (req, res) => {
  res.render('movies/new.ejs');
});

// INDEX 
router.get("/", async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);
    res.render("movies/index.ejs", {
      movies: currentUser.movies || [],
      user: currentUser
    });
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
});


// show
router.get("/:movieId", async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);
    const movie = currentUser.movies.id(req.params.movieId);
    res.render("movies/show.ejs", { movie });
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
});

// nnew
router.post("/", async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);
    // checkbox for watched
    req.body.watched = req.body.watched === "on";
    currentUser.movies.push(req.body);
    await currentUser.save();
    res.redirect(`/users/${currentUser._id}/movies`);
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
});

// del 
router.delete("/:movieId", async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);
    currentUser.movies.id(req.params.movieId).deleteOne();
    await currentUser.save();
    res.redirect(`/users/${currentUser._id}/movies`);
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
});

// EDIT 
router.get("/:movieId/edit", async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);
    const movie = currentUser.movies.id(req.params.movieId);
    res.render("movies/edit.ejs", { movie });
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
});

// UPDATE 
router.put("/:movieId", async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);
    const movie = currentUser.movies.id(req.params.movieId);
    req.body.watched = req.body.watched === "on";
    movie.set(req.body);
    await currentUser.save();
    res.redirect(`/users/${currentUser._id}/movies/${req.params.movieId}`);
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
});

module.exports = router;
