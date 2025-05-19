/*------------------------------------------------------------------------
    Day 40: OAuth2 Authentication
            Integrate OAuth2 authentication in an Express app
-------------------------------------------------------------------------*/

const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const session = require('express-session');
const dotenv = require('dotenv');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

// Session middleware
app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: true
}));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Configure passport with Google strategy
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: 'http://localhost:3000/auth/google/callback'
}, (accessToken, refreshToken, profile, done) => {
    // Save user profile to session
    done(null, profile);
}));

// Serialize user
passport.serializeUser((user, done) => {
    done(null, user);
});

// Deserialize user 
passport.deserializeUser((user, done) => {
    done(null, user);
});

// Routes
app.get('/', (req, res) => {
    res.send('<h1>Home Page</h1><a href="/auth/google">Login with Google</a>');
});

app.get('/auth/google', passport.authenticate('google', {
    scope: ['profile', 'email']
}));

// Google OAuth2 callback route
app.get('/auth/google/callback', passport.authenticate('google', {
    failureRedirect: '/'
}), (req, res) => {
    // Successful authentication
    res.send(`Welcome, ${req.user.displayName}`);
});

// Logout route
app.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

app.listen(PORT, () => {
    console.log('Server is running on http://localhost:3000');
});