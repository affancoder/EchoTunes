const express = require("express");
const router = express.Router();
const passport = require('../controllers/google.js');
const app = express();

app.get('/auth/google',
    passport.authenticate('google', { scope: ['profile']})
);

app.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/login' }),
    (req, res) => {
        res.redirect('/');
    }
);

module.exports = router;