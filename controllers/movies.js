const express = require('express');
const router = express.Router();
const User = require('../models/user.js');

router.get('/new', async (req, res) => {
  const currentUser = await User.findById(req.session.user._id);
  res.render('movies/new.ejs', { user: currentUser });
});

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


router.get("/:movieId", async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);
    const movie = currentUser.movies.id(req.params.movieId);
    res.render("movies/show.ejs", { movie, user: currentUser });
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
});

router.post("/", async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);
    req.body.watched = req.body.watched === "on";
    currentUser.movies.push(req.body);
    await currentUser.save();
    res.redirect(`/users/${currentUser._id}/movies`);
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
});

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

router.get("/:movieId/edit", async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);
    const movie = currentUser.movies.id(req.params.movieId);
    res.render("movies/edit.ejs", { movie, user: currentUser });
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
});

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
