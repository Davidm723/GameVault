const express = require("express");
const router = express.Router();

const User = require("../models/user");

router.get("/", async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);
    if(!currentUser) {
      req.session.destroy();
      res.redirect('/auth/sign-in')
    }
    res.render("games/index.ejs", {
      games: currentUser.games,
    });
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
});

router.get("/new", async (req, res) => {
  res.render("games/new.ejs");
});

router.post("/", async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);
    console.log(req.body);
    if (req.body.completeInBox === "on") {
      req.body.completeInBox = true;
    } else {
      req.body.completeInBox = false;
    }
    if (!req.body.imageUrl) {
      req.body.imageUrl =
        "https://gamefaqs.gamespot.com/a/platform/thumb/arcade.jpg";
    }
    currentUser.games.push(req.body);
    await currentUser.save();
    res.redirect(`/users/${currentUser._id}/games`);
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
});

router.get('/:gameId', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);
        const game = currentUser.games.id(req.params.gameId);
        res.render('games/show.ejs', {
            game: game,
        });
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
});

router.delete('/:gameId', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);
        currentUser.games.id(req.params.gameId).deleteOne();
        await currentUser.save();
        res.redirect(`/users/${currentUser._id}/games`);
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
});

router.get('/:gameId/edit', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);
        const game = currentUser.games.id(req.params.gameId);
        res.render('games/edit.ejs', {
            game: game,
        });
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
});

router.put('/:gameId', async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);
    const game = currentUser.games.id(req.params.gameId);
    req.body.completeInBox = req.body.completeInBox === 'on';
    game.set(req.body);
    await currentUser.save();
    res.redirect(`/users/${currentUser._id}/games/${req.params.gameId}`);
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});

module.exports = router;
