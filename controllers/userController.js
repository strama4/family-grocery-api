const userQueries = require('../db/queries.users');

const User = require('../db/models').User;
const passport = require('passport');
const jwtSecret = require('../config/jwtConfig');
const jwt = require('jsonwebtoken');

module.exports = {
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
                            const token = jwt.sign({ id: user.email }, jwtSecret.secret);
                            res.status(200).json({ 
                                auth: true,
                                token: token,
                                user: user,
                                message: 'user created' 
                            })
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
                            message: 'user found & logged in',
                            userId: user.id
                        })
                    })
                })
            }
        })(req, res, next);
    },

    findUser(req, res, next) {
        passport.authenticate('jwt', { session: false }, (err, user, info) => {
            if (err || !user) {
                console.log(err);
            }
             else {
                console.log('user found in db from route');
                res.status(200).json({
                    auth: true,
                    email: user.email,
                    password: user.password,
                    message: 'user found in db',
                    userId: user.id
                })
            }
        })(req, res, next);
    }
}