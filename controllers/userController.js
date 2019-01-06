const userQueries = require('../db/queries.users');

const User = require('../db/models').User;
const passport = require('passport');
const jwtSecret = require('../config/jwtConfig');
const jwt = require('jsonwebtoken');

module.exports = {
    createUser(req, res, next) {
        const newUser = {
            email: req.body.email,
            password: req.body.password,
            confirmPassword: req.body.confirmPassword
        }

        userQueries.createUser(newUser, (err, user) => {
            if (err) {
                console.log(err)
                res.status(500).send(err.errors);
            } else {
                res.status(200).send('User creation worked');
            }
        })
    },

    registerUser(req, res, next) {
        passport.authenticate('register', (err, user, info) => {
            if (err) {
                console.log(err);
            }
            if (info !== undefined) {
                console.log(info.message);
                res.send(info.message);
            } else {
                req.logIn(user, err => {
                    const data = {
                        email: req.body.email
                    }
                    User.findOne({
                        where: {
                            email: data.email
                        }
                    }).then(user => {
                        user.update({
                            email: data.email
                        })
                        .then(() => {
                            console.log('user created in db');
                            res.status(200).send({ message: 'user created' })
                        })
                    })
                })
            }
        })(req, res, next)
    },

    loginUser(req, res, next) {
        passport.authenticate('login', (err, user, info) => {
            if (err) {
                console.log(err);
            }
            if (info !== undefined) {
                console.log(info.message);
                res.json(info.message);
            } else {
                req.logIn(user, err => {
                    User.findOne({
                        where: {
                            email: user.email
                        }
                    }).then(user => {
                        const token = jwt.sign({ id: user.email }, jwtSecret.secret);
                        res.status(200).json({
                            auth: true,
                            token: token,
                            message: 'user found & logged in'
                        })
                    })
                })
            }
        })(req, res, next);
    },

    findUser(req, res, next) {
        passport.authenticate('jwt', { session: false }, (err, user, info) => {
            if (err) {
                console.log(err);
            }
             else {
                console.log('user found in db from route');
                res.status(200).json({
                    auth: true,
                    email: user.email,
                    password: user.password,
                    message: 'user found in db'
                })
            }
        })(req, res, next);
    }
}