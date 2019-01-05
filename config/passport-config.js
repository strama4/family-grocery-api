const passport = require('passport');
const LocalStrategy = require('passport-local');
const authHelper = require('../auth/helpers');

const User = require('../db/models').User;

module.exports = {
    init(app) {
        app.use(passport.initialize());
        app.use(passport.session());

        passport.use(new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password'
        },
            (email, password, done) => {
                User.findOne({ where: {email}})
                .then(user => {
                    if (!user || !authHelper.checkPassword(password, user.password)) {
                        return done(null, false, { message: 'Username or password are incorrect'});
                    }}) 
                    return done(null, user);
                })
        );

        passport.serializeUser((user, callback) => {
            callback(null, user.id);
        });
          
        passport.deserializeUser((id, callback) => {
            User.findByPk(id)
            .then((user) => {
                callback(null, user);
            })
            .catch((err) => {
                callback(err, user);
            });
        });
    }
}