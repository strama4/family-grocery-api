const User = require('./models').User;

const authHelper = require('../auth/helpers');

module.exports = {
    createUser(user, callback) {
        if (user.password !== user.confirmPassword) {
            callback('Password and Confirm Password don\'t match.');
        }
        User.create({
            email: user.email,
            password: authHelper.hashPassword(user.password)
        })
        .then(user => callback(null, user))
        .catch(err => callback(err));
    }
}