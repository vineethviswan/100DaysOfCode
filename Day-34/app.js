/*------------------------------------------------------------------------
    Day 34: User Authentication with Passport
            Set up user authentication using Passportjs
-------------------------------------------------------------------------*/

const express = require('express');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

const users = [];
const port = 3000;
const app = express();

//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session(
    {
        secret: 'shouldbeasecret',
        resave: false,
        saveUninitialized: false,
    }
));
app.use(passport.initialize());
app.use(passport.session());

//Routes
app.post('/register', async (req, res) => {

    console.log('Registering user...');
    const username = req.body.username;
    const password = req.body.password;
    const hashedPassword = await bcrypt.hash(password, 10);

    users.push({
        name: username,
        password: hashedPassword
    });
    console.log('User registered successfully');
    res.redirect('/login');
})

const ensureAuthenticated = (req, res, next) => {
    console.log('Inside ensureAuthenticated');
    if(req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
};

app.post('/login', passport.authenticate('local', {
    successRedirect: '/success',
    failureRedirect: '/login',
    failureFlash: true,
}));

app.get('/logout', (req, res) => {
    console.log('Logging out user...');
    req.logout();
    res.redirect('/');
});

app.post('/success', ensureAuthenticated, (req, res) => {
    console.log('Inside success route');
    res.send(`Welcome to Dashboard, ${req.user.name}!`);
});

app.get('/', (req, res) => {
    res.send('Welcome to the home page!');
});


//Helper function to find user by name
const findUserByName = (name) => {
    return users.find(user => user.name === name); 
}

passport.use(new LocalStrategy((username, password, done) => {
    console.log('Inside LocalStrategy');
    const user = findUserByName(username);
    if(!user) {
        return done(null, false, { message: 'User not found!'});
    }

    console.log('Comparing password...');
    bcrypt.compare(password, user.password, (err, isMatch)=> {
        if(err) throw err;
        if(isMatch) {
            return done(null, user);
        } else {
            return done(null, false, { message: 'Incorrect password!'});
        }
    });

}));

passport.serializeUser((user, done) => {
    console.log('Inside serializeUser');
    done(null, user.name);
});

passport.deserializeUser((name, done) => {
    console.log('Inside deserializeUser');
    const user = findUserByName(name);
    done(null, user);
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
