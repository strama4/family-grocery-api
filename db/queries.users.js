const User = require('./models').User;

module.exports = {
    createUser(user, callback) {
        User.create({
            email: user.email,
            password: user.password
        })
        .then(user => callback(null, user))
        .catch(err => callback(err));
    }
}