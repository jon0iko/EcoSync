const { PrismaClient } = require('@prisma/client')
const express = require("express");
const cors = require("cors");
const session = require('express-session');
var passport = require('passport');
var crypto = require('crypto');
var LocalStrategy = require('passport-local').Strategy;
const connectPgSimple = require("connect-pg-simple");

const store = new (connectPgSimple(session))({ createTableIfMissing: true });

const port = 8000;

const app = express();
const prisma = new PrismaClient()
//middleware.
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


passport.use(new LocalStrategy(
    function (username, password, cb) {
        prisma.user.findUnique({ where: { username: username } })
            .then((user) => {

                if (!user) { return cb(null, false) }

                // Function defined at bottom of app.js
                const isValid = validPassword(password, user.hash, user.salt);

                if (isValid) {
                    return cb(null, user);
                } else {
                    return cb(null, false);
                }
            })
            .catch((err) => {
                cb(err);
            });
    }));

passport.serializeUser(function (user, cb) {
    cb(null, user.id);
});

passport.deserializeUser(function (id, cb) {
    prisma.user.findUnique({ where: { id: id } })
        .then((user) => {
            if (user) {
                cb(null, user);
            } else {
                cb(null, false);
            }
        })
        .catch((err) => {
            cb(err);
        });
})

app.use(session({
    store: store,
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 // Equals 1 day (1 day * 24 hr/1 day * 60 min/1 hr * 60 sec/1 min * 1000 ms / 1 sec)
    }
}));

app.use(passport.initialize());
app.use(passport.session());

function validPassword(password, hash, salt) {
    var hashVerify = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
    return hash === hashVerify;
}

function genPassword(password) {
    var salt = crypto.randomBytes(32).toString('hex');
    var genHash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
    
    return {
      salt: salt,
      hash: genHash
    };
}

//routes

//auth
app.post('/auth/login', passport.authenticate('local', { failureRedirect: '/login-failure', successRedirect: '/login-success' }), (err, req, res, next) => {
    console.log("req.body", req.body);
    if (err) next(err);
})

app.get('/login-success', (req, res, next) => {
    res.status(200).send({'message' : 'Login successful!'});
});

app.get('/login-failure', (req, res, next) => {
    res.send({'message' : 'Wrong username or password combination.'});
});

app.get('/auth/logout', function(req, res, next) {
    req.logout(function(err) {
      if (err) { return next(err); }
      res.status(200).send({'message' : 'Logged out successfully!'});
    });
  });

//create a user
app.post('/users', async (req, res) => {
    const saltHash =  genPassword(req.body.password);
    const salt = saltHash.salt;
    const hash = saltHash.hash;

    try {
    const newUser = await prisma.user.create({
        data: {
            username: req.body.username,
            hash: hash,
            salt: salt,
            email: req.body.email,
            role: req.body.role
        }
    });
    res.status(201).send({'message' : 'User created successfully'});    
    }
    catch (err) {
        console.error('Error creating user:', err);
        res.status(500).send({'message' : 'Internal Server Error'});
    }
});    



//list all users
app.get("/users", async (req, res) => {
    const users = await prisma.user.findMany();
    try {
        const users = await prisma.user.findMany();
        res.status(201).json(users);
    } catch (err) {
        console.error('Error getting users:', err);
        res.status(500).send('Internal Server Error');
    }
});


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});